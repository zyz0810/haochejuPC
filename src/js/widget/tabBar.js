// 选项卡    此组件要内页自已引入 div 结构
var tabBar = {
        bind: function () {
            var $div_li = $("div.vux-tab .vux-tab-item");
            var num = $div_li.length;
            var $bor = document.getElementById("bor");

            $div_li.on('click', function () {
                $(this).addClass("selected").siblings().removeClass("selected");
                var index = $div_li.index(this);
                var c = 100 / num;
                var a = index * c;
                var b = 100 - c - a;
                $bor.style.left = a + "%";
                $bor.style.right = b + "%";
                $("div.vux-swiper-item")
                    .eq(index).show()
                    .siblings().hide();
            })
        }
    };

