<!DOCTYPE html>
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% include "html-head" %}
</head>

<body {% if editmode %}class="editmode"{% endif %}>
  <main class="container" role="main">

    <section class="content-box content-top">
      {% include "header" %}
      {% include "content-top" %}
    </section>

    <section class="content-box content-middle">
      {% include "header" %}
      {% include "content-middle" %}
    </section>

    <section class="content-box content-bottom">
      {% include "bg-video" %}
      {% include "header" %}
      {% include "content-bottom" %}
    </section>
    <a href="#" class="scroller-arrow"><span class="animated-bounce"></span></a>
  </main>

  {% include "javascripts" %}
  <script type="text/javascript">site.initFrontPage();</script>
</body>
</html>
