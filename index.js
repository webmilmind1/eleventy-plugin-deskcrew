/**
 * eleventy-plugin-deskcrew
 *
 * Injects the DeskCrew support widget into every generated HTML page, right
 * before </body>. Configuration is plugin options only; templates stay untouched.
 *
 *   const deskcrew = require("eleventy-plugin-deskcrew");
 *   eleventyConfig.addPlugin(deskcrew, { key: "pub_your_widget_key" });
 *
 * Options:
 *   key       required. Your DeskCrew widget key (starts with "pub_").
 *   board     optional. Your public board slug, enables the feedback link.
 *   position  optional. "right" (default) or "left".
 *   color     optional. Hex accent colour. Defaults to your workspace brand colour.
 *   greeting  optional. First message shown in the chat.
 */

const KEY_RE = /^pub_[A-Za-z0-9_-]{4,64}$/;
const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;
const HEX_RE = /^#[0-9a-fA-F]{3,8}$/;

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

module.exports = function deskcrewPlugin(eleventyConfig, options = {}) {
  const key = String(options.key || "").trim();
  if (!KEY_RE.test(key)) {
    console.warn(
      "[eleventy-plugin-deskcrew] options.key is required (your widget key, pub_...); widget not injected."
    );
    return;
  }

  const attrs = ['src="https://deskcrew.io/desk.js"', 'data-key="' + escapeAttr(key) + '"'];

  const board = String(options.board || "").trim();
  if (board && SLUG_RE.test(board)) attrs.push('data-board="' + escapeAttr(board) + '"');

  if (options.position === "left") attrs.push('data-position="left"');

  const color = String(options.color || "").trim();
  if (color && HEX_RE.test(color)) attrs.push('data-color="' + escapeAttr(color) + '"');

  const greeting = String(options.greeting || "").trim();
  if (greeting) attrs.push('data-greeting="' + escapeAttr(greeting.slice(0, 200)) + '"');

  const tag = "<script " + attrs.join(" ") + " defer></script>";

  eleventyConfig.addTransform("deskcrew-widget", function (content) {
    const outputPath =
      (this && this.page && this.page.outputPath) || (this && this.outputPath) || "";
    if (
      typeof outputPath === "string" &&
      outputPath.endsWith(".html") &&
      typeof content === "string" &&
      content.includes("</body>")
    ) {
      return content.replace("</body>", tag + "\n</body>");
    }
    return content;
  });
};
