// 顶部导航滑动效果   此组件要内页自已引入 div 结构
    function imgReset(src) {
        if (src && src.indexOf("cdn") === -1) {
            return src;
        }else if (src && src.indexOf("@") !== -1) {
            src = src.substring(0, src.indexOf("@"));
        }
    };
    var screen = window.devicePixelRatio*document.documentElement.clientWidth;
