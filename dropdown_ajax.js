(function($) {
  $( document ).ready(function() {
    /* Document.Cookie is supposedly supported across all major browsers.
    See: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#Browser_compatibility
    */
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = document.cookie;

      try {
        decodedCookie = decodeURIComponent(document.cookie);
      } catch(e){
        console.log('webcouturier.dropdownmenu:: There was trouble decoding cookie.  Passing it along without decoding.');
      }

      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
    }

    try{
      var language = getCookie('I18N_LANGUAGE') || 'en';
      language = language.split('"').join(''); // remove double quotes
      var navMenuUrl = '/${language}/@@navmenu?ajax_load=1'.replace('${language}', language);

      $.get(navMenuUrl, function(data){
        if (data.length === 0 || !data.trim()) {
          console.log('webcouturier.dropdownmenu:: Got empty response from ajax_load.');
        }else{
          var containsNavAtRoot = $(data).filter('nav').length > 0;

          if (!containsNavAtRoot) {
            console.log('webcouturier.dropdownmenu:: Malformed response: did not contain a nav element at the root.');
          } else {
            $('#mainnavigation').html(data);
          }
        }
      });
    }catch(e){
      console.log('webcouturier.dropdownmenu:: Failed to load deep menus via ajax.');
    }
  });
})(jQuery);
