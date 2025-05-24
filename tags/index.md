---
PageTitle: Tags | Arcane Reveries | Manikanta Reddy D
layout: about
title: Tags
comments: false
excerpt: ""
feature: "/assets/img/tags.png"
sitemap:
    priority: 0
---
<div id="tags">
    <h2>Search</h2>
    <div id="tagSearch" style="font-family: 'Open Sans'; font-size: 18px; line-height: 150%;" >
    <input class="form-control" type="text" v-model="search" placeholder="Type Something...">
    <table class="table table-hover" >
        <tr v-for="data in result" >
            <td><a :href="'{{ site.url }}{{ site.baseurl }}/tag/'+data.tag">(% data.tag %)</a></td>
            <td>(%data.size %)</td>
        </tr>
    </table>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="/assets/fuse.min.js"></script>
    <script src="/assets/tags.js"></script>
</div>