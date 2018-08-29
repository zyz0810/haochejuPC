/**
 * 首页
 */

var personnel = function (fn) {
    this.fn = fn;
};
personnel.prototype = {
    /**
     * 资讯页banner及列表
     * page 页码
     */
    list: function (data) {
        ajax.post({
            url: base + "Api/Invite/joblist",
            data: data,
            success: this.fn
        });
    },
    /**
     * 招聘详情
     * id 资讯id
     */
    view: function (data) {
        ajax.post({
            url: base + "Api/Invite/findjob",
            data: data,
            success: this.fn
        });
    }
};


