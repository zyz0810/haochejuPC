/**
 * 序列化星级
 * 根据固定html结构中元素提供的数字，把星星级别化
 */
;
(function($) {
    $.fn.starLevelize = function() {
        return this.each(function(index, ele) {
            var $ele = $(ele);
            //get flag
            if ($ele.data("starlevelized")) {
                return;
            }
            var starnum = parseFloat($ele.data("starnum")).toFixed(1);
            //var starnum_int = parseInt(starnum, 10); //3
            //3个fullstar 1个half star 1个empty star
            if (starnum <= 5) {
                $ele.children().eq(starnum).addClass('orange').removeClass('clr-gray01');
            }
            for (var i = starnum + 1; i < 5; i++) {
                $ele.children().eq(i).addClass('clr-gray01').removeClass('orange');
            }

            //set flag
            $ele.data("starlevelized", true);
        });
    };
})(Zepto);
$(".starlevels").starLevelize();