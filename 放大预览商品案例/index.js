const middle = document.querySelector('.middle')
const small = document.querySelector('.small')
const large = document.querySelector('.large')

//事件委托，实现鼠标经过tab栏切换
//用mouseover而不是mouseleave
small.addEventListener('mouseover' , function (e) {
    if(e.target.tagName === 'IMG')
    {
        //清除已有
        this.querySelector('.active').classList.remove('active')
        //添加
        //注意是给img的父亲<li></li>去添加，用到父元素节点parentNode
        e.target.parentNode.classList.add('active')

        //给左侧显示盒子换同样的图片
        middle.querySelector('img').src = e.target.src

        //给大盒子加上相同的图片
        large.style.backgroundImage = `url(${e.target.src})`
    }
})

//鼠标经过以及显示
//延迟消失 → 定时器
let timer = null

function show () {
    //先清除定时器，如果有的话
    clearInterval(timer)
    large.style.display = 'block'
}

function hide () {
    timer = setTimeout(function () {
        large.style.display = 'none'
    } , 200)
}

//经过中等盒子（预览图）→显示大盒子
//鼠标经过大盒子的时候也要显示大盒子
large.addEventListener('mouseenter', show)
middle.addEventListener('mouseenter', show)

large.addEventListener('mouseleave', hide)
middle.addEventListener('mouseleave', hide)

//黑色遮罩层
const layer = document.querySelector('.layer')

//经过中等盒子。显示遮罩层
middle.addEventListener('mouseenter' , function() {
    layer.style.display = 'block'
})
middle.addEventListener('mouseleave' , function() {
    layer.style.display = 'none'
})

//移动黑色遮罩盒子

middle.addEventListener('mousemove' , function(e) {
    //得到鼠标相对于中等盒子的坐标x
    //.pageX 相对整个视口的x坐标
    //.getBoundingClientRect() 得到该元素相对于整个视口的坐标（包括x，y）
    let x = e.pageX - middle.getBoundingClientRect().left
    //对于y之而言，还要减去头部被卷去的大小，否则会出现光标和black layer不在同一图层上的效果
    let y = e.pageY - middle.getBoundingClientRect().top - document.documentElement.scrollTop

    //限制black layer的移动范围
    //通过鼠标的坐标去关联layer的坐标
    if(x >= 0 && x <= 400 && y >= 0 && y <= 400)
    {
        //xy坐标，当在0-100、300-400内，layer不能移动
        //在100-300内可以移动

        let x1 = 0, y1 = 0

        if(x < 100)
        {
            x1 = 0
        }
        else if(x >= 100 && x <= 300)
        {
            x1 = x - 100
            //layer可以动了
        }
        else if(x > 300)
        {
            x1 = 200
        }

        if(y < 100)
        {
            y1 = 0
        }
        else if(y >= 100 && y <= 300)
        {
            y1 = y - 100
            //layer可以动了
        }
        else if(y > 300)
        {
            y1 = 200
        }

        layer.style.left = x1 + 'px'
        layer.style.top = y1 + 'px'

        //再去关联大盒子的图片
        large.style.backgroundPositionX = -2 * x1 + 'px'
        large.style.backgroundPositionY = -2 * y1 + 'px'
    }
})