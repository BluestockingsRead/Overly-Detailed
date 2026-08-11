# Overly Detailed

> Every `<details>` on the page, already open. 📂

**Overly Detailed** is a tiny userscript that expands collapsed `<details>`
elements, so you can read, search, copy, or print the whole page without
opening each section by hand.

Documentation, changelogs, FAQs, troubleshooting guides, and technical
discussions love tucking the useful part behind disclosure triangles.
This unfolds them.

It also catches `<details>` added later, because modern sites rarely finish
building the page when they claim they have.

Automatic opening is enabled by default. It can be disabled separately for
any site from your userscript manager's menu.

## 🚀 Install

1. Install a userscript manager:
   [Tampermonkey](https://www.tampermonkey.net/) and
   [Violentmonkey](https://violentmonkey.github.io/) both work.
2. **[Install Overly Detailed ⬇️](https://raw.githubusercontent.com/BluestockingsRead/Overly-Detailed/main/OverlyDetailed.user.js)**

Your userscript manager will show its usual installation prompt. After that,
updates can be handled automatically through the manager.

## ✨ What it does

- Opens every `<details>` element once the page is ready.
- Watches for new ones, covering lazy-loaded and infinite-scroll content.
- **Leaves your clicks alone.** Anything you close by hand stays closed.
- Remembers whether automatic opening is enabled or disabled for each site.
- Provides commands to open or close everything manually at any time.

The watcher only responds to *newly added* elements. It will not reopen
something a half-second after you deliberately closed it.

## 🔍 Handy for

- Searching long pages more predictably with Ctrl+F
- Reading documentation without opening dozens of sections
- Printing or saving complete pages as PDFs
- Copying full FAQs, changelogs, or troubleshooting guides into notes
- Comparing settings, options, or release entries side by side
- Reducing repetitive clicking on small disclosure controls

## 🎛️ Menu commands

Three commands are available from your userscript manager's menu:

| Command | What it does |
|---|---|
| **Open all details on this page** | Performs a one-time sweep of the current page. Handy when automatic opening is disabled or something slipped through. |
| **Close all details on this page** | Collapses every currently open `<details>` element. The undo button. |
| **Auto-open for this site: ON/OFF** | Toggles automatic opening for the current site and remembers the preference. The label shows the current state. |

### Per-site preferences

Opening everything everywhere is nice in theory, but some sites use
`<details>` for navigation menus, settings panels, accordions, and other
interface controls. Expanding all of those at once can make a hot mess.

Switch automatic opening off for that site and it stays off there. Everywhere
else continues working normally.

The two manual commands remain available even when automatic opening is
disabled.

## 💻 Compatibility

Overly Detailed should work in modern Chromium- and Firefox-based browsers with
a compatible userscript manager.

The script uses:

- `<details>`
- `MutationObserver`
- `GM_registerMenuCommand`
- `GM_setValue`
- `GM_getValue`

Tampermonkey and Violentmonkey support the required userscript APIs.

## 🧪 Demo page

[`demo.html`](demo.html) contains static, nested, and dynamically inserted
`<details>` elements.

It's useful for checking that the script still behaves correctly after a
change—or for seeing what Overly Detailed does before trying it on a real site.

To test the demo directly from your computer, you may need to enable
**Allow access to file URLs** for your userscript manager in the browser's
extension settings. Userscript managers cannot normally modify `file://`
pages without that permission.

## 🔒 Privacy

Overly Detailed collects nothing and sends nothing.

There are:

- No analytics
- No telemetry
- No network requests
- No stored page content or browsing history

Nothing is saved at all until you change something. Browsing with the script
installed writes nothing, ever. Using the auto-open toggle stores a single
on/off flag for that one hostname, held **locally** by your userscript manager,
and it never leaves the browser.

## 📜 License

Overly Detailed is licensed under the MIT License. See [LICENSE](LICENSE).