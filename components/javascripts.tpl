<script src="{{ javascripts_path }}/application.min.js"></script>
<script src="{{ site.static_asset_host }}/libs/picturefill/latest/picturefill.min.js"></script>

{% if editmode %}
{% else %}
<script>
  var editor = new wysihtml5.Editor("textarea", {
    toolbar:      "toolbar",
    parserRules:  wysihtml5ParserRules,
    stylesheets: ['/stylesheets/main.min.css']
  });
</script>
{% endif %}
