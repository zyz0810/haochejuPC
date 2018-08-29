// 常用方法1 页内 tips 提示 2秒后关闭
var tips = {
    show: function (msg) {
        var $tooltips = $('.js_tooltips');
        if ($tooltips.css('display') != 'none') {
            return;
        }
        $tooltips.html(msg);
        // 如果有`animation`, `position: fixed`不生效
        $('.page.cell').removeClass('slideIn');
        $tooltips.css('display', 'block');
        setTimeout(function () {
            $tooltips.css('display', 'none');
        }, 2000);
    }

};

// 常用方法1 闪屏 toast 提示，2秒后关闭
var toast = {
    t:null,
    show: function (msg,time) {
        var $toast = $('#toast');
        if(this.t){
            clearTimeout(this.t);
        }
        if (msg) {
            var $toastContent = $('#toast .weui-toast__content');
            $toastContent.html(msg);
        }
        $toast.fadeIn(100);
        if(time){
            toast.t=setTimeout(function () {
                $toast.fadeOut(100);
            }, time);
        }else{
            toast.t=setTimeout(function () {
                $toast.fadeOut(100);
            }, 2000);
        }

    },
    success: function (msg,time) {
        var $toast = $('#toastSuc');
        if(this.t){
            clearTimeout(this.t);
        }
        if (msg) {
            var $toastContent = $('#toastSuc .weui-toast__content');
            $toastContent.html(msg);
        }
        $toast.fadeIn(100);
        if(time){
            toast.t=setTimeout(function () {
                $toast.fadeOut(100);
            }, time);
        }else{
            toast.t=setTimeout(function () {
                $toast.fadeOut(100);
            }, 2000);
        }

    },
    loading: function () {
        var $toast = $('#loadingToast');
        if ($toast.css('display') != 'none') {
            return;
        }
        $toast.fadeIn(100);
        setTimeout(function () {
            $toast.fadeOut(100);
        }, 2000);
    },
    loading2: function (title) {
        var $toast = $('#loadingToast');
        var $content=$('.weui-toast__content');
        if ($toast.css('display') != 'none') {
            return;
        }
        if(title){
            $content.html(title);
        }
        $toast.fadeIn(100);
        setTimeout(function () {
            $toast.fadeOut(100);
        }, 10000);
    },
    loadingSelf: function (time,title,turn) {
        var $toast = $('#loadingToast');
        var $content=$('.weui-toast__content');
        if ($toast.css('display') != 'none') {
            return;
        }
        $content.html(title);
        $toast.fadeIn(100);
        setTimeout(function () {
            $toast.fadeOut(100);
            if(turn){
                turn();
            }
        }, time);
    },
    close:function () {
        if(this.t){
            clearTimeout(this.t);
        }
        var $toast = $('#toast');
        $toast.fadeOut(100);
    },

    closeLoading:function () {
        if(this.t){
            clearTimeout(this.t);
        }
        var $toast = $('#loadingToast');
        $toast.fadeOut(100);
    }

};

