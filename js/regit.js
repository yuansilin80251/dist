$(document).ready(function () {
   $("#btn").click(function () {
       var oddlogin = getCookie("oddlogin");
       oddlogin=JSON.parse(oddlogin);
       for (let i = 0;i<oddlogin.length;i++) {
           if($("#usn").val()==oddlogin[i]["username"]&&$("#psw").val()==oddlogin[i]["password"]){
               location.href = "../index.html";
           }else {
               $(".info").html("账号密码不匹配");
               $(".info").addClass("active");
           }

       }
   })
});