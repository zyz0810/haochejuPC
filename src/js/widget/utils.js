//解决tenant购物车跳转问题
;(function(){
    function getTenantId(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    if(!!window.sessionStorage){
        var url = location.href;
        if(url.indexOf('/tenant/')>-1&&getTenantId('id')){
            window.sessionStorage.setItem('pageStatus','tenant');
            window.sessionStorage.setItem('pageStatusTenantId',getTenantId('id'));
        }
    }
})();

