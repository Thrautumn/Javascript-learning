### 这是关于渲染学生信息表实现的思路说明（操作DOM节点）

#### 一、需求分析
* 点击录入按钮可以录入输入的数据
* 当输入内容有空白时，提醒数据不能为空
* 点击删除按钮可以删除当前数据
---
#### 二、编写思路
##### 1. 录入模块
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先获取表单```form```里面的相关数据（```.value```属性）（十分重要，不要忘记！），之后我们可以==新建一个数组==，用于存储获取过来的对象。然后每点击录入的时候相当于创建一个对象，然后追加```arr.push```至数组当中，然后再通过渲染模块将数据渲染出来即可。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下面是一些细节：
* 在对```form```绑定```submit```事件的时候，需要==阻止默认事件的发生==，表单的默认事件是跳转，所以需要通过事件对象```e.preventEvent()```去阻止默认事件的发生
* 在录入数据前，我们需要检测是否有数据为空。这时我们可以全选```form```中的```[name]```属性（事实上就是选中那些文本框和复选框），判断其值是否为空。空则需要提示。
* 在渲染前，我们需要清空表格中的所有数据，==不然渲染会在原基础上再渲染一次==。比如说第一次渲染出1。然后追加数据2，渲染模块又会渲染1、2出来，表格中出现1 12（再追加3就变成1 121 23）（```.tbody.innerHTML = ''```）
* 同时也要清除录入框的内容，用到表单的方法```form.reset```重置表单
##### 2. 渲染模块
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;渲染模块一直是需要使用函数封装的，因为在删除数据、录入数据的时候都需要调用该函数。可以通过遍历获取到的对象数组，然后创建节点```document.crateElement('tr')```，生成所有的tr模板，然后通过增加节点```parent.appendchild()```==逐一==（注意是逐一，每循环一次加一个）追加(```parent.appendChild()```)至```tbody```里面即可。
<center>记得调用函数！！!</center>

##### 3. 删除模块
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 可以考虑事件委托（多按钮情形）（并且结构较为简单），并且点击删除按钮可以检索到对应的对象，就可以用到 之前所讲的自定义属性，并且在```document.creatElement()```中就给```<a></a>```添加自定义属性```data-id= ```，然后在由此找到对应数据删除即可(```arr.splice()```)。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注意在渲染前还是要==清空表格内容==

---
#### 三、具体实现
##### 1. 录入模块
  ```Javascript
    const stu = []
    //注册事件是“提交”事件 submit
    const info = document.querySelector('.info')
    info.addEventListener('submit', function (e) {
    //首先防止事件跳转（表单的默认事件）
    e.preventDefault()

    //获取相关提交的数据
    const uname = document.querySelector('.uname')
    const age = document.querySelector('.age')
    const gender = document.querySelector('.gender')
    const salary = document.querySelector('.salary')
    const city = document.querySelector('.city')

    //追加前看看有没有空的输入内容
    const check = document.querySelectorAll('[name]')//属性选择器写法
    for(let i = 0; i < check.length; ++i)
    {
        if(check[i].value === '')
        {
            return alert('输入内容不能为空')
        }
    }
    
    //将对象追加至数组里里面
    const obj = {
        id : stu.length + 1,
        name : uname.value, 
        age : age.value,
        gender : gender.value,
        salary : salary.value,
        city : city.value
    }
    stu.push(obj)

    //先清空录入模块的内容
    info.reset()

    //防止多渲染多条数据，因为没有清除tbody内容，上次的tbody内容仍保存，而渲染会把上一次数据又渲染一遍（比如第一次渲染1，追加内容2，下次渲染会在1的基础上渲染出1和2）
    tbody.innerHTML = ''

    //渲染数据，但由于录入需要渲染，删除后也需要渲染，所以渲染模块可以考虑封装成函数
    render()
})
  ```

##### 2. 渲染模块 
  ```Javascript
    const tbody = document.querySelector('tbody')

function render () {
    for(let i = 0; i < stu.length; ++i)
    {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${stu[i].id}</td>
            <td>${stu[i].name}</td>
            <td>${stu[i].age}</td>
            <td>${stu[i].gender}</td>
            <td>${stu[i].salary}</td>
            <td>${stu[i].city}</td>
            <td>
                <a href="javascript:" data-id=${i} >删除</a> //添加自定义属性
            </td> `
        tbody.appendChild(tr)
    }
}
  ```

##### 3. 删除模块
  ```Javascript
    //删除模块 由于都是删除按钮太多，可以考虑采用事件委托，委托给tbody
    tbody.addEventListener('click' , function (e) {
    if(e.target.tagName === 'A')
    {
        //删除时需要知道这个删除的a标签对应的是数组中哪个对象
        //所以可以考虑自定义数组的id值，即在渲染数据的时候就给a加上自定义属性。
        //可以猜测：事件委托一般都与自定义数组连用
        //data-id=  dataset.id
        stu.splice(e.target.dataset.id , 1)
        tbody.innerHTML = ''
        render()
    }
})
  ```

---
#### 四、感谢阅读

