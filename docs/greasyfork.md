> Every `<details>` on the page, already open. 📂

**Overly Detailed** is a tiny userscript that automatically expands the
collapsed `<details>`  sections commonly found in FAQs, documentation,
changelogs, troubleshooting guides, spoilers, and other content hidden behind
little triangles like `▶`.

Instead of opening them one by one, you can read, search, copy, print, or save
the whole page at once.

It also catches `<details>` elements added later by lazy loading, infinite
scroll, or other dynamic page updates.

[**Try the live demo!** *(No installation required)*](https://bluestockingsread.github.io/Overly-Detailed/)

## ✨ What it does

- Opens every `<details>` element when the page loads.

- Watches for newly added ones and opens those too.

- **Opens exclusive accordions in full,** where a site would normally allow
  only one section open at a time.

- **Leaves your clicks alone:** anything you close manually stays closed.

- Remembers whether automatic opening is enabled or disabled separately for
  each site.

- Provides menu commands to open or close all `<details>` manually.

## 🔍 Handy for

- Reading documentation without opening dozens of sections

- Printing or saving complete pages as PDFs

- Copying full FAQs, changelogs, or troubleshooting guides into notes

- Comparing settings, options, or release entries side by side

- Reducing repetitive clicking on disclosure controls

## 🎛️ Per-site controls

Automatic opening is enabled by default.

Some sites also use `<details>` elements for navigation, settings panels, or
other interface controls where opening everything may be undesirable. From
your userscript manager's menu, you can disable automatic opening for just that
site without affecting any others.

The menu includes:

-   **Auto-open for this site: ON/OFF**

-   **Open all details on this page**

-   **Close all details on this page**

Manual commands remain available even when automatic opening is disabled.

## 🪗 Exclusive accordions

Some sites group sections so that opening one closes the rest. The browser
enforces that grouping, so opening them one by one gets you nowhere: each
section shuts the one before it.

Overly Detailed sets the grouping aside while it works and hands it back when
you choose **Close all details on this page**, leaving the site's accordion
behaving normally again. The grouping stays set aside until **Close all** or a
reload; manually closing individual sections won't restore the site's
one-at-a-time behavior.

## 🔒 Privacy

Overly Detailed collects nothing and sends nothing.

There are:

- No analytics
- No telemetry
- No script-initiated network requests
- No stored page content
- No stored browsing history

Nothing is saved unless you change a site's auto-open setting. That preference
is stored locally by your userscript manager as a simple on/off flag and never
leaves your browser.

## 💻 Compatibility

Overly Detailed is designed for modern Chromium- and Firefox-based browsers
using a compatible userscript manager such as Tampermonkey or Violentmonkey.

## 🧪 Try it & source

### Live demo

**[Try Overly Detailed in your browser](https://bluestockingsread.github.io/Overly-Detailed/)**
without installing anything.

The demo runs the same shipping script and lets you try its automatic opening,
manual controls, dynamically added sections, and other behavior directly on
the page.

### Developer stress test

Want to push it harder? The
**[developer stress test](https://bluestockingsread.github.io/Overly-Detailed/stress-test.html)**
collects static, nested, delayed, dynamically inserted, and exclusively
grouped `<details>` edge cases in one deliberately challenging page.

- **[Source code & documentation](https://github.com/BluestockingsRead/Overly-Detailed)**

- **[Bug reports & support](https://github.com/BluestockingsRead/Overly-Detailed/issues)**

Overly Detailed is open source and licensed under the MIT License.