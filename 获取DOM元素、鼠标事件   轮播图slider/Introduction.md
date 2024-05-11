### 这是关于轮播图实现的思路说明
---
#### 一、编写思路
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在鼠标经过slider整个大盒子的时候，关闭定时器，在鼠标离开slider的时候，开启定时器，用到事件监听————```mouseenter```和```mouseleave```（防止事件冒泡）。关于点击左右按键左滑和右滑就是给按钮绑定```click```事件即可  

---
#### 二、获取元素并修改
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先先明确哪些元素是要被渲染，或者哪些东西是每切换一张图片都会改变的。在这个例子中是图片(img)、图片的标题(title)、背景颜色(bgc)以及小圆点的位置(.active)(其实也关乎div的改变)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明确之后，获取相关DOM元素。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其后是操作元素属性：
* 图片对应``` img.src```
* 标题对应```title.innerHTML```
* 背景颜色对应```color.style.backgroundColor```(注意此处是用**小驼峰命名法**)
* 关于小圆点，第一步先清除所有具有```.active```类名，然后再为应该高亮的小圆点加上```.active```类名即可，对应```li.className.add()``` 与```li.className.remove()```

---
#### 三、具体实现
##### 1. 左滑与右滑 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;左滑右滑事实上就是改变对象数组里呈现的元素。左滑呈现上一个对象，右滑呈现下一个对象，故此可以使用循环解决。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先设置一个初始值&nbsp;i，右滑&nbsp;i+1,左滑&nbsp;i-1；在到达最后或者第一张时（事实上就是i === arr.length 以及 i === 0），i&nbsp;回到开头或最后一张。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这两部分的代码事实上可以共用，只是数组的下标与&nbsp;i&nbsp;相关联。如下:
```Javascript
function toggle () {
          img.src = sliderData[i].url
          p.innerHTML = sliderData[i].title
          col.style.backgroundColor = sliderData[i].color
          document.querySelector(`.slider-indicator .active`).classList.remove('active')
          document.querySelector(`.slider-indicator li:nth-child(${i + 1})`).classList.add('active')
        }
```
之后对左滑和右滑按钮绑定```click```事件：
```javascript
//右键左滑
next.addEventListener('click' , function () {
        i++ 
        i = i === sliderData.length ? 0 : i //回到开头
        toggle()
})

//左键左滑
prev.addEventListener('click' , function () {
        i--
        i = i < 0 ? sliderData.length - 1 : i
        toggle()
})
```

##### 2. 自动播放slider
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自动播放可以用到定时器。首先设置一个定时器：
```Javascript
timer = setInterval(function () {
            next.click()
// 注意，在事件监听中，xxx.addEventListener('' , function(){}) 本质上是xxx.on'' = function(){}，
// 所以这个xxx.''其实是个函数，可以去调用
// 所以，上面的写法本质上就是去复制next这个事件的效果
//非常实用的一种写法
        }
, 1000)
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;之后就是给整个slider大div绑定```mouseenter```和```mouseleave```事件。
```Javascript
 //鼠标离开slider的时候，打开定时器
slider.addEventListener('mouseleave', function () {
    clearInterval(timer); // 这个是经验之谈了，一般打开定时器的时候，先关掉再打开
    timer = setInterval(function () {
        next.click();
    }, 1000);
});
        
//鼠标进入slider的时候。关闭定时器
slider.addEventListener('mouseenter' , function () {
    clearInterval(timer)
})
```
---
####  四、感谢阅读
大一新生，浪费了大一上的四个月时间，大一下莫名其妙觉醒了。希望毕业的时候能揾到食。



