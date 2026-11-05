const main = document.querySelector("#main");
const teamsNav = document.querySelector("#teams");
const meta = document.querySelector("#meta");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
let bootstrap = null;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function clear(node) {
  node.replaceChildren();
}

function money(value) {
  if (value == null || value === "") return "—";
  const number = Number(value);
  const sign = number < 0 ? "-" : "";
  return `${sign}$${Math.abs(number).toLocaleString("en-US")}`;
}

function delta(value) {
  if (value == null || value === "") return "—";
  const number = Number(value);
  const node = el("span", number > 0 ? "delta-pos" : number < 0 ? "delta-neg" : "", number > 0 ? `+${number}` : String(number));
  return node;
}

async function api(path) {
  const response = await fetch(path);
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || `Request failed (${response.status})`);
  return body;
}

function teamLink(abbr, position) {
  return position ? `#/team/${abbr}/${position}` : `#/team/${abbr}`;
}

function renderTeams() {
  clear(teamsNav);
  let conference = "";
  for (const team of bootstrap.teams) {
    if (team.conference !== conference) {
      conference = team.conference;
      teamsNav.append(el("div", "conf", conference));
    }
    const link = el("a", "", team.abbr);
    link.href = teamLink(team.abbr);
    link.title = team.name;
    link.style.borderLeft = `3px solid ${team.primary_color || "#d6b25e"}`;
    teamsNav.append(link);
  }
}

function chips(activeTeam, activePosition) {
  const row = el("div", "chips");
  const all = el("a", "", "All");
  all.href = activeTeam ? teamLink(activeTeam) : "#/";
  row.append(all);
  for (const position of bootstrap.positions) {
    const link = el("a", "", position);
    link.href = activeTeam ? teamLink(activeTeam, position) : `#/top/${position}`;
    if (position === activePosition) link.style.borderColor = "var(--accent)";
    row.append(link);
  }
  if (activeTeam) {
    const cap = el("a", "", "Cap");
    cap.href = `#/cap/${activeTeam}`;
    row.append(cap);
  }
  return row;
}

function playerTable(rows, ranked) {
  const table = document.createElement("table");
  const head = document.createElement("tr");
  for (const label of ranked ? ["Rk", "Player", "Team", "Pos", "OVR", "Madden", "Delta"] : ["Player", "Team", "Pos", "OVR", "Madden", "Delta", "Status"]) {
    head.append(el("th", "", label));
  }
  table.append(head);
  for (const row of rows) {
    const tr = document.createElement("tr");
    tr.className = "clickable";
    tr.addEventListener("click", () => {
      if (row.player_id) location.hash = `#/player/${encodeURIComponent(row.player_id)}`;
    });
    const cells = ranked
      ? [row.baseline_rank, row.full_name, row.team_abbr, row.position, row.ovr, row.madden_ovr]
      : [row.full_name, row.team_abbr, row.position, row.ovr, row.madden_ovr];
    for (const value of cells) tr.append(el("td", "", value == null ? "—" : String(value)));
    const deltaCell = document.createElement("td");
    deltaCell.append(delta(row.delta_ovr));
    tr.append(deltaCell);
    if (!ranked) tr.append(el("td", "", row.membership_status || "—"));
    table.append(tr);
  }
  return table;
}

function showError(error) {
  clear(main);
  main.append(el("h1", "", "Roster"));
  main.append(el("p", "error", error.message || String(error)));
}

async function showHome() {
  clear(main);
  main.append(el("h1", "", "Clubs"));
  main.append(el("p", "sub", "Pick a team, a position room, or a locked top 10. Ratings are the Gridiron cards. Madden numbers are reference only."));
  const grid = el("div", "team-grid");
  for (const team of bootstrap.teams) {
    const card = el("a", "team-card");
    card.href = teamLink(team.abbr);
    card.style.borderTopColor = team.primary_color || "#d6b25e";
    card.append(el("strong", "", team.name));
    card.append(el("span", "", `${team.conference} ${team.division}`));
    grid.append(card);
  }
  main.append(grid);
  main.append(el("h2", "", "Locked top 10"));
  main.append(chips(null, null));
}

