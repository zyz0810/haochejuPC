/**
 * 地理信息控制
 * Created by WangChao on 11/18 0018.
 */
var lbs=function (fn,efn) {
    this.fn=fn;
    this.efn=efn;
};
lbs.prototype={
    /**
     * 区域--当前地理位置
     */
    current:function () {
        ajax.get({
            url:base+"weixin/lbs/current.jhtml",
            success:this.fn
        });
    },
    /**
     * 经纬度获取城市
     * lat 纬度
     * lng 经度
     */
    get:function (data) {
        ajax.get({
            url:base+"weixin/lbs/get.jhtml",
            data:data,
            success:this.fn
        });
    },
    /**
     * 更新当前城市
     * lat 纬度
     * lng 经度
     * areaId 区域Id
     * username 用户名
     */
    update:function (data) {
        ajax.post({
            url:base+'weixin/lbs/update.jhtml',
            data:data,
            success:this.fn
        });
    }

};