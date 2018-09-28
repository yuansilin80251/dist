;(function () {
    $(document).ready(function () {
        $("footer").load("footer.html");
        var arrs;
        $.ajax({
            type: "get",
            url: '../data/json.json',
            success: function success(data) {
                arrs = data['phone'].concat(data['redphone'], data['tv']);
                console.log(arrs);
                //执行加载cookie,构建页面.
                var headList = "<div class=\"cartListTitle\"><span class=\"allCheck\"><i class=\"checkBox iconfont\">&#xe8e6;</i>\u5168\u9009</span><span>\u5546\u54C1\u540D\u79F0</span><span>\u5355\u4EF7</span><span>\u6570\u91CF</span><span>\u5C0F\u8BA1</span><span>\u64CD\u4F5C</span></div>";
                $(".cartList").append(headList);
                var obj = $.cookie($.cookie('user'));
                console.log(obj);
                obj = JSON.parse(obj);
                console.log(obj);
                let count=0;
                for (var key in obj) {
                    count=count + arrs[key - 1]['price'] * obj[key];
                    var str="<div class=\"cartPro\" data-id=\"" + key + "\"><span class=\"checkBox\"><i class=\"iconfont\">&#xe8e6;</i></span><img src=\"" + arrs[parseInt(key) - 1]['url'] + "\" alt=\"\"><span class=\"proName\">" + arrs[parseInt(key) - 1]['name'] + "</span><span class=\"price\">" + arrs[parseInt(key) - 1]['price'] + "</span><input type=\"number\" class=\"number\" min='0' value=\"" + obj[key] + "\"><span class=\"proPrice\">" + arrs[parseInt(key) - 1]['price'] * obj[key] + "</span><span class=\"close iconfont\">&#xe8ea;</span></div>";
                    $(".cartList").append(str);
                }
                //cookie遍历结束
                var foot="<div class=\"cartTotal\"><button>\u53BB\u7ED3\u7B97</button><span class=\"totalPrice\">\u5408\u8BA1: <b>0</b>\u5143</span></div>";
                $(".cartList").append(foot);
            }
        });
        $("span.user").html($.cookie('user'));

        $(document).ajaxComplete(function () {
            //选择
            $(".allCheck i").click(function () {
                console.log(1);
                $(this).toggleClass('checked');
                $(".cartPro i").attr('class',$(this).attr('class'));
                //结算按钮是否能够点击.
                if ($(".cartPro i.checked").length>0){
                    $(".cartTotal button").attr('class','selectBtn');
                } else {
                    $(".cartTotal button").attr('class','').prop('disabled',true);
                }

                //总钱数:
                var totalMoney=0;
                console.log($(".cartPro").length);

                for (var i=0;i<$(".cartPro i.checked").length;i++){
                    totalMoney=totalMoney+parseInt($(".cartPro i.checked").eq(i).parent().siblings('.proPrice').html());
                }
                $(".totalPrice b").html(totalMoney);
            });

            $("span.close").click(function () {
                var $thiss=$(this).parent();
                var dataId = $thiss.attr('data-id');
                $(this).parent().slideUp(500,function () {
                    $thiss.remove();

                    //删除改变cookie
                    var cookie = $.cookie($.cookie('user'));

                    var reg = new RegExp('"' + dataId + '":\\d');

                    //删除操作!important;
                    cookie = cookie.replace(reg, "");
                    cookie = cookie.replace('{,', '{');
                    cookie = cookie.replace(',}', '}');
                    cookie = cookie.replace('{}', '');

                    $.cookie.raw = true;
                    $.cookie($.cookie('user'), cookie, { expires: 7, path: '/' });

                    var totalMoney=0;
                    for (var i=0;i<$(".cartPro i.checked").length;i++){
                        totalMoney=totalMoney+parseInt($(".cartPro i.checked").eq(i).parent().siblings('.proPrice').html());
                    }
                    $(".totalPrice b").html(totalMoney);
                });
            });

            $(".cartPro i").click(function () {
                $(this).toggleClass('checked');
                if ($(".cartPro i.checked").length==$(".cartPro").length) {
                    $(".allCheck i").addClass('checked')
                }else {
                    $(".allCheck i").removeClass('checked')
                }
                //结算按钮是否能够点击.
                if ($(".cartPro i.checked").length>0){
                    $(".cartTotal button").attr('class','selectBtn')
                } else {
                    $(".cartTotal button").attr('class','')
                }
                //totalmoney
                var totalMoney=0;
                for (var i=0;i<$(".cartPro i.checked").length;i++){
                    totalMoney=totalMoney+parseInt($(".cartPro i.checked").eq(i).parent().siblings('.proPrice').html());
                }
                $(".totalPrice b").html(totalMoney);
                $(".cartTotal button").click(function () {
                    if(totalMoney != 0){
                        alert("如家里有矿，请转账到支付宝：18539989565！");
                    }
                });
            });
            //调整数量
            $(".cartPro input").change(function () {
                $(this).siblings('.proPrice').html($(this).val() * $(this).siblings('.price').html());
                var totalMoney = 0;
                for (var i = 0; i < $(".cartPro i.checked").length; i++) {
                    totalMoney = totalMoney + parseInt($(".cartPro i.checked").eq(i).parent().siblings('.proPrice').html());
                }
                $(".totalPrice b").html(totalMoney);
            });
        });
    });
})();
