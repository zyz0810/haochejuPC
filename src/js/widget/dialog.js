    var dialog = {
        // 选择对话框  msg 提示内容， yes主操作回调方法 no 辅操作回调方法
        query: function (msg,yes,no) {

                var $dialog = $('#dialog1');

                var $content = $('#dialog1 .weui-dialog__bd');
                $content.html(msg);
                $dialog.fadeIn(200);

                $dialog.find('.weui-dialog__btn_default').one('click', function () {
                    $dialog.fadeOut(200);
                    if(no){
                        no();
                    }
                });

                $dialog.find('.weui-dialog__btn_primary').one('click', function () {
                    $dialog.fadeOut(200);
                    if(yes){
                        yes();
                    }
                });
        },
        // 提示对话框 msg 提示内容
        show: function (msg,yes) {

                var $dialog = $('#dialog2');

                var $content = $('#dialog2 .weui-dialog__bd');
                $content.html(msg);
                $dialog.fadeIn(200);
                $dialog.find('.weui-dialog__btn').one('click', function () {
                    $dialog.fadeOut(200);
                    if(yes){
                        yes();
                    }
                });

        },
        btn:function (msg,clicktxt,yes) {
            var $dialog = $('#dialog2');

            var $content = $('#dialog2 .weui-dialog__bd');
            var $txt = $('#dialog2 .weui-dialog__ft .weui-dialog__btn');
            $content.html(msg);
            $txt.html(clicktxt);
            $dialog.fadeIn(200);
            $dialog.find('.weui-dialog__btn').one('click', function () {
                $dialog.fadeOut(200);
                if(yes){
                    yes();
                }
            });
        },

        //聊天消息提示专用
        news:function (title,msg,yes,no) {
            var $dialog = $('#dialog3');

            var $title=$('#dialog3 .weui-dialog__title');
            $title.html(title);

            var $content = $('#dialog3 .weui-dialog__bd');
            $content.html(msg);
            $dialog.fadeIn(200);
            $dialog.find('.weui-dialog__btn_default').one('click', function () {
                $dialog.fadeOut(200);
                if(no){
                    no();
                }
            });

            $dialog.find('.weui-dialog__btn_primary').one('click', function () {
                $dialog.fadeOut(200);
                if(yes){
                    yes();
                }
            });
        }

    };
