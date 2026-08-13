/* ===================================================================
     _      _  ._ |       _|  _ _|_  _. o |  _   _|
    (_) \/ (/_ |  | \/   (_| (/_ |_ (_| | | (/_ (_|
                    /

    ╭─────────────────────────────────────────────────────────────╮
        📂 file:       gm-shim.js
        💾 project:    Overly Detailed
        👩‍💻 dev:        Kiera <github.com/BluestockingsRead>
        🌱 created:    2026-08-11
        ✍️ modified:   2026-08-13
        📄 license:    MIT
    ╰─────────────────────────────────────────────────────────────╯

    Stand-ins for the four userscript-manager APIs, so the live demo can
    run OverlyDetailed.user.js completely unmodified. Load this first;
    the script calls GM_getValue the moment it executes.

    ! Classic script on purpose. Deferred classic scripts share one
      global scope, which is how the userscript sees these functions.
      A `type="module"` tag would hide them and everything would fall
      over immediately.
=================================================================== */

(function () {
  'use strict';

  /* --- Storage --------------------------------------------------------- */

  /*
   * sessionStorage rather than localStorage: a returning visitor should
   * still get to watch the page go from closed to open, instead of
   * arriving after the interesting part already happened offstage.
   * It survives reloads within the tab, so "the setting is remembered"
   * is still demonstrable.
   *
   * Keys are namespaced because github.io is one origin shared by every
   * Pages project on the account.
   */
  const PREFIX = 'overlyDetailedDemo:';

  function read(key, fallback) {
    const raw = sessionStorage.getItem(PREFIX + key);

    if (raw === null) return fallback;

    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function write(key, value) {
    sessionStorage.setItem(PREFIX + key, JSON.stringify(value));
  }

  /* --- The GM functions ------------------------------------------------ */

  /*
   * These honor `defaultValue` the way the real API does, rather than
   * hardcoding anything convenient for the demo. If the script ever gains a
   * second preference, the shim shouldn't be falsely representing how GM
   * storage behaves.
   */
  window.GM_getValue = (key, defaultValue) => read(key, defaultValue);
  window.GM_setValue = (key, value) => write(key, value);

  /* --- Menu commands as page buttons ----------------------------------- */

  /*
   * The manager's menu becomes a row of buttons in the page. Rendering
   * happens here rather than in the demo's own script so nothing has to
   * wait its turn: by the time the userscript registers a command, this
   * file has already run and the DOM is parsed.
   */
  const menu = document.getElementById('menu-commands');
  const buttons = new Map();
  let nextId = 0;

  if (!menu) {
    console.warn('[gm-shim] No #menu-commands container; buttons have nowhere to go.');
  }

  window.GM_registerMenuCommand = (label, callback) => {
    const id = `cmd-${nextId += 1}`;
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'menu-command';
    button.textContent = label;
    button.addEventListener('click', callback);

    buttons.set(id, button);
    if (menu) menu.append(button);

    return id;
  };

  window.GM_unregisterMenuCommand = (id) => {
    const button = buttons.get(id);

    if (!button) return;

    button.remove();
    buttons.delete(id);
  };

  /* --- Demo seeding ---------------------------------------------------- */

  /*
   * The script asks for `autoOpen:<hostname>` with a default of true, so
   * left alone the demo would open everything before anyone touches a
   * control. Storing a real `false` on the first visit gives the page
   * somewhere to start from, without the shim faking its own defaults.
   *
   * Runs at top level, not on DOMContentLoaded: the userscript is the
   * very next script to execute.
   */
  const AUTO_OPEN_KEY = `autoOpen:${location.hostname || location.protocol}`;

  if (sessionStorage.getItem(PREFIX + AUTO_OPEN_KEY) === null) {
    write(AUTO_OPEN_KEY, false);
  }

  /* --- Reset ----------------------------------------------------------- */

  /*
   * `autoOpen` and the MutationObserver both live in the userscript's
   * closure, so there's no reaching in to reset them. Clearing this
   * demo's own keys and reloading is the honest way back to a pristine
   * page. Other Pages projects on the origin keep their storage.
   */
  window.overlyDetailedDemo = {
    autoOpenAtLoad: read(AUTO_OPEN_KEY, false),

    reset() {
      for (const key of Object.keys(sessionStorage)) {
        if (key.startsWith(PREFIX)) sessionStorage.removeItem(key);
      }

      location.reload();
    },
  };
})();
