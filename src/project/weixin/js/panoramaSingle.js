;(function ($) {
    $.fn.panoramaSingle = function (imgUrl,isJump) {
        var PSVDe = new PhotoSphereViewer({
            panorama: imgUrl,
            container: this[0],
            navbar: [
                'autorotate',
                'gyroscope',
                'fullscreen'
            ],//显示工具栏
            mousewheel: false,//滚轮缩放
            mousemove: false,//拖动移动
            loading_img: '/weixin/images/static/tenant/panoramaLoading.gif',
            gyroscope: true,//陀螺仪
            time_anim: false,
            move_speed: 2,
            anim_speed: '1rpm'
        }).on("fullscreen-updated", function () {
            if (!this.isGyroscopeEnabled()) {
                this.startGyroscopeControl();
            }
            if (this.isFullscreenEnabled()) {
                this.toggleNavbar(true);
            } else {
                this.toggleNavbar(false);
            }
        }).on('ready', function () {
            this.toggleNavbar(false);
            if (!PSVDe.isGyroscopeEnabled() && window.DeviceOrientationEvent) {
                setTimeout(function () {
                    PSVDe.startGyroscopeControl();
                }, 10)
            }
        });
        this.on('click', function (e) {
            if(isJump){
                return false;
            }
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                location.href = "/weixin/bizCircle/index.html#panorama?panoramaImg=" + encodeURIComponent(imgUrl);
                return false;
            }
            if(!PSVDe.isFullscreenEnabled()){
                PSVDe.toggleFullscreen();
            }
        });
        return PSVDe;
    };
})(Zepto);