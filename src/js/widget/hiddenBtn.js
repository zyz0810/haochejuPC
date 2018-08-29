/**
 * Created by Administrator on 2017/6/16 0016.
 */

// 解决安卓input输入时按钮上移动

var hiddenBtn = {
    bind: function () {
        $(document).ready(function () {
            var h=$(window).height();
            $(window).resize(function() {
                if($(window).height()<h){
                    $('.weui-btn-hidden').hide();
                }
                if($(window).height()>=h){
                    $('.weui-btn-hidden').show();
                }
            });
        });
    }
};


