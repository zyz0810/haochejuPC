jQuery(".nav").slide({
    type: "menu", //效果类型
    titCell: ".m", // 鼠标触发对象
    targetCell: ".sub", // 效果对象，必须被titCell包含
    effect: "slideDown",//下拉效果
    delayTime: 300, // 效果时间
    triggerTime: 0, //鼠标延迟触发时间
    returnDefault: true  //返回默认状态
});
jQuery(".fullSlide").slide({
    titCell: ".hd li",
    mainCell: ".bd ul",
    effect: "fold",
    autoPlay: true,
    switchLoad: "_src"
});

var navActive = $('.navBar .m.on'),
    navLine = $('.navBar .line');
if (navActive.length > 0) {
    var navLineOffset = navActive[0].getBoundingClientRect();
    navLine.css({
        'left': navLineOffset.left + 10,
        'top': navLineOffset.top + navLineOffset.height,
        'width': navLineOffset.width - 20
    })
}
$('.navBar').hover(function () {
    navLine.show();
}, function () {
    navLine.css({
        'display': 'none',
        'left': navActive[0].getBoundingClientRect().left + 10
    });
});
$('.navBar .m').hover(function () {
    var hoverOffect = $(this)[0].getBoundingClientRect();
    navLine.css({
        'left': hoverOffect.left,
        'width': hoverOffect.width
    })
});
$('.nav .line').on('mouseenter mouseover mouseout', function () {
    $('.nav .m.on').trigger('mouseover');
});
