$(function () {
    // 1.点击全选
    $('.checkall').change(function () {
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'))
    });

    // 2.点击每一个商品的复选框
    $('.j-checkbox').change(function () {
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true)
        } else {
            $('.checkall').prop('checked', false)
        }
    });

    // 3.点击增加、删减 商品
    $('.increment').click(function () {
        // 注意：要从this出发，修改当前的数量框，，
        // 不能直接获取.itxt，会修改全部
        let n = $(this).siblings('.itxt').val()
        n++
        // 修改表单的内容，使用val()
        $(this).siblings('.itxt').val(n)
        // 4.计算每个商品的小计 = 单价 * 数量
        let price = $(this).parents('.p-num').siblings('.p-price').html();
        // 去掉￥符号
        price = price.substr(1)
        // 保留2位小数
        let total = '￥' + (price * n).toFixed(2)
        // 赋值
        $(this).parents('.p-num').siblings('.p-sum').html(total)
        // 汇总计算
        getSum()
    });

    $('.decrement').click(function () {
        let n = $(this).siblings('.itxt').val()
        if (n == 1) {
            return false
        }
        n--
        $(this).siblings('.itxt').val(n)
        // 4.计算每个商品的小计 = 单价 * 数量
        let price = $(this).parents('.p-num').siblings('.p-price').html();
        // 去掉￥符号
        price = price.substr(1)
        // 保留2位小数
        let total = '￥' + (price * n).toFixed(2)
        // 赋值
        $(this).parents('.p-num').siblings('.p-sum').html(total)
        // 汇总计算
        getSum()
    });

    // 5.用户修改文本框的数量，小计要一起变化
    $('.itxt').change(function () {
        let n = $(this).val()
        // 4.计算每个商品的小计 = 单价 * 数量
        let price = $(this).parents('.p-num').siblings('.p-price').html();
        // 去掉￥符号
        price = price.substr(1)
        // 保留2位小数
        let total = '￥' + (price * n).toFixed(2)
        // 赋值
        $(this).parents('.p-num').siblings('.p-sum').html(total)
        // 汇总计算
        getSum()
    });

    getSum();
    // 6.计算总计。总数量.使用循环 each
    function getSum() {
        // 数量
        let totalNum = 0;
        $('.itxt').each(function (i, ele) {
            totalNum += parseInt($(ele).val());
        })
        $('.amount-sum em').text(totalNum)
        // 价格
        let totalPrice = 0;
        $('.p-sum').each(function (i, ele) {
            totalPrice += parseFloat($(ele).text().substr(1));
        })
        $('.price-sum em').text('￥' + totalPrice.toFixed(2))
    }


})