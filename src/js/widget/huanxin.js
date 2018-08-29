/**
 * Created by Administrator on 2017/1/11 0011.
 */


var huanxin = {
    bind: function () {
        if(window.location.href.indexOf("weixin/guide/chat.html")>-1){
            return false;
        }
        new member(function (data) {
            // console.log('当前登录人：');
            // console.log(data);
            //登录环信账号
            var options = {
                apiUrl: WebIM.config.apiURL,
                user: data.id,
                pwd: 'rzico@2015',
                appKey: WebIM.config.appkey
            };
            conn.open(options);
        }).view();
        WebIM.Emoji = emoji;//导入表情包
        //创建连接
        var conn = new WebIM.connection({
            https: WebIM.config.https,
            url: WebIM.config.xmppURL,
            isAutoLogin: WebIM.config.isAutoLogin,
            isMultiLoginSessions: WebIM.config.isMultiLoginSessions
        });

        //添加回调函数
        conn.listen({
            //连接成功回调
            onOpened: function (message) {
                console.log('连接成功并自动上线');
            },
            //连接关闭回调
            onClosed: function (message) {
                console.log('连接关闭');
                // dialog.show('连接关闭，您已在其它地方登录！');
            },
            //收到文本消息
            onTextMessage: function (message) {
                console.log('收到文本消息：');
                console.log(message);
                getTime();
                var idGuide =message.from;    //导购id
                var mType = 'getmes';                             //发送类型 getmes收到的消息  sendmes发送的消息
                var mCount = message.data;                         //消息的内容
                var mTime = time;                                  //收到消息的时间
                var tType='txt';                                   //文本类型 txt纯文本  img图片  temojo表情
                var db = getCurrentDb();
                var host = window.location.href;
                // var nowhost=location.origin+'/weixin/carts/cart.html';
                if(host.indexOf("weixin/guide/chat.html")>-1){
                    console.log('在聊天页面,不用提醒');
                    if(mCount.indexOf("TIAOHUO::COUPONCHAT")>-1){         //B端聊天里面分享现金券
                        var couid = mCount.split("#")[1];
                        //执行sql脚本，插入数据
//                         db.transaction(function (trans) {
//                             trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, couid,mTime,'coupon'], function (ts, data) {
//                             }, function (ts, message) {
// //                            alert(message);
//                             });
//                         });
                    }else if(mCount.indexOf("TIAOHUO::REDPACKETCHAT")>-1){   //B端聊天里面分享红包
                        var redid=mCount.split("#")[1];
                        //执行sql脚本，插入数据
//                         db.transaction(function (trans) {
//                             trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, redid,mTime,'redPacket'], function (ts, data) {
//                             }, function (ts, message) {
// //                            alert(message);
//                             });
//                         });
                    }else if(mCount.indexOf("TIAOHUO::COMMODITYCHAT")>-1){    //B端聊天里面分享商品
                        //执行sql脚本，插入数据
//                         db.transaction(function (trans) {
//                             trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,'product'], function (ts, data) {
//                             }, function (ts, message) {
// //                            alert(message);
//                             });
//                         });
                    }else if(mCount.indexOf("TIAOHUO::REDPACKETLISTCHAT")>-1){   //B端“+”号分享红包
                        //执行sql脚本，插入数据
//                         db.transaction(function (trans) {
//                             trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,'redPacketList'], function (ts, data) {
//                             }, function (ts, message) {
// //                            alert(message);
//                             });
//                         });
                    }else if(mCount.indexOf("TIAOHUO::COUPONLISTCHAT")>-1){    //B端“+”号分享现金券
                        //执行sql脚本，插入数据
//                         db.transaction(function (trans) {
//                             trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,'couponList'], function (ts, data) {
//                             }, function (ts, message) {
// //                            alert(message);
//                             });
//                         });
                    }else if(mCount.indexOf("TIAOHUO::VOUCHERCHAT")>-1){     //B端“+”号分享优惠券
                        //执行sql脚本，插入数据
//                         db.transaction(function (trans) {
//                             trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,'tenantCoupon'], function (ts, data) {
//                             }, function (ts, message) {
// //                            alert(message);
//                             });
//                         });
                    }else{
                        //执行sql脚本，插入数据
                        console.log('普通');
//                         db.transaction(function (trans) {
//                             console.log('cun');
//                             trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,tType], function (ts, data) {
//                             }, function (ts, message) {
// //                            alert(message);
//                             });
//                         });
                    }
                }else{
                    console.log('U币在聊天页面,不用提醒');
                    if(mCount.indexOf("TIAOHUO::COUPONCHAT")>-1){     //B端聊天里面分享现金券

                        var couid = mCount.split("#")[1];
                        //执行sql脚本，插入数据
                        db.transaction(function (trans) {
                            trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, couid,mTime,'coupon'], function (ts, data) {
                                dialog.news("您收到一个现金券",'',function(){
                                    new member(function (data) {
                                        location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                                    }).addConversation({id:message.from});
                                });
                            }, function (ts, message) {
//                            alert(message);
                            });
                        });
                    }else if(mCount.indexOf("TIAOHUO::REDPACKETCHAT")>-1){   //B端聊天里面分享红
                        var redid=mCount.split("#")[1];
                        //执行sql脚本，插入数据
                        db.transaction(function (trans) {
                            trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, redid,mTime,'redPacket'], function (ts, data) {
                                dialog.news("您收到一个红包",'',function(){
                                    new member(function (data) {
                                        location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                                    }).addConversation({id:message.from});
                                });
                            }, function (ts, message) {
//                            alert(message);
                            });
                        });
                    }else if(mCount.indexOf("TIAOHUO::COMMODITYCHAT")>-1){    //B端聊天里面分享商品
                        //执行sql脚本，插入数据
                        db.transaction(function (trans) {
                            trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,'product'], function (ts, data) {
                                dialog.news("您收到一个分享商品",'',function(){
                                    new member(function (data) {
                                        location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                                    }).addConversation({id:message.from});
                                });
                            }, function (ts, message) {
//                            alert(message);
                            });
                        });
                    }else if(mCount.indexOf("TIAOHUO::REDPACKETLISTCHAT")>-1){   //B端“+”号分享红包
                        //执行sql脚本，插入数据
                        db.transaction(function (trans) {
                            trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,'redPacketList'], function (ts, data) {
                                dialog.news("您收到一个分享红包",'',function(){
                                    new member(function (data) {
                                        location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                                    }).addConversation({id:message.from});
                                });
                            }, function (ts, message) {
//                            alert(message);
                            });
                        });
                    }else if(mCount.indexOf("TIAOHUO::COUPONLISTCHAT")>-1){   //B端“+”号分享现金券
                        //执行sql脚本，插入数据
                        db.transaction(function (trans) {
                            trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,'couponList'], function (ts, data) {
                                dialog.news("您收到一个分享现金券",'',function(){
                                    new member(function (data) {
                                        location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                                    }).addConversation({id:message.from});
                                });
                            }, function (ts, message) {
//                            alert(message);
                            });
                        });
                    } else if(mCount.indexOf("TIAOHUO::VOUCHERCHAT")>-1){    //B端“+”号分享优惠券
                        //执行sql脚本，插入数据
                        db.transaction(function (trans) {
                            trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,'tenantCoupon'], function (ts, data) {
                                dialog.news("您收到一个分享优惠券",'',function(){
                                    new member(function (data) {
                                        location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                                    }).addConversation({id:message.from});
                                });
                            }, function (ts, message) {
//                            alert(message);
                            });
                        });
                    } else{
                        function html_encode(str){
                            var s = "";
                            if (str.length == 0) return "";
                            s = str.replace(/&/g, "&amp;");
                            s = s.replace(/</g, "&lt;");
                            s = s.replace(/>/g, "&gt;");
                            s = s.replace(/ /g, "&nbsp;");
                            s = s.replace(/\'/g, "&#39;");
                            s = s.replace(/\"/g, "&quot;");
                            return s;
                        }
                        //执行sql脚本，插入数据
                        db.transaction(function (trans) {
                            trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,tType], function (ts, data) {
                                dialog.news("收到一条消息","内容:"+html_encode(message.data),function(){
                                    new member(function (data) {
                                        location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                                    }).addConversation({id:message.from});
                                });
                            }, function (ts, message) {
//                            alert(message);
                            });
                        });
                    }
                }

            },
            //收到表情消息
            onEmojiMessage: function (message) {
                var host = window.location.href;
                if(host.indexOf("weixin/guide/chat.html")>-1){
                    getTime();
                    console.log('收到表情消息：');
                    console.log(message);
                    var msg='';
                    var data = message.data;
                    for(var i = 0 , l = data.length ; i < l ; i++){
                        if(data[i].type=='txt'){
                            msg+=data[i].data;
                        }
                        if(data[i].type=='emoji'){
                            msg+='<img src="' + data[i].data + '"/>';
                        }
                    }
                    getTime();
                    var idGuide =message.from;
                    var mType = 'getmes';
                    var mCount = msg;
                    var mTime = time;
                    var tType='temojo';
                    var db = getCurrentDb();
                    //执行sql脚本，插入数据
                    db.transaction(function (trans) {
                        trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,tType], function (ts, data) {
                        }, function (ts, message) {
//                            alert(message);
                        });
                    });
                }else{

                    getTime();
                    console.log('收到表情消息：');
                    console.log(message);
                    var msg='';
                    var data = message.data;
                    for(var i = 0 , l = data.length ; i < l ; i++){
                        if(data[i].type=='txt'){
                            msg+=data[i].data;
                        }
                        if(data[i].type=='emoji'){
                            msg+='<img src="' + data[i].data + '"/>';
                        }
                    }
                    getTime();
                    var idGuide =message.from;
                    var mType = 'getmes';
                    var mCount = msg;
                    var mTime = time;
                    var tType='temojo';
                    var db = getCurrentDb();
                    //执行sql脚本，插入数据
                    db.transaction(function (trans) {
                        trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,tType], function (ts, data) {
                            dialog.news("收到一个表情消息","",function(){
                                new member(function (data) {
                                    location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                                }).addConversation({id:message.from});
                            });
                            }, function (ts, message) {
//                            alert(message);
                        });
                    });
                }
            },
            //收到图片消息
            onPictureMessage: function (message) {
                var host = window.location.href;
                if(host.indexOf("weixin/guide/chat.html")>-1){
                    console.log('收到图片消息：');
                    console.log(message);
                    var options = {url: message.url};
                    options.onFileDownloadComplete = function (blob) {
                        // 图片下载成功
                        console.log('图片下载完成!');
                        console.log(message.url);
                        var url=window.URL.createObjectURL(blob);
                        console.log(url);
                        getTime();
                        // var idGuide =message.from;
                        // var mType = 'getmes';
                        // var mCount = message.url;
                        // var mTime = time;
                        // var tType='img';
                        // var db = getCurrentDb();
                        // //执行sql脚本，插入数据
                        // db.transaction(function (trans) {
                        //     trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType,
                        //         mCount,mTime,tType], function (ts, data) {
                        //     }, function (ts, message) {
                        //         alert(message);
                        //     });
                        // });
                    };
                    options.onFileDownloadError = function () {
                        // 图片下载失败
                        console.log('Image download failed!');
                    };
                    WebIM.utils.download.call(conn, options);
                }else{
                    console.log('收到图片消息：');
                    console.log(message);
                    var options = {url: message.url};
                    options.onFileDownloadComplete = function (blob) {
                        // 图片下载成功
                        console.log('图片下载完成!');
                        console.log(message.url);
                        var url=window.URL.createObjectURL(blob);
                        console.log(url);
                        getTime();
                        var idGuide =message.from;
                        var mType = 'getmes';
                        var mCount = message.url;
                        var mTime = time;
                        var tType='img';
                        var db = getCurrentDb();
                        //执行sql脚本，插入数据
                        db.transaction(function (trans) {
                            trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType,
                                mCount,mTime,tType], function (ts, data) {
                                dialog.news("收到一张图片","内容:图片",function(){
                                    new member(function (data) {
                                        location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                                    }).addConversation({id:message.from});
                                });
                            }, function (ts, message) {
                                // alert(message);
                            });
                        });
                    };
                    options.onFileDownloadError = function () {
                        // 图片下载失败
                        console.log('Image download failed!');
                    };
                    WebIM.utils.download.call(conn, options);
                }
            },
            //收到命令消息
            onCmdMessage: function (message) {
                console.log('收到命令消息：');
                console.log(message);
            },
            //收到音频消息
            onAudioMessage: function ( message ) {
                var host = window.location.href;
                if(host.indexOf("weixin/guide/chat.html")>-1){
                    console.log(message);
                    var options = { url: message.url };
                    options.onFileDownloadComplete = function ( response ) {
                        var url=window.URL.createObjectURL(response);
                        //音频下载成功
                        console.log('收到音频消息成功');
                        console.log(response);
                        getTime();
//                         var idGuide =message.from;
//                         var mType = 'getmes';
//                         var mCount = message.url ;
//                         var mTime = time;
//                         var tType='audio';
//                         var db = getCurrentDb();
//                         //执行sql脚本，插入数据
//                         db.transaction(function (trans) {
//                             trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,tType], function (ts, data) {
//                             }, function (ts, message) {
// //                            alert(message);
//                             });
//                         });
                    };
                    options.onFileDownloadError = function () {
                        console.log('收到音频消息失败')
                        //音频下载失败
                    };

                    //通知服务器将音频转为mp3
                    options.headers = {
                        'Accept': 'audio/mp3'
                    };

                    WebIM.utils.download.call(conn, options);

                }else{
                    dialog.news("收到一条语音","内容:语音",function(){
                        new member(function (data) {
                            location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                        }).addConversation({id:message.from});
                    });
                    console.log(message);
                    var options = { url: message.url };
                    options.onFileDownloadComplete = function ( response ) {
                        var url=window.URL.createObjectURL(response);
                        //音频下载成功
                        console.log('收到音频消息成功');
                        console.log(response);
                        getTime();
                        var idGuide =message.from;
                        var mType = 'getmes';
                        var mCount = message.url ;
                        var mTime = time;
                        var tType='audio';
                        var db = getCurrentDb();
                        //执行sql脚本，插入数据
                        db.transaction(function (trans) {
                            trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,tType], function (ts, data) {
                            }, function (ts, message) {
//                            alert(message);
                            });
                        });
                    };
                    options.onFileDownloadError = function () {
                        console.log('收到音频消息失败')
                        //音频下载失败
                    };

                    //通知服务器将音频转为mp3
                    options.headers = {
                        'Accept': 'audio/mp3'
                    };

                    WebIM.utils.download.call(conn, options);

                }
            },
            //收到位置消息
            onLocationMessage: function (message) {
                var host = window.location.href;
                if(host.indexOf("weixin/guide/chat.html")>-1){
                    getTime();
                    var msg = message.addr+'#'+message.lat+'#'+message.lng;
                    console.log(msg);
//                     var idGuide =message.from;
//                     var mType = 'getmes';
//                     var mCount = msg;
//                     var mTime = time;
//                     var tType='location';
//                     var db = getCurrentDb();
//                     //执行sql脚本，插入数据
//                     db.transaction(function (trans) {
//                         trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,tType], function (ts, data) {
//                         }, function (ts, message) {
// //                            alert(message);
//                         });
//                     });
                }else{

                    getTime();
                    console.log('收到位置消息：');
                    console.log(message);
                    var msg = message.addr+'#'+message.lat+'#'+message.lng;
                    console.log(msg);
                    var idGuide =message.from;
                    var mType = 'getmes';
                    var mCount = msg;
                    var mTime = time;
                    var tType='location';
                    var db = getCurrentDb();
                    //执行sql脚本，插入数据
                    db.transaction(function (trans) {
                        trans.executeSql("insert into chatGuide(gid,mestype,mescont,mestime,txttype) values(?,?,?,?,?) ", [idGuide, mType, mCount,mTime,tType], function (ts, data) {
                            dialog.news("好友给您发送了一个位置","",function(){
                                new member(function (data) {
                                    location.href=location.origin+'/weixin/guide/chat.html?mid='+message.from;
                                }).addConversation({id:message.from});
                            });
                            }, function (ts, message) {
//                            alert(message);
                        });
                    });
                }
            },
            //收到文件消息
            onFileMessage: function (message) {
            },
            //收到视频消息
            onVideoMessage: function (message) {
                var node = document.getElementById('privateVideo');
                var option = {
                    url: message.url,
                    headers: {
                        'Accept': 'audio/mp4'
                    },
                    onFileDownloadComplete: function (response) {
                        var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                        node.src = objectURL;
                    },
                    onFileDownloadError: function () {
                        console.log('File down load error.')
                    }
                };
                WebIM.utils.download.call(conn, option);
            },
            //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
            onPresence: function (message) {
            },
            //处理好友申请
            onRoster: function (message) {
            },
            //处理群组邀请
            onInviteMessage: function (message) {
            },
            //本机网络连接成功
            onOnline: function () {
                console.log('本机网络连接成功');
            },
            //本机网络掉线
            onOffline: function () {
                console.log('本机网络掉线');
                // dialog.show('网络掉线！');
            },
            //失败回调
            onError: function (message) {
                console.log('接收消息失败');
                console.log(message);
            },
            //黑名单变动
            onBlacklistUpdate: function (list) {
                // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
                console.log(list);
            }
        });

        //初始化数据库
        initDatabase();
        function initDatabase() {
            var db = getCurrentDb();//初始化数据库
            if (!db) {
                // dialog.show("您的机型暂不支持本地存储");
                return;
            }

            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本  gid导购id  mestype消息类型(sendms发送的消息,getmes收到的消息,mescont消息内容,mestime消息时间)
                trans.executeSql("create table if not exists chatGuide(gid text null,mestype text null,mescont text null,mestime text null,txttype text null)", [], function (trans, result) {
                }, function (trans, message) {//消息的回调函数alert(message);});
                }, function (trans, result) {
                }, function (trans, message) {
                });
            })
        }


        function getCurrentDb() {
            //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
            //如果数据库不存在那么创建之
            try{
                var db = openDatabase("ch515at", "1.0", "it's to save chatGuide data!", 1024 * 1024);
                return db;
            }catch(err){
                return null
            }

            // var db = openDatabase("ch515at", "1.0", "it's to save chatGuide data!", 1024 * 1024);
        }

        //获取当前时间
        function getTime(){
            var oDate = new Date(); //实例一个时间对象；
            var year=oDate.getFullYear().toString();   //获取系统的年；
            var month=oDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
            if(month<10){
                month='0'+month;
            }
            var date=oDate.getDate().toString(); // 获取系统日，
            if(date<10){
                date='0'+date;
            }
            var hour=oDate.getHours(); //获取系统时，
            if(hour<10){
                hour='0'+hour;
            }
            var minute=oDate.getMinutes(); //分
            if(minute<10){
                minute='0'+minute;
            }
            var second=oDate.getSeconds(); //秒
            if(second<10){

                second='0'+second;
            }
            var weiseconds = oDate.getMilliseconds();//毫秒
            if(weiseconds<10){
                weiseconds='00'+weiseconds;
            }else if(weiseconds>10&&weiseconds<100){
                weiseconds='0'+weiseconds;
            }
            time=year+month+date+hour+minute+second+weiseconds;
            return time;
        }
    }
};