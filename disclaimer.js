if (Storage !== undefined) {
  $(document).ready(function () {
    "use strict";
    /***
     * The disclaimer is shown for logged-in users who either do not
     * have proof of agreement in the localStorage or if the last seen time
     * is before the last modified timestamp.  Keys are prefixed with the
     * product tag `collective.disclaimer` and made specific by `<var>.<user>`.
     *
     * The user portion of the localStorage keys is base64 encoded. This provides
     * a very shallow form of obfuscation, but that is not its purpose at all since
     * it could easily be decoded.  The purpose is to ensure that it is a proper
     * ASCII keyname void of any special characters.
     ***/
    var last_modified = $("#viewlet-disclaimer").attr("data-last-modified");
    var current_user = $("#disclaimer-userid").val();
    var k_last_seen_key = 'collective.disclaimer.last_seen.' + btoa(current_user);
    var k_has_agreed_key = 'collective.disclaimer.has_agreed.' + btoa(current_user);
    var last_seen = localStorage.getItem(k_last_seen_key);
    var has_agreed = localStorage.getItem(k_has_agreed_key);

    if (has_agreed === null || !has_agreed || last_seen === null || parseInt(last_seen) < parseInt(last_modified)) {
      localStorage.setItem("collective.disclaimer", last_modified);
      var enabled = $("#viewlet-disclaimer").attr("data-enabled");

      if (enabled === "true") {
        $("#viewlet-disclaimer").show();
      }

      $(".disclaimer-close").click(function (event) {
        event.preventDefault();
        $("#viewlet-disclaimer").hide();
      });

      $(".disclaimer-buttons #button-agree").click(function (event) {
        event.preventDefault();
        var current_user = $("#disclaimer-userid").val();
        if (Storage !== undefined) {
          last_seen = Date.now() / 1000;
          localStorage.setItem('collective.disclaimer.has_agreed.' + btoa(current_user), true);
          localStorage.setItem('collective.disclaimer.last_seen.' + btoa(current_user), last_seen);
        }
        $('#viewlet-disclaimer').hide();
      });
    }
  });
}
