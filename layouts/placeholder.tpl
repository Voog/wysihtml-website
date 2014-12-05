<!DOCTYPE html>
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}" style="height:100%">
    <head prefix="og: http://ogp.me/ns#">
        {% include "html-head" %}
    </head>

    <body class="{% if editmode %}editmode {% endif %}common-page" style="height:100%;">
        <main class="container" role="main" style="height:100%;">
            <section class="content-formatted" style="top:50%;position:relative;transform:translateY(-50%);-webkit-transform:translateY(-50%);margin:0;">
                {% content %}
            </section>
        </main>
    </body>

</html>
