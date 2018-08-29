// 下弹式，选择列表 此组件要内页自已引入 div 结构
var actionsheet = {
    show: function (obj) {
        var $mask = $(obj).find(".actionsheet__mask");
        var $weuiActionsheet = $(obj).find(".weui-actionsheet");
        var $actionsheetCancel=$(obj).find(".cancel");
        function hideActionSheet() {
            $weuiActionsheet.removeClass('weui-actionsheet_toggle');
            $mask.removeClass('actionsheet__mask_show');
            $weuiActionsheet.on('transitionend', function () {
                $mask.css('display', 'none');
            }).on('webkitTransitionEnd', function () {
                $mask.css('display', 'none');
            })
        }
        $weuiActionsheet.addClass('weui-actionsheet_toggle');
        $mask.show().focus().addClass('actionsheet__mask_show').on('click', function () {
            hideActionSheet();
        });
        $actionsheetCancel.on('click', function () {
            hideActionSheet();
        });
        $weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');
    },
    close:function (obj) {
        var $mask = $(obj).find(".actionsheet__mask");
        var $weuiActionsheet = $(obj).find(".weui-actionsheet");
        function hideActionSheet() {
            $weuiActionsheet.removeClass('weui-actionsheet_toggle');
            $mask.removeClass('actionsheet__mask_show');
            $weuiActionsheet.on('transitionend', function () {
                $mask.css('display', 'none');
            }).on('webkitTransitionEnd', function () {
                $mask.css('display', 'none');
            })
        }
        hideActionSheet();

    }

};

$.fn.actionsheet = function () {
    actionsheet.show(this);
};

$.fn.actionsheetClose = function () {
    actionsheet.close(this);
};