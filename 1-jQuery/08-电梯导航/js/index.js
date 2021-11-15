$(function() {
    let top = $('.recommend').offset().top;
    let flag = true;
    // 初始化，需要调取这个方法
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= top) {
            $('.fixedtool').css('display', 'block')
        } else {
            $('.fixedtool').css('display', 'none')
        }
    }

    // 1.当页面，到达今日推荐---显示左边的 导航栏
    $(window).scroll(function() {
        toggleTool();

        if (flag) {
            // 4.页面内容滚动，对应的导航同步变红色
            $('.floor .w').each(function(index, ele) {
                if ($(document).scrollTop() > $(ele).offset().top) {
                    $('.fixedtool li').eq(index).addClass('current').siblings().removeClass('current')
                }
            })
        }

    })

    // 2.点击导航栏，滚动到具体的内容
    $('.fixedtool li').click(function() {
        flag = false
        let current = $('.floor .w').eq($(this).index()).offset().top;
        // 元素，发生动画。不是document对象  发生 动画
        $('bodt,html').stop().animate({
            scrollTop: current
        }, function() {
            flag = true
        })

        // 3.当前点击的，导航，变成红色
        $(this).addClass('current').siblings().removeClass('current')
    })

})