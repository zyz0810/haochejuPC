var baseURL = "http://dev.tiaohuo.com";
function togglelogin(){
    if ($('#login_dialog').css('display') == 'none') {
        if ($('#register').css('display') == 'block') {
            $('#register').hide(500);
        }
        $('#login_dialog').show();
    } else {
        $('#login_dialog').hide();
    }
}
function togglereg() {
    if ($('#register').css('display') == 'none') {
        if ($('#login_dialog').css('display') == 'block') {
            $('#login_dialog').hide();
        }
        $("#imgAuthCode").attr("src", baseURL+"/common/captcha.jhtml?captchaId=${captchaId}&date="+new Date());
        $('#register').show(500);
    } else {
        $('#register').hide(500);
    }
}
$(function () {

    $(document).on('click', '.login', togglelogin)
    $(document).on('click', '.register', togglereg)
})


// <!--登录js验证-->
$().ready(function () {
    $("#forget_captcha_img").click(function () {
        //======兼容IE========//
        $("#forget_captcha_img").attr("src", baseURL+"/common/captcha.jhtml?captchaId=${captchaId}&date=" +(+new Date()));
    });
});
//控制登录，注册，忘记密码的首先和隐藏
var login_type = "account";
function login_method(type, obj) {
    if (type == "account") {
        login_type = "account";
        $("#account_login").show();
        $("#phone_login").hide();
        $("#forget_password").hide();
        $("#reset_password").hide();
    } else if (type == "phone") {
        login_type = "phone";
        $("#account_login").hide();
        $("#phone_login").show();
        $("#forget_password").hide();
        $("#reset_password").hide();
    } else if (type == "forget") {
        $("#account_login").hide();
        $("#phone_login").hide();
        $("#forget_password").show();
        $("#reset_password").hide();
        //======兼容IE========//
        $("#forget_captcha_img").attr("src", baseURL+"/common/captcha.jhtml?captchaId=${captchaId}&date=" + (+new Date()));
    } else if (type == "reset") {
        $("#account_login").hide();
        $("#phone_login").hide();
        $("#forget_password").hide();
        $("#reset_password").show();
    }
}
//60秒倒计时
var count = 60, ii;
function refreshTime() {
    count = count - 1;
    if (count == 0) {
        $(".get-btn").html("获取验证码");
        count = 60;
        clearInterval(ii);
        return false;
    }
    $(".get-btn").html(count + "秒后重新获取");
}
//获取验证码
function get_code(type) {
    var type_url = "", data = "";
    if (count != 60) {
        return;
    }
    if (type == 'phone_login') {
        if ($("#login_phone").val().trim() == "") {
            $.message('warn', "请先填写手机号码");
            return false;
        }
        if (!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test($("#login_phone").val().trim()))) {
            $.message('warn', "请确认您的号码是否正确");
            return false;
        }
        type_url = baseURL + "/store/login/send_mobile.jhtml";
        data = {
            mobile: $("#login_phone").val().trim()
        };
    } else if (type == 'forget_password') {
        if ($("#forget_username").val().trim() == "") {
            $.message('warn', "请先填写手机号码");
            return false;
        }
        if ($("#forget_img_captcha").val().trim() == "") {
            $.message('warn', "验证码不能为空");
            return false;
        }
        if (!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test($("#forget_username").val().trim()))) {
            $.message('warn', "请确认您的号码是否正确");
            return false;
        }
        type_url = baseURL + "/store/login/send.jhtml";
        data = {
            username: $("#forget_username").val().trim(),
            captchaId: "${captchaId}",
            captcha: $("#forget_img_captcha").val().trim()
        };
        console.log(data);
    }
    $.ajax({
        url: type_url,
        data: data,
        type: "POST",
        dataType: "json",
        cache: false,
        success: function (message) {
            $.message(message);
            if (message.type == "success") {
                ii = setInterval(refreshTime, 1 * 1000);
                $(".get-btn").html(count + "秒后重新获取");
            } else {
                //======兼容IE========//
                $("#forget_captcha_img").attr("src", baseURL+"/common/captcha.jhtml?captchaId=${captchaId}&date=" +(+new Date()));
            }
        }
    });
}
//点击下一步
function go_reset() {
    if ($("#forget_phone_captcha").val().trim() == "") {
        $.message('warn', "验证码不能为空");
        return false;
    }
    $.ajax({
        url: baseURL + "/store/login/check_captcha.jhtml",
        type: "post",
        data: {
            username: $("#forget_username").val().trim(),
            securityCode: $("#forget_phone_captcha").val().trim()
        },
        dataType: "json",
        success: function (message) {
            $.message(message);
            if (message.type == "success") {
                login_method("reset");
            } else {
                login_method("forget");
            }
        }
    });
}
//重置密码提交
function reset_password() {
    var _mobile = $("#forget_username").val().trim();
    var _npassword = $("#new_password").val().trim();
    var _enpassword = $("#re_new_password").val().trim();
    if (_npassword == "" || _npassword == null) {
        $.message("warn", "请输入新密码");
        return;
    }
    if (_enpassword == "" || _enpassword == null) {
        $.message("warn", "请再次输入新密码");
        return;
    }

    if (_npassword != _enpassword) {
        $.message("warn", "两次密码不一致，请重新确认！");
        return;
    }
    $.ajax({
        url: baseURL+"/common/public_key.jhtml",
        type: "POST",
        data: { local: true },
        dataType: "json",
        cache: false,
        success: function (data) {
            var rsaKey = new RSAKey();
            rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
            var enPassword = hex2b64(rsaKey.encrypt(_npassword));
            $.ajax({
                url: baseURL+"/store/login/reset.jhtml",
                type: "POST",
                data: {
                    mobile: _mobile,
                    newpassword: enPassword,
                    securityCode: $("#forget_phone_captcha").val().trim()
                },
                dataType: "json",
                cache: false,
                success: function (message) {
                    $.message(message.type, message.content);
                    if (message.type == 'success') {
                        login_method("account");
                    }
                }
            });
        }
    });
}
//账户登录提交
var _i = 0;
function account_submit() {
    if (_i != 0) {
        return;
    }
    if ($("#account_username").val().trim() == "") {
        $("#account_username").next().text("必填");
        return;
    }
    if ($("#account_password").val().trim() == "") {
        $('#account_password').next().text("必填");
        return;
    }
    _i = 1;
    $("#account_login_btn").val("正在为您跳转");
    $.ajax({
        url: baseURL + "/common/public_key.jhtml",
        type: "POST",
        data: { local: true },
        dataType: "json",
        cache: false,
        success: function (data) {
            var rsaKey = new RSAKey();
            rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
            var enPassword = hex2b64(rsaKey.encrypt($("#account_password").val()));
            console.log(data)
            $.ajax({
                url: baseURL + "/store/login/submit.jhtml",
                type: "POST",
                data: {
                    username: $("#account_username").val(),
                    enPassword: enPassword
                },
                dataType: "json",
                cache: false,
                success: function (message) {
                    console.log(message)
                    if (message.type == "success") {
                        $.message("success", "登录成功！正在为您跳转....");
                        setTimeout(function () {
                            location.href = baseURL + "/store/member/index.jhtml";
                        }, 1500);

                        if ($("#isRememberUsername").prop("checked")) {
                            addCookie("memberUsername", $("#account_username").val(), { expires: 7 * 24 * 60 * 60 });
                        } else {
                            removeCookie("memberUsername");
                        }
                    } else {
                        $.message(message);
                        _i = 0;
                        $("#account_login_btn").val("登录");
                    }
                }
            });
        },complete:function(data){
            console.log(data);
        }
    });
}
//手机登录提交
function phone_submit() {
    if ($("#login_phone").val().trim() == "") {
        $('#login_phone').next().text("必填");
        return;
    }
    if ($("#login_captcha").val().trim() == "") {
        $('#login_captcha').next().next().text("必填");
        return;
    }
    $("#phone_login_btn").val("正在为您跳转");
    $.ajax({
        url: baseURL + "/store/login/phone_login_submit.jhtml",
        type: "POST",
        data: {
            mobile: $("#login_phone").val().trim(),
            captcha: $("#login_captcha").val().trim()
        },
        dataType: "json",
        cache: false,
        success: function (message) {
            $.message(message.type, message.content);
            if (message.type == "success") {
                setTimeout(function () {
                    location.href = baseURL + "/store/member/index.jhtml";
                }, 1500);

                if ($("#isRememberUsername").prop("checked")) {
                    addCookie("memberUsername", $("#login_phone").val(), { expires: 7 * 24 * 60 * 60 });
                } else {
                    removeCookie("memberUsername");
                }
            } else {
                $("#phone_login_btn").val("登录");
            }
        },complete:function(data){
            console.log(data);
        }
    });
}
//按enter键登录
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // enter 键
        if (login_type == "account") {
            account_submit();
        } else {
            phone_submit();
        }
    }
};

