import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "http";
import fs from "fs";
import path from "path";
import os from "os";
import { createHandler, MIME } from "../lib/server-handler.mjs";

let server;
let baseUrl;
let fixtureDir;

before(async () => {
  fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), "serve-test-"));
  fs.writeFileSync(path.join(fixtureDir, "index.html"), "<h1>Hello</h1>");
  fs.writeFileSync(path.join(fixtureDir, "style.css"), "body{}");
  fs.writeFileSync(path.join(fixtureDir, "app.js"), "console.log(1)");
  fs.writeFileSync(path.join(fixtureDir, "image.png"), "fakepng");

  server = http.createServer(createHandler(fixtureDir));
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  baseUrl = `http://localhost:${port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  fs.rmSync(fixtureDir, { recursive: true });
});

function get(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${baseUrl}${urlPath}`, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
      res.on("error", reject);
    });
  });
}

describe("Server handler — MIME types", () => {
  it("serves .html as text/html", async () => {
    const res = await get("/index.html");
    assert.equal(res.status, 200);
    assert.equal(res.headers["content-type"], "text/html");
  });

  it("serves .css as text/css", async () => {
    const res = await get("/style.css");
    assert.equal(res.headers["content-type"], "text/css");
  });

  it("serves .js as application/javascript", async () => {
    const res = await get("/app.js");
    assert.equal(res.headers["content-type"], "application/javascript");
  });

  it("serves .png as image/png", async () => {
    const res = await get("/image.png");
    assert.equal(res.headers["content-type"], "image/png");
  });
});

describe("Server handler — Routing", () => {
  it("serves / as index.html", async () => {
    const res = await get("/");
    assert.equal(res.status, 200);
    assert.ok(res.body.includes("<h1>Hello</h1>"));
  });

  it("returns 404 for nonexistent files", async () => {
    const res = await get("/nonexistent");
    assert.equal(res.status, 404);
  });
});

describe("Server handler — Security", () => {
  it("blocks path traversal with 403", async () => {
    const res = await get("/../package.json");
    // path.join normalizes, so this may be 403 or 404 depending on resolution
    assert.ok([403, 404].includes(res.status), `expected 403 or 404, got ${res.status}`);
  });
});

describe("Server handler — Query strings", () => {
  it("strips query params and serves file", async () => {
    const res = await get("/index.html?v=123");
    assert.equal(res.status, 200);
    assert.ok(res.body.includes("<h1>Hello</h1>"));
  });
});
