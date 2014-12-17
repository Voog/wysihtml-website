{% if site.data.fb_admin %}<meta property="fb:admins"content="{{ site.data.fb_admin }}">{% endif %}
<meta property="og:type" content="{% if article %}article{% else %}website{% endif %}">
<meta property="og:url" content="{{ site.url }}{% if article %}{{ article.url | remove_first:'/' }}{% else %}{{ page.url | remove_first:'/' }}{% endif %}">
<meta property="og:title" content="{{ page_title | escape }}">
<meta property="og:site_name" content="{{ page.site_title | escape }}">

<meta property="og:image" content="{{ site.url }}{{ images_path }}/wysihtml-og.jpg">
<meta property="og:description" content="{{ page.description }}">
<meta name="description" content="{{ page.description }}">
