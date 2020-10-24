// 全选功能
$(":checkbox").eq(0).click(function() {
    $(":checkbox").prop('checked',true);
    $(".row").addClass("color")
})
$(":checkbox").eq(5).click(function() {
    $(":checkbox").prop('checked',true);
    $(".row").addClass("color")
})
// 删除选中商品
$(".row").find("input").each(function(index,value) {
    $(value).click(function() {
        if($(this).prop("checked") == true) {
            $(this).parent().addClass("color");
            $(this).parent().find(".qi").click(function() {
                $(this).parent().parent().addClass("active")
            })
        }else {
            $(this).parent().removeClass("color");
        }
    })
})
// 购买数量按钮
$(".box").each(function(index,value) {
    var num = 0;
    $(value).find("span").eq(0).click(function() {
        num--;
        if(num <= 1) {
            num = 1;
        }
        $(value).find("span").eq(1).text(num);
    })
    $(value).find("span").eq(2).click(function() {
        num++;
        $(value).find("span").eq(1).text(num);
    })
})
// 删除单商品
$(".row>.zuo").each(function(index,value) {
    $(value).find(".qi").click(function() {
        $(this).parent().parent().addClass("active")
    })
})