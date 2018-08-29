
/**
 * silder gallery begin  [{image:"322332",url:328932382939},{image:"8349",url:"23i32u3i2u"}]
 */
;(function(){
    "use strict";
    var time;
    var type;

    var SilderGallery = function (el,jsons,atime,atype,apImage,thNum) {
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
                str += '<img src="' + this.data[i].image + '@' + Math.ceil(100 * screen / 100)+ 'w_' +Math.ceil(45.4 * screen / 100) + 'h_1e_1c_100Q">';
                if((i%1)==0 && i >= 0){
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

    $.fn.recruitPartnerSilderDot = function(jsons,time,type,pImage,tNum) {
        var sg= new SilderGallery(document.getElementById(this.attr("id")), jsons,time,type);
        return sg.show();
    }
})();

/**
 * silder gallery end
 */