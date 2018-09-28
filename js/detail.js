'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;(function () {
    $(document).ready(function () {
        var arrs;
        $.ajax({
            type: "get",
            url: '../data/json.json',
            success: function success(data) {
                arrs = data['phone'].concat(data['redphone'], data['tv']);
                console.log(arrs);
            }
        });
        $(".nav").load("nav.html", function () {
            if ($.cookie('user') && $.cookie('user') != "") {
                $(".right>li:first>a").html($.cookie("user"));
                $(".right>li:first").addClass("user").mouseenter(function () {
                    $(this).find("ul").slideDown(200);
                }).mouseleave(function () {
                    $(this).find("ul").slideUp(100);
                }).find("ul").children().eq(0).click(function () {
                    $.cookie("user", "", { expires: 1, path: '/' });
                    location.reload();
                });
                var light = cartLoad();
                if (light) {
                    $(".cartLi").css({ 'background': '#FF6700' }).children('a').css({
                        'color': 'white',
                        'border': 'none'
                    });
                    $(".cartLi").click(function () {
                        location.href = "cart.html";
                    });
                }
            }
            $(".right>li.cartLi").mouseenter(function () {
                $(".cart").stop().slideDown(300);
            }).mouseleave(function () {
                $(".cart").stop().slideUp(300);
            });
            //加载购物车事件;
            //...
        });
        $(".navList").load("input.html", function () {
            $("#home").click(function () {
                location.href = "../index.html";
            });
            $("ul.pro").mouseover(function () {
                var datas;
                $.ajax({
                    type: "get",
                    url: "../data/json.json",
                    success: function success(data) {
                        datas = data;
                    }
                });
                $(".proListw").slideDown(500);
                $("ul.pro li").mouseover(function () {
                    var attr = $(this).attr("class");
                    $(".proList").html("");
                    var arr = datas[attr];
                    for (var i = 0; i < arr.length; i++) {
                        var str = "";
                        if (arr[i]["hot"]) {
                            str = '<li><div class="li-header"><span>\u65B0\u54C1</span></div><div class="li-img" style="background-image: url(\'' + arr[i]['url'] + '\')"></div><p class="name">' + arr[i]['name'] + '</p><p class="price">' + arr[i]['price'] + '\u5143\u8D77</p></li>';
                            $(".proList").append(str);
                        } else {
                            str = '<li><div class="li-header"></div><div class="li-img" style="background-image: url(\'' + arr[i]['url'] + '\')"></div><p class="name">' + arr[i]['name'] + '</p><p class="price">' + arr[i]['price'] + '\u5143\u8D77</p></li>';
                            $(".proList").append(str);
                        }
                    }
                });
            });

            $("ul.pro").mouseleave(function () {
                $(".proListw").slideUp(500);
            });
        });
        $("footer").load("footer.html", function () {
            //尾部js
        });

        var mySwiper = new Swiper('#detailSwiper', {
            loop: true, // 循环模式选项
            autoplay: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }

        });
        //页面加载开始
        var id = $.cookie('pro');
        var obj = {};
        $.ajax({
            type: "get",
            url: "../data/json.json",
            success: function success(data) {
                var arr = data['phone'].concat(data['redphone'], data['tv']);
                obj = arr[id - 1];
            }
        });
        $(document).ajaxComplete(function () {
            $(".proName").html(obj['name']);
            $(".price").html(obj['price'] + "元");
            $(".oldprice").html(obj['price'] - 100 + "元");
            $("#detailSwiper img").attr('src', obj['src']);
            $(document).scroll(function () {
                // console.log($("#detailSwiper").css('top'));
                $(document).scrollTop() > 200 ? $("#fly").slideDown(300) : $("#fly").slideUp(500);
                if ($(document).scrollTop() > 200 && $(document).scrollTop() < 440) {
                    $("#detailSwiper").css('top', $(document).scrollTop() - 200 + 60);
                } else if ($(document).scrollTop() > 440) {
                    $("#detailSwiper").css('top', 240);
                } else {
                    $("#detailSwiper").css('top', 60);
                }
            });

            //其他点击效果
            $(".color").click(function () {
                $(this).addClass("select").siblings('.color').removeClass('select');
            });
        });
        $("#buy").click(function () {
            if ($.cookie('user') && $.cookie('user') != "") {
                $.cookie.raw = true;
                var uu = $.cookie('user');
                var pro = $.cookie('pro');
                if ($.cookie(uu) && $.cookie(uu) != "") {
                    console.log(1);
                    console.log($.cookie(uu));
                    var obj = $.cookie(uu);
                    obj = JSON.parse(obj);
                    var flag = false;
                    for (var key in obj) {
                        if (pro == key) {
                            obj[key] = parseInt(obj[key]) + 1;
                            flag = true;
                        }
                    }
                    if (flag) {
                        obj = JSON.stringify(obj);
                        console.log(obj);
                        $.cookie.raw = true;
                        $.cookie(uu, obj, { expires: 7, path: '/' });
                        cartLoad();
                    } else {
                        var newObj = _defineProperty({}, pro, 1);
                        obj = JSON.stringify(obj) + JSON.stringify(newObj);
                        obj = obj.replace("}{", ",");
                        $.cookie.raw = true;
                        $.cookie(uu, obj, { expires: 7, path: '/' });
                        cartLoad();
                    }
                } else {
                    var newObj = _defineProperty({}, pro, 1);
                    newObj = JSON.stringify(newObj);
                    $.cookie(uu, newObj, { expires: 7, path: '/' });
                    cartLoad();
                }
                alert("添加购物车成功");
            } else {
                var con = confirm("您还没有登录呢,要登录吗?");
                if (con == true) {
                    location.href = 'login.html';
                } else {
                    location.reload();
                }
            }
        });

        //  购物车加载事件
        function cartLoad() {
            var uu = $.cookie('user');
            var num = 0;
            var count = 0;
            if ($.cookie(uu) && $.cookie(uu) != "") {
                $(".cart").html("");
                var dat = $.cookie(uu);
                console.log(dat);
                console.log(typeof dat === 'undefined' ? 'undefined' : _typeof(dat));
                dat = JSON.parse(dat);
                for (var key in dat) {
                    num = num + parseInt(dat[key]);
                    count = count + parseInt(dat[key]) * arrs[parseInt(key) - 1]['price'];
                    var str = '<div class="cartList"><img src="' + arrs[parseInt(key) - 1]['url'] + '" alt=""><span class="proName">' + arrs[parseInt(key) - 1]['name'] + '</span><span class="proPrice">' + arrs[parseInt(key) - 1]['price'] + ' x ' + dat[key] + '</span></div>';
                    $(".cart").append(str);
                }
                var fot = '<div class="totalCart"><span class="totalPro">\u5171' + num + '\u4EF6\u5546\u54C1</span><a href="cart.html">\u53BB\u8D2D\u7269\u8F66\u7ED3\u7B97</a><span class="totalPrice">' + count + '\u5143</span></div>';
                $(".cart").append(fot);
                $(".cartLi").find('b').html(num);
                return true;
            }
        }
    });
})();