/**
 *
 * trunclist.js
 * adds a "read more" button after X list items and truncates the list
 * usage: <ul data-trunclist="4" data-trunclist-expand="Read more" data-trunclist-collapse="Collapse" data-trunclist-custom-css="false">
 *
 */

$('[data-trunclist]:not(._tl)').each(function(){
  var t = $(this);
  var style = (t.data('trunclist-custom-css') !== "true");
  if (style) t.addClass('trunclist-style');

  // tick of this list as dealt with, just to be sure..
  t.addClass('_tl');
  
  // define the max items to display before truncating
  max = t.data('trunclist');
  if (!Number.isInteger(max)) {
    max = 5;
  }

  // check if we need to truncate, else break..
  if(t.children().length > max) {
    t.addClass('_tl-trunked');
  } else {
    t.addClass('_tl-clean');
    return;
  }

  // define the expand/collapse text
  var collapseText =  t.data('trunclist-collapse'); 
  if (collapseText == "") collapseText = "Collapse"; 
  var expandText =  t.data('trunclist-expand');
  if (expandText == "") expandText = "Expand list";
  

  // add the trunc class
  var truncs = t.children("li:nth-child("+max+") ~ li");
  truncs.addClass('_tl-truncate');

  // add the button
  var toggleCss;
  t.after('<button class="js-trunclist-toggle"><span class="trunclist__expand">'+expandText+'</span><span class="trunclist__collapse"'+toggleCss+'>'+collapseText+'</span></button>');

  // make it toggle
  t.next('.js-trunclist-toggle').on('click', function(){
    $(this).prev('ul').toggleClass('_tl-expand');
  });

});

// add default stylesheet
(function(){
  // Create our stylesheet
  var tlStyle = document.createElement('style');
  tlStyle.innerHTML =
    '.trunclist-style:not(._tl-expand) ._tl-truncate { display: none; }\r\n' +
    '.trunclist-style:not(._tl-expand) + button .trunclist__collapse { display: none; }\r\n' +
    '.trunclist-style._tl-expand + button .trunclist__expand { display: none; }\r\n';
  $('head').append(tlStyle);
}());
