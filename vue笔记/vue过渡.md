## vue过渡 ##


- .v-enter,.v-leave-to{}	设置从什么地方进入
- .v-enter-active,.v-leave-actice{} 设置过渡效果
- 使用是用<transition></transition>包裹 
- 自定义过渡指令 在transition中加入 例如:name="xx" xx-enter
- 配合第三方动画库 animate enter-active-class="" leave-active-class="" 入场离场的时间 :duration="{ enter:xx,leave:xx }"
- transition-group用于循环渲染包裹，例如列表,必须设置:key   给transition-group设置 appear实现页面展示飘入效果 设置tag=""属性指定渲染为什么元素，如不设定则默认渲染为span元素
- 元素离场其他元素进入动画列表元素删除后渐渐的飘上来顶替效果 v-move{} 过渡动画 v-leave-active{ position:absolute} 使用absolute需要设置元素宽度

## 半场动画效果 ##

- before-enter	methods中beforeEnrer(el) 动画入场之前动画还没开始
- enter(el,done) 设置小球开始之后的样式，和结束样式  必须设置el.offsetWidth 想要立即执行结束后的操作需设置done()
- after-enter 动画完成之后

