// 邮箱的判断
$(":text").eq(0).blur(creatYou);
function creatYou() {
    var value = $(":text").eq(0).val();
    var pattern = /^\w{5,8}@[0-9a-z]{2,6}[.](com|cn)$/;
    if(value == "") {
        $(":text").eq(0).parent().next().text("请输入邮箱");
        return false;
    }else if(pattern.test(value) == false) {
        $(":text").eq(0).parent().next().text("邮箱输入错误");
        return false;
    }else {
        $(":text").eq(0).parent().next().text("邮箱输入成功！");
    }
    return true;
}
// 密码的判断
$(":password").blur(creatPass);
function creatPass() {
    var value = $(":password").val();
    var pattern = /[0-9a-z]{6,20}/i;
    if(value == "") {
        $(":password").parent().next().text("请输入密码");
        return false;
    }else if(pattern.test(value) == false) {
        $(":password").parent().next().text("密码输入格式不正确");
        return false;
    }else {
        $(":password").parent().next().text("密码输入成功！");
    }
    return true;
}
// 验证码
// var random = rand(1000,9999);
// $(":text").eq(1).next().text(random);
// // 封装随机数函数
// function rand(min,max) {
//     return Math.floor(Math.random()*(max - min + 1) + min);
// }
// // 点击得随机数
// $(":text").eq(1).next().click(function() {
//     var random = rand(1000,9999);
//     $(":text").eq(1).next().text(random);
// })

// 点击换验证码
$("#svg").on("click",function() {
    // 时间戳
    this.src = `http://localhost:3000/user/captcha/?id=${new Date().getTime()}` 
})

$(":text").eq(1).blur(CreatYan);
function CreatYan() {
    var value = $(":text").eq(1).val();
    var num = $(":text").eq(1).next().text();
    if(value == "") {
        $(":text").eq(1).parent().next().text("请输入验证码")
        return false;
    }else if(num != value) {
        $(":text").eq(1).parent().next().text("验证码输入错误")
        return false;
    }else {
        $(":text").eq(1).parent().next().text("验证码输入正确")
    }
    return true;
}

// 登录验证
$(":submit").click(function() {
    if(creatYou() && creatPass() && CreatYan()) {
        alert("注册成功！")
        $("form").submit();
    }else {
        return false;
    }
})


$("#btn").on("click",function() {
    $.ajax({
        type: "post",
        url: "http://localhost:3000/user/register",
        data: {
            uname: $("#email").val(),
            pwd: $("#pwd").val(),
            code: $("#code").val()
        },
        xhrFields: {   //跨域请求session
            withCredentials: true
        },
        success:function(response) {
            if(response.code) {
                alert(response.msg)
            }else {
                location.href = "./login.html"
            }
        }
    })
})
