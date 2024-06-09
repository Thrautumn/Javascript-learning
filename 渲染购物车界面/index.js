const goodsList = [
    {
      id: '4001172',
      name: '称心如意手摇咖啡磨豆机咖啡豆研磨机',
      price: 289.9,
      picture: 'https://yanxuan-item.nosdn.127.net/84a59ff9c58a77032564e61f716846d6.jpg',
      count: 2,
      spec: { color: '白色' }
    },
    {
      id: '4001009',
      name: '竹制干泡茶盘正方形沥水茶台品茶盘',
      price: 109.8,
      picture: 'https://yanxuan-item.nosdn.127.net/2d942d6bc94f1e230763e1a5a3b379e1.png',
      count: 3,
      spec: { size: '40cm*40cm', color: '黑色' }
    },
    {
      id: '4001874',
      name: '古法温酒汝瓷酒具套装白酒杯莲花温酒器',
      price: 488,
      picture: 'https://yanxuan-item.nosdn.127.net/44e51622800e4fceb6bee8e616da85fd.png',
      count: 1,
      spec: { color: '青色', sum: '一大四小' }
    },
    {
      id: '4001649',
      name: '大师监制龙泉青瓷茶叶罐',
      price: 139,
      picture: 'https://yanxuan-item.nosdn.127.net/4356c9fc150753775fe56b465314f1eb.png',
      count: 1,
      spec: { size: '小号', color: '紫色' },
      gift: '50g茶叶,清洗球,宝马, 奔驰'
    }
  ]

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