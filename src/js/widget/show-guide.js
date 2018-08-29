
/**
 * silder gallery begin  [{image:"322332",url:328932382939},{image:"8349",url:"23i32u3i2u"}]
 */
;(function(){
    "use strict";
    var time;
    var type;
    //var pImage;

    var showG = function (el,jsons,atype) {
        this.data = jsons;
        this.el = el;
        //time = atime;
        type = atype;
        //pImage = apImage;
    };
    showG.prototype = {
        show:function () {
            var list = [];
            for (var i = 0; i < this.data.length; i++) {

                var str='';
                str +='<div class="imgx"><a href="../guide/home.html?id='+this.data[i].employeeId+'&mid='+this.data[i].id+'&who=other&userType=guide">';
                if(this.data[i].headImg == null){
                    str +='<img src="../images/placeholder/user.png" >';
                }else {
                    if (this.data[i].headImg.indexOf("cdn") === -1) {
                        str +='<img src="'+ this.data[i].headImg +'" >';
                    }else if (this.data[i].headImg.indexOf("@") !== -1) {
                        this.data[i].headImg = this.data[i].headImg.substring(0, this.data[i].headImg.indexOf("@"));
                        var screen = window.devicePixelRatio*document.documentElement.clientWidth;
                        str +='<img src="'+ this.data[i].headImg +"@" + Math.ceil(100 * screen / 100) + "w_" + Math.ceil(93 * screen / 100) + 'h_1e_1c_100Q" >';
                    }else if(this.data[i].headImg.indexOf("@") === -1){
                        var screen = window.devicePixelRatio*document.documentElement.clientWidth;
                        str +='<img src="'+ this.data[i].headImg +"@" + Math.ceil(100 * screen / 100) + "w_" + Math.ceil(93 * screen / 100) + 'h_1e_1c_100Q" >';
                    }
                }

                str +='<p class="Fans">粉丝:'+ this.data[i].fansCount +'</p>';

                if(this.data[i].nickName == null){
                    str +='<p class="name">'+ this.data[i].name;
                }else{
                    str +='<p class="name">'+ this.data[i].nickName;
                }

                if(this.data[i].constellation==null){

                    str +='</p>';
                }else{

                    str +='('+ this.data[i].constellation +')</p>';
                }

                if(this.data[i].authStatus == "success"){
                    str +='<p class="tc bigv">v</p></div>';
                }else{
                    str +='<p class="tc bigr">v</p></div>';
                }
                //添加标签
                str +='<div class="tad tagNone" style="margin: 10px 0 0 0;">';
                for(var j=0;j<this.data[i].tags.length;j++){
                    str +='<p class="f12" style="padding: 4px 6px;">'+ this.data[i].tags[j].name +'</p>';
                }
                str +='</div>';

                str +='</a></div>';
                list.push({content:str});
            }


            var U = new iSlider(document.getElementById('guides'), list, {
                isLooping: 1,
                isOverspread: 1,
                //isAutoplay: 1,
                animateTime: 800,
                fixPage: false,
                animateType: type,
                onSlideChanged:function () {
                    $('#guides ul li').each(function(){
                        if($(this).hasClass('islider-active')){
                            $(this).find('.Fans').css('display','block');
                            $(this).find('.name').css('display','block');
                            $(this).find('.bigv').css('display','block');
                            $(this).find('.tad').css('display','block');
                        }else{
                            $(this).find('.Fans').css('display','none');
                            $(this).find('.name').css('display','none');
                            $(this).find('.bigv').css('display','none');
                            $(this).find('.tad').css('display','none');
                        }
                    });
                }
            });
        }
    };
    $.fn.showGuide = function(jsons,type) {
        var iu = new showG(document.getElementById(this.attr("id")),jsons,type);
        return iu.show();
    }
})();

/**
 *
 * silder gallery end
 */

