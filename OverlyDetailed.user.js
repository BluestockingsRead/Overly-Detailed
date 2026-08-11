// ==UserScript==
// @name         Overly Detailed
// @namespace    https://bluestockingsread.com/
// @version      2.1.0
// @description  Automatically opens collapsed <details> elements, including ones added later. Includes per-site controls and manual open/close commands.
// @author       Kiera
// @match        *://*/*
// @match        file:///*
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

/* ===================================================================
     _      _  ._ |       _|  _ _|_  _. o |  _   _|
    (_) \/ (/_ |  | \/   (_| (/_ |_ (_| | | (/_ (_|
                    /

    ╭─────────────────────────────────────────────────────────────╮
        📂 file:       OverlyDetailed.user.js
        💾 project:    Overly Detailed
        👩‍💻 dev:        Kiera <github.com/BluestockingsRead>
        🌱 created:    2024-05-15
        ✍️ modified:   2026-08-11
        📄 license:    MIT
    ╰─────────────────────────────────────────────────────────────╯
=================================================================== */

(function () {
    'use strict';

    /* --- Per-site setting ---------------------------------------------- */

    /*
     * Auto-open defaults to on. Each hostname gets its own setting, so
     * disabling it on one site does not affect the rest of the web.
     *
     * Local files have no hostname, so they share one setting under "file:".
     */
    const STORAGE_KEY = `autoOpen:${location.hostname || location.protocol}`;
    let autoOpen = GM_getValue(STORAGE_KEY, true);

    /* --- Opening and closing -------------------------------------------- */

    // Mutation records may contain either a <details> element or a container.
    // querySelectorAll also catches nested <details> at any depth.
    function openWithin(node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        if (node.matches('details')) node.open = true;

        for (const details of node.querySelectorAll('details')) {
            details.open = true;
        }
    }

    function openAllOnPage() {
        openWithin(document.documentElement);
    }

    function closeAllOnPage() {
        for (const details of document.querySelectorAll('details')) {
            details.open = false;
        }
    }

    /* --- Watching for new elements -------------------------------------- */

    /*
     * Watch only for newly added nodes. Observing the `open` attribute would
     * undo anything the user closes manually, turning a helpful script into
     * a haunted accordion.
     *
     * Changing `.open` does not add or remove nodes, so the observer cannot
     * trigger itself.
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
                'Open all details on this page',
                openAllOnPage,
            ),
            GM_registerMenuCommand(
                'Close all details on this page',
                closeAllOnPage,
            ),
            GM_registerMenuCommand(
                `Auto-open for this site: ${autoOpen ? 'ON' : 'OFF'}`,
                toggleAutoOpen,
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