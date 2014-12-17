<script src="{{ javascripts_path }}/application.min.js"></script>
<script src="{{ site.static_asset_host }}/libs/picturefill/latest/picturefill.min.js"></script>

{% unless editmode %}
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

{{site.analytics}}