//注册
var url_list;
var timeout;
var $communityId;
var $citySelect;
var $areaId;
$(function () {
    var $inputForm = $("#inputForm");
    $areaId = $("#areaId");
    $communityId = $("#communityId");

    //=====验证码切换=======//

    $("#imgAuthCode").click(function () {
        //======兼容IE========//
        $("#imgAuthCode").attr("src", baseURL+"/common/captcha.jhtml?captchaId=${captchaId}&date=" +(+new Date()));
    });
    //======获取手机验证码========//
    $("#getPhoneCode").click(function () {
        if ($("#form-phone").val().trim() == '') {
            $.message("error", " 请先填写手机号");
            return false;
        }
        if (!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test($("#form-phone").val()))) {
            $.message("error", "手机号码不符合");
            return;
        }
        if ($("#authCode").val().trim() == '') {
            $.message("error", " 请先填写验证码");
            return false;
        }
        $.ajax({
            url: baseURL + "/store/register/send.jhtml",
            data: {
                username: $("#form-phone").val(),
                captchaId: "${captchaId}",
                captcha: $("#authCode").val()
            },
            dataType: "json",
            type: "post",
            success: function (data) {
                $.message(data.type, data.content);
                if (data.type == 'error') {
                    //======兼容IE========//
                    $("#imgAuthCode").attr("src",baseURL+"/common/captcha.jhtml?captchaId=${captchaId}&date=" +(+new Date()));
                }
                console.log("sr: " + data);
            }
        });
    });

    //======注册提交======//
    $("#submit_register").click(function () {
        if ($("#form-phone").val().trim() == '') {
            $.message("error", " 请先填写手机号");
            return false;
        }
        if ($("#form-storeName").val().trim() == '') {
            $.message("error", "店铺名不能为空");
            return;
        }
        if ($("#form-legalPerson").val() == "") {
            $.message("error", "企业法人不能为空");
            return;
        }
        if ($("#form-fullAddress").val() == "") {
            $.message("error", "请填写详细地址");
            return;
        }
        if (url_list == "") {
            $.message("error", "请填写营业执照");
            return;
        }

        $.ajax({
            url: baseURL + "/store/register/register_company.jhtml",
            type: "POST",
            data: {
                mobile: $("#form-phone").val().trim(),
                securityCode: $("#phoneCode").val().trim(),
                name: $("#form-storeName").val().trim(),
                address: $("#form-fullAddress").val().trim(),
                licensePhoto: url_list,
                linkman: $("#form-legalPerson").val().trim(),
                tenantType: $("[name='tenantType']").val(),
                areaId: $("#areaId").val().trim()
            },
            dataType: "json",
            cache: false,
            success: function (message) {
                if (message.type == "success") {
                    $.message("success", "注册成功，等待审核中...");
                    SongRan();
                    login_method("account");
                } else {
                    $.message(message);
                }
            }
        });

    });
});
//图片预览
// function getFullPath() {
//     var fileImg = $("#img1");
//     var explorer = navigator.userAgent;
//     var imgSrc = document.getElementById('headImg').value;
//     fileImg.attr({'width':'168','height':'120'})
//     if (explorer.indexOf('MSIE') >= 0) {
//         if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(imgSrc)) {
//             console.log(imgSrc);
//             imgSrc = "";
//             fileImg.attr("src","/img/default.png");
//             return false;
//         }else{
//             fileImg[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + imgSrc + "\")";
//             // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
//             fileImg[0].src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
//             fileImg.attr("src",imgSrc);
//         }
//     }else{
//         if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(imgSrc)) {
//             console.log(imgSrc);
//             imgSrc = "";
//             fileImg.attr("src","/img/default.png");
//             return false;
//         }else{
//             var file =document.getElementById('headImg').files[0];
//             var url = URL.createObjectURL(file);
//             fileImg.attr("src",url);
//         }
//     }
//
//     var file = document.getElementById('headImg');
//     var fileList = file.files;
//     var img = document.getElementById("img1");
//     for (var i = 0; i < fileList.length; i++) {
//         if (file.files[0]) {
//             img.style.display = 'block';
//             img.style.width = '168px';
//             img.style.height = '120px';
//             if (window.createObjectURL != undefined) { // basic
//                 img.src = window.createObjectURL(file.files[0]);
//             } else if (window.URL != undefined) { // mozilla(firefox)
//                 img.src = window.URL.createObjectURL(file.files[0]);
//             } else if (window.webkitURL != undefined) { // webkit or chrome
//                 img.src = window.webkitURL.createObjectURL(file.files[0]);
//             }
//         }
//         var f_i = new FormData();
//         f_i.append("file", fileList[i])
//         $.ajax({
//             url: baseURL + "/app/file/upload_image.jhtml",
//             type: "post",
//             data: f_i,
//             async: false,
//             processData: false,
//             contentType: false,
//             success: function (data) {
//                 url_list = data.data;
//             }
//         });
//     }
// }
$(function(){

    var uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../images/static/Uploader.swf',
        // 文件接收服务端。
        server: baseURL+'/app/file/upload_image.jhtml',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker',
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });
    uploader.on('fileQueued', function (file) {
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +
                '<div class="info">' + file.name + '</div>' +
                '</div>'
            ),
            $img = $li.find('img');
        // $list为容器jQuery实例
        $('#fileList').append($li);
        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $img.attr('src', src);
            $('#img1').remove();
        }, 168, 120);
    });
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>')
                .appendTo($li)
                .find('span');
        }
        $percent.css('width', percentage * 100 + '%');
    });
