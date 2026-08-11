import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const standaloneUrl = new URL("../release/pindou8.html", import.meta.url);

test("standalone release is a self-contained HTML document", async () => {
  const [html, file] = await Promise.all([
    readFile(standaloneUrl, "utf8"),
    stat(standaloneUrl),
  ]);

  assert.ok(file.size > 100_000 && file.size < 1_000_000);
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /Third-Party Notices/);
  assert.match(html, /Copyright \(c\) Meta Platforms, Inc\. and affiliates\./);
  assert.match(html, /Permission is hereby granted, free of charge/);
  assert.match(html, /<title>拼豆图纸生成器<\/title>/);
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /<style>[^]+<\/style>/);
  assert.match(html, /<script>[^]+<\/script>/);
  assert.doesNotMatch(html, /<(?:script|link)\b[^>]*(?:src|href)\s*=/i);
  assert.match(html, /导入图片/);
  assert.match(html, /下载 PNG 图纸/);
});
