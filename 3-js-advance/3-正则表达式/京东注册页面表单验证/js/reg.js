window.onload = function () {
    // 手机号验证
    let regTel = /^1[3-9]\d{9}$/
    let tel = document.querySelector('#tel')
    regexp(tel, regTel)

    // QQ验证 
    //第一个qq号为10000
    let regQQ = /^[1-9]\d{4,}$/
    let qq = document.querySelector('#qq')
    regexp(qq, regQQ)

    //昵称为2~8个汉字
    let regNC = /^[\u4e00-\u9fa5]{2,8}$/
    let nc = document.querySelector('#nc')
    regexp(nc, regNC)

    //密码为6~16位的数字，英文字母，-，_的组合。
    let regPwd = /^[0-9a-zA-Z_-]{6,16}$/
    let pwd = document.querySelector('#pwd')
    regexp(pwd, regPwd)

    // 确认密码验证
    let surepwd = document.querySelector('#surepwd')
    surepwd.onblur = function () {
        if (this.value === pwd.value) {
            this.nextElementSibling.className = "success"
            this.nextElementSibling.innerHTML = `<i class="success_icon"></i>`
        } else {
            this.nextElementSibling.className = "error"
            this.nextElementSibling.innerHTML = `<i class="error_icon"></i> 两次密码不一样`
        }
    }

    function regexp(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = "success"
                this.nextElementSibling.innerHTML = `<i class="success_icon"></i>`
            } else {
                this.nextElementSibling.className = "error"
                this.nextElementSibling.innerHTML = `<i class="error_icon"></i> 格式输入有误`
            }
        }
    }


}