async function showTeam(abbr, position) {
  const team = bootstrap.teams.find(item => item.abbr === abbr);
  clear(main);
  main.append(el("h1", "", team ? team.name : abbr));
  main.append(el("p", "sub", position ? `${position} room` : "Active, injured reserve, and practice squad"));
  main.append(chips(abbr, position || null));
  const rows = await api(`/api/roster?team=${encodeURIComponent(abbr)}${position ? `&position=${encodeURIComponent(position)}` : ""}`);
  if (!rows.length) main.append(el("p", "note", "No players in this room."));
  else main.append(playerTable(rows, false));
}

async function showTop(position) {
  clear(main);
  main.append(el("h1", "", `${position} top 10`));
  main.append(el("p", "sub", "Published lock order. A blank team means the registry identity row has no club."));
  main.append(chips(null, position));
  const rows = await api(`/api/top10?position=${encodeURIComponent(position)}`);
  main.append(playerTable(rows, true));
}

function attributeTable(rows) {
  const table = document.createElement("table");
  const head = document.createElement("tr");
  for (const label of ["Attr", "Ours", "Madden", "Delta", "Tier"]) head.append(el("th", "", label));
  table.append(head);
  for (const row of rows) {
    const tr = document.createElement("tr");
    tr.append(el("td", "", row.attribute));
    tr.append(el("td", "", String(row.rating)));
    tr.append(el("td", "", row.madden_rating == null ? "—" : String(row.madden_rating)));
    const deltaCell = document.createElement("td");
    deltaCell.append(delta(row.delta));
    tr.append(deltaCell);
    tr.append(el("td", "", row.tier || "—"));
    table.append(tr);
  }
  return table;
}

async function showPlayer(id) {
  const player = await api(`/api/player?id=${encodeURIComponent(id)}`);
  clear(main);
  const hero = el("div", "hero");
  const title = el("div");
  title.append(el("h1", "", player.full_name));
  const bits = [player.team_abbr, player.position_bucket, player.membership?.status, player.college].filter(Boolean);
  title.append(el("p", "sub", bits.join(" · ") || "No club on the registry row"));
  if (player.card?.style_profile) title.append(el("p", "note", player.card.style_profile));
  hero.append(title);
  const ovr = el("div");
  ovr.append(el("div", "ovr", player.card?.ovr == null ? "—" : String(player.card.ovr)));
  ovr.append(el("div", "sub", "our OVR"));
  hero.append(ovr);
  const madden = el("div");
  madden.append(el("div", "ovr", player.card?.madden_ovr == null ? "—" : String(player.card.madden_ovr)));
  const line = el("div", "sub", "Madden reference");
  line.append(document.createTextNode(" "));
  line.append(delta(player.card?.delta_ovr));
  madden.append(line);
  hero.append(madden);
  main.append(hero);
  if (player.team_abbr) {
    const back = el("a", "", `Back to ${player.team_abbr}`);
    back.href = teamLink(player.team_abbr, player.position_bucket || undefined);
    main.append(back);
  }
  main.append(el("h2", "", "Attributes"));
  if (!player.attributes?.length) main.append(el("p", "note", "No Gridiron rating card is linked to this player."));
  else main.append(attributeTable(player.attributes));
  main.append(el("h2", "", "Contract"));
  if (!player.contracts?.length) {
    main.append(el("p", "note", "No imported contract. The roster does not invent deals."));
  } else {
    for (const deal of player.contracts) {
      main.append(el("p", "sub", `${deal.team_abbr} · signed ${deal.signing_year} · AAV ${money(deal.aav)} · total ${money(deal.total_value)} · age ${deal.age ?? "—"} · OVR ${deal.ovr ?? "—"}`));
      if (deal.source_name) main.append(el("p", "note", `${deal.source_name}${deal.source_url ? " — " + deal.source_url : ""}`));
      const table = document.createElement("table");
      const head = document.createElement("tr");
      for (const label of ["Season", "Cap hit", "Dead", "Base", "Flags"]) head.append(el("th", "", label));
      table.append(head);
      for (const year of deal.seasons) {
        const tr = document.createElement("tr");
        const flags = [
          year.void_year ? "void" : "",
          year.team_option ? "team option" : "",
          year.player_option ? "player option" : "",
          year.cap_active_while_roster_retired ? "cap-active while roster-retired" : ""
        ].filter(Boolean).join(", ");
        for (const value of [year.season, money(year.cap_hit), money(year.dead_money), money(year.base_salary), flags || "—"]) {
          tr.append(el("td", "", String(value)));
        }
        table.append(tr);
      }
      main.append(table);
    }
  }
}

