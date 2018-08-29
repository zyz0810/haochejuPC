
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
            for (var i = 0; i < this.data.productImages.length; i++) {
                list.push({content:'<img src="' + this.data.productImages[i].large + '"/>'});
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
                plugins: ['dot'],
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
            })
            S.on('slideEnd',function(e){
                console.log("slideEnd",e);
                _this.touchesX = 0;
                _this.touchesY = 0;
                $('.islider-active img').css({'transform':'scale(1)','transition':'all 1.5s'});
                S.play();
            })
        }
    };

    $.fn.productSilderDot = function(jsons,time,type) {
        var sg= new SilderGallery(document.getElementById(this.attr("id")), jsons,time,type);
        return sg.show();
    }


})();

/**
 * silder gallery end
 */