let that;
class Tab {
    constructor(id) {
        that = this
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
        this.tabadd.onclick = this.addTab;

        // 每一个小li的点击
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i
            // 不能加括号，不然就直接触发了，
            // 这里表示，等于这个function方法，不是调用
            this.lis[i].onclick = this.toggleTab
        }
    }
    // 1.切换功能
    toggleTab() {
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
    // 获取所有li与section
    updateNode() {
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
    }
    // 2.添加功能
    addTab() {
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
    removeTab() { }

    // 4.修改功能
    editTab() { }

}
new Tab('#tab')