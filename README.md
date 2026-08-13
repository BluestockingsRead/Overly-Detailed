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

**[Try the live demo →](https://bluestockingsread.github.io/Overly-Detailed/)**
No installation required.

## 🚀 Install

1. Install a userscript manager:
   [Tampermonkey](https://www.tampermonkey.net/) and
   [Violentmonkey](https://violentmonkey.github.io/) both work.
2. **[Install Overly Detailed ⬇️](https://raw.githubusercontent.com/BluestockingsRead/Overly-Detailed/main/OverlyDetailed.user.js)**

   Prefer a userscript directory? **[Install from Greasy Fork](https://greasyfork.org/en/scripts/590922-overly-detailed)**.

Your userscript manager will show its usual installation prompt. After that,
updates can be handled automatically through the manager.

## ✨ What it does

- Opens every `<details>` element once the page is ready.
- Watches for new ones, covering lazy-loaded and infinite-scroll content.
- **Opens exclusive accordions in full**, including groups where the browser
  normally allows only one section open at a time.
- **Leaves your clicks alone.** Anything you close by hand stays closed.
- Remembers whether automatic opening is enabled or disabled for each site.
- Provides commands to open or close everything manually at any time.

The watcher only responds to *newly added* elements. It will not reopen
something a half-second after you deliberately closed it.

## 🔍 Handy for

- Reading documentation without opening dozens of sections
- Printing or saving complete pages as PDFs
- Copying full FAQs, changelogs, or troubleshooting guides into notes
- Comparing settings, options, or release entries side by side
- Reducing repetitive clicking on small disclosure controls

## 🎛️ Menu commands

Three commands are available from your userscript manager's menu:

| Command                             | What it does                                                                                                          |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Auto-open for this site: ON/OFF** | Toggles automatic opening for the current site and remembers the preference. The label shows the current state.       |
| **Open all details on this page**   | Performs a one-time sweep of the current page. Handy when automatic opening is disabled or something slipped through. |
| **Close all details on this page**  | Collapses every currently open `<details>` element. The undo button.                                                  |

### Per-site preferences

Opening everything everywhere is nice in theory, but some sites use
`<details>` for navigation menus, settings panels, accordions, and other
interface controls. Expanding all of those at once can make a hot mess.

Switch automatic opening off for that site and it stays off there. Everywhere
else continues working normally.

The two manual commands remain available even when automatic opening is
disabled.

### Exclusive accordions

Some sites group sections together with a shared `name`, so opening one closes
the others. The browser enforces that itself, which means opening every section
in turn isn't enough. Each one would shut the last on its way in.

Overly Detailed sets the grouping aside while it works, then hands it back when
you choose **Close all details on this page**. After that the accordion behaves
exactly the way the site intended.

Note: the grouping stays set aside until that command runs. Collapsing
the sections by hand won't bring the exclusive behavior back on its own, so
reach for **Close all** (or reload) if you want the site's accordion returned
mid-visit.

## 💻 Compatibility

Overly Detailed should work in modern Chromium- and Firefox-based browsers with
a compatible userscript manager.

The script uses:

* `<details>`
* `MutationObserver`
* `GM_registerMenuCommand`
* `GM_unregisterMenuCommand`
* `GM_setValue`
* `GM_getValue`

Tampermonkey and Violentmonkey support the required userscript APIs.

Exclusive accordions (`<details name>`) are a newer addition to the platform.
On a browser too old to support them there's simply no grouping to work
around, and everything else behaves the same.

## 🧪 Live demo & stress test

### Live demo

**[Try Overly Detailed in your browser](https://bluestockingsread.github.io/Overly-Detailed/)**
without installing anything.

The demo loads the same `OverlyDetailed.user.js` file you'd install. A small
browser shim stands in for the userscript-manager APIs, turning the real menu
commands into page buttons and giving the script temporary storage for the
tab.

You can try automatic opening, manual open/close commands, nested sections,
dynamically added content, and the script's leave-your-clicks-alone behavior.

### Developer stress test

[`stress-test.html`](https://bluestockingsread.github.io/Overly-Detailed/stress-test.html)
is the less-friendly sibling: a developer test fixture for checking that the
installed userscript still behaves correctly across static, nested, delayed,
dynamically inserted, and exclusively grouped `<details>` elements.

It also exercises manual closing, menu commands, per-site auto-open behavior,
intentionally pre-opened sections, and whether exclusive grouping is handed
back afterwards.

When opening the stress test directly from your computer, your userscript
manager may need permission to access `file://` URLs. Userscript managers
cannot normally modify local pages without that permission.

## 🔒 Privacy

Overly Detailed collects nothing and sends nothing.

There are:

- No analytics
- No telemetry
- No script-initiated network requests
- No stored page content or browsing history

Overly Detailed saves nothing until you change something. Simply browsing with
the script installed doesn't write any page data or browsing history. Using the
auto-open toggle stores a single on/off flag for that one hostname, held
**locally** by your userscript manager, and it never leaves the browser.

## 📜 License

Overly Detailed is licensed under the MIT License. See [LICENSE](LICENSE).
