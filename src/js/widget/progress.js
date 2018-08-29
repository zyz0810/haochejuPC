;(function(){
    "use strict";
    // 进度条，支持3种效果
    var progress = {
            show: function () {
                var progress = 0;
                var $progress = $('.js_progress');

                function next() {
                    $progress.css({width: progress + '%'});
                    progress = ++progress % 100;
                    setTimeout(next, 30);
                }

                next();
            }

    };
})(window||this);