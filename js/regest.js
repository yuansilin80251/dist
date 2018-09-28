$(document).ready(function () {
    $("i").click(function () {
        $("i").toggleClass("active");
    });
    $("#usn").change(function () {
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!reg.test($(this).val())) {
            $(".wuser").html('手机号码格式不正确');
            $("button").prop("disabled",true)
        }else {
            $(".wuser").html('');
            $("button").prop("diasbled",false)
        }
    });
    $("#psw").blur(function () {
        if($("#psw").val().length <6){
            $(".wpsw").html('密码过短');
            $("button").prop("disabled",true)
        }else if($("#psw").val().length >= 16){
            $("button").prop("disabled",true);
            $(".wpsw").html('密码过长');
        }else {
            $("button").prop("disabled",false);
            $(".wpsw").html('');
        }
    });
    $("#btn").click(function () {
        if ($("i").hasClass("active")){
            if ($.cookie("login")){
                var first_login = $.cookie("login");
                first_login = JSON.parse(first_login);
                for (var key in first_login) {
                    if (key == $("#usn").val()){
                        alert("该手机号已被注册");
                        location.href = "login.html";
                    } else{
                        var obj1 = {[$("#usn").val()]:$("#psw").val()};
                        obj1 = JSON.stringify(obj1) + $.cookie("login");
                        obj1 = obj1.replace("}{",",");
                        $.cookie.raw = true;
                        $.cookie("login",obj1,{expires:7,path:'/'});
                        location.href = "login.html";
                    }
                }
            } else {
                var oddlogin = "";
                var obj2 = {[$("#usn").val()]:$("#psw").val()};
                obj2 = JSON.stringify(obj2);
                $.cookie.raw = true;
                $.cookie("login",obj2,{expires: 7,path: '/'});
                location.href = "login.html";
            }
        } else {
            alert("请同意协议");
        }
    })
});