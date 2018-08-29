/**
 * commmon
 * Created by WangChao on 2016/11/24.
 */
var common = function (fn) {
    this.fn = fn;
};
common.prototype = {
    /**
     * 获取公钥
     * @param data
     */
    getPublicKey: function () {
        ajax.get({
            url: base + 'weixin/common/public_key.jhtml',
            success:this.fn
        });
    },
    /**
     * 读取网站基本信息
     */
    getBaseSet:function () {
        ajax.get({
            url: base + 'weixin/common/base_set.jhtml',
            success:this.fn
        });
    },
    /**
     * 修改拼手气活动分享日期和优惠券红包领到次数
     */
    updateLuck:function () {
        ajax.post({
            url: base + 'weixin/common/updateLuck.jhtml',
            success:this.fn
        });
    }
};