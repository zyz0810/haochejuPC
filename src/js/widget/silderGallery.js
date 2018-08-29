
/**
 * silder gallery begin  [{image:"322332",url:328932382939},{image:"8349",url:"23i32u3i2u"}]
 */
;(function(){
    "use strict";
    var time;
    var type;
    var pImage;
    var tNum;

    var SilderGallery = function (el,jsons,atime,atype,apImage,thNum) {
        this.data = jsons;
        this.el = el;
        time = atime;
        type = atype;
        pImage = apImage;
        tNum = thNum;
    };
    SilderGallery.prototype = {
        show:function () {
            var list = [];
            var str = '';
            if(pImage == "true"){
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].image.indexOf("cdn") === -1) {
                        return this.data[i].image;
                    }else if (this.data[i].image.indexOf("@") !== -1) {
                        this.data[i].image = this.data[i].image.substring(0, this.data[i].image.indexOf("@"));
                    }
                    var screen = window.devicePixelRatio*document.documentElement.clientWidth;
                    var _url = "";
                    if (tNum==0){
                        if (this.data[i].linkType == 'product') {
                            _url = '../../app/product/index.html?id=' + this.data[i].linkId;
                        } else if (this.data[i].linkType == 'tenant') {
                            _url = '../../app/tenant/index.html?id=' + this.data[i].linkId;
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
                        str += '<img src="' + this.data[i].image + '">';
                        if((i%1)==0 && i >= 0){
                            str += '</a>';
                            list.push({content:str});
                            str = "";
                        }
                        // list.push({content:this.data[i].image});
                        // console.log(pImage);
                    }else{
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
                        }else if (this.data[i].linkType == "special" && this.data[i].linkId == null) {
                            _url = 'javascript:special;';
                        }else if (this.data[i].linkType == "special" && this.data[i].linkId != null) {
                            _url = this.data[i].url;
                        }else if (this.data[i].linkType == "news") {
                            _url = 'javascript:news;';
                        } else {
                            _url = 'javascript:;';
                        }
                        if((i%1)==0){
                            str = '<a href="'+ _url +'">';
                        }
                        str += '<img src="' + this.data[i].image  + '@' + Math.ceil(100 * screen / 100)+ 'w_' + '1l"><div class="product_mask"></div>';
                        if((i%1)==0 && i >= 0){
                            str += '</a>';
                            list.push({content:str});
                            str = "";
                        }
                        // list.push({content:this.data[i].image});
                        // console.log(pImage);
                    }
                }
            }else if(pImage == "false"){
                for (var i = 0; i < this.data.productImages.length; i++) {
                    var screen = window.devicePixelRatio*document.documentElement.clientWidth;
                    if (this.data.productImages[i].large.indexOf("cdn") === -1) {
                        str = '<img src="' + this.data.productImages[i].large + '"/>';
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
                onRenderComplete: function(index, ele) {
                                $(".pagenum").children('span').eq(0).text(index + 1);
                            },
                onSlideChange: function(index, ele) {
                                $(".pagenum").children('span').eq(0).text(index + 1);
                            },
                animateType: type  //zoomout,fade
            });
        }
    };

    $.fn.silder = function(jsons,time,type,pImage,tNum) {
        var sg= new SilderGallery(document.getElementById(this.attr("id")), jsons,time,type,pImage,tNum);
        return sg.show();
    }


})();

/**
 * silder gallery end
 */