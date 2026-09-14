$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../..'))
$outputRoot = [IO.Path]::GetFullPath($PSScriptRoot)
$sources = [Collections.Generic.List[object]]::new()
$inventory = [Collections.Generic.List[object]]::new()
$excluded = [Collections.Generic.List[object]]::new()
function Hash-Bytes([byte[]]$bytes) {
  $hasher = [Security.Cryptography.SHA256]::Create()
  try { return ([BitConverter]::ToString($hasher.ComputeHash($bytes))).Replace('-', '').ToLowerInvariant() }
  finally { $hasher.Dispose() }
}
function Record-Content([string]$locator, [byte[]]$bytes) {
  $hash = Hash-Bytes $bytes
  $isText = [IO.Path]::GetExtension($locator) -match '^\.(json|jsonl|csv|tsv|md|txt|log|ts|js|yml|yaml|example|gitignore|dockerignore)$' -or [IO.Path]::GetFileName($locator) -eq 'Dockerfile'
  $inventory.Add([pscustomobject]@{file=$locator;sha256=$hash;bytes=$bytes.Length;inspection=$(if ($isText) {'TEXT_SCANNED'} else {'UNSUPPORTED_FORMAT_REVIEW_REQUIRED'})})
  if ($isText) { $sources.Add([pscustomobject]@{file=$locator;sha256=$hash;text=[Text.Encoding]::UTF8.GetString($bytes)}) }
}
function Read-Archive([string]$file, [string]$locator) {
  $inventory.Add([pscustomobject]@{file=$locator;sha256=(Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant();bytes=(Get-Item -LiteralPath $file).Length;inspection='ZIP_ENTRIES_SCANNED_IN_MEMORY'})
  $zip = [IO.Compression.ZipFile]::OpenRead($file)
  try {
    foreach ($entry in $zip.Entries) {
      if ($entry.FullName.EndsWith('/')) { continue }
      if ($entry.Length -gt 20MB) { throw "Archive entry too large for safe inspection: $($entry.FullName)" }
      $stream = $entry.Open(); $memory = [IO.MemoryStream]::new()
      try { $stream.CopyTo($memory); Record-Content "$locator!/$($entry.FullName)" $memory.ToArray() }
      finally { $stream.Dispose(); $memory.Dispose() }
    }
  } finally { $zip.Dispose() }
}
function Walk-Repository([string]$folder) {
  foreach ($item in Get-ChildItem -LiteralPath $folder -Force) {
    $relative = $item.FullName.Substring($repoRoot.Length + 1).Replace('\','/')
    if (($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0 -and $item.PSIsContainer) {
      $excluded.Add([pscustomobject]@{file=$relative;reason='Directory reparse point; not followed'}); continue
    }
    if ($item.PSIsContainer) {
      if ($item.FullName -eq $outputRoot -or $item.Name -in @('node_modules','.git')) {
        $excluded.Add([pscustomobject]@{file=$relative;reason='Dependency/VCS internals or generated preview workspace (prevents self-discovery)'}); continue
      }
      Walk-Repository $item.FullName
    } elseif ($item.Name -match '^\.env($|\.)' -and $item.Name -ne '.env.example') {
      $excluded.Add([pscustomobject]@{file=$relative;reason='Potential secrets; not copied'})
    } elseif ($item.Extension -eq '.zip') { Read-Archive $item.FullName $relative }
    else { Record-Content $relative ([IO.File]::ReadAllBytes($item.FullName)) }
  }
}
Walk-Repository $repoRoot
# Project artifacts immediately beside the repository; never traverse unrelated personal directories.
foreach ($item in Get-ChildItem -LiteralPath (Split-Path $repoRoot) -Force) {
  if ($item.FullName -eq $repoRoot) { continue }
  if ($item.PSIsContainer) { $excluded.Add([pscustomobject]@{file=$item.FullName;reason='Sibling directory outside repository; manual scope review required'}) }
  elseif ($item.Extension -eq '.zip') { Read-Archive $item.FullName $item.FullName }
  else { Record-Content $item.FullName ([IO.File]::ReadAllBytes($item.FullName)) }
}
$snapshot = [ordered]@{repository=$repoRoot;sources=$sources.ToArray();inventory=$inventory.ToArray();excluded=$excluded.ToArray()}
$json = $snapshot | ConvertTo-Json -Depth 20
[IO.File]::WriteAllText((Join-Path $outputRoot 'source-inventory.json'), $json, [Text.UTF8Encoding]::new($false))
Write-Output "Inspected $($inventory.Count) files/archive entries; collected $($sources.Count) text sources."
