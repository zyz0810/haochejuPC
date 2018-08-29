/**
 * Created by Administrator on 2016/11/8 0018.
 */
/**
 * 折叠面板
 */

var accordion = {
    bind: function () {
        $(document).on('click',".accordion .weui-cell_access",function () {
                $(this).next('div').toggle();
        });
        $(document).on('click','.accordion .weui-check__label', function () {
            var p = $(this).find('p');
            $(this).parent().parent().prev('div').find('p').eq(1).html(p.html());
            $(this).find('input').val(p.attr('data-id'));
            var styleid=$(this).find('p').attr('data-id');

            //显示到店提货显示与隐藏
            var sd = $(this).find('p').text();
            if(  sd == "到店提货") {
                $('.delivery').css('display','block');
            } else {
                $('.delivery').css('display','none');
            }

            $(this).parent().parent().prev('div').find('p').eq(1).attr('styleid',styleid)
            $(this).parent().parent().css("display",'none');
        })
    }
};

