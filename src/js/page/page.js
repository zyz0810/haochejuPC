// var base = location.origin == "http://localhost:8080" ? "http://dev.tiaohuo.com/" : location.origin + "/";
// var base = "http://localhost:8888/";
//var base = location.protocol + "//" + (location.host.toUpperCase() === 'LOCALHOST:8080' ? 'dev.tiaohuo.com/' : location.host + "/")
var hostname = window.location.hostname;
if(hostname== 'localhost'){
    var base='//dev.tiaohuo.com/';
}else{
    var base = window.location.origin + '/';
}


var redirecting = false;
var hasLogin = false;

var util = {
    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
};
var pageManager = {
    $container: $('#container'),
    _pageStack: [],
    _configs: [],
    _pageAppend: function () {
    },
    _defaultPage: null,
    _pageIndex: 1,
    _replaceType: false,
    _getParam: function (url) {
        var hash = url ? url : location.hash;
        if (hash.indexOf('?') === -1) {
            return '';
        }
        return hash.substring(hash.indexOf('?'), hash.length);
    },
    _getHash: function (url) {
        var hash = url ? url : location.hash;
        if (hash === '') {
            return '#';
        }
        return hash.substring(0, hash.indexOf('?') > 1 ? hash.indexOf('?') : hash.length);
    },
    setDefault: function (defaultPage) {
        this._defaultPage = this._find('name', defaultPage);
        return this;
    },
    setPageAppend: function (pageAppend) {
        this._pageAppend = pageAppend;
        return this;
    },
    init: function () {
        var self = this;

        $(window).on('hashchange', function () {
            var state = history.state || {};
            var url = self._getHash();
            var page = self._find('url', url) || self._defaultPage;
            if (state._pageIndex <= self._pageIndex || self._findInStack(url)) {
                self._back(page);
            } else {
                self._go(page);
            }
            triggerEvent(window, 'pageGoOk');
            triggerEvent(window, url + 'Ok');
        });

        if (history.state && history.state._pageIndex) {
            this._pageIndex = history.state._pageIndex;
        }

        this._pageIndex--;

        var url = this._getHash();
        var page = self._find('url', url) || self._defaultPage;
        this._go(page);
        return this;
    },
    push: function (config) {
        this._configs.push(config);
        return this;
    },
    go: function (to) {
        var url = this._getHash(to);
        var config = this._find('name', url);
        if (!config) {
            return;
        }
        location.hash = config.url + this._getParam(to);
        // location.reload();
    },
    _go: function (config) {
        this._pageIndex++;
        var stack;
        if (this._replaceType) {
            stack = this._pageStack.pop();
        }
        history.replaceState && history.replaceState({_pageIndex: this._pageIndex}, '', location.href);

        var html = $(config.template).html();
        var $html = $(html).addClass('slideIn').addClass(config.name);
        $html.on('animationend webkitAnimationEnd', function () {
            stack && stack.dom.remove();
            $html.removeClass('slideIn').addClass('js_show');
        });
        this.$container.append($html);
        this._pageAppend.call(this, $html);
        this._pageStack.push({
            config: config,
            dom: $html
        });

        if (!config.isBind) {
            this._bind(config);
        }

        return this;
    },
    replace: function (to) {
        var url = this._getHash(to);
        var config = this._find('name', url);
        if (!config) {
            return;
        }
        this._replaceType = true;
        location.replace('#' + to)
    },
    back: function () {
        // history.back();
        history.go(-1)
    },
    _back: function (config) {
        this._pageIndex--;
        var stack = this._pageStack.pop();
        if (!stack) {
            return;
        }
        // var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
        var url = this._getHash();
        var found = this._findInStack(url);
        if (url === '#' && !found) {
            location.reload();
        } else if (!found) {
            var html = $(config.template).html();
            var $html = $(html).addClass('js_show').addClass(config.name);
            $html.insertBefore(stack.dom);
            // location.reload();
            if (!config.isBind) {
                this._bind(config);
            }

            this._pageStack.push({
                config: config,
                dom: $html
            });
        }
        stack.dom.addClass('slideOut').on('animationend webkitAnimationEnd', function () {
            stack.dom.remove();
        });
        return this;
    },

    _findInStack: function (url) {
        var found = null;
        if (url === '#') {
            url = this._defaultPage.url
        }
        for (var i = 0, len = this._pageStack.length; i < len; i++) {
            var stack = this._pageStack[i];
            if (stack.config.url === url) {
                found = stack;
                break;
            }
        }
        return found;
    },
    _find: function (key, value) {
        var page = null;
        for (var i = 0, len = this._configs.length; i < len; i++) {
            if (this._configs[i][key] === value) {
                page = this._configs[i];
                break;
            }
        }
        return page;
    },
    _bind: function (page) {
        var events = page.events || {};
        for (var t in events) {
            for (var type in events[t]) {
                var that = this;
                if (type == 'click' && supportTouch) {
                    (function (dom, event) {
                        var touchStartY;
                        that.$container.on('touchstart', dom, function (e) {
                            touchStartY = e.changedTouches[0].clientY;
                        });
                        that.$container.on('touchend', dom, function (e) {
                            if (Math.abs(e.changedTouches[0].clientY - touchStartY) > 10) return;
                            e.preventDefault();

                            events[dom][event].call(this, e);
                        });
                    })(t, type);
                } else {
                    this.$container.on(type, t, events[t][type]);
                }
            }
        }
        page.isBind = true;
    },


    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = this._getParam().substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            var r2 = window.location.search.substr(1).match(reg);
            if (r2 != null) return unescape(r2[2]);
        }
        return null;
    },

    show: function (def) {
        var tpls = $('script[type="text/html"]');
        window.home = function () {
            location.hash = '';
        };

        for (var i = 0, len = tpls.length; i < len; ++i) {
            var tpl = tpls[i], name = tpl.id.replace(/tpl_/, '');

            pages[name] = {
                name: name,
                url: '#' + name,
                template: '#' + tpl.id
            };
        }

        for (var page in pages) {
            pageManager.push(pages[page]);

        }

        var home = "index";

        if (def != "") {
            home = def;
        }

        pageManager
            .setPageAppend(function ($html) {
                var $foot = $html.find('.page__ft');
                if ($foot.length < 1) return;

                if ($foot.position().top + $foot.height() < winH) {
                    $foot.addClass('j_bottom');
                } else {
                    $foot.removeClass('j_bottom');
                }
            })
            .setDefault(home)
            .init();

        Handlebars.registerHelper('ifcond', function (v1, v2, options) {
            if (v1 > v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });

        Handlebars.registerHelper('floor', function (num) {
            return Math.floor(parseFloat(num));
        });

        Handlebars.registerHelper('lazyload', function (intr) {
            var div = document.createElement('div');
            div.innerHTML = intr;
            $(div).find('img').forEach(function (ele, index) {
                ele = $(ele)
                var src = ele.attr('src');
                ele.attr('src', '/weixin/images/placeholder/lazypic.png');
                ele.attr('data-original', src);
            })
            return div.innerHTML;

        });

        Handlebars.registerHelper('crop', function (src, w, h) {
            if (!src || src.indexOf("cdn") === -1) {
                return src;
            } else if (src.indexOf("@") !== -1) {
                src = src.substring(0, src.indexOf("@"));
            }
            var screen = window.devicePixelRatio * document.documentElement.clientWidth;
            if (h == '1') {
                w = Math.ceil(w * screen / 100);
                h = 1;
                src += "@" + w + "w_" + h + "l";
            } else {
                w = Math.ceil(w * screen / 100);
                h = Math.ceil(h * screen / 100);
                src += "@" + w + "w_" + h + "h_1e_1c_100Q";
            }
            return src;
        });

        Handlebars.registerHelper('if_even', function (value, options) {
            if ((value % 2) == 0) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });


        Handlebars.registerHelper('compare', function (left, operator, right, options) {
            if (arguments.length < 3) {
                throw new Error('Handlerbars Helper "compare" needs 2 parameters');
            }
            var operators = {
                '==': function (l, r) {
                    return l == r;
                },
                '===': function (l, r) {
                    return l === r;
                },
                '!=': function (l, r) {
                    return l != r;
                },
                '!==': function (l, r) {
                    return l !== r;
                },
                '<': function (l, r) {
                    return l < r;
                },
                '>': function (l, r) {
                    return l > r;
                },
                '<=': function (l, r) {
                    return l <= r;
                },
                '>=': function (l, r) {
                    return l >= r;
                },
                'typeof': function (l, r) {
                    return typeof l == r;
                }
            };


            if (!operators[operator]) {
                throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
            }

            var result = operators[operator](left, right);

            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });


        // 初始化控制
        if (typeof accordion !== 'undefined') {
            accordion.bind()
        }
        if (typeof searchbar !== 'undefined') {
            searchbar.init();
        }
        if (typeof huanxin !== 'undefined') {
            huanxin.bind();
        }

        // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
        // 相关 issue: https://github.com/weui/weui/issues/15
        // 解决方法:
        // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
        // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
        //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
        if (/Android/gi.test(navigator.userAgent)) {
            window.addEventListener('resize', function () {
                if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                    window.setTimeout(function () {
                        document.activeElement.scrollIntoViewIfNeeded();
                    }, 0);
                }
            })
        }
        triggerEvent(window, 'pageGoOk');
    }

};
var isWeiXin = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
};

