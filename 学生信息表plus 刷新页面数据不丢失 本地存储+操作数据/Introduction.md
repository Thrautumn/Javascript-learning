### 关于刷新不丢失数据的学生信息表的实现思路

#### 一、需求分析  
* 录入学生信息，刷新页面的时候数据不会丢失
* 不用新增节点的方式渲染表格
* 在删除的时候，弹出确认框“确认要删除这个数据吗”
---
#### 二、实现思路
##### 1. 录入模块
* 非空判断：获取每个input元素的value，如果有```.value === ''```那么就发送提醒```alert('')```。
* 将获取的信息变成对象，然后存入数组(```arr.push()```)
* 渲染表格，之后将数组存入本地数据(```localStorage.setItem()```)
* 提醒： 此处的数组应该是提前获取的，事实上就是本地数据(```localStorage.getItem```)，但是如果本地数据为空时，就获取一个空数组（可以利用逻辑中断```|```实现）
  
##### 2.渲染模块（*）
我们处理数据并渲染的思路如下，不再新增DOM节点（```document.createElement()```）。
![alt text](../微信图片_20240515224629.png)
* 通过操作本地存储。首先获取本地存储里面的所有数据
```JSON.parse(localStorage.getItem('data'))```（注意需用通过JSON字符串运算得到里面的数据，得到的是一个装满对象信息的==对象数组==）
* 然后通过数组函数```arr.map(function)```去改写数组元素，将数组中的每一个对象改写成```<tr></tr>```的形式，从而得到一个由全部所需的tr模板所组成的数组
* 然后通过数组函数```arr.join()```==统一==（这里就是与增加节点不同的地方）合并成一个字符串```<tr>内容1</tr> <tr>内容2</tr> <tr>内容3</tr> ...... <tr>内容n</tr>```
* 最后将这字符串写入```tbody.innerHTML```即可。

##### 3. 删除模块
* 依然可以通过事件委托来解决，依然需要给每个对象与```<a></a>```添加id属性，通过id属性进行检索。
* 关于确认，可以使用```confirm('text')```方法。

---
#### 三、具体实现
##### 1. 渲染模块
```Javascript
//读取数据 读出来是一个对象数组↓，他是一个数组！！！！！！
const arr = JSON.parse(localStorage.getItem('data')) || [] //逻辑中断

const tbody = document.querySelector('tbody')
//渲染： 先处理每一个tr→map，然后将tr合并→join，追加给tbody.innerHTML

function render () {
   //利用map方法处理数据后返回tr, map事实上是在遍历并处理数组内容
   // ele表示数组元素； index表示索引号
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
          <a data-id=${index} href="javascript:">  //对a标签添加索引号
            <i class="iconfont icon-shanchu" ></i>
            删除
          </a>
          
        </td>
    </tr>
    `
  })

  //利用join方法将处理完后的数组拼接成为字符串类型，然后追加给body
  tbody.innerHTML = tr.join('') // 表示中间以''空字符链接

  //显示有几条数据
  document.querySelector('.title span').innerHTML = arr.length
  }
 render()
```

##### 2. 录入模块
```Javascript
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
        // 不要忘记写上 return
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
      time: new Date().toLocaleString() //日期方法，获取实时日期
    })
    
  //渲染表格
  render()
  //重置表单，经常忘！！！
  this.reset()
  //存储数据
  localStorage.setItem('data' , JSON.stringify(arr)) //将复杂数据存入本地的时候，需要利用JSON.stringify()函数，将复杂数据转化成字符串之后再存入本地。
 })
```

##### 3. 删除模块
```Javascript
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
```

---
#### 四、感谢阅读