/**
 * 个人中心
 * Created by WangChao on 11/11.
 */

var member = function (fn) {
    this.fn = fn;
};
member.prototype = {
    // checkLogin: function (async) {
    //     ajax.get({
    //         async: async,
    //         url: base + 'weixin/index/check_login.jhtml',
    //         success: this.fn
    //     });
    // },
    // checkLogin: function (data) {
    //     ajax.post({
    //         url:'http://dev.susonghaoniu.com/Api/User/login',
    //         success: this.fn,
    //         data:data
    //     });
    // },

    checkLogin: function (data) {
        ajax.get({
            url:'http://www.51studytime.cn/Wap/Index/getCode',
            success: this.fn,
            data:data
        });
    },

    /**
     * 绑定手机获取验证码
     * phonenum 手机号
     */
    sendCode: function (data) {
        ajax.post({
            url: base + "Api/User/getcode",
            data: data,
            success: this.fn
        });
    },
    /**
     * 绑定手机
     * phonenum 手机号
     * captcha 验证码
     * userId 用户Id
     */
    bindMobile: function (data) {
        ajax.post({
            url: base + 'Api/User/bindPhone',
            data: data,
            success: this.fn
        });
    },















    /**
     * 会员中心首页
     */
    index: function (data) {
        ajax.get({
            url: base + "weixin/member/indexView.jhtml",
            success: this.fn,
            data:data
        });
    },
    /**
     * 会员信息
     */
    view: function (data) {
        ajax.get({
            url: base + "weixin/member/view.jhtml",
            data: data,
            success: this.fn
        });
    },
    share: function () {
        ajax.get({
            url: base + 'weixin/member/share.jhtml',
            success: this.fn
        });
    },
    attention: function () {
        ajax.get({
            url: base + 'weixin/member/attention.jhtml',
            success: this.fn
        });
    },
    /**
     * 修改用户信息
     * name 姓名
     * nickName 昵称
     * birth 生日 2015-05-01
     * address 详细地址
     * phone 电话
     * zipCode 邮政编码
     * sex 性别  0 男  1 是女
     * areaId 区域地址
     * headImg 头像的 URL
     */
    update: function (data) {
        ajax.post({
            url: base + "weixin/member/update.jhtml",
            data: data,
            success: this.fn
        });
    },
    /**
     * 读取会员余额资料
     */
    balance: function () {
        ajax.get({
            url: base + "weixin/member/balance.jhtml",
            success: this.fn
        })
    },
    /**
     * 进行中未到帐金额
     */
    sumer: function () {
        ajax.get({
            url: base + 'weixin/member/sumer.jhtml',
            success: this.fn
        });
    },
    /**
     * 钱包充值
     * amount 充值金额
     */
    fill: function (data) {
        ajax.post({
            url: base + "weixin/member/deposit/fill.jhtml",
            data: data,
            success: this.fn
        })
    },
    /**
     * 微信扫码支付提交
     * paymentPluginId （微信扫码支付插件：weixinQrcodePayPlugin）
     * amount 支付金额
     */
    cashier: function (data) {
        ajax.post({
            url: base + "weixin/member/cashier/submit.jhtml",
            data: data,
            success: this.fn
        })
    },
    /**
     * 查询支付状态
     * sn 支付单号
     */
    query: function (data) {
        ajax.post({
            url: base + "weixin/member/cashier/query.jhtml",
            data: data,
            success: this.fn
        })
    },
    /**
     * 提现保存
     * memberBankId 银行编号 对应 bandInfo
     * amount 提现金额
     * enPassword 加密后的支付密码
     */
    cash: function (data) {
        ajax.post({
            url: base + "weixin/member/cash/save.jhtml",
            data: data,
            success: this.fn
        })
    },
    /**
     * 提现到微信钱包
     * amount 提现金额
     * enPassword 加密后的支付密码
     */
    cash2wx: function (data) {
        ajax.post({
            url: base + "weixin/member/cash/weixin/save.jhtml",
            data: data,
            success: this.fn
        })
    },
    /**
     * 计算提现支付手续费
     * amount 提现金额
     */
    calcFee: function (data) {
        ajax.post({
            url: base + "weixin/member/cash/calculate.jhtml",
            data: data,
            success: this.fn
        })
    },
    /**
     * 提交实名认证
     * name 姓名
     * idcard 身份证号
     * pathFront 身份证正面拍照  url
     * pathBack 身份证反面提照  url
     */
    realNameAuthen: function (data) {
        ajax.post({
            url: base + "weixin/member/idcard/save.jhtml",
            data: data,
            success: this.fn
        });
    },
    /**
     * 找回密码发送验证码
     */
    sendMobile: function () {
        ajax.post({
            url: base + "weixin/member/send_mobile.jhtml",
            success: this.fn
        });
    },
    /**
     * 找回登录密码
     * captcha 验证码
     * newPass 新密码（加密后）
     */
    retrievePassword: function (data) {
        ajax.post({
            url: base + 'weixin/member/password/retrieve.jhtml',
            data: data,
            success: this.fn
        });
    },
    /**
     * 找回支付密码
     * captcha  手机发送时收到的验证码
     * newPass 新密码（需要加密）
     */
    retrievePayPassword: function (data) {
        ajax.post({
            url: base + 'weixin/member/payPassword/retrieve.jhtml',
            data: data,
            success: this.fn
        });
    },
    /**
     * 我的推广
     */
    extension: function () {
        ajax.get({
            url: base + 'weixin/member/extension.jhtml',
            success: this.fn
        });
    },
    /**
     * 我推广的会员列表
     * pageSize 页大小
     * pageNumber 页码
     */
    extendMembers: function () {
        ajax.get({
            url: base + 'weixin/member/extend/members.jhtml',
            success: this.fn
        });
    },
    /**
     * 检查密码
     */
    passwordSet: function () {
        ajax.get({
            url: base + 'weixin/member/passwordSet.jhtml',
            success: this.fn
        })
    },

    /**
     * 合伙人的信息
     */
    partnerView: function () {
        ajax.get({
            url: base + 'weixin/member/partner/view.jhtml',
            success: this.fn
        })
    },

    /**
     * 注册合伙人发送验证码
     * mobile 手机号
     */
    sendMobilePartner: function (data) {
        ajax.post({
            url: base + "weixin/member/sendCode.jhtml",
            data: data,
            success: this.fn
        });
    },

    /**
     * 注册成为合伙人
     * username 手机号
     * captcha 验证码
     */
    becomePartner: function (data) {
        ajax.post({
            url: base + "weixin/member/register.jhtml",
            data: data,
            success: this.fn
        });
    },

    /**
     * 邀请合伙人
     */
    partnerShare: function () {
        ajax.get({
            url: base + 'weixin/member/partner/share.jhtml',
            success: this.fn
        })
    },
    /**
     * 添加会话
     * id 会员id
     */
    addConversation: function (data) {
        ajax.post({
            url: base + "weixin/member/conversation/add.jhtml",
            data: data,
            success: this.fn
        });
    },
    /**
     * 获取微信用户信息
     */
    info: function () {
        ajax.get({
            url: base + "/weixin/member/info.jhtml",
            success: this.fn
        });
    }


};