// 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).addClass('upload-state-done');
    });
// 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id),
            $error = $li.find('div.error');
        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }
        $error.text('上传失败，请使用ie10以上现代浏览器重试');
    });
// 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });
})


$(document).ready(function () {


    //输入框激活焦点、移除焦点
    jQuery.focusblur = function (focusid) {
        var focusblurid = $(focusid);
        var defval = focusblurid.val();
        focusblurid.focus(function () {
            var thisval = $(this).val();
            if (thisval == defval) {
                $(this).val("");
            }
        });
        focusblurid.blur(function () {
            var thisval = $(this).val();
            if (thisval == "") {
                $(this).val(defval);
            }
        });

    };
    /*下面是调用方法*/
    $.focusblur("#form-phone");

    //输入框激活焦点、溢出焦点的渐变特效
    //输入用户名
    if ($("#form-account").val()) {
        $("#form-account").prev().fadeOut();
    };
    $("#form-account").focus(function () {
        $(this).prev().fadeOut();
        $(".item-regName-wrap .input-tip span").show();
    });
    $("#form-account").blur(function () {
        if (!$("#form-account").val()) {
            $(this).prev().fadeIn();
            $(".item-regName-wrap .input-tip span").hide();
        } else {
            $(".item-regName-wrap .input-tip span").hide();
        };
    });
    //输入手机号码
    if ($("#form-phone").val()) {
        $("#form-phone").prev().fadeOut();
    };
    $("#form-phone").focus(function () {
        $(this).prev().fadeOut();
        $(".item-phone-wrap .input-tip span").show();
    });
    $("#form-phone").blur(function () {
        if (!$("#form-phone").val()) {
            $(this).prev().fadeIn();
            $(".item-phone-wrap .input-tip span").hide();
        } else {
            $(".item-phone-wrap .input-tip span").hide();
        };
    });
    //输入密码
    if ($("#password").val()) {
        $("#password").prev().fadeOut();
    };
    $("#password").focus(function () {
        $(this).prev().fadeOut();
        $(".item-pwd-wrap .input-tip span").show();
    });
    $("#password").blur(function () {
        if (!$("#password").val()) {
            $(this).prev().fadeIn();
            $(".item-pwd-wrap .input-tip span").hide();
        } else {
            $(".item-pwd-wrap .input-tip span").hide();
        };
    });
    //再次输入密码
    if ($("#rePassword").val()) {
        $("#rePassword").prev().fadeOut();
    };
    $("#rePassword").focus(function () {
        $(this).prev().fadeOut();
        $(".item-pwdRepeat-wrap .input-tip span").show();
    });
    $("#rePassword").blur(function () {
        if (!$("#rePassword").val()) {
            $(this).prev().fadeIn();
            $(".item-pwdRepeat-wrap .input-tip span").hide();
        } else {
            $(".item-pwdRepeat-wrap .input-tip span").hide();
        };
    });
    //门店名称
    if ($("#form-storeName").val()) {
        $("#form-storeName").prev().fadeOut();
    };
    $("#form-storeName").focus(function () {
        $(this).prev().fadeOut();
        $(".item-storeName-wrap .input-tip span").show();
    });
    $("#form-storeName").blur(function () {
        if (!$("#form-storeName").val()) {
            $(this).prev().fadeIn();
            $(".item-storeName-wrap .input-tip span").hide();
        } else {
            $(".item-storeName-wrap .input-tip span").hide();
        };
    });
    //企业法人
    if ($("#form-legalPerson").val()) {
        $("#form-legalPerson").prev().fadeOut();
    };
    $("#form-legalPerson").focus(function () {
        $(this).prev().fadeOut();
        $(".item-legalPerson-wrap .input-tip span").show();
    });
    $("#form-legalPerson").blur(function () {
        if (!$("#form-legalPerson").val()) {
            $(this).prev().fadeIn();
            $(".item-legalPerson-wrap .input-tip span").hide();
        } else {
            $(".item-legalPerson-wrap .input-tip span").hide();
        };
    });
    //详细地址地址
    if ($("#form-fullAddress").val()) {
        $("#form-fullAddress").prev().fadeOut();
    };
    $("#form-fullAddress").focus(function () {
        $(this).prev().fadeOut();
        $(".item-shipAddress-wrap .input-tip span").show();
    });
    $("#form-fullAddress").blur(function () {
        if (!$("#form-fullAddress").val()) {
            $(this).prev().fadeIn();
            $(".item-shipAddress-wrap .input-tip span").hide();
        } else {
            $(".item-shipAddress-wrap .input-tip span").hide();
        };
    });
    //验证码
    if ($("#authCode").val()) {
        $("#authCode").prev().fadeOut();
    };
    $("#authCode").focus(function () {
        $(this).prev().fadeOut();
        $(".item-authcode-wrap .input-tip span").show();
    });
    $("#authCode").blur(function () {
        if (!$("#authCode").val()) {
            $(this).prev().fadeIn();
            $(".item-authcode-wrap .input-tip span").hide();
        } else {
            $(".item-authcode-wrap .input-tip span").hide();
        };
    });
    //手机验证码
    if ($("#phoneCode").val()) {
        $("#phoneCode").prev().fadeOut();
    };
    $("#phoneCode").focus(function () {
        $(this).prev().fadeOut();
        $(".item-mobileCode-wrap .input-tip span").show();
    });
    $("#phoneCode").blur(function () {
        if (!$("#phoneCode").val()) {
            $(this).prev().fadeIn();
            $(".item-mobileCode-wrap .input-tip span").hide();
        } else {
            $(".item-mobileCode-wrap .input-tip span").hide();
        };
    });

//        //ajax提交注册信息
//        $("#submit").bind("click", function () {
//            regist(validate);
//        });
//
//        $("body").each(function () {
//            $(this).keydown(function () {
//                if (event.keyCode == 13) {
//                    regist(validate);
//                }
//            });
//        });

});