// 获取省市区数据
var getArea = (function () {
    var area = [];
    var areaChildren = {};
    return function (id) {
        var def = $.Deferred();
        if (!id && area.length > 0) {
            def.resolve(area);
            return def;
        }
        if (id && areaChildren[id] && areaChildren[id].length > 0) {
            def.resolve(areaChildren[id]);
            return def;
        }
        $.ajax({
            url: base + '/weixin/area/children.jhtml',
            data: {
                areaId: id
            },
            method: 'GET',
            success: function (res) {
                if (!id) {
                    area = res.data
                } else {
                    areaChildren[id] = res.data
                }
                def.resolve(res.data)
            }
        })
        return def;
    }
})()

// $(function () {
//     new member().checkLogin();
// });

/* ==========================================================================
 封装  ajax数据请求
 { options:url,  必选
 options:data,  必选
 success:function(data){},  必选
 error:function(message){}  可选
 }
 ============================================================================ */
// $.ajaxSettings.complete=function () {
//
// };
// $(document).on("ajaxStart", function () {
//     var extension = pageManager.GetQueryString("extension");
//     var chid = pageManager.GetQueryString("chid");
//     if (extension) {
//         if (!redirecting) {
//             redirecting = true;
//             location.href = base + 'weixin/index/login.jhtml?redirectUrl=' + encodeURIComponent(location.href) + (extension ? ("&extension=" + extension) : "") + (chid ? ("&chid=" + chid) : "");
//         }
//     } else {
//         if (isWeiXin() && !redirecting && !hasLogin) {
//             new member(function (data) {
//                 if (data) {
//                     hasLogin = true;
//                 } else {
//                     redirecting = true;
//                     location.href = base + 'weixin/index/login.jhtml?redirectUrl=' + encodeURIComponent(location.href) + (chid ? ("&chid=" + chid) : "");
//                 }
//             }).checkLogin(false);
//         }
//     }
// }).on("ajaxBeforeSend", function () {
//     if (redirecting) return false;
// });


