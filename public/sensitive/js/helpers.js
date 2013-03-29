
function applyTemplate(template, view, fn) {
  if(typeof fn === 'function') {
    var html = Mustache.to_html(template, view);
    fn(html);
  }
}

function loadTemplate(tpl, view, fn) {

  var template = localStorage.getItem("template_" + tpl);

  if(template !== undefined && template !== null) {
    applyTemplate(template, view, fn);
    return;
  }

  $.get('/sensitive/templates/' + tpl + '.mustache', function(template) {
    localStorage.setItem("template_" + tpl, template);
    applyTemplate(template, view, fn);
  });
}

function param(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

  var regexS = "[\\?&]" + name + "=([^&#]*)",
      regex = new RegExp(regexS),
      results = regex.exec(window.location.search);

  if(results === null) {
    return "";
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
