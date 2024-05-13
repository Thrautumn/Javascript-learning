### 这是关于电梯导航实现的思路说明
---
#### 一、需求分析
* 在鼠标下滑到指定区域的时候，显示电梯导航栏
* 点击相应的标签，跳转到对应的区域，同时标签显示高亮
* 鼠标滑动到相应区域时，电梯导航中的对应标签显示高亮
* 点击返回顶部时，返回至最顶端
---
#### 二、编写思路
* 显示电梯导航：获取页面下滑的高度（```document.documentElement.scrollTop```）,再将其与指定模块距离顶部的高度(```item.offsetTop```)比较即可，当满足条件时，让item的```opacity``` = 1即可。
*  点击相应的标签跳转至对应的区域：可以考虑==事件委托==（与tab栏切换十分类似）首先给父元素ul绑定```click```事件，并获取事件对象```e```，目的是可以获取点击对象的文字信息（比如它所对应的区域）。此时可以采取一种比较巧妙的方法，即：在电梯导航栏中的标签设定==自定义属性==```data-name```与区域的类名相挂钩。比如：
    ```Html
    <div class="index-point2"></div>
    <div class="index-point3"></div>
    <div class="index-point4"></div>
    <div class="index-point5"></div>

    <ul>
        <li><a href="" data-name="point2"></a></li>
        <li><a href="" data-name="point3"></a></li>
        <li><a href="" data-name="point4"></a></li>
        <li><a href="" data-name="point5"></a></li>
    </ul>
    ```
    如此以一来，通过```e.target.dataset.name```获取自定义名字，再将其作为变量放进``` `index-${e.target.dataset.name}` ```就可以获取目标区域的相关属性了。 
* 显示高亮：注意这里与之前slider中的显示高亮有所区别。这里的标签==初始并没有```active```类名==。所以这里如果和以往一样直接移除类名，由于并没有类名可以被移除，所以会产生bug。解决方法也很简单：在移除前先判断有无```active```类名可供移除，有就移除，没有就不管。然后再添加上```active```类名即可。
* 鼠标滑动到对应区域时，电梯导航高亮显示：先对整个页面绑定滚动事件（```window.addEventListen('scroll', ...)```）。然后如法炮制移除```active```类名，添加类名，并且在```document.documentElement.scrollTop```满足一定的高度时添加```active```类名即可。
* 为了页面的跳转比较丝滑，可以在css中加上
  ```css 
  html {
    scroll-behavior: smooth;
  }
  ```
---
#### 三、具体实现
1. 显示电梯导航栏
     ```Javascript
    const point1 = document.querySelector('.point1')
    const elevator = document.querySelector('.elevator')
   
    //给页面添加滚动事件
    window.addEventListener('scroll', function () {
      const n = document.documentElement.scrollTop
      elevator.style.opacity = n >= point1.offsetTop ? 1 : 0
    })

    // 点击返回页面顶部
    const backTop = document.querySelector('#backTop')
    backTop.addEventListener('click', function () {
        window.scrollTo(0, 0)
      //也可以写成 document.documentElement.scrollTop = 0
    })
   ```
2. 点击标签跳转
    先展示html：
    ```Html
    <div class="index-point2"></div>
    <div class="index-point3"></div>
    <div class="index-point4"></div>
    <div class="index-point5"></div>

    <ul class="elevator-list">
        <li><a href="" data-name="point2"></a></li>
        <li><a href="" data-name="point3"></a></li>
        <li><a href="" data-name="point4"></a></li>
        <li><a href="" data-name="point5"></a></li>
    </ul>
    ```
    下面是Javascript：
    ``` javascript
    const list = document.querySelector('.elevator-list')
    list.addEventListener('click' , function (e) {
    if(e.target.tagName === 'A') //如果点击的是<a></a>标签
    {
        const active = document.querySelector('.elevator-list .active')
        //先判断有无active类名，有就移除，没有就不管
        //不判断可能出现压根没有这个类名却要移除，产生bug
        if(active)//若无，则avtive值为null（假）
        {
            active.classList.remove('active')
        }
        e.target.classList.add('active') //给点击的标签添加高亮显示
        const top = document.querySelector(`.index-${e.target.dataset.name}`).offsetTop
        //巧妙地将电梯导航的自定义属性与模块的类名联系起来，使得能够通过电梯导航去找到对应的模块
        document.documentElement.scrollTop = top
    }
    })
    ```
3. 鼠标滑动显示高亮
    先展示html：
    ```Html
    <div class="index-point2"></div>
    <div class="index-point3"></div>
    <div class="index-point4"></div>
    <div class="index-point5"></div>

    <ul class="elevator-list">
        <li><a href="" data-name="point2"></a></li>
        <li><a href="" data-name="point3"></a></li>
        <li><a href="" data-name="point4"></a></li>
        <li><a href="" data-name="point5"></a></li>
    </ul>
    ```
    下面是Javascript：
    ```Javascript
   window.addEventListener('scroll' , function () {
    const active = document.querySelector('.elevator-list .active')
    if(active)//若无，则avtive值为null（假）
    {
        active.classList.remove('active')
    }
    
    const point2 = document.querySelector('.index-point2')
    const point3 = document.querySelector('.index-point3')
    const point4 = document.querySelector('.index-point4')
    const point5 = document.querySelector('.index-point5')
    const n = document.documentElement.scrollTop

    if(n >= point2.offsetTop && n < point3.offsetTop)
    {
        document.querySelector('[data-name=point2]').classList.add('active')
        //注意关注自定义属性选择器的写法
    }
    else if (n >= point3.offsetTop && n < point4.offsetTop)
    {
        document.querySelector('[data-name=point3]').classList.add('active')
    }
    else if (n >= point4.offsetTop && n < point5.offsetTop)
    {
        document.querySelector('[data-name=point4]').classList.add('active')
    }
    else if (n >= point5.offsetTop)
    {
        document.querySelector('[data-name=point5]').classList.add('active')
    }
    })
    ```
---
#### 四、感谢阅读
   