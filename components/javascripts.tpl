<script src="{{ javascripts_path }}/application.min.js"></script>
<script src="{{ site.static_asset_host }}/libs/picturefill/latest/picturefill.min.js"></script>

<script>
  window.editor = new wysihtml5.Editor(document.querySelector('#textarea'), {
    name: 'demo-editor',
    style: false,
    toolbar: "toolbar",
    parserRules:  wysihtml5ParserRules,
    stylesheets: ['/stylesheets/main.min.css']
  });
</script>
