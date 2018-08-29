/**
 * 社交
 * Created by WangChao on 2017/1/18.
 */
var contact = function (fn) {
    this.fn = fn;
};

contact.prototype = {
    /**
     * 说说列表
     * pageSize 页大小
     * pageNumber 页号
     */
    list: function (data) {
        ajax.post({
            url: base + 'Api/Circle/index',
            data: data,
            success: this.fn
        });
    },
    /**
     * 发表动态
     * images[{file 文件}]  图片集合
     * content  发布内容
     * userId  会员ID
     */
    uploadImg: function (data) {
        ajax.post({
            url: base + 'Api/Circle/pullcircle',
            data: data,
            contentType: false,
            processData: false,
            success: this.fn
        });
    },
    /**
     * 点赞
     * pid     说说ID
     * userId  用户ID
     */
    liked: function (data) {
        ajax.post({
            url: base + 'Api/Circle/spot',
            data: data,
            success: this.fn
        });
    },
    /**
     * 点赞
     * pauthor 被回复者
     * author  回复者
     * cid     说说Id
     * conmment评论内容
     */
    reply: function (data) {
        ajax.post({
            url: base + 'Api/Circle/issue',
            data: data,
            success: this.fn
        });
    },








    /**
     * 发表说说
     * content  内容
     * type  类型{订单秀order,魔拍秀camera,任性秀wayward}
     * isShow   是否显示(true,false)
     * images[{file 文件}]  图片集合
     * ids  商品id（数组）
     */
    save: function (data) {
        ajax.post({
            url:'http://dev.tiaohuo.com/weixin/member/contact/save.jhtml',
            data: data,
            contentType: false,
            processData: false,
            success: this.fn
        });
    },
    /**
     * 说说回复
     * id 说说Id
     * content 回复内容
     */
    // reply:function (data) {
    //     ajax.post({
    //         url: base + 'weixin/member/contact/reply.jhtml',
    //         data: data,
    //         success: this.fn
    //     });
    // },
    /**
     * 详情
     * id   说说Id
     * lat  经度
     * lng  纬度
     */
    view: function (data) {
        ajax.get({
            url: base + 'weixin/member/contact/view.jhtml',
            data: data,
            success: this.fn
        })
    },

    /**
     * 朋友圈说说列表
     * lat  经度
     * lng  纬度
     */
    friendList: function (data) {
        ajax.get({
            url: base + 'weixin/member/contact/friendList.jhtml',
            data: data,
            success: this.fn
        })
    },
    /**
     * 说说个人详情
     * 用户名username
     */
    guideView: function (data) {
        ajax.get({
            url: base + 'weixin/member/contact/guideView.jhtml',
            data: data,
            success: this.fn
        })
    },
    /**
     * 说说个人列表
     * pageSize 页大小
     * pageNumber 页号
     * 用户名username
     */
    guideList: function (data) {
        ajax.get({
            url: base + 'weixin/member/contact/guideList.jhtml',
            data: data,
            success: this.fn
        })
    },
    /**
     * 说说个人页面分享地址
     */
    personalShare: function () {
        ajax.get({
            url: base + 'weixin/member/contact/personal/share.jhtml',
            success: this.fn
        })
    }

};
