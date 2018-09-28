$(document).ready(function () {
    $("#btn").click(function () {
        if($.cookie('login')){
            var login_first = $.cookie('login');
            login_first = JSON.parse(login_first);
            var flag = false;
            for (var key in login_first){
                if ($("#usn").val() == key && $("#psw").val() == login_first[key]){
                    $.cookie.raw = true;
                    $.cookie("user",key,{expires:7,path:'/'});
                    location.href = "../index.html";
                    break;
                }else {
                    flag = true;
                }
            }
            if(flag == true){
                $(".info").html('您输入的账号与密码不匹配');
                $(".info").addClass("active");
            }
        }else {
            $(".info").html('您输入的账号与密码不匹配');
            $(".info").addClass("active");
        }
    })
});