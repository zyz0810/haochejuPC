
/**
 * silder gallery begin  [{image:"322332",url:328932382939},{image:"8349",url:"23i32u3i2u"}]
 */
;(function(){
    "use strict";
    var time;
    var type;
    var tNum;

    var SilderGallery = function (el,jsons,atime,atype,thNum) {
        this.data = jsons;
        this.el = el;
        time = atime;
        type = atype;
        tNum = thNum;
    };
    SilderGallery.prototype = {
        show:function () {
            var list = [];
            var str = '';
            for (var i = 0; i < this.data.productImages.length; i++) {
                var screen = window.devicePixelRatio*document.documentElement.clientWidth;
                if (this.data.productImages[i].large.indexOf("cdn") === -1) {
                    str = '<img src="' + this.data.productImages[i].large +'"/>';
                    list.push({content:str});
                }else if (this.data.productImages[i].large.indexOf("@") !== -1) {
                    this.data.productImages[i].large = this.data.productImages[i].large.substring(0, this.data.productImages[i].large.indexOf("@"));
                    str = '<img src="' + this.data.productImages[i].large + '@' + Math.ceil(100 * screen / 100)+ 'w_' +Math.ceil(100 * screen / 100) + 'h_1e_1c_100Q' + '"/>';
                    list.push({content:str});
                }else{
                    str = '<img src="' + this.data.productImages[i].large + '@' + Math.ceil(100 * screen / 100)+ 'w_' +Math.ceil(100 * screen / 100) + 'h_1e_1c_100Q' + '"/>';
                    list.push({content:str});
                }
                //console.log(this.data.productImages.length);
            }
            $(".totalNum").html(this.data.productImages.length);

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
                onRenderComplete: function(index, ele) {
                    $(".pagenum").children('span').eq(0).text(index + 1);
                },
                onSlideChange: function(index, ele) {
                    $(".pagenum").children('span').eq(0).text(index + 1);
                },
                animateType: type  //zoomout,fade
            });
            var _this = this;
            this.touchesX = {};
            this.touchesY = {};
            this.elHeight = document.documentElement.clientWidth;
            S.on('slideStart',function(e){
                $('.islider-active img').css({'transition':'none'});
                _this.touchesX = e.touches[0].pageX;
                _this.touchesY = e.touches[0].pageY;
            });
            $(this.el).on('touchmove',function(e){
                var scale = e.touches[0].pageY - _this.touchesY;
                if(scale<50){
                    return
                }
                if(_this.touchesX === 0||Math.abs(e.touches[0].pageX-_this.touchesX)>50){
                    _this.touchesX = 0;
                    _this.touchesY = 0;
                    $('.islider-active img').css({'transform':'scale(1)','transition':'all 1.5s'})
                    S.play();
                    return
                }
                S.pause();
                var mult = scale/(_this.elHeight*2);
                mult>0.5?mult = 0.5:mult;
                $('.islider-active img').css('transform','scale('+(mult+1)+')');
            });
            S.on('slideEnd',function(e){
                console.log("slideEnd",e);
                _this.touchesX = 0;
                _this.touchesY = 0;
                $('.islider-active img').css({'transform':'scale(1)','transition':'all 1.5s'});
                S.play();
            })
        }
    };

    $.fn.prosilder = function(jsons,time,type,tNum) {
        var sg= new SilderGallery(document.getElementById(this.attr("id")), jsons,time,type,tNum);
        return sg.show();
    }


})();

/**
 * silder gallery end
 */