tagsList = [];

var weightedTagsList = [];

$.ajax({
    url:'/tags/tags.json',
    method: 'GET',
    dataType: 'html',
    success: function (response, status, xhr) {
        tagsList = JSON.parse(response);
        tagsList.pop();
        tagsList.sort(function (b, a) {
            return parseFloat(a['size']) - parseFloat(b['size']);
        });
        // for (var i = 0; i < Math.max(tagsList.length, 10); i++) {
        //     weightedTagsList.push([
        //         tagsList[i]['tag'],
        //         48 * tagsList[i]['size'] / tagsList[0]['size']
        //     ]);
        // }
        // WordCloud(document.getElementById('cloud-canvas'), {
        //     list: weightedTagsList,
        //     drawOutOfBound: true,
        //     shape: 'diamond'
        // });
        window.Fuse = Fuse;
        setTimeout(() => {
            
        }, 2000)
        new Vue({
            delimiters: ['(%', '%)'],
            el: '#tagSearch',
            mounted: function () {
                var options = {
                    shouldSort: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: ['tag']
                };
                this.fuse = new window.Fuse(this.list, options);
                this.result = this.list;
            },
            watch: {
                search: function () {
                    if (this.search.trim() === '') {
                        this.result = this.list;
                    } else {
                        this.result = this.fuse.search(this.search.trim())
                        console.log(this.search);
                    }
                }
            },
            data: {
                siteUrl: "/",
                fuse: null,
                search: '',
                list: tagsList,
                result: []
            }
        });
    }

});

