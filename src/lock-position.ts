import { lockPosition } from "./position-lock.js";
const [pos, , confirm] = [process.argv[2], process.argv[3], process.argv[4]];
if (process.argv[3] !== "--confirm") { console.error("Usage: npm run position:lock -- <POS> --confirm LOCK_<POS>"); process.exit(2); }
console.log(JSON.stringify(lockPosition(String(pos).toUpperCase(), confirm), null, 2));
