<script src="{{ javascripts_path }}/application.js"></script>
<script src="{{ site.static_asset_host }}/libs/picturefill/latest/picturefill.min.js"></script>

{% unless editmode %}
<script>
  window.editor = new wysihtml5.Editor(document.querySelector('#textarea'), {
    name: 'demo-editor',
    style: false,
    toolbar: "toolbar",
    parserRules:  wysihtml5ParserRules,
    stylesheets: ['/stylesheets/main.min.css']
  });
</script>

<script>
  $(document).ready(function() {
    $('pre').each(function(i, block) {
      if ($(block).find('code').length > 0) {
          hljs.highlightBlock($(block).find('code').get(0));
      } else {
         hljs.highlightBlock(block);
      }
    });
  });
</script>  
{% endunless %}
