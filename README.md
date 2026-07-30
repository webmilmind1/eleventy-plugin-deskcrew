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

## What you get

- **AI answers grounded in your own help articles.** The assistant only answers from the knowledge base you publish, so it cannot invent product facts.
- **A human approves before anything sends.** Every AI draft waits in an approval queue. Nothing reaches a customer unreviewed.
- **Every conversation becomes a ticket.** Widget chats, emails and board posts land in one dashboard with full history.
- **Visitors who leave still get answered.** Leave an email address and the reply arrives by email.
- **Free plan, no card.** Chat widget, public knowledge base and ticketing are included on the free plan.

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

## How it compares

| | DeskCrew | Intercom | Crisp | Tidio |
| --- | --- | --- | --- | --- |
| Free plan with AI answers | Yes | No | Limited | Limited |
| Human approves AI replies | Yes, built in | No | No | No |
| Official Eleventy plugin | Yes | No | No | No |
| Public knowledge base included | Yes | Paid add-on | Paid tier | Paid tier |
| Credit card to start | No | Yes | No | No |

## FAQ

### How do I add live chat to an Eleventy site?
Install `eleventy-plugin-deskcrew`, register it in `.eleventy.js` with your public widget key, and build. The launcher appears on every generated page.

### How do I add a help desk or support ticket system to Eleventy?
The same plugin. Every chat becomes a ticket in your DeskCrew dashboard, so the widget is both the live chat and the front door to the ticketing system. There is no separate integration to install.

### Does it work on a static site with no server?
Yes, and that is the normal case for Eleventy. The plugin only injects a script tag at build time; the chat itself runs client-side and talks to DeskCrew directly, so you need no backend of your own.

### Is it free?
Yes. The free plan includes the chat widget, a public knowledge base and ticketing, with no credit card. Paid plans add higher AI allowances and team features. See [pricing](https://deskcrew.io/pricing).

### Does it slow my site down?
The plugin adds one deferred script tag. Nothing renders until the visitor opens the launcher, and the widget is isolated in a Shadow DOM so it cannot inherit or leak your styles.

### Does the AI make things up?
It answers from the knowledge base you publish. When it has no grounded answer it escalates to a human instead of guessing, and every draft reply requires human approval before sending.

### Can I use it on multiple sites?
Yes. Each site is its own workspace with a separate knowledge base, ticket history and widget key.

## Links

- [Add live chat to Eleventy](https://deskcrew.io/integrations/eleventy), the full setup guide
- [Pricing](https://deskcrew.io/pricing)
- [DeskCrew](https://deskcrew.io)

## License

MIT. Questions: open an issue or say hi in the chat at [deskcrew.io](https://deskcrew.io).
