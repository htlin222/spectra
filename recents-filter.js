/**
 * Provides Javascript for filtering Recents portlet behavior.
 **/

 (function($) {
     $(document).ready(function() {

          window.recentsFilterModule = function(){
               return {
                 init: function(){
                   console.log('recentsFilterModule:init()');

                   // initialize the recents filter based on persisted session values
                   var filterTerm = sessionStorage.getItem('sg-recents-filter');

                   if(filterTerm) {
                     $('input#sg_recents_filter').val(filterTerm);

                     // set the active search filter
                     recentsFilterModule.setActiveRecentsFilter(filterTerm);
                   }
                 },

                 /**
                  * The elem is the element for sharing title and any other data attributes.
                  * The filterTerm determines the scope of the search.  It may be any of the
                  * following:
                  *     - 'sanford-guide': Includes all Sanford Guide only.
                  *     - '*': Includes all limited only by the user's permissions.
                  *     - 'path/to/folder':  Includes only content nested within the root.
                  **/
                 setRecentsFilter: function(filterTerm, elem) {

                    $('input#sg_recents_filter').val(filterTerm);

                    // set the active recents filter
                    recentsFilterModule.setActiveRecentsFilter(filterTerm);

                    // persist the user's selection for this session
                    sessionStorage.setItem('sg-recents-filter', filterTerm);
                 },

                 /**
                  * Updates the active selection to show that it is active.
                  **/
                 setActiveRecentsFilter: function(filterTerm) {

                   try{
                     var language = recentsFilterModule.getCookie('I18N_LANGUAGE') || 'en';
                     language = language.split('"').join(''); // remove double quotes
                     var recentsViewUrl = '/${language}/@@recents-view?ajax_load=1'.replace('${language}', language);
                     recentsViewUrl += '&recents_filter=${filterTerm}'.replace('${filterTerm}', filterTerm);

                     $.get(recentsViewUrl, function(data){
                       if (data.length === 0 || !data.trim()) {
                         console.log('sanfordguide.aspalert:: Got empty response from ajax_load.');
                       }else{
                         $('section.portletRecent').replaceWith(data);
                         $('.recentsFilter .dropdown-menu li[data-val!="'+filterTerm+'"] a').removeClass('active');
                         $('.recentsFilter .dropdown-menu li[data-val="'+filterTerm+'"] a').addClass('active');
                       }
                     });
                   }catch(e){
                     console.log('sanfordguide.aspalert:: Failed to load Recents portlet via ajax.');
                   }
                 },

                 /* Document.Cookie is supposedly supported across all major browsers.
                 See: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#Browser_compatibility
                 */
                 getCookie: function(cname) {
                   var name = cname + "=";
                   var decodedCookie = document.cookie;

                   try {
                     decodedCookie = decodeURIComponent(document.cookie);
                   } catch(e){
                     console.log('sanfordguide.aspalert:: There was trouble decoding cookie.  Passing it along without decoding.');
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
             }
          }();

          recentsFilterModule.init();
        });
})(jQuery);
