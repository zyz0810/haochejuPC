
/**
 * silder gallery begin  [{image:"322332",url:328932382939},{image:"8349",url:"23i32u3i2u"}]
 */
;(function(){
    "use strict";
    var time;
    var type;

    var SilderGallery = function (el,jsons,atime,atype) {
        this.data = jsons;
        this.el = el;
        time = atime;
        type = atype;
    };
    SilderGallery.prototype = {
        show:function () {
            var list = [];
            var str = '';
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].image.indexOf("cdn") === -1) {
                    return this.data[i].image;
                }else if (this.data[i].image.indexOf("@") !== -1) {
                    this.data[i].image = this.data[i].image.substring(0, this.data[i].image.indexOf("@"));
                }
                var screen = window.devicePixelRatio*document.documentElement.clientWidth;
                var _url = "";

                if (this.data[i].linkType == 'product') {
                    _url = '../product/details.jhtml?id=' + this.data[i].linkId;
                } else if (this.data[i].linkType == 'tenant') {
                    _url = '../tenant/index.jhtml?id=' + this.data[i].linkId;
                } else if (this.data[i].linkType == "unionActivity") {
                    _url = '../activity/index.html?linkId=' + this.data[i].linkId;
                } else if (this.data[i].linkType == "none") {
                    _url = this.data[i].url;
                    if(this.data[i].url == null){
                        _url = 'javascript:;';
                    }

                }else if (this.data[i].linkType == "special") {
                    _url = 'javascript:special;';
                }else if (this.data[i].linkType == "news") {
                    _url = 'javascript:news;';
                } else {
                    _url = 'javascript:;';
                }
                if((i%1)==0){
                    str = '<a href="'+ _url +'">';
                }
                str += '<img src="' + this.data[i].image + '@' + Math.ceil(100 * screen / 100)+ 'w_' + '1l">';
                if((i%1)==0 && i >= 0){
                    str += '</a>';
                    list.push({content:str});
                    str = "";
                }
            }

            var S = new iSlider({
                data: list,
                dom: this.el,
                // isOverspread: true,
                //isVertical: true,
                isVertical: false,
                isLooping: true,
                isAutoplay: true,
                fixPage: false,
                animateTime: time,
                duration: 3000,
                plugins: ['dot'],
                animateType: type  //zoomout,fade
            });
        }
    };

    $.fn.indexSilderDot = function(jsons,time,type) {
        var sg= new SilderGallery(document.getElementById(this.attr("id")), jsons,time,type);
        return sg.show();
    }


})();

/**
 * silder gallery end
 */