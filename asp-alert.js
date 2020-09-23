(function($) {
  $( document ).ready(function() {

    /**
    * Since there was no documented way of setting a default tab using the Plone Mockups autotoc pattern,
    * we have to respect the way the contributors have framed it where they trigger a click on the tab's link.
    *
    * See: http://plone.github.io/mockup/dev/#pattern/autotoc
    **/

    let institutionalTabs = $('fieldset.sgsa-institution-tab');

    if (institutionalTabs.length) {
      // after a short delay, attempt to select the first institutional tab
      setTimeout(function () {
        try {
          // trigger click on first institutional tab
          $('div.autotabs > nav.autotoc-nav > a#autotoc-item-autotoc-1').trigger('click');
        } catch(e) {
          console.log('Unable to set active tab to first institutional tab.');
        }
      }, 200);
    }
  });
})(jQuery);