async function showCap(abbr, rule) {
  const extra = rule ? `&rule=${encodeURIComponent(rule)}` : "";
  const sheet = await api(`/api/cap?team=${encodeURIComponent(abbr)}${extra}`);
  paintCap(abbr, sheet);
}

function capLines(lines) {
  if (!lines?.length) return el("p", "note", "None.");
  const table = document.createElement("table");
  const head = document.createElement("tr");
  for (const label of ["Player", "Amount", "Why"]) head.append(el("th", "", label));
  table.append(head);
  for (const line of lines) {
    const tr = document.createElement("tr");
    tr.className = "clickable";
    tr.addEventListener("click", () => { location.hash = `#/player/${encodeURIComponent(line.playerId)}`; });
    tr.append(el("td", "", line.playerName));
    tr.append(el("td", "", money(line.amount)));
    tr.append(el("td", "", line.reason));
    table.append(tr);
  }
  return table;
}

async function showSearch(q) {
  clear(main);
  main.append(el("h1", "", "Search"));
  main.append(el("p", "sub", q));
  const rows = await api(`/api/search?q=${encodeURIComponent(q)}`);
  if (!rows.length) main.append(el("p", "note", "No matching players."));
  else main.append(playerTable(rows, false));
}

async function render() {
  if (!bootstrap) return;
  const raw = location.hash.replace(/^#/, "") || "/";
  const [path, search] = raw.split("?");
  const parts = path.split("/").filter(Boolean);
  const params = new URLSearchParams(search || "");
  try {
    if (parts[0] === "team" && parts[1]) await showTeam(parts[1], parts[2]);
    else if (parts[0] === "top" && parts[1]) await showTop(parts[1]);
    else if (parts[0] === "player" && parts[1]) await showPlayer(decodeURIComponent(parts[1]));
    else if (parts[0] === "cap" && parts[1]) await showCap(parts[1], params.get("rule"));
    else if (parts[0] === "search") await showSearch(decodeURIComponent(parts.slice(1).join("/")));
    else await showHome();
  } catch (error) {
    showError(error);
  }
}

async function paintCap(abbr, sheet) {
  const team = bootstrap.teams.find(item => item.abbr === abbr);
  clear(main);
  main.append(el("h1", "", `${team ? team.name : abbr} cap`));
  main.append(el("p", "sub", `${sheet.season} · ${sheet.rule === "top51" ? "Top 51 (offseason)" : "In-season roster"}. Only imported contracts are included.`));
  main.append(chips(abbr, null));
  const box = el("div", "cap-box");
  for (const [label, value] of [
    ["League cap", money(sheet.leagueCap)],
    ["Carryover", money(sheet.carryover)],
    ["Adjustments", money(sheet.adjustments)],
    ["Committed", money(sheet.committed)],
    ["Dead money", money(sheet.deadMoney)],
    ["Cap space", money(sheet.capSpace)]
  ]) {
    const cell = el("div");
    cell.append(el("span", "", label));
    cell.append(el("strong", "", value));
    box.append(cell);
  }
  main.append(box);
  const other = sheet.rule === "top51" ? "in_season" : "top51";
  const link = el("a", "", `Switch to ${other === "top51" ? "top 51" : "in-season"}`);
  link.href = `#/cap/${abbr}?rule=${other}`;
  const rule = el("p", "note");
  rule.append(link);
  main.append(rule);
  main.append(el("h2", "", "Counted"));
  main.append(capLines(sheet.counted));
  main.append(el("h2", "", "Dead money"));
  main.append(capLines(sheet.dead));
  main.append(el("h2", "", "Excluded"));
  main.append(capLines(sheet.excluded));
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const q = searchInput.value.trim();
  if (q) location.hash = `#/search/${encodeURIComponent(q)}`;
});

window.addEventListener("hashchange", () => { render().catch(showError); });

api("/api/bootstrap").then((body) => {
  bootstrap = body;
  const cap = body.league_cap == null ? "no cap file" : money(body.league_cap);
  meta.textContent = `${body.players} players · ${body.rating_cards} cards · ${body.contracts} contracts · ${cap}`;
  renderTeams();
  return render();
}).catch(showError);
