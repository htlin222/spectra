/**
 * Performs the construction and configuration of tablesorter tables.
 */
 (function ($) {
   $(document).ready(function () {
     var topicsOverviewModule = (function () {
       return {
         init: function () {
           console.log('topicsOverviewModule:init()');

           // initialize tablesorter tables
           $(".tablesorter").tablesorter({
              cssChildRow: "tablesorter-childRow"
            });

           $('.tablesorter').delegate('tr:not(.tablesorter-childRow) td:not(:has(select))', 'click' ,function() {

              // use "nextUntil" to toggle multiple child rows
              // toggle table cells instead of the row
              $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow)').find('td').each(
                function() {
                  if($(this).is(':visible')) {
                    $(this).closest('tr').prev('tr.tablesorter-hasChildRow').addClass('collapsed');
                    $(this).hide();
                  } else {
                    $(this).show();
                    $(this).closest('tr').prev('tr.tablesorter-hasChildRow').removeClass('collapsed');
                  }
                });

              return false;
            });

            // collapse all child rows by default
            $('tr.tablesorter-childRow > td').hide();

            // set child rows onclick handlers
            $('tr.tablesorter-childRow[data-is-folderish=True]').each(
              function() {
                var uid = $(this).data('uid');
                $(this).find('td:not(:has(select))').on('click', function() {
                  // folderish row clicked should navigate
                  window.location.href = '?uid=' + uid;
                });
              }
            );

            // configure translator assignment controls
            $('select.translator-selector').on('change',
              function() {
                var uid = $(this).data('uid');
                // translatorId is not an int.  It is the user.id value.
                var translatorId =  $(this).find('option:checked').val();
                loadingWheel = $('#content-core .plone-loader')
                loadingWheel.css({display:'block'});
                $.ajax({type: "POST",
                          url:"@@assign_topics/" + uid,
                          data:JSON.stringify({translators: translatorId}),
                          contentType: "application/json",
                          dataType: "json",
                        }).done(function(data) {
                          // successful
                          updatedUids = data.uids;

                          if( updatedUids.length > 0) {
                            // make the selections on the dropdowns
                            updatedUids.forEach(function(eachUid, i) {
                              var translatorSelectors = $('select.translator-selector[data-uid="{0}"]'.replace('{0}', eachUid));
                              translatorSelectors.each(function(translatorSelector) {
                                $(this).val(translatorId);
                              });
                            });
                          }
                        }).always(function(){
                          // always stop the loading wheel
                          loadingWheel.css({display:'none'});
                        });
              });
         }       // eo init
       };        // eo return
     })();       // eo dataTableModule

     topicsOverviewModule.init();
   });
 })(jQuery);
