/**
 * Cookie
 * Created by WangChao on 2016/12/13.
 */
var cookie = {
    /**
     * 设置cookie
     * @param c_name
     * @param value
     * @param expiredays
     */
    setCookie: function (c_name, value, expiredays, path) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=" + path;

        console.log(c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=" + path)

    },
    /**
     * 读取cookie
     * @param c_name
     * @returns {string}
     */
    getCookie: function (c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    },
    delCookie: function (c_name) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() - 1);
        var c_value = this.getCookie(c_name);
        if (c_value != null && c_value != "") cookie.setCookie(c_name, c_value, -1);
    }
};