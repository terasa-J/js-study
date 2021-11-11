// 封装成动画函数
// var obj = {};
// obj.name = 'andy';
// 给不同的元素指定了不同的定时器
function animate(obj, target, callback) {
  // 当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多的定时器
  // 解决方案就是 让我们元素只有一个定时器执行
  // 先清除以前的定时器，只保留当前的一个定时器执行
  clearInterval(obj.timer)

  obj.timer = setInterval(function () {

    let step = (target - obj.offsetLeft) / 10
    // 当前进的时候，大于0，取大的数（靠近目标值）
    // 当后退的时候，小于0，取小的数（靠近目标值）
    step = step > 0 ? Math.ceil(step) : Math.floor(step)

    // 临界，不运动的条件
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer)
      // 存在回调则，调用回调函数
      callback && callback();
    }

    // 匀速动画 就是 盒子是当前的位置 +  固定的值 10 
    // 缓动动画就是  盒子当前的位置 + 变化的值(目标值 - 现在的位置) / 10）
    obj.style.left = obj.offsetLeft + step + 'px'
  }, 15)
};
