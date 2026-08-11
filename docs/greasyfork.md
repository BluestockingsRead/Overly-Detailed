> Every `<details>` on the page, already open. 📂

**Overly Detailed** is a tiny userscript that automatically expands the
collapsed `<details>` sections used for FAQs, documentation, changelogs,
troubleshooting guides, spoilers, and other content hidden behind little
triangles like `▶`.

Instead of opening them one by one, you can read, search, copy, print, or save
the whole page at once.

It also catches `<details>` elements added later by lazy loading, infinite
scroll, or other dynamic page updates.

## ✨ What it does

- Opens every `<details>` element when the page loads.
- Watches for newly added ones and opens those too.
- **Leaves your clicks alone:** anything you close manually stays closed.
- Remembers whether automatic opening is enabled or disabled separately for
  each site.
- Provides menu commands to open or close all `<details>` manually.

## 🔍 Handy for

- Searching long pages more reliably with Ctrl+F
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

The menu also includes one-time commands to:

- **Open all details on this page**
- **Close all details on this page**
- Toggle **Auto-open for this site: ON/OFF**

Manual commands remain available even when automatic opening is disabled.

## 🔒 Privacy

Overly Detailed collects nothing and sends nothing.

There are:

- No analytics
- No telemetry
- No network requests
- No stored page content
- No stored browsing history

Nothing is saved unless you change a site's auto-open setting. That preference
is stored locally by your userscript manager as a simple on/off flag and never
leaves your browser.

## 💻 Compatibility

Overly Detailed is designed for modern Chromium- and Firefox-based browsers
using a compatible userscript manager such as Tampermonkey or Violentmonkey.

## 🧪 Demo & source

The project repository includes a demo page with pre-existing, nested, and
dynamically inserted `<details>` elements if you'd like to see how the script
behaves or inspect the source.

- **Source code & documentation:**  
  https://github.com/BluestockingsRead/Overly-Detailed
- **Bug reports & support:**  
  https://github.com/BluestockingsRead/Overly-Detailed/issues

Overly Detailed is open source and licensed under the MIT License.