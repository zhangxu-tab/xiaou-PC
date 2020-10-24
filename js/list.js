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

let init = () => {
    firstRequest()
    initEvent()
    shopwindow()
}

let initEvent = () => {
    $("#first").on("click","li",firstClick);
    $("#second").on("click","li",secondClick);
    $("#third").on("click","li",thirdClick);
}
// 商品分类
let firstRequest = async () => {
    let {result:{data}} = await myAjax({
        url:"http://localhost:3000/category/first"
    })
    let html = template("firstTemp",{data,activeIndex:0})
    $("#first").html(html)
    let first_id = data[0].first_id
    secondRequest(first_id)
}

let secondRequest = async (first_id) => {
    let {result:{data}} = await myAjax({
        url:"http://localhost:3000/category/second",
        data:{first_id}
    })
    let html = template("secondTemp",{data,activeIndex:0})
    $("#second").html(html)
    let second_id = data[0].second_id;
    thirdRequest(second_id)
}

let thirdRequest = async (second_id) => {
    let {result:{data}} = await myAjax({
        url:"http://localhost:3000/category/third",
        data:{second_id}
    })
    let html = template("thirdTemp",{data,activeIndex:0})
    $("#third").html(html)
    let third_id = data[0].thired_id
    goodList(third_id)
}

let goodList = async (third_id) => {
    let {result:{data}} = await myAjax({
        url:"http://localhost:3000/category/goodslist",
        data:{third_id}
    })
    let html = template("goodsListTemp",{data})
    $("#goodsList").html(html)
}

let firstClick = function() {
    $(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active")
    let first_id = $(this).data("id")
    secondRequest(first_id)
}

let secondClick = function() {
    $(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active")
    let second_id = $(this).data("id")
    thirdRequest(second_id)
}

let thirdClick = function() {
    $(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active")
    let third_id = $(this).data("id");
    goodList(third_id)
}

// 商品推荐
let shopwindow = async () => {
    let {result:{data}} = await myAjax({
        url:"http://localhost:3000/goods/shopwindow"
    })
    let html = template("shopwindowTemp",{data})
    $("#out").html(html)
}

init()