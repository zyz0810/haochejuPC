(function ($) {
    $.fn.panoramaLazyLoad = function (settings) {
        // http://photo-sphere-viewer.js.org/index.html
        var $this = $(this),
            _winScrollTop = 0,
            _winHeight = $(window).height();
        settings = $.extend({
                scrollEle: window,
                threshold: 50,
                navbar: [
                    'autorotate',
                    'gyroscope',
                    'fullscreen'
                ],//显示工具栏
                mousewheel: false,//滚轮缩放
                mousemove: false,//拖动移动
                gyroscope: true,//陀螺仪
                time_anim: false,
                default_long: Math.PI,
                default_lat: 0,
                autoload: false
            },
            settings || {}
        );
        registerPanorama();
        lazyPanorama();
        $(settings.scrollEle).on("scroll", function () {
            _winScrollTop = $(settings.scrollEle).scrollTop();
            throttle(lazyPanorama, 50)();
        });

        function registerPanorama() {
            $this.each(function (index, item) {
                if ($(item).attr('data-src') && !$(item)[0].PSV) {
                    item.PSV = new PhotoSphereViewer({
                        panorama: $(item).attr('data-src'), //图片
                        container: item,                    //容器
                        usexmpdata: false,
                        loading_img: '/weixin/images/static/tenant/panoramaLoading.gif',
                        navbar: settings.navbar,            //显示工具栏
                        mousewheel: settings.mousewheel,    //滚轮缩放
                        mousemove: settings.mousemove,      //拖动移动
                        gyroscope: settings.gyroscope,      //陀螺仪
                        time_anim: settings.time_anim,		//全景自动开始旋转之前的空闲时间（毫秒）。false停用。
                        default_long: settings.default_long,//初始经度，介于0和2π之间。
                        default_lat: settings.default_lat,  //初始纬度，在-π/ 2和π/ 2之间。
                        autoload: settings.autoload			//自动加载
                    }).on('ready', function () {
                        var self = this;
                        self.toggleNavbar(false);
                        if (!self.isGyroscopeEnabled() && window.DeviceOrientationEvent && settings.gyroscope) {
                            setTimeout(function () {
                                if (index === 0) {
                                    self.startGyroscopeControl();
                                    self.isGyroscope = true;
                                }
                                self.isShow = true;
                                self.isloading = false;
                            }, 10)
                        }
                    }).on("fullscreen-updated", function () {
                        if (this.isFullscreenEnabled()) {
                            if (!this.isGyroscopeEnabled()) {
                                this.startGyroscopeControl();
                            }
                            this.config.mousemove = true;
                            console.log(this)
                            this.toggleNavbar(true);
                        } else {
                            this.toggleNavbar(false);
                        }
                    });
                    $(item).on('click', function () {
                        location.href = '/weixin/bizCircle/index.html#panorama?panoramaImg=' + encodeURIComponent($(item).attr('data-src'));
                        // if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                        //     if(location.href.indexOf('bizCircle/index.html')>-1){
                        //         pageManager.go('panorama?panoramaImg=' + $(item).attr('data-src'));
                        //     }else{
                        //         location.href = '/weixin/bizCircle/index.html#panorama?panoramaImg=' + encodeURIComponent($(item).attr('data-src'));
                        //     }
                        //     return false;
                        // }
                        // if(!this.PSV.isFullscreenEnabled()){
                        //     this.PSV.toggleFullscreen();
                        // }
                    })
                } else if ($(item).attr('data-src') == '') {
                    $(item).css({"background-image":'url("../images/placeholder/noneimg.png")',"background-size":"cover"});
                }
            })
        }

        function lazyPanorama() {
            $this.each(function () {
                var $self = $(this);
                var _offsetTop = $self[0].offsetTop;
                var _offsetHeight = $self[0].offsetHeight;
                if ($self[0].PSV) {
                    if (_offsetTop - _winScrollTop < _winHeight) {
                        if (!$self[0].PSV.isShow && !$self[0].PSV.isloading) {
                            $self[0].PSV.load();
                            $self[0].PSV.isloading = true;
                        }
                    }
                    if (_offsetTop - _winScrollTop > 0 && _offsetTop - _winScrollTop < 1.2 * _offsetHeight) {
                        if (!$self[0].PSV.isShow && !$self[0].PSV.isloading) {
                            $self[0].PSV.load();
                            $self[0].PSV.isloading = true;
                        }
                        if ($self[0].PSV.isShow && !$self[0].PSV.isGyroscope) {
                            $self[0].PSV.startGyroscopeControl();
                            $self[0].PSV.isGyroscope = true;
                        }
                    } else if ($self[0].PSV.isGyroscope) {
                        $self[0].PSV.stopGyroscopeControl();
                        $self[0].PSV.isGyroscope = false;
                    }
                }
            });
        }

        function throttle(fn, delay) {
            var timer = null;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        }

        // function throttle(fn, delay, mustRunDelay) {
        // 	var timer = null;
        // 	var t_start;
        // 	return function () {
        // 		var context = this, args = arguments, t_curr = +new Date();
        // 		clearTimeout(timer);
        // 		if (!t_start) {
        // 			t_start = t_curr;
        // 		} if (t_curr - t_start >= mustRunDelay) {
        // 			fn.apply(context, args);
        // 			t_start = t_curr;
        // 		} else {
        // 			timer = setTimeout(function () {
        // 				fn.apply(context, args);
        // 			}, delay);
        // 		}
        // 	}
        // }
    };
})(Zepto);