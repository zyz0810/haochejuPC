// 微信插件
var weixin = {
    url: base + 'weixin/mutual/get_config.jhtml',
    cardUrl: base + 'weixin/mutual/get_card_ext.jhtml',
    lat: 0, // 纬度，浮点数，范围为90 ~ -90
    lng: 0, // 经度，浮点数，范围为180 ~ -180。
    speed: 0, // 速度，以米/每秒计
    accuracy: 0, // 位置精度
    config: {},
    setting: "none",
    init: function () {
        var $def = $.Deferred();
        if (!isWeiXin()) {
            $def.reject();
            return $def.promise();
        }
        console.log(weixin.setting);
        if (weixin.setting == "none") {
            weixin.setting = "pending";
            $.getJSON(weixin.url + '?url=' + encodeURIComponent(location.href.split('#')[0])).done(function (res) {
                var config = res.data;
                wx.config({
                    beta: true,
                    debug: false,
                    appId: config.appId,
                    timestamp: config.timestamp,
                    nonceStr: config.nonceStr,
                    signature: config.signature,
                    jsApiList: [
                        // 'hideMenuItems',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone',
                        'getLocation',
                        'openLocation',
                        'scanQRCode',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'hideMenuItems',
                        'showMenuItems',
                        'openAddress'
                    ]
                });
                weixin.setting = "success";
                weixin.config = config;
                $def.resolve(weixin.config);
                console.log("测试resolve方法后是够继续执行");
            }).fail(function () {
                weixin.setting = "none";
                $def.reject();
            });
        } else if (weixin.setting == "pending") {
            var t = window.setInterval(function () {
                if (weixin.setting == "success") {
                    clearInterval(t);
                    $def.resolve(weixin.config);
                } else if (weixin.setting == "none") {
                    clearInterval(t);
                    $def.reject();
                }
            }, 100);
        } else if (weixin.setting == "success") {
            $def.resolve(weixin.config);
        }
        return $def.promise();
    },

    // addCard: function () {
    //     weixin.init().done(function () {
    //         $.getJSON(weixin.cardUrl).done(function (res) {
    //             var cardExt = res.data;
    //             var cardExtJson='{"timestamp":"' + cardExt.timestamp + '","nonce_str":"' + cardExt.nonceStr + '","signature":"' + cardExt.signature + '"}';
    //             wx.ready(function () {
    //                 wx.addCard({
    //                     cardList: [{
    //                         cardId: cardExt.cardId,
    //                         cardExt: cardExtJson
    //                     }], // 需要添加的卡券列表
    //                     success: function (res) {
    //                         var cardList = res.cardList; // 添加的卡券列表信息
    //                     }
    //                 });
    //
    //             });
    //         });
    //
    //     });
    // },
    /**
     * 分享接口
     * title    分享标题
     * desc     分享描述
     * link     分享链接
     * imgUrl   分享图标
     */
    // share: function (jsons) {
    //     weixin.init().done(function (config) {
    //         wx.ready(function () {
    //             wx.showMenuItems({
    //                 menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    //             });
    //
    //             var username = cookie.getCookie("username");
    //             var link = location.origin + location.pathname + (username ? (location.search ? (location.search + "&extension=" + username) : ("?extension=" + username)) : location.search) + location.hash;
    //
    //             //分享到朋友圈
    //             wx.onMenuShareTimeline({
    //                 title: jsons && jsons.title ? jsons.title : config.sharetitle,
    //                 desc: jsons && jsons.desc ? jsons.desc : config.sharedesc,
    //                 // link: jsons && jsons.link ? jsons.link : config.sharelink,
    //                 link: link,
    //                 imgUrl: jsons && jsons.imgUrl ? jsons.imgUrl : config.shareimage,
    //                 success: function () {
    //                     // 用户确认分享后执行的回调函数
    //                     new common().updateLuck();
    //                 },
    //                 cancel: function () {
    //                     // 用户取消分享后执行的回调函数
    //                 }
    //             });
    //             //分享给朋友
    //             wx.onMenuShareAppMessage({
    //                 title: jsons && jsons.title ? jsons.title : config.sharetitle,
    //                 desc: jsons && jsons.desc ? jsons.desc : config.sharedesc,
    //                 link: link,
    //                 imgUrl: jsons && jsons.imgUrl ? jsons.imgUrl : config.shareimage,
    //                 success: function () {
    //                     // 用户确认分享后执行的回调函数
    //                     new common().updateLuck();
    //                 },
    //                 cancel: function () {
    //                     // 用户取消分享后执行的回调函数
    //                 }
    //             });
    //             //分享到QQ
    //             wx.onMenuShareQQ({
    //                 title: jsons && jsons.title ? jsons.title : config.sharetitle,   // 分享标题
    //                 desc: jsons && jsons.desc ? jsons.desc : config.sharedesc,   // 分享描述
    //                 link: link,
    //                 imgUrl: jsons && jsons.imgUrl ? jsons.imgUrl : config.shareimage,   // 分享图标
    //                 success: function () {
    //                     // 用户确认分享后执行的回调函数
    //                     new common().updateLuck();
    //                 },
    //                 cancel: function () {
    //                     // 用户取消分享后执行的回调函数
    //                 }
    //             });
    //             //分享到腾讯微博
    //             wx.onMenuShareWeibo({
    //                 title: jsons && jsons.title ? jsons.title : config.sharetitle,   // 分享标题
    //                 desc: jsons && jsons.desc ? jsons.desc : config.sharedesc,   // 分享描述
    //                 link: link,
    //                 imgUrl: jsons && jsons.imgUrl ? jsons.imgUrl : config.shareimage,   // 分享图标
    //                 success: function () {
    //                     // 用户确认分享后执行的回调函数
    //                     new common().updateLuck();
    //                 },
    //                 cancel: function () {
    //                     // 用户取消分享后执行的回调函数
    //                 }
    //             });
    //             //分享到QQ空间
    //             wx.onMenuShareQZone({
    //                 title: jsons && jsons.title ? jsons.title : config.sharetitle,   // 分享标题
    //                 desc: jsons && jsons.desc ? jsons.desc : config.sharedesc,   // 分享描述
    //                 link: link,
    //                 imgUrl: jsons && jsons.imgUrl ? jsons.imgUrl : config.shareimage,   // 分享图标
    //                 success: function () {
    //                     // 用户确认分享后执行的回调函数
    //                     new common().updateLuck();
    //                 },
    //                 cancel: function () {
    //                     // 用户取消分享后执行的回调函数
    //                 }
    //             });
    //
    //         });
    //     });
    // },
    // share1: function (jsons) {
    //     weixin.init().done(function (config) {
    //         wx.ready(function () {
    //             wx.showMenuItems({
    //                 menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    //             });
    //
    //             var username = cookie.getCookie("username");
    //
    //             //分享到朋友圈
    //             wx.onMenuShareTimeline({
    //                 title: jsons.title,
    //                 desc: jsons && jsons.desc ? jsons.desc : config.sharedesc,
    //                 link: jsons.link,
    //                 imgUrl: jsons && jsons.imgUrl ? jsons.imgUrl : config.shareimage,
    //                 success: function () {
    //                     // 用户确认分享后执行的回调函数
    //                     console.log(jsons.imgUrl);
    //                     if(jsons.success) jsons.success();
    //                     new common().updateLuck();
    //                 },
    //
    //                 cancel: function () {
    //                     // 用户取消分享后执行的回调函数
    //                 }
    //             });
    //             //分享给朋友
    //             wx.onMenuShareAppMessage({
    //                 title: jsons.title,
    //                 desc: jsons && jsons.desc ? jsons.desc : config.sharedesc,
    //                 link:jsons.link,
    //                 imgUrl: jsons && jsons.imgUrl ? jsons.imgUrl : config.shareimage,
    //                 success: function () {
    //                     // 用户确认分享后执行的回调函数
    //                     console.log(jsons.imgUrl);
    //                     if(jsons.success) jsons.success();
    //                     new common().updateLuck();
    //                 },
    //                 cancel: function () {
    //                     // 用户取消分享后执行的回调函数
    //                 }
    //             });
    //             //分享到QQ
    //             wx.onMenuShareQQ({
    //                 title: jsons.title,   // 分享标题
    //                 desc: jsons && jsons.desc ? jsons.desc : config.sharedesc,   // 分享描述
    //                 link: jsons.link,
    //                 imgUrl: jsons && jsons.imgUrl ? jsons.imgUrl : config.shareimage,   // 分享图标
    //                 success: function () {
    //                     // 用户确认分享后执行的回调函数
    //                     if(jsons.success) jsons.success();
    //                     new common().updateLuck();
    //                 },
    //                 cancel: function () {
    //                     // 用户取消分享后执行的回调函数
    //                 }
    //             });
    //             //分享到腾讯微博
    //             wx.onMenuShareWeibo({
    //                 title: jsons.title,   // 分享标题
    //                 desc: jsons && jsons.desc ? jsons.desc : config.sharedesc,   // 分享描述
    //                 link: jsons.link,
    //                 imgUrl: jsons && jsons.imgUrl ? jsons.imgUrl : config.shareimage,   // 分享图标
    //                 success: function () {
    //                     // 用户确认分享后执行的回调函数
    //                     if(jsons.success) jsons.success();
    //                     new common().updateLuck();
    //                 },
    //                 cancel: function () {
    //                     // 用户取消分享后执行的回调函数
    //                 }
    //             });
    //             //分享到QQ空间
    //             wx.onMenuShareQZone({
    //                 title: jsons.title,   // 分享标题
    //                 desc: jsons && jsons.desc ? jsons.desc : config.sharedesc,   // 分享描述
    //                 link: jsons.link,
    //                 imgUrl: jsons && jsons.imgUrl ? jsons.imgUrl : config.shareimage,   // 分享图标
    //                 success: function () {
    //                     // 用户确认分享后执行的回调函数
    //                     if(jsons.success) jsons.success();
    //                     new common().updateLuck();
    //                 },
    //                 cancel: function () {
    //                     // 用户取消分享后执行的回调函数
    //                 }
    //             });
    //         });
    //     });
    // },
    /**
     * 商品分享接口
     * id 商品Id
     */
    // sharept: function (id) {
    //     weixin.init().done(function (config) {
    //         wx.ready(function () {
    //             wx.showMenuItems({
    //                 menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    //             });
    //             new product(function (data) {
    //                 //分享到朋友圈
    //                 wx.onMenuShareTimeline({
    //                     title: data.title,
    //                     desc: data.desc,
    //                     link: data.link,
    //                     imgUrl: data.imgUrl,
    //                     success: function () {
    //                         // 用户确认分享后执行的回调函数
    //                         new product().extend({id:id});
    //                         new common().updateLuck();
    //                     },
    //                     cancel: function () {
    //                         // 用户取消分享后执行的回调函数
    //                     }
    //                 });
    //                 //分享给朋友
    //                 wx.onMenuShareAppMessage({
    //                     title: data.title,
    //                     desc: data.desc,
    //                     link: data.link,
    //                     imgUrl: data.imgUrl,
    //                     success: function () {
    //                         // 用户确认分享后执行的回调函数
    //                         new product().extend({id:id});
    //                         new common().updateLuck();
    //                     },
    //                     cancel: function () {
    //                         // 用户取消分享后执行的回调函数
    //                     }
    //                 });
    //                 //分享到QQ
    //                 wx.onMenuShareQQ({
    //                     title: data.title,
    //                     desc: data.desc,
    //                     link: data.link,
    //                     imgUrl: data.imgUrl,
    //                     success: function () {
    //                         // 用户确认分享后执行的回调函数
    //                         new product().extend({id:id});
    //                         new common().updateLuck();
    //                     },
    //                     cancel: function () {
    //                         // 用户取消分享后执行的回调函数
    //                     }
    //                 });
    //                 //分享到腾讯微博
    //                 wx.onMenuShareWeibo({
    //                     title: data.title,
    //                     desc: data.desc,
    //                     link: data.link,
    //                     imgUrl: data.imgUrl,
    //                     success: function () {
    //                         // 用户确认分享后执行的回调函数
    //                         new product().extend({id:id});
    //                     },
    //                     cancel: function () {
    //                         // 用户取消分享后执行的回调函数
    //                     }
    //                 });
    //                 //分享到QQ空间
    //                 wx.onMenuShareQZone({
    //                     title: data.title,
    //                     desc: data.desc,
    //                     link: data.link,
    //                     imgUrl: data.imgUrl,
    //                     success: function () {
    //                         // 用户确认分享后执行的回调函数
    //                         new product().extend({id:id});
    //                         new common().updateLuck();
    //                     },
    //                     cancel: function () {
    //                         // 用户取消分享后执行的回调函数
    //                     }
    //                 });
    //             }).share({id: id});
    //
    //
    //         });
    //     });
    // },

    /**
     * 分享说说接口
     * title    分享标题
     * desc     分享描述
     * link     分享链接
     * imgUrl   分享图标
     */

    // shareContact: function (id,conImg) {
    //     weixin.init().done(function (config) {
    //         wx.ready(function () {
    //             wx.showMenuItems({
    //                 menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    //             });
    //             var username = cookie.getCookie("username");
    //
    //             var link = location.origin + '/weixin/guide/dynamic/dynamicView.html?id='+id+'&extension=' + username;
    //             new contact(function (data) {
    //                 //分享到朋友圈
    //                 var title=(data.contact.coupons!='')?(data.contact.coupons[0].title):'我分享了一个不错的东西哦，快去看看吧';
    //                 var desc=(data.contact.coupons!='')?data.contact.coupons[0].content:'赶快下手吧！亲们！';
    //                 wx.onMenuShareTimeline({
    //                     title:title,
    //                     desc:desc,
    //                     link: link,
    //                     imgUrl: conImg,
    //                     success: function () {
    //                         // 用户确认分享后执行的回调函数
    //                         $('#iosMask2').hide();
    //                         $('#mcover').css('display','none');
    //                         new common().updateLuck();
    //                     },
    //                     cancel: function () {
    //                         // 用户取消分享后执行的回调函数
    //                     }
    //                 });
    //                 //分享给朋友
    //                 wx.onMenuShareAppMessage({
    //                     title:title,
    //                     desc:desc,
    //                     link: link,
    //                     imgUrl: conImg,
    //                     success: function () {
    //                         // 用户确认分享后执行的回调函数
    //                         $('#iosMask2').hide();
    //                         $('#mcover').css('display','none');
    //                         new common().updateLuck();
    //                     },
    //                     cancel: function () {
    //                         // 用户取消分享后执行的回调函数
    //                     }
    //                 });
    //                 //分享到QQ
    //                 wx.onMenuShareQQ({
    //                     title:title,
    //                     desc:desc,
    //                     link: link,
    //                     imgUrl: conImg,
    //                     success: function () {
    //                         // 用户确认分享后执行的回调函数
    //                         $('#iosMask2').hide();
    //                         $('#mcover').css('display','none');
    //                         new common().updateLuck();
    //                     },
    //                     cancel: function () {
    //                         // 用户取消分享后执行的回调函数
    //                     }
    //                 });
    //                 //分享到腾讯微博
    //                 wx.onMenuShareWeibo({
    //                     title:title,
    //                     desc:desc,
    //                     link: link,
    //                     imgUrl: data.imgUrl,
    //                     success: function () {
    //                         // 用户确认分享后执行的回调函数
    //                         $('#iosMask2').hide();
    //                         $('#mcover').css('display','none');
    //                     },
    //                     cancel: function () {
    //                         // 用户取消分享后执行的回调函数
    //                     }
    //                 });
    //                 //分享到QQ空间
    //                 wx.onMenuShareQZone({
    //                     title:title,
    //                     desc:desc,
    //                     link: link,
    //                     imgUrl: conImg,
    //                     success: function () {
    //                         $('#iosMask2').hide();
    //                         $('#mcover').css('display','none');
    //                         // 用户确认分享后执行的回调函数
    //                         new common().updateLuck();
    //                     },
    //                     cancel: function () {
    //                         // 用户取消分享后执行的回调函数
    //                     }
    //                 });
    //             }).view({id: id});
    //
    //         });
    //     });
    // },

    /**
     * 获取地理位置接口
     */
    location: function (fn) {
        weixin.init().done(function (config) {
            wx.ready(function () {
                wx.getLocation({
                    type: 'gcj02',
                    success: function (res) {
                        weixin.lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        weixin.lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        weixin.speed = res.speed; // 速度，以米/每秒计
                        weixin.accuracy = res.accuracy; // 位置精度
                        console.log("定位到的经纬度：");
                        console.log("lat:" + weixin.lat);
                        console.log("lng:" + weixin.lng);
                        if(fn) fn(true);//true表示已获取经纬度
                        new lbs(function (data) {
                            console.log("经纬度获取到的城市：");
                            console.log(data);

                            if (data.update) {
                                // if (confirm("检测当前所在城市为" + data.area.name + ",是否切换？")) {
                                //     new lbs(function () {
                                //         location.reload();
                                //     }).update({lat: weixin.lat, lng: weixin.lng})
                                // }
                                dialog.query("检测当前所在城市为" + data.area.name + ",是否切换？",function () {
                                    new lbs(function () {
                                        location.reload();
                                    }).update({lat: weixin.lat, lng: weixin.lng})
                                });

                            }
                        }).get({lat: weixin.lat, lng: weixin.lng});
                    },
                    fail: function () {
                        console.log("定位失败");
                        if (fn) fn();
                    }
                });
                wx.error(function (res) {
                    console.log(res);
                    // if (fn) fn();
                });

            });
        }).fail(function () {
            if (fn) fn();
        });
    },
    /**
     * 使用微信内置地图查看位置接口
     * lat  纬度
     * lng  经度
     * name 位置名
     * address  地址详情说明
     * url  在查看位置界面底部显示的超链接,可点击跳转
     */
    openLocation: function (jsons) {
        weixin.init().done(function (config) {
            wx.ready(function () {
                wx.openLocation({
                    latitude: jsons.lat,
                    longitude: jsons.lng,
                    name: jsons.name,
                    address: jsons.address,
                    scale: 18,
                    infoUrl: jsons.url ? jsons.url : ''
                });
                wx.error(function (res) {
                    console.log(res);
                });
            });
        });
    },
    /**
     * 首页扫一扫
     */
    scanQRCode: function () {
        weixin.init().done(function (config) {
            wx.ready(function () {
                wx.scanQRCode({
                    desc: '扫一扫',
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"] // 可以指定扫二维码还是一维码，默认二者都有
                });
                wx.error(function (res) {
                    console.log(res);
                });

            });
        });
    },
    /**
     * 商家首页扫一扫
     * tenantId 商家Id
     */
    scanQRCode1: function (tenantId) {
        weixin.init().done(function (config) {
            wx.ready(function () {
                wx.scanQRCode({
                    desc: '扫一扫',
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        if (result.substr(0, 4) == 'http') {
                            location.href = result;
                            return;
                        }
                        var arr_result = result.split(',');
                        var barcode = arr_result[arr_result.length - 1];
                        new tenant(function (data) {

                            if (data.length > 0) {
                                location.href = '/weixin/product/details.jhtml?id=' + data[0].id;
                            } else {
                                dialog.show("此商品没有上架");
                            }
                        }).barcode({
                            id: tenantId,
                            barcode: barcode
                        });
                    }
                });
                wx.error(function (res) {
                    console.log(res);
                });

            });
        });
    },


    /**
     * 会员卡绑定实体卡扫一扫
     */
    scanQRCodeCard: function (id,amount) {
        weixin.init().done(function (config) {
            wx.ready(function () {
                wx.scanQRCode({
                    desc: '绑定实体卡',
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        if(amount=='0'){
                            new card(function (data) {
                                dialog.show('实体卡绑定成功',function () {
                                    location.reload()
                                })
                            }).bindStCard({
                                id:id,
                                stCode:result
                            })
                        }else{
                            dialog.query('是否花费线上会员卡'+amount+'元余额当做绑定实体卡押金',function () {
                                new card(function (data) {
                                    dialog.show('实体卡绑定成功',function () {
                                        location.reload()
                                    })
                                }).bindStCard({
                                    id:id,
                                    stCode:result
                                })
                            })
                        }

                    }
                });
                wx.error(function (res) {
                    console.log(res);
                });

            });
        });
    },

    /**
     * 会员卡补卡扫一扫
     */
    scanQRCodeCardMake: function (id) {
        weixin.init().done(function (config) {
            wx.ready(function () {
                wx.scanQRCode({
                    desc: '绑定实体卡',
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        new card(function (data) {
                            dialog.show('补卡成功',function () {
                                location.reload()
                            })
                        }).makeUpCard({
                            id:id,
                            stCode:result
                        })
                    }
                });
                wx.error(function (res) {
                    console.log(res);
                });

            });
        });
    },

    /**
     *
     *打烊店铺隐藏分享按钮
     *
     */
    hide:function () {
        weixin.init().done(function (config) {
            wx.ready(function () {
                wx.hideMenuItems({
                    menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                });
            });
        })
    },

    /**
     *
     *打开微信收货地址
     *
     */
    address:function (jsons) {
        weixin.init().done(function (config) {
            wx.ready(function () {
                wx.openAddress({
                    success: function (res) {
                        if(jsons.success) jsons.success(res);
                    }
                });
            });
        })
    }
};


