/**
 * 首页
 */

var zixun = function (fn) {
    this.fn = fn;
};
zixun.prototype = {
    /**
     * 资讯页banner及列表
     * page 页码
     */
    list: function (data) {
        ajax.post({
            url: base + "Api/Home/newList",
            data: data,
            success: this.fn
        });
    },
    /**
     * 资讯页banner及列表
     * id 资讯id
     */
    view: function (data) {
        ajax.post({
            url: base + "Api/Home/newAjax",
            data: data,
            success: this.fn
        });
    }
};


