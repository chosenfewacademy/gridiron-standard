import fs from "node:fs";

const args=process.argv.slice(2);const option=(name:string)=>{const at=args.indexOf(name);return at>=0?args[at+1]:undefined};
const file=option("--input");const kind=option("--kind")??"research";
if(!file||!fs.existsSync(file)){console.log(`## ${kind} usage\n\nNo usage diagnostics file was produced.`);process.exit(0);}
let value:any;try{value=JSON.parse(fs.readFileSync(file,"utf8"));}catch{console.log(`## ${kind} usage\n\nThe diagnostics file was not valid JSON.`);process.exit(0);}
const rows=Array.isArray(value)?value:(value.usage?[value.usage]:[]);const successful=rows.filter((x:any)=>x.outcome==="SUCCESS"||x.response_id);
const sum=(key:string)=>successful.reduce((total:number,row:any)=>total+Number(row[key]??0),0);
const models=[...new Set(successful.map((x:any)=>x.model).filter(Boolean))];const ids=successful.map((x:any)=>x.response_id).filter(Boolean);
console.log(`## ${kind} usage\n\n| Metric | Value |\n|---|---:|\n| Model | ${models.join(", ")||"unavailable"} |\n| Requests | ${successful.length} |\n| Input tokens | ${sum("input_tokens")} |\n| Output tokens | ${sum("output_tokens")} |\n| Web-search calls | ${sum("web_search_calls")} |\n\nResponse IDs: ${ids.length?ids.map((x:string)=>`\`${x}\``).join(", "):"none"}\n\nDollar cost is not calculated because no dynamic pricing input was supplied.`);
