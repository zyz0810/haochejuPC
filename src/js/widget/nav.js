// 导航选中变色
;(function(){
    "use strict";
    setTimeout(function () {
        var str = window.location.href;
        var index = str .lastIndexOf("\/");
        str  = str .substring(index + 1, str .length);
        var aa = window.location.pathname;
        if(aa.indexOf("home/index.html")>-1){
            $(".nav #nav01").addClass('active').siblings().removeClass('active');
        }
        else if(aa.indexOf("article/index.html")>-1){
            $(".foot_menu2 #nav2").addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
            $(".foot_menu #nav2").addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        }
        else if(aa=='guide/index.html' || aa.indexOf('bizCircle/index.html')>-1){
            $(".foot_menu2 #nav3").addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
            $(".foot_menu #nav3").addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        }
        else if(aa.indexOf("nearby/index.html")>-1){
            $(".foot_menu2 #nav4").addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
            $(".foot_menu #nav4").addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        }
        else if(aa.indexOf("member/index.html")>-1 || str.indexOf("redPacket.html")>-1){
            $(".foot_menu2 #nav5").addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
            $(".foot_menu #nav5").addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        }
    },100)
})(window||this);