// 手机号/会员名/邮箱的判断
$(":text:eq(0)").blur(CreatTel);
function CreatTel() {
    var value = $(":text:eq(0)").val();
    var phone = /^1(3|5|7|8)\d{9}$/
    var name = /^[a-z][a-z0-9]{1,9}$/i;
    var you = /^\w{5,8}@[0-9a-z]{2,6}[.](com|cn)$/

    if(value == "") {
        $(":text:eq(0)").next().text("请输入值")
        return false;
    }else if(phone.test(value) == true || name.test(value) == true || you.test(value) == true) {
        $(":text:eq(0)").next().text("输入成功！")
        return true;
    }
}
// 密码的检测
$(":password").blur(CreatPass);
function CreatPass() {
    var value = $(":password").val();
    var pattern = /\w{6,12}/;
    if(value == "") {
        $(":password").next().text("请输入值")
        return false;
    }else if(pattern.test(value) == false) {
        $(":password").next().text("账号格式不正确")
        return false;
    }else {
        $(":password").next().text("输入成功！")
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
        $(":text").eq(1).next().next().text("请输入值")
        return false;
    }else if(num != value) {
        $(":text").eq(1).next().next().text("验证码输入错误")
        return false;
    }else {
        $(":text").eq(1).next().next().text("验证码输入正确")
    }
    return true;
}

//登录验证
$(":submit").click(function() {
    if(CreatTel() && CreatPass() && CreatYan()) {
        alert("登录成功!")
        $("form").submit();
    }else {
        return false;
    }
})


$("#up").on("click",function() {
    $.ajax({
        type: "post",
        url: "http://localhost:3000/user/login",
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
                location.href = "./index.html"
            }
        }
    })
})