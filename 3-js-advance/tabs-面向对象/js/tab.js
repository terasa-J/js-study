// that 指向 整一个#tab  对象
// let that;
class Tab {
    constructor(id) {
        // that = this
        // 获取元素
        this.main = document.querySelector(id)

        this.tabadd = this.main.querySelector('.tabadd')
        // this.ul = this.main.querySelector('.fisrstnav ul:first-child')
        this.ul = this.main.querySelector('.fisrstnav ul')
        this.tabscon = this.main.querySelector('.tabscon')
        this.init()
    }

    // 初始化
    init() {
        // 先获取元素
        this.updateNode()

        // 绑定事件
        // 添加按钮
        this.tabadd.onclick = this.addTab.bind(this.tabadd, this);

        // 每一个小li的点击
        for (let i = 0; i < this.lis.length; i++) {
            // 给每一个li添加一个index属性
            this.lis[i].index = i
            // 不能加括号，不然就直接触发了，
            // 这里表示，等于这个function方法，不是调用
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this)
            this.removes[i].onclick = this.removeTab.bind(this.removes[i], this)
            this.spans[i].ondblclick = this.editTab
            this.sections[i].ondblclick = this.editTab
        }
    }
    // 1.切换功能
    toggleTab(that) {
        that.clearClass()
        // 此处this指，当前点击的li，li没有section
        this.className = 'liactive'
        // that指的是new Tab('#tab') 实例对象，有sections对象
        that.sections[this.index].className = 'conactive'
    }
    // 排他思想
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = ''
            this.sections[i].className = ''
        }
    }
    // 动态获取所有li与section
    updateNode() {
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.removes = this.main.querySelectorAll('.icon-guanbi')
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }
    // 2.添加功能
    addTab(that) {
        that.clearClass()
        let random = Math.random()
        let li = '<li class="liactive"><span>新的选项卡</span><span class="iconfont icon-guanbi"></span></li>'
        let section = '<section class="conactive"> 测试' + random + '</>'
        // insertAdjacentHTML: 可以支持dom字符串
        // 'beforeend'：插入元素内部的最后一个子节点之后
        that.ul.insertAdjacentHTML('beforeend', li)
        that.tabscon.insertAdjacentHTML('beforeend', section)
        // 重新绑定事件
        that.init()

    }

    // 3.删除功能
    removeTab(that, e) {
        // 由于父元素绑定了点击切换事件，所有应该阻止点击时冒泡
        // 取消事件冒泡的中的 tab切换
        e.stopPropagation();
        let index = this.parentNode.index
        // 移除li 与 section
        that.lis[index].remove()
        that.sections[index].remove()

        // 若删除的不是当前选中元素，即liactive样式已存在的，此时不需切换至上一个元素
        if (document.querySelector('.liactive')) return;
        // 若删除的是当前选中元素，则liactive样式已经不存在，，即自动切换至上一个元素
        index--;
        // 判空
        that.lis[index] && that.lis[index].click()
    }

    // 4.修改功能
    editTab() {
        // 双击时禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 此时this 指向双击的span，获取里面的文字
        let str = this.innerHTML;

        this.innerHTML = '<input type="text" />'
        let input = this.children[0]
        input.value = str
        // 让字体选中
        input.select()

        // 失去焦点事件
        input.onblur = function () {
            this.parentNode.innerHTML = this.value
        }
        // 回车键
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                // 手动调用输入框失去焦点事件
                this.blur()
            }
        }
    }

}
new Tab('#tab')