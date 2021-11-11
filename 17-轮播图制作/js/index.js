window.addEventListener('load', function() {
    // 1. 获取元素
    let focus = document.querySelector('.focus');
    let arrowl = document.querySelector('.arrow-l');
    let arrowr = document.querySelector('.arrow-r');
    let focusWidth = focus.offsetWidth;

    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrowl.style.display = 'block'
        arrowr.style.display = 'block'
    })
    focus.addEventListener('mouseleave', function() {
        arrowl.style.display = 'none'
        arrowr.style.display = 'none'
    })

    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    let ul = focus.querySelector('ul')
    let ol = focus.querySelector('ol')
    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            // 实现照片ul滚动
            let index = this.getAttribute('index');
            animate(ul, -(index * focusWidth));
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';

    // 5.右箭头绑定事件
    let num = 0;
    arrowr.addEventListener('click', function() {
        if (num === ul.children.length - 1) {
            // 无缝切换，复原第一张，在最后一个li中也放入第一张图片
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -(num * focusWidth))
    })
})