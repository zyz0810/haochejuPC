/**
 * 违章年审
 */

var trial = function (fn) {
    this.fn = fn;
};
trial.prototype = {
    /**
     * 违章查询
     * carno 车牌号
     * engineno 发动机号
     * vin 车架号
     */
    illegal: function (data) {
        ajax.post({
            url: base + "Api/Illegal/index",
            data: data,
            success: this.fn
        });
    }
};


