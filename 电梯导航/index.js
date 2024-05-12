// 下滑至指定区域时显示电梯导航，返回顶部
(function () {
    const entry = document.querySelector('.xtx_entry')
    const elevator = document.querySelector('.xtx-elevator')
   
    //给页面添加滚动事件
    window.addEventListener('scroll', function () {
      // 被卷去的头部大于 300 
      const n = document.documentElement.scrollTop
      elevator.style.opacity = n >= entry.offsetTop ? 1 : 0
    })

    // 点击返回页面顶部
    const backTop = document.querySelector('#backTop')
    backTop.addEventListener('click', function () {
        window.scrollTo(0, 0)
      //也可以写成 document.documentElement.scrollTop = 0
      
    })
  })();



//点击对应模块，跳转对应位置
//利用事件委托

const list = document.querySelector('.xtx-elevator-list')
list.addEventListener('click' , function (e) {
    if(e.target.tagName === 'A')
    {
        const active = document.querySelector('.xtx-elevator-list .active')
        //先判断有无active类名，有就移除，没有就不管
        //不判断可能出现压根没有这个类名却要移除，产生bug
        if(active)//若无，则avtive值为null（假）
        {
            active.classList.remove('active')
        }
        e.target.classList.add('active') //给点击的按钮添加高亮显示
        const top = document.querySelector(`.xtx_goods_${e.target.dataset.name}`).offsetTop
        //巧妙地将电梯导航的自定义属性与模块的类名联系起来，使得能够通过电梯导航去找到对应的模块
        document.documentElement.scrollTop = top
    }
})

//滑到对应位置范围，添加高亮显示效果
//滚动时先移除，后添加
window.addEventListener('scroll' , function () {
    const active = document.querySelector('.xtx-elevator-list .active')
    if(active)//若无，则avtive值为null（假）
    {
        active.classList.remove('active')
    }
    
    const news = document.querySelector('.xtx_goods_new')
    const popular = document.querySelector('.xtx_goods_popular')
    const brand = document.querySelector('.xtx_goods_brand')
    const topic = document.querySelector('.xtx_goods_topic')
    const n = document.documentElement.scrollTop

    if(n >= news.offsetTop && n < popular.offsetTop)
    {
        document.querySelector('[data-name=new]').classList.add('active')
        //注意关注自定义属性选择器的写法
    }
    else if (n >= popular.offsetTop && n < brand.offsetTop)
    {
        document.querySelector('[data-name=popular]').classList.add('active')
    }
    else if (n >= brand.offsetTop && n < topic.offsetTop)
    {
        document.querySelector('[data-name=brand]').classList.add('active')
    }
    else if (n >= topic.offsetTop)
    {
        document.querySelector('[data-name=topic]').classList.add('active')
    }

})