//    function regist(validate) {
//        //校验Email, password，校验如果失败的话不提交
//        if (validate.form()) {
//            if ($("#checkBox").attr("checked")) {
//                var md5 = new MD5();
//                $.ajax({
//                    url: "./user/regist.do",
//                    type: "post",
//                    data: {
//                        userID: $("#email").val(),
//                        password: md5.MD5($("#password").val()),
//                        userName: $("#contact").val(),
//                        companyName: $("#company").val(),
//                        tel: $("#tel").val(),
//                        QQ: $("#qq").val()
//
//                    },
//                    dataType: "json",
//                    beforeSend: function () {
//                        $('.loading').show();
//                    },
//                    success: function (data) {
//                        $('.loading').hide();
//                        if (data.hasOwnProperty("code")) {
//                            if (data.code == 0) {
//                                //注册成功
//                                window.location.href = "registOk.jsp?email=" + $('#email').val();
//                            } else if (data.code == 1) {
//                                //数据库链接失败
//                                $(".login-error").html($.i18n.prop("Error.Exception"));
//                            } else if (data.code == 2) {
//                                //参数传递失败
//                                $(".login-error").show();
//                                $(".login-error").html($.i18n.prop("Error.ParameterError"));
//                            } else if (data.code == 3) {
//                                //公司已经被注册
//                                $("#company").addClass("error");
//                                $("#company").after(registError);
//                                $("#company").next("label.repeated").text($.i18n.prop("Error.CompaniesAlreadyExists"));
//                                registError.show();
//                            } else if (data.code == 4) {
//                                //邮箱已经被注册
//                                $("#email").addClass("error");
//                                $("#email").after(registError);
//                                $("#email").next("label.repeated").text($.i18n.prop("Error.EmailAlreadyExists"));
//                                registError.show();
//                            } else {
//                                //系统错误
//                                $(".login-error").html($.i18n.prop("Error.SysError"));
//                            }
//                        }
//                    }
//                });
//            } else {
//                //勾选隐私政策和服务条款
//                $(".login-error").show();
//                $(".login-error").html($.i18n.prop("Error.ReadAndAgree"));
//            }
//        }
//    }