var ajax = {
    //标准 ajax get 方法
    get: function (options) {
        // toast.show("加载中");
        return $.ajax({
            type: 'GET',
            url: options.url,
            data: options.data,
            dataType: 'json',
            context: $('body'),
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            async: options.async != false,
            success: function (data) {
                if (redirecting) return;
                if (data.message.type == "success") {
                    toast.close();
                    if (options.success) options.success(data.data);
                } else {
                    if (options.error != null) {
                        options.error(data.message);
                    } else {
                        toast.show(data.message.content);
                    }
                }
            },
            error: function (xhr, type) {
                if (redirecting) return;
                if (options.error) {
                    options.error(data.message);
                } else {
                    toast.show("获取数据失败");
                }
            }
        })
    },

    //标准 ajax post 方法
    post: function (options) {
        // toast.show("加载中");
        $.ajax({
            type: 'POST',
            url: options.url,
            data: options.data,
            dataType: 'json',
            context: $('body'),
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            contentType: (options.contentType !== "" && options.contentType !== undefined) ? options.contentType : "application/x-www-form-urlencoded",
            processData: (options.processData !== "" && options.processData !== undefined) ? options.processData : true,
            traditional: options.traditional ? options.traditional : false,
            success: function (data) {
                if (redirecting) return;
                if (data.message.type == "success") {
                    toast.close();
                    if (options.success) options.success(data.data);
                } else {
                    if (options.error != null) {
                        options.error(data.message);
                    } else {
                        dialog.show(data.message.content);
                    }
                }
            },
            error: function (xhr, type) {
                if (redirecting) return;
                if (options.error != null) {
                    options.error(data.message);
                } else {
                    toast.show("获取数据失败");
                }
            }
        })
    }
};

var render = {
    fill: function (el, data) {
        var tpl = Handlebars.compile(el.html());
        return tpl(data);
    }
};

//service worker
//if ('serviceWorker' in navigator && location.hostname !== 'localhost' && location.protocol && location.protocol.toUpperCase() === 'HTTPS:') {
//    window.addEventListener('load', function () {
//        navigator.serviceWorker.register('/website/service-worker.js').then(function (reg) {
//            reg.onupdatefound = function () {
//                var installingWorker = reg.installing;
//                installingWorker.onstatechange = function () {
//                    switch (installingWorker.state) {
//                        case 'installed':
//                            if (navigator.serviceWorker.controller) {
//                                console.log('New or updated content is available.');
//                            } else {
//                                console.log('Content is now available offline!');
//                            }
//                            break;
//                        case 'redundant':
//                            console.error('The installing service worker became redundant.');
//                            break;
//                    }
//                };
//            };
//        }).catch(function (e) {
//            console.log('Error during service worker registration:', e);
//        });
//    });
//}
