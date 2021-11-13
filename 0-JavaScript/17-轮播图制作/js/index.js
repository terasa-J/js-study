window.addEventListener('load', function () {
    // 1. 获取元素
    let focus = document.querySelector('.focus');
    let arrowl = document.querySelector('.arrow-l');
    let arrowr = document.querySelector('.arrow-r');
    let focusWidth = focus.offsetWidth;

    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrowl.style.display = 'block'
        arrowr.style.display = 'block'
        // 停止图片自动轮播
        clearInterval(autoPlayTimer)
        autoPlayTimer = null
    })
    focus.addEventListener('mouseleave', function () {
        arrowl.style.display = 'none'
        arrowr.style.display = 'none'
        // 继续图片自动轮播
        autoPlayTimer = setInterval(function () {
            // 手动调用点击事件
            arrowr.click();
        }, 2000)
    })

    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    let ul = focus.querySelector('ul')
    let ol = focus.querySelector('ol')
    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            // 实现照片ul滚动
            let index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            animate(ul, -(index * focusWidth));
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';

    // 5.克隆第一张照片 cloneNode
    // 为了实现无缝切换，在最后放一张第一的图片
    let firstImg = ul.children[0].cloneNode(true);
    ul.appendChild(firstImg);

    // 6.右箭头绑定事件
    let num = 0;
    // 让小圆圈，同步变化
    let circle = 0;
    // 节流阀变量
    let flag = true;
    arrowr.addEventListener('click', function () {
        if (flag) {
            flag = false
            if (num === ul.children.length - 1) {
                // 无缝切换，复原第一张，在最后一个li中也放入第一张图片
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -(num * focusWidth), function () {
                flag = true
            })

            // 改变小圆圈的样式
            circle++
            if (circle === ol.children.length) {
                circle = 0;
            }
            circleChange()
        }
    })


    // 7.左箭头绑定事件
    arrowl.addEventListener('click', function () {
        if (flag) {
            flag = false
            // 当前为第一张的时候
            if (num === 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -(num * focusWidth))

            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange()
        }
    })

    // 提取圆圈滚动公共方法
    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current'
    }

    // 8.自动播放功能
    let autoPlayTimer = setInterval(function () {
        // 手动调用点击事件
        arrowr.click()
    }, 2000)
})