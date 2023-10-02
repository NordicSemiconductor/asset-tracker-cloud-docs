function NCS () {
  "use strict";

  let state = {};

  // XXX: do not remove the trailing '/'
  const STABLE_VERSION_RE = /^(\d+\.)+\d+$/;
  const DEV_VERSION_RE = /^(\d+\.)+\d+-[a-z0-9]+$/;
  const LOCALHOST_RE = /^(localhost)|((\d{1,3}\.){3}\d{1,3}):\d{4,5}/

  /*
   * Allow running from localhost; local build can be served with:
   * python -m http.server
   */
  state.updateLocations = function(){
    const host = window.location.host;
    let root_suffix = "";
    if (LOCALHOST_RE.test(host)) {
      this.url_prefix = "/";
    } else {
      let path = window.location.pathname;
      let prefix_end_index = path.indexOf("/doc/") + "/doc/".length;
      this.url_prefix = path.substring(0, prefix_end_index);
      root_suffix = "latest";
    }

    this.url_root = window.location.protocol + "//" + host + this.url_prefix;
    this.version_data_url = this.url_root + root_suffix + "/versions.json";
  };

  /*
   * Infer the currently running version of the documentation
   */
  state.findCurrentVersion = function() {
    const path = window.location.pathname;
    if (path.startsWith(this.url_prefix)) {
      const prefix_len = this.url_prefix.length;
      window.NCS.current_version_text = path.slice(prefix_len).split("/")[0];
      if (window.NCS.current_version_text === "latest") {
        window.NCS.current_version = window.NCS.versions[0];
      } else {
        window.NCS.current_version = window.NCS.current_version_text;
      }
    } else {
      window.NCS.current_version_text = "latest";
      window.NCS.current_version = window.NCS.versions[0];
    }
  };

  /*
   * Infer the current page being browsed, stripped from any fixed and
   * versioned prefix; it'll be used to jump to the same page in another
   * docset version.
   */
  state.findCurrentPage = function() {
    const path = window.location.pathname;
    const version_prefix = window.NCS.current_version_text + "/";
    if (path.startsWith(this.url_prefix)) {
      const prefix_len = this.url_prefix.length;
      let new_page = path.slice(prefix_len);
      if (new_page.startsWith(version_prefix)) {
        new_page = new_page.slice(version_prefix.length);
      }
      window.NCS.current_page = new_page;
    } else {
      window.NCS.current_page = "nrf/index.html";
    }
  };

  /*
   * Updates the dropbox of nRF Connect SDK versions displayed below the
   * current development version, and links to the same page currently being
   * browsed in those earlier releases.
   */
  state.updateVersionDropDown = function() {
    const ncs = window.NCS;

    // Update dropdown text
    $("#ncsversion").text(`v${ncs.current_version}`);

    // Update dropdown content
    $.each(ncs.versions, function(i, v) {
      if (v !== ncs.current_version) {
        let rv = i === 0 ? "latest" : v;
        let link = `<a class="dropdown-item" href=${ncs.url_root + rv}/${ncs.current_page}>${rv}</a>`;
        $("div.dropdown-menu").append(link);
      }
    });
  };

  /*
   * Display a message at the top of the page to inform the user that the
   * version currently being browsed is not the latest.
   */
  state.showVersion = function() {
    const ncs = window.NCS;
    const last_version = ncs.versions[1];
    const path_suffix = "/" +  ncs.current_page;
    const last_release_url = ncs.url_root + last_version + path_suffix;
    const latest_release_url = ncs.url_root + "latest" + path_suffix;

    const SWITCH_MSG = "You might want to switch to the documentation for " +
      "the <a href='" + last_release_url + "'>" + last_version +
      "</a> release or the <a href='" + latest_release_url + "'>current " +
      "state of development</a>."

    const OLD_RELEASE_MSG =
      "You are looking at an older version of the documentation. " + SWITCH_MSG;

    const DEV_RELEASE_MSG =
      "You are looking at the documentation for a development tag. " + SWITCH_MSG;

    const LAST_RELEASE_MSG =
      "You are looking at the documentation for the latest official release.";

    if (ncs.current_version === last_version) {
      $("div.announcement").html(LAST_RELEASE_MSG);
      $("div.announcement").show();
    } else if (DEV_VERSION_RE.test(ncs.current_version)) {
      $("div.announcement").html(DEV_RELEASE_MSG);
      $("div.announcement").show();
    } else if (ncs.versions.includes(ncs.current_version) &&
               ncs.current_version !== ncs.versions[0]) {
      $("div.announcement").html(OLD_RELEASE_MSG);
      $("div.announcement").show();
    }
  };

  state.updatePage = function() {
    let ncs = window.NCS;
    ncs.findCurrentVersion();
    ncs.findCurrentPage();
    ncs.updateVersionDropDown();
    ncs.showVersion();
  };

  const NCS_SESSION_KEY = "ncs";

  /*
   * Load a versions.json from the session cache if available
   */
  state.loadVersions = function() {
    let versions_data = window.sessionStorage.getItem(NCS_SESSION_KEY);
    if (versions_data) {
      window.NCS.versions = JSON.parse(versions_data);
      return true;
    }
    return false;
  }

  /*
   * Update the session cache with a new versions.json
   */
  state.saveVersions = function(versions_data) {
    const session_value = JSON.stringify(versions_data);
    window.sessionStorage.setItem(NCS_SESSION_KEY, session_value);
    window.NCS.versions = versions_data;
  }

  /*
   * When the "Hide Search Matches" (from Sphinx's doctools) link is clicked,
   * rewrite the URL to remove the search term.
   */
  state.hideSearchMatches = function() {
    $('.highlight-link > a').on('click', function(){
      // Remove any ?highlight=* search querystring element
      window.location.assign(
        window.location.href.replace(/[?]highlight=[^#]*/, '')
      );
    });
  }

  return state;
};

if (typeof window !== 'undefined') {
  window.NCS = NCS();
}

$(document).ready(function(){
  window.NCS.updateLocations();
  window.NCS.hideSearchMatches();

  if (window.NCS.loadVersions()) {
    window.NCS.updatePage();
  } else {
    /* Get versions file from remote server. */
    $.getJSON(window.NCS.version_data_url, function(json_data) {
      window.NCS.saveVersions(json_data);
      window.NCS.updatePage();
    });
  }
});
