<!DOCTYPE html>
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% include "html-head" %}
</head>

<body {% if editmode %}class="editmode"{% endif %}>
  <main class="container" role="main">

    <section class="content-box content-middle">
      {% include "header" %}
      <section class="content-formatted">
        {% content %}
      </section>
    </section>
  </main>

  {% include "javascripts" %}
</body>
</html>
