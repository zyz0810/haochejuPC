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
        else if(aa.indexOf("news/index.html")>-1 || aa.indexOf("news/view.html")>-1){
            $(".nav #nav03").addClass('active').siblings().removeClass('active');
        }
        else if(aa.indexOf("personnel/index.html")>-1 || aa.indexOf("personnel/view.html")>-1){
            $(".nav #nav02").addClass('active').siblings().removeClass('active');
        }
        else if(aa.indexOf("about/index.html")>-1){
            $(".nav #nav04").addClass('active').siblings().removeClass('active');
        }
    },100)
})(window||this);