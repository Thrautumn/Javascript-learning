### 渲染购物车页面实现思路

#### 一、实现思路
* 要把对象数组解构，可以使用```map(item, index)```数组处理解构之后的数据
* 然后将处理好的数据用```join('')```方法连接起来，最后赋值给```div.innerHTML```即可

---

#### 二、具体实现
1. 可以利用箭头函数 ```.map( item => {})```，在里面去解构（因为map方法事实上是在遍历数组，在内部解构，先当于每遍历一个对象，就解构该对象的所有属性与方法）。
2.  * **图片、名称、数量**： 直接引用即可
    * **商品描述**： 由于```spec```==是一个数组==， 需要用对象方法获取其值，利用```Object.values(arr)```（注意：获取后的结果是数组），然后再使用```.join('')方法连接起来就好。
    * **赠品描述**： 由于不是每一个商品都有赠品，所以==要差异化对待== $\rightarrow$ 先判断，对象里面有这条属性就加上，没有就加一个空字符串
    由于```object.gift```是一个字符串，而非一个数组，可以采用字符串方法```string.split('分隔符')```处理字符串，得到一个==数组==，然后再利用```arr.map```取处理gift里面的数据
    * **单价以及总价**： 要考虑精度问题，可以先乘上100再除以100，然后利用```num.toFixed(位数)```保留指定位数小数。
3. **总价的计算**： 利用数组的```arr.reduce(function（prev, next)() {},index)```方法.```prev```为上一次计算的结果，```next```为每次累加的值，```index```为初始值。在这里，```item = item.price```(item本身为数组每一项的值,这里item为对象),```index``` = 0.

#### 三、 代码
```Javascript
    //渲染模块
document.querySelector('.list').innerHTML = goodsList.map(item => {
    //先解构
    const { name, price,  picture, count, spec, gift } = item
    //可以直接得到的是 图片链接、商品名字、单价、数量 
    //需要我们去得出商品描述、总价、赠品描述
    //商品描述
    //spec是一个对象
    const description = Object.values(spec).join('/')
    //赠品描述
    const str = gift ? gift.split(',').map(item => `<span class="tag">【赠品】${item}</span> `).join('') : ''
    //计算总价 
    //注意精度问题
    const total = ((price * count * 100) / 100).toFixed(2)
    return `
    <div class="item">
        <img src=${picture} alt="">
        <p class="name">${name} ${str}</p>
        <p class="spec">${description}</p>
        <p class="price">${price.toFixed(2)}</p>
        <p class="count">x${count}</p>
        <p class="sub-total">${total}</p>
      </div>
    `
}).join('')

//合计模块
//利用reduce函数
const total = goodsList.reduce((prev,  item) => prev + (item.price * 100 * item.count) / 100 , 0)
document.querySelector('.amount').innerHTML = total.toFixed(2)
```