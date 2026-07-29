# eleventy-plugin-deskcrew

Add the [DeskCrew](https://deskcrew.io) support widget to an Eleventy site: live chat, AI answers grounded in your knowledge base, and a help center. One plugin registration, no template changes.

## Install

```
npm install eleventy-plugin-deskcrew
```

In your Eleventy config (`.eleventy.js` or `eleventy.config.js`):

```js
const deskcrew = require("eleventy-plugin-deskcrew");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(deskcrew, {
    key: "pub_your_widget_key",
  });
};
```

Build your site. The chat launcher appears on every generated page.

## Options

| option | required | notes |
| --- | --- | --- |
| `key` | yes | Your widget key (starts with `pub_`), from your DeskCrew dashboard's Install page. Free plan works. |
| `board` | no | Your public board slug; enables the feedback and roadmap link in the widget. |
| `position` | no | `right` (default) or `left`. |
| `color` | no | Hex accent colour. Left unset, the widget follows your workspace brand colour. |
| `greeting` | no | The first message visitors see in the chat. |

## How it works

The plugin adds an Eleventy transform that inserts one deferred script tag before `</body>` on every HTML output. Nothing else is modified, and the script loads asynchronously so it does not affect page speed.

## License

MIT. Questions: open an issue or say hi in the chat at [deskcrew.io](https://deskcrew.io).
