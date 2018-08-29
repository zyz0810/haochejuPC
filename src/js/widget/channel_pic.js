/**
 * silder gallery begin
 */
;(function(){
    "use strict";
    var iNum;
    var rNum;
    var tNum;
    var SilderProductChannel = function (el,jsons,identNum,remNum,thNum) {
        this.data = jsons;
        this.el = el;
        iNum = identNum;
        rNum = remNum;
        tNum = thNum;
    };
    SilderProductChannel.prototype = {
        show:function () {
            var list = [];
            var str = '';
            for (var i = 0; i < this.data.length; i++) {



                if (tNum==0){
                    if ((i%rNum)==0) {
                        str = '<div class="channel">';
                    }
                    str += '<div class="channel__item"><a href="../channel/index.html?id='+ this.data[i].id +'" data-id="'+ this.data[i].id +'"> ';
                    str += '<p><img src="' + this.data[i].image + '">' +
                        '<span class="Ftext">' + this.data[i].name + '</span>'+
                        '</p>';
                    str += '</a></div>';
                    if (((i%rNum)==iNum) && (i>0)) {
                        str += '</div>';
                        list.push({content:str});
                        str = "";
                    }
                }else if(tNum=='ztb'){
                    if ((i%rNum)==0) {
                        str = '<div class="channel">';
                    }


                    if(this.data[i].url == "" || this.data[i].url == null){
                        str += '<div class="channel__item"><a href="../channel/index.html?id='+ this.data[i].id +'" data-id="'+ this.data[i].id +'"> ';
                    }else{
                        str += '<div class="channel__item"><a href="'+ this.data[i].url +'" data-id="'+ this.data[i].id +'">';
                    }
                    str += '<p class="tc"><img src="' + this.data[i].image + '">' +
                        '<span class="f12 tc clr_mediumGray">' + this.data[i].name + '</span>'+
                        '</p>';

                    str += '</a></div>';
                    if (((i%rNum)==iNum) && (i>0)) {
                        str += '</div>';
                        list.push({content:str});
                        str = "";
                    }
                }else if(tNum==6){
                    if ((i%rNum)==0) {
                        str = '<div class="channel">';
                    }

                    if(this.data[i].url == "" || this.data[i].url == null){
                        str += '<div class="channel__item"><a href="../channel/index.html?id='+ this.data[i].id +'" data-id="'+ this.data[i].id +'"> ';
                    }else{
                        str += '<div class="channel__item"><a href="'+ this.data[i].url +'" data-id="'+ this.data[i].id +'"> ';
                    }

                    str += '<p><img src="' + this.data[i].image + '">' +
                        '<span class="Ftext">' + this.data[i].name + '</span>'+
                        '</p>';
                    str += '</a></div>';
                    if (((i%rNum)==iNum) && (i>0)) {
                        str += '</div>';
                        list.push({content:str});
                        str = "";
                    }
                }else if(tNum==10){
                    if ((i%rNum)==0) {
                        str = '<div class="channel">';
                    }

                    if (this.data[i].image.indexOf("cdn") === -1) {
                        return this.data[i].image;
                    }else if (this.data[i].image.indexOf("@") !== -1) {
                        this.data[i].image = this.data[i].image.substring(0, this.data[i].image.indexOf("@"));
                    }
                    var screen = window.devicePixelRatio*document.documentElement.clientWidth;

                    if(this.data[i].url == "" || this.data[i].url == null){
                        str += '<div class="channel__item"><a href="../channel/index.html?id='+ this.data[i].id +'" data-id="'+ this.data[i].id +'"> ';
                    }else{
                        str += '<div class="channel__item"><a href="'+ this.data[i].url +'" data-id="'+ this.data[i].id +'">';
                    }
                    str += '<p class="tc"><img src="' + this.data[i].image + '@' + Math.ceil(13.6 * screen / 100)+ 'w_' +Math.ceil(13.6 * screen / 100) + 'h_1e_1c_100Q">' +
                        '<span class="f12 tc clr_mediumGray">' + this.data[i].name + '</span>'+
                        '</p>';

                    str += '</a></div>';
                    if (((i%rNum)==iNum) && (i>0)) {
                        str += '</div>';
                        list.push({content:str});
                        str = "";
                    }
                }else if(tNum==12){
                    if ((i%rNum)==0) {
                        str = '<div class="channel no_img">';
                    }

                    if(this.data[i].url == "" || this.data[i].url == null){
                        str += '<div class="channel__item"><a href="../channel/index.html?id='+ this.data[i].id +'" data-id="'+ this.data[i].id +'"> ';
                    }else{
                        str += '<div class="channel__item"><a href="'+ this.data[i].url +'" data-id="'+ this.data[i].id +'"> ';
                    }
                    str +='<p><span class="f12 tc clr_mediumGray">' + this.data[i].name + '</span></p>';

                    str += '</a></div>';
                    if (((i%rNum)==iNum) && (i>0)) {
                        str += '</div>';
                        list.push({content:str});
                        str = "";
                    }
                }else if(tNum==8){
                    if ((i%rNum)==0) {
                        str = '<div class="channel">';
                    }
                    str += '<div class="channel__item"><a href="../product/index.html?id='+ this.data[i].id +'" data-id="'+ this.data[i].id +'"> ';
                    str += '<p><img src="' + this.data[i].thumbnail + '"></p>';
                    str += '<p class="f14">' +
                        '<span>￥' + this.data[i].price;

                    if(this.data[i].marketPrice == this.data[i].price){
                    }else if(this.data[i].marketPrice == 0){
                        // $('.marketPrice_pic').eq(i).html('');
                    }else{
                        str +=   '<i class="f12 marketPrice_pic">￥' + this.data[i].marketPrice ;
                    }

                    str +=    '</i></span>' +
                        '<span class="f12">好评度' + this.data[i].positivePercent + '%</span>' +
                        '</p>';
                    str += '</a></div>';
                    if (((i%rNum)==iNum) && (i>0)) {
                        str += '</div><div class="kong"></div>';
                        list.push({content:str});
                        str = "";
                    }
                }
                else {
                    if ((i%rNum)==0) {
                        str = '<div class="channel">';
                    }
                    str += '<div class="channel__item"><a href="../product/details.jhtml?id='+ this.data[i].id +'" data-id="'+ this.data[i].id +'"> ';
                    str += '<p><img src="' + this.data[i].thumbnail + '"></p>';
                    str += '<p class="f14">' +
                        '<span>￥' + this.data[i].price;

                    if(this.data[i].marketPrice == this.data[i].price){
                    }else if(this.data[i].marketPrice == 0){
                        // $('.marketPrice_pic').eq(i).html('');
                    }else{
                        str +=   '<i class="f12 marketPrice_pic">￥' + this.data[i].marketPrice ;
                    }

                        str +=    '</i></span>' +
                        '<span class="f12">好评度' + this.data[i].positivePercent + '%</span>' +
                        '</p>';
                    str += '</a></div>';
                    if (((i%rNum)==iNum) && (i>0)) {
                        str += '</div><div class="kong"></div>';
                        list.push({content:str});
                        str = "";
                    }
                }
                }
                if (str!="") {
                    str += '</div><div class="kong"></div>';
                    list.push({content:str});
                }
            var S = new iSlider({
                data: list,
                dom: this.el,
                // isOverspread: true,
                //isVertical: true,
                isVertical: false,
                isLooping: true,
                isAutoplay: true,
                fixPage: false,
                animateTime: 2000,
                animateType: 'card'
            });
        }
    };
    $.fn.silderProductChannel = function(jsons,iNum,rNum,tNum) {
        var sg= new SilderProductChannel(document.getElementById(this.attr("id")), jsons,iNum,rNum,tNum);
        return sg.show();
    }

})();

/**
 * silder gallery end
 */