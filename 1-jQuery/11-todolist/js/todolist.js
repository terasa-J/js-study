$(function () {
  load()

  // 1.文本框 绑定事件
  $('#title').on('keydown', function (event) {
    // 13 回车键的ascii码
    if (event.keyCode === 13) {
      // 文本框属性 val
      let content = $(this).val()
      // 空内容，不添加
      if (content === '') { return false; }
      // 先读取本地存储原来的数据
      let data = getData();
      // 把local数组进行更新数据 把最新的数据追加给local数组
      data.push({
        title: $(this).val(),
        done: false
      })
      // 把这个数组local 存储给本地存储
      saveData(data)
      // 2. toDoList 本地存储数据渲染加载到页面
      load()
      // 清空输入文本框
      $(this).val('')
    }
  })

  // 2.勾选框事件
  $('ol,ul').on('change', 'input', function () {
    let data = getData();
    // 自定义属性 attr
    let index = $(this).siblings('a').attr('id')
    // 标签自带 prop
    data[index].done = $(this).prop('checked')
    // 保存数据
    saveData(data)
    // 渲染
    load()
  })

  // 3.删除事件
  $('ol,ul').on('click', 'a', function () {
    // 获取数据
    let data = getData();
    let index = $(this).siblings('a').attr('id')
    data.splice(index, 1)
    // 保存数据
    saveData(data)
    // 渲染
    load()
  })

  // 获取本地存储
  function getData() {
    let localData = localStorage.getItem('todoList');
    if (localData !== null) {
      return JSON.parse(localData)
    } else {
      return []
    }
  }

  // 保存本地存储
  function saveData(data) {
    localStorage.setItem('todoList', JSON.stringify(data))
  }

  // 渲染页面
  function load() {
    let data = getData();
    // 页面会初始化，调用渲染方法。需先清空ul/ol
    $('ol,ul').empty()
    // 统计汇总
    let todocount = 0
    let donecount = 0

    $.each(data, function (index, item) {
      if (item.done) {
        $('ul').prepend(
          '<li><input type="checkbox" checked>' + item.title + '<a href="javascript:;" id=' + index + '></a></li>'
        )
        donecount++
      } else {
        $('ol').prepend(
          '<li><input type="checkbox">' + item.title + '<a href="javascript:;" id=' + index + '></a></li>'
        )
        todocount++
      }
    })

    $('#todocount').text(todocount)
    $('#donecount').text(donecount)
  }
})