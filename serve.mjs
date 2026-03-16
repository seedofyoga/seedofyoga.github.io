import http from "http";
import { createHandler } from "./lib/server-handler.mjs";

const PORT = 3000;
const server = http.createServer(createHandler(process.cwd()));
server.listen(PORT, () =>
  console.log(`Serving at http://localhost:${PORT}`),
);
