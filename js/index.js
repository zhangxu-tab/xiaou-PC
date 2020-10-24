// 置顶效果
$(".hou").click(function() {
    $("html").animate(
        {
            "scrollTop":0
        },3000,"linear"
    )
})

// 热门搜索关键字
$.ajax({
    "type":"get",
    "url":"http://www.ujiuye.tech:3000/api/hot",
    "success":function(response) {
        var {result} = response;
        var data = result.data;
        var str = "";
        data.forEach(function(value,index) {
            str += `<li>
                        <a href="#">${value.search_text}</a>
                        <span>|</span>
                    </li>`
        })
        $(".search>ul").html(str);
        $(".search>ul>li:last>span").remove();
    }
})

// 面向过程
// 入口函数
let init = () => {
    guessLike()
    banner()
    goods_list()
    popularityRequest()
    block()
    rank()
    limit()
}
// 猜你喜欢词汇请求
let guessLike = async () => {
    let {result} = await myAjax({
        url:"http://localhost:3000/api/like"
    })
    let html = template("like",result);
    $(".main").html(html);
}

// 轮播图
let banner = async () => {
    let {result} = await myAjax({
        url:"http://localhost:3000/api/banner"
    })
    show(result.data)
    let html = template("pic",result);
    $(".bannr").html(html);
}
function show(data) {
    var n = 0;
    $.each(data,function(index,value) {
        $(".box").append("<span></span>")
    })
    $(".bannr>li").eq(0).fadeIn();
    $(".bnner .box>span").eq(0).addClass("cir1");
    
    // 鼠标单击小圆点的效果
    $(".box").on("click","span",function() {
        $(this).addClass("cir1").siblings().removeClass("cir1");
        //找下标 某元素.index()
        var index = $(this).index();
        $(".bannr>li").eq(index).fadeIn(3000).siblings().fadeOut(3000);
        n = index;
    })

    // 自动轮播
    var timer = setInterval(autoNext,3000);
    function autoNext() {
        n++;
        if(n == data.length) {
            n = 0;
        }
        $(".bannr>li").eq(n).fadeIn(3000).siblings().fadeOut(3000);
        $(".bnner .box>span").eq(n).addClass("cir1").siblings().removeClass("cir1");       
    }

    // 鼠标的移入移出
    $(".bnner").mouseover(function() {
        clearInterval(timer);
    })
    $(".bnner").mouseout(function() {
        timer = setInterval(autoNext,3000);
    })

    // 左右键的效果
    $(".show").click(function() {
        n--;
        if(n < 0) {
            n = data.length - 1;
        }
        $(".bannr>li").eq(n).fadeIn(3000).siblings().fadeOut(3000);
        $(".bnner .box>span").eq(n).addClass("cir1").siblings().removeClass("cir1");       
    })
    $(".show1").click(function() {
        n++;
        if(n == data.length) {
            n = 0;
        }
        $(".bannr>li").eq(n).fadeIn(3000).siblings().fadeOut(3000);
        $(".bnner .box>span").eq(n).addClass("cir1").siblings().removeClass("cir1");       
    })
}

// 产品分类
let goods_list = async () => {
    let {result} = await myAjax({
        url:"http://www.ujiuye.tech:3000/api/category/first"
    })
    let html = template("goods",result)
    $(".list>ul").html(html)
    $(".list>ul>li>span:last").remove()
}

// 人气好货
let popularityRequest = async () => {
    let {result} = await myAjax({
        url:"http://localhost:3000/api/popularity"
    })
    let html = template("popularityTemp",result);
    $("#popularity").html(html);
}

// 各大版块
let block = async () => {
    let {result} = await myAjax({
        url:"http://localhost:3000/api/home"
    })
    let html = template("clothTemp",result)
    $(".cloth").html(html)
}

// 限时抢购
let limit = async () => {
    let {result} = await myAjax({
        url:"http://www.ujiuye.tech:3000/api/flash"
    })
    let data = result.data

    let x = Object.values(data[0])
    let a = Object.values(x[0])
    let tm = x[1]

    let y = Object.values(data[1])
    let b = Object.values(y[0])
    let ti = y[1]

    let result1 = [{aa:a,te:tm},{aa:b,te:ti}]
    let html = template("shopTemp1",{result1})
    $(".shop>.left>.top").append(html)
    $(".shop .top .t1:first").addClass("act")
    $(".shop .top .t1:first").next().find(".cha").text(":00场-即将开抢")
    
    let html1 = template("shopTemp2",{result1})
    $(".cnt").html(html1)
    $(".cnt .shipin").eq(0).addClass("actv")

    // 选项卡效果
    $(".shop .top .t1").click(function() {
        $(this).addClass("act").siblings().removeClass("act")
        let index = $(this).index()
        $(".cnt .shipin").eq(index).addClass("actv").siblings().removeClass("actv")
    })
    // 倒计时
    time_show()
    setInterval(time_show,1000)
}
function time_show() {
    let now = new Date()

    let tt2 = $(".leftR>div>.sec").eq(1).text()
    let t2 = Number(tt2)
    let further = new Date()
    further.setHours(t2)
    further.setMinutes(00)
    further.setSeconds(00)

    let miao = add(parseInt((further - now) / 1000))
    let hour = add(parseInt(miao % 86400 / 3600))
    let mis = add(parseInt(miao % 3600 / 60))
    let sec = add(parseInt(miao % 60))

    $(".d3>div").eq(0).text(hour)
    $(".d3>div").eq(1).text(mis)
    $(".d3>div").eq(2).text(sec)
}
// 添加前导0
function add(value) {
    return value < 10?'0'+value:value
}

// 排行榜
let rank = async () => {
    let {result} = await myAjax({
        url:"http://localhost:3000/api/ranking"
    })
    let html = template("rankTemp",result);
    $(".bang").append(html)

    $(".qingdan>li:first").addClass("active")
    $(".cuxiao:first").addClass("act")

    $(".qingdan>li").click(function() {
        $(this).addClass("active").siblings().removeClass("active")
        let index = $(this).index()
        $(".cuxiao").eq(index).addClass("act").siblings().removeClass("act")
    })
}


init()