$(function () {
    // =======地区选择===============
    $("#areaId").lSelect({
        url: baseURL+"/common/area.jhtml"
    });
    //清除火狐浏览器刷新多出拉下框
    $("select[name='areaId_select']").each(function () {
        if ($(this).val() == "") {
            $(this).nextAll("select").remove();
            return false;
        }
    });
});

function processLowerIENavigate() {
    /**
     * 判断浏览器是否为IE8.0版本以下
     */
    var DEFAULT_VERSION = "8.0";
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie") > -1;
    var safariVersion;
    if (isIE) {
        safariVersion = ua.match(/msie ([\d.]+)/)[1];
        if (safariVersion <= DEFAULT_VERSION) {
            // 执行1
            document.write(
                '<div id="browser-warning">' +
                '<a class="browser-close" href="javascript:sr_close();">' + '</a>' +
                '<img class="browser-img" src="http://webmap2.map.bdstatic.com/newmap/static/common/images/browser-warning_16f89e8.png" />' +
                "当前浏览器版本较低，部分功能响应较差或无响应。使用完整功能，请更换其他浏览器或升级浏览器到最新版本或IE8以上。谢谢！"
                + '</div>');
        } else {
            // 执行2
        }
    } else {
        // 执行3
    }
    /**
     * 判断浏览器是否为IE 包括IE11
     */
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        //document.write("当前IE版本");
    } else {
        //document.write("当前非IE版本");
    }

}
if(navigator.userAgent.indexOf("MSIE 9.0")>0){
    setTimeout(function(){
        $('.page').addClass('js_show');
        $('.page').css('opacity',1);
    },500)
}
