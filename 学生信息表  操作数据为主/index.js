//渲染模块
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
                <a href="javascript:" data-id=${i} >删除</a>
            </td> `
        tbody.appendChild(tr)
    }
}


//录入模块
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
    const check = document.querySelectorAll('[name]')
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
        name : uname.value, //获取umane的value值,别忘记加逗号,并注意对象的写法，是： 而不是=
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
        //删完重新渲染一次，默认重新排号了
        render()
    }
})