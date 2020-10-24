// 商品介绍|评价|售后保障选项卡功能
$(".sidl>.lii").click(function() {
    $(this).addClass("act").siblings().removeClass("act");
    $(this).find("a").addClass("txt").parent().siblings().find("a").removeClass("txt")
    $(".can").eq($(this).index()).addClass("active").siblings().removeClass("active")
})