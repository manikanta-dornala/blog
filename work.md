---
PageTitle: Work | Manikanta Reddy D
layout: page
title: "What I do!"
feature: "/assets/img/gears.png"
sitemap:
    priority: 1
---

{% assign sorted = site.work | reverse %}
{% for item in sorted %}
<div class="row">
    <div class="col-lg-10">
        <b><h2>{{ item.title }}</h2></b>
    </div>
    <div class="col-lg-2">
        <img style="width:80px" src="{{ item.logo }}" />
    </div>
</div>
<div class="row">
    <div class="col-md-12"><p>{{ item.time }}</p></div>
</div>

{{ item.content }}

<br>
{% endfor %}

