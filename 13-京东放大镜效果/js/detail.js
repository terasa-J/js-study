// 需要等页面元素加载完成后，再执行js代码，否则会找不到元素，所以添加load事件
window.addEventListener('load', function () {
  let preview_img = document.querySelector('.preview_img')
  let mask = document.querySelector('.mask')
  let big = document.querySelector('.big')
  let bigImg = document.querySelector('.bigImg')
  //1. 鼠标经过preview_img，遮罩层显示
  preview_img.addEventListener('mousemove', function () {
    mask.style.display = 'block'
    big.style.display = 'block'
  })
  // 2.鼠标离开preview_img，遮罩层隐藏
  preview_img.addEventListener('mouseout', function () {
    mask.style.display = 'none'
    big.style.display = 'none'
  })
  // 3.鼠标移动的时候，让黄色的盒子遮罩层跟着鼠标来走
  preview_img.addEventListener('mousemove', function (e) {
    //(1) mask相对与preview_img进行定位的，所以要进行相减
    let maskX = e.pageX - this.offsetLeft;
    let maskY = e.pageY - this.offsetTop;
    // 让鼠标在黄色层中居中，各减去一半
    maskX -= mask.offsetWidth / 2
    maskY -= mask.offsetHeight / 2

    // (2)计算最大的可以滚动的位置,以左边left/上边top为计算方式
    let minMaskX = 0
    let maxMaskX = preview_img.offsetWidth - mask.offsetWidth
    maskX = maskX <= minMaskX ? minMaskX : maskX
    maskX = maskX >= maxMaskX ? maxMaskX : maskX

    let minMaskY = 0
    let maxMaskY = preview_img.offsetHeight - mask.offsetHeight
    maskY = maskY <= minMaskY ? minMaskY : maskY
    maskY = maskY >= maxMaskY ? maxMaskY : maskY

    mask.style.left = maskX + 'px';
    mask.style.top = maskY + 'px';

    // (3)右边的大图片随着移动，根据比例去计算
    // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
    let maxBigImgX = bigImg.offsetWidth - big.offsetWidth;
    let maxBigImgY = bigImg.offsetHeight - big.offsetHeight;
    bigImg.style.left = -maskX * maxBigImgX / maxMaskX + 'px';
    bigImg.style.top = -maskY * maxBigImgY / maxMaskY + 'px';
  })
})