// ==UserScript==
// @name         Overly Detailed
// @namespace    https://bluestockingsread.com/
// @version      2.2.0
// @description  Automatically opens collapsed <details> elements, including ones added later and exclusive accordions. Includes per-site controls and manual open/close commands.
// @author       Kiera
// @match        *://*/*
// @match        file:///*
// @exclude      https://bluestockingsread.github.io/Overly-Detailed/
// @exclude      https://bluestockingsread.github.io/Overly-Detailed/index.html*
// @exclude      https://bluestockingsread.github.io/Overly-Detailed/?*
// @run-at       document-idle
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @license      MIT
// @homepageURL  https://github.com/BluestockingsRead/Overly-Detailed
// @supportURL   https://github.com/BluestockingsRead/Overly-Detailed/issues
// @downloadURL  https://raw.githubusercontent.com/BluestockingsRead/Overly-Detailed/main/OverlyDetailed.user.js
// @updateURL    https://raw.githubusercontent.com/BluestockingsRead/Overly-Detailed/main/OverlyDetailed.user.js
// ==/UserScript==

/*
 * About those @exclude lines: the live demo at the Pages root loads this
 * same file behind stand-in GM functions. Without the excludes, an
 * installed copy runs alongside the demo's copy and opens everything
 * before the demo can show it happening.
 *
 * Three lines rather than one wildcard, for two reasons. An @exclude with
 * no `*` matches that exact URL only, so the bare path and the index.html
 * form both need naming. And a whole-directory wildcard would swallow the
 * hosted stress-test.html too, which is the one page that *should* meet the
 * installed script.
 */

/* ===================================================================
     _      _  ._ |       _|  _ _|_  _. o |  _   _|
    (_) \/ (/_ |  | \/   (_| (/_ |_ (_| | | (/_ (_|
                    /

    ╭─────────────────────────────────────────────────────────────╮
        📂 file:       OverlyDetailed.user.js
        💾 project:    Overly Detailed
        👩‍💻 dev:        Kiera <github.com/BluestockingsRead>
        🌱 created:    2024-05-15
        ✍️ modified:   2026-08-13
        📄 license:    MIT
    ╰─────────────────────────────────────────────────────────────╯
=================================================================== */

(function () {
  'use strict';

  /* --- Per-site setting ---------------------------------------------- */

  /*
   * Auto-open defaults to on. Each hostname gets its own setting, so
   * disabling it on one site doesn't affect the rest of the web.
   *
   * Local files have no hostname, so they share one setting under "file:".
   */
  const STORAGE_KEY = `autoOpen:${location.hostname || location.protocol}`;
  let autoOpen = GM_getValue(STORAGE_KEY, true);

  /* --- Exclusive accordions -------------------------------------------- */

  /*
   * AKA There Can Be Only One
   *
   * Matching non-empty `name` values group <details> into an exclusive
   * accordion: opening one closes any open member of the same group. Setting
   * `open` from JavaScript follows the same rule.
   *
   * Before OD forces one open, it saves the original name and temporarily
   * blanks it. An empty name belongs to no group, but keeping the attribute
   * preserves simple selectors such as `details[name]`.
   *
   * `Close all` closes the elements and restores their saved names, returning
   * native accordion behavior. Individual clicks do not restore names; OD's
   * override lasts until `Close all`.
   *
   * A WeakMap keeps this bookkeeping out of the page's markup and does not
   * keep detached elements alive just because OD remembers them.
  */
  const savedNames = new WeakMap();

  function leaveAccordion(details) {
    const name = details.getAttribute('name');

    // Missing or empty `name` means this <details> is not in a group.
    if (!name) return;

    savedNames.set(details, name);

    // Empty `name` keeps the attribute present but disables exclusivity.
    details.setAttribute('name', '');
  }

  function rejoinAccordion(details) {
    const name = savedNames.get(details);
    if (!name) return;

    // Forget our copy either way. If the page changed `name` while OD had
    // control of it, that newer page state wins.
    savedNames.delete(details);

    // Restore only the blank placeholder OD left behind.
    if (details.getAttribute('name') === '') {
      details.setAttribute('name', name);
    }
  }

  /* --- Opening and closing -------------------------------------------- */

  function openOne(details) {
    leaveAccordion(details);
    details.open = true;
  }

  // Mutation records may contain either a <details> element or a container.
  // querySelectorAll also catches nested <details> at any depth.
  function openWithin(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    if (node.matches('details')) openOne(node);

    for (const details of node.querySelectorAll('details')) {
      openOne(details);
    }
  }

  function openAllOnPage() {
    openWithin(document.documentElement);
  }

  /*
   * Closing before restoring hands the page back the way it was found,
   * with exclusive groups behaving exclusively again.
   */
  function closeAllOnPage() {
    for (const details of document.querySelectorAll('details')) {
      details.open = false;
      rejoinAccordion(details);
    }
  }

  /* --- Watching for new elements -------------------------------------- */

  /*
   * Watch only for newly added nodes. Observing the `open` attribute would undo
   * anything the user closes manually, turning a helpful script into a haunted
   * accordion.
   *
   * Changing `.open` doesn't add or remove nodes, so the observer cannot
   * trigger itself.
   *
   * ! Leave `attributes` off. OD changes `name` while opening exclusive
   *   accordions, which would wake this observer on its own work.
   */
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        openWithin(node);
      }
    }
  });

  function startWatching() {
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  function stopWatching() {
    observer.disconnect();
  }

  /* --- Menu commands --------------------------------------------------- */

  /*
   * Rebuild the menu when the setting changes so the toggle label stays
   * current. Managers without unregister support keep the original label
   * until reload rather than accumulating duplicate commands.
   */
  const canRelabel = typeof GM_unregisterMenuCommand === 'function';
  let menuIds = [];

  function buildMenu() {
    if (menuIds.length > 0 && !canRelabel) return;

    for (const id of menuIds) {
      GM_unregisterMenuCommand(id);
    }

    menuIds = [
      GM_registerMenuCommand(
        `Auto-open for this site: ${autoOpen ? 'ON' : 'OFF'}`,
        toggleAutoOpen,
      ),
      GM_registerMenuCommand(
        'Open all details on this page',
        openAllOnPage,
      ),
      GM_registerMenuCommand(
        'Close all details on this page',
        closeAllOnPage,
      ),
    ];
  }

  /*
   * Turning auto-open ON applies it immediately and resumes watching.
   * Turning it OFF stops future auto-opening but leaves the page as-is;
   * the manual commands control its current state.
   */
  function toggleAutoOpen() {
    autoOpen = !autoOpen;
    GM_setValue(STORAGE_KEY, autoOpen);

    if (autoOpen) {
      openAllOnPage();
      startWatching();
    } else {
      stopWatching();
    }

    buildMenu();
  }

  /* --- Start ----------------------------------------------------------- */

  /*
   * Menu commands are registered in the top frame only. A page with several
   * matching iframes would otherwise register all three once per frame and
   * bury the menu. Opening still happens inside frames; only the menu is
   * top-level.
   *
   * Built whether or not auto-open is on, so the manual commands stay
   * available on sites where it is disabled.
   */
  if (window === window.top) {
    buildMenu();
  }

  if (autoOpen) {
    openAllOnPage();
    startWatching();
  }
})();