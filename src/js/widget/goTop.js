$(function()
{
	//var tophtml=
	//	"<div id='izl_rmenu' class='izl-rmenu'>" +
	//	"<div href='http://wpa.qq.com/msgrd?v=3&uin=12345678&site=qq&menu=yes' target='_blank'>" +
	//	"<div class='btn btn-phone'>" +
	//	"<div class='f12 text-left kefu_fix'>" +
	//	"<div class='kefu_cont'>" +
	//	"<p class='f16'>电话客服</p>" +
	//	"<p class='f18 baseColor'>0551-67698098</p>" +
	//	"<p class='f16 m20'>在线客服（微信）</p>" +
	//	"<p class='f16'><a href='http://wpa.qq.com/msgrd?v=3&uin=12345678&site=qq&menu=yes' target='_blank' class='baseColor'>123456</a></p>" +
	//	"<p class='f16 m20'>意见反馈</p>" +
	//	"<p class='gray01 f14'>挑货网也不是完美的，我们希望得到您的建议</p>" +
	//	"</div>" +
	//	"</div>" +
	//	"</div>" +
	//	"</div>" +
	//	"<div class='btn btn-top'></div>" +
	//	"</div>";
	//$("#top").html(tophtml);

	$("#izl_rmenu").each(function()
	{
		$(this).find(".btn-phone").mouseenter(function()
		{
			$(this).find(".phone").fadeIn("fast");
			//$('.kefu_fix').css({'opacity':'1.0'});
		});
		$(this).find(".btn-phone").mouseleave(function()
		{
			$(this).find(".phone").fadeOut("fast");
			//$('.kefu_fix').css({'opacity':'0'});
		});
		$(this).find(".btn-top").click(function()
		{
			$("html, body").animate({
				"scroll-top":0
			},"fast");
		});
	});
	var lastRmenuStatus=false;
	$(window).scroll(function()
	{
		var _top=$(window).scrollTop();
		if(_top>200)
		{
			$("#izl_rmenu").data("expanded",true);
		}
		else
		{
			$("#izl_rmenu").data("expanded",false);
		}
		if($("#izl_rmenu").data("expanded")!=lastRmenuStatus)
		{
			lastRmenuStatus=$("#izl_rmenu").data("expanded");
			if(lastRmenuStatus)
			{
				$("#izl_rmenu .btn-top").slideDown();
			}
			else
			{
				$("#izl_rmenu .btn-top").slideUp();
			}
		}
	});
});