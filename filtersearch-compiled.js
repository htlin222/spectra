
/* reset requirejs definitions so that people who
   put requirejs in legacy compilation do not get errors */
var _old_define = define;
var _old_require = require;
define = undefined;
require = undefined;
try{

/* resource: ++plone++sanfordguide-filtersearch/filtersearch.js */
function setSearchFilter(filterTerm,elem){$('.searchFilter input#search_filter').val(filterTerm);setActiveFilter(filterTerm);$('input#searchGadget').keyup().change().focus();var searchLabel='Search ';if(filterTerm=='*')searchLabel+='Site';else if(filterTerm=='sanford-guide')searchLabel+='Sanford Guide only';else searchLabel+=elem.title+' only';$('input#searchGadget').attr('placeholder',searchLabel);sessionStorage.setItem('sg-search-filter',filterTerm);sessionStorage.setItem('sg-search-placeholder',searchLabel);}function setActiveFilter(filterTerm){$('.searchFilter .dropdown-menu li[data-val!="'+filterTerm+'"] a').removeClass('active');$('.searchFilter .dropdown-menu li[data-val="'+filterTerm+'"] a').addClass('active');}$(document).ready(function(){var filterTerm=sessionStorage.getItem('sg-search-filter');var searchLabel=sessionStorage.getItem('sg-search-placeholder');var hasPermission=$('div.searchFilter > ul.dropdown-menu > li[data-val="'+filterTerm+'"]').length>0;if(filterTerm&&searchLabel&&hasPermission){$('.searchFilter input#search_filter').val(filterTerm);$('input#searchGadget').attr('placeholder',searchLabel);setActiveFilter(filterTerm);}});
}catch(e){
    // log it
    if (typeof console !== "undefined"){
        console.log('Error loading javascripts!' + e);
    }
}finally{
    define = _old_define;
    require = _old_require;
}
