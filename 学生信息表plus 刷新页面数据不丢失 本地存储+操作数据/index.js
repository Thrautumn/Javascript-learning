//读取数据 读出来是一个对象数组↓，他是一个数组！！！！！！
const arr = JSON.parse(localStorage.getItem('data')) || [] //逻辑中断

const tbody = document.querySelector('tbody')
//渲染： 先处理每一个tr→map，然后将tr合并→join，追加给tbody→innerHTML
function render () {
   //利用map方法处理数据后返回tr, map事实上是在遍历并处理数组内容
const tr = arr.map(function(ele , index) {
   return `
    <tr>
        <td>${ele.stuId}</td>
        <td>${ele.uname}</td>
        <td>${ele.age}</td>
        <td>${ele.salary}</td>
        <td>${ele.gender}</td>
        <td>${ele.city}</td>
        <td>${ele.time}</td>
        <td>
          <a data-id=${index} href="javascript:">
            <i class="iconfont icon-shanchu" ></i>
            删除
          </a>
        </td>
    </tr>
    `
  })
  // console.log(tr.join(''))
  //利用join方法将处理完后的数组拼接成为字符串类型，然后追加给body
  tbody.innerHTML = tr.join('')
  //显示有几条数据
  document.querySelector('.title span').innerHTML = arr.length
  }
 render()

 //录入数据
 const form = document.querySelector('form')
 const uname = document.querySelector('.uname')
 const age = document.querySelector('.age')
 const salary = document.querySelector('.salary')
 const gender = document.querySelector('.gender')
 const city = document.querySelector('.city')

 form.addEventListener('submit' , function(e) {
    //先组织默认事件
    e.preventDefault()

    //非空判断
    const check = document.querySelectorAll('[name]')
    for(let i = 0; i < check.length; ++i)
    {
      if(check[i].value === '')
      {
        return alert('输入内容不能为空')
      }
    }

  //追加至数组
    arr.push({
      stuId: arr.length ? arr.length : 1,
      uname: uname.value,
      age: age.value,
      salary: salary.value,
      gender: gender.value,
      city: city.value,
      time: new Date().toLocaleString()
    })
    
  //渲染表格
  render()
  //重置表单
  this.reset()
  //存储数据
  localStorage.setItem('data' , JSON.stringify(arr))
 })

//删除模块
//事件委托
tbody.addEventListener('click' , function(e) {
  if(e.target.tagName === 'A')
  {
    if(confirm('真的要删除这个数据吗'))//确认函数
    {
      arr.splice(e.target.dataset.id , 1)
      render()
      localStorage.setItem('data' , JSON.stringify(arr))
    }
  }
})