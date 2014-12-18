<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="format-detection" content="telephone=no">

<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="/favicon.ico" type="image/ico">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">

<script src="{{ javascripts_path }}/modernizr.js"></script>

{% stylesheet_link "main.min.css?2" %}
<!--[if lt IE 9]>{% stylesheet_link "ie8.css" %}<![endif]-->

{% capture page_title %}{% if article %}{{ article.title }} — {{ page.site_title }}{% else %}{% if site.root_item.selected? %}{{ page.site_title }}{% else %}{{ page.title }} — {{ page.site_title }}{% endif %}{% endif %}{% endcapture %}
<title>{{ page_title }}</title>

{% include "open-graph" %}

{{ site.stats_header }}
