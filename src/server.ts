import http from "node:http";
import { URL } from "node:url";
import { loadState } from "./state.js";
import { buildInputCardSpec } from "./card-spec.js";
import { resolvePlayer } from "./player-resolver.js";
import { ratingsOnly } from "./ratings-only.js";
import { healthReport } from "./health.js";

const PORT = Number(process.env.PORT ?? "3000");

function sendJson(res: http.ServerResponse, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

    if (req.method === "GET" && url.pathname === "/health") {
      return sendJson(res, 200, healthReport());
    }

    if (req.method === "GET" && url.pathname === "/status") {
      return sendJson(res, 200, loadState());
    }

    if (req.method === "GET" && url.pathname === "/player/card") {
      const name = url.searchParams.get("name");
      if (!name) return sendJson(res, 400, { error: "Missing name query parameter." });
      return sendJson(res, 200, buildInputCardSpec(name));
    }

    if (req.method === "GET" && url.pathname === "/player/ratings") {
      const name = url.searchParams.get("name");
      if (!name) return sendJson(res, 400, { error: "Missing name query parameter." });
      const resolved = resolvePlayer(name);
      if (resolved.status !== "RESOLVED" || !resolved.player) {
        return sendJson(res, 404, resolved);
      }
      return sendJson(res, 200, ratingsOnly(resolved.player));
    }

    return sendJson(res, 404, { error: "Not found." });
  } catch (error) {
    return sendJson(res, 500, {
      error: "Internal server error.",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
});

server.listen(PORT, () => {
  console.log(`Gridiron Standard server listening on port ${PORT}`);
});
