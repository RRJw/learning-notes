#### v-if

使用v-if操作元素时，本质上是把dom元素删除

#### v-show

使用v-show操作元素时，本质上是在元素上添加一个样式display:none

#### v-on的参数传递事件

- 当v-on作为函数没有参数，而调用时却传递参数了，那个参数默认为event事件
- 作为参数传递event对象时，需要加上$event

#### @keyup键盘监听事件

@keyup.enter：监听enter键的点击

#### v-on:input 实时监听表单时输入 $event.target.value

#### .sync修饰符，用来在子组件中需要修改父组件传入的值，父组件也同时显示更新这个值的状态。

```js
//具体写法
//父组件传值，并使用.sync修饰需要动态修改的值
<parents :value.sync="value"></parents>
//子组件
props:{'value'}
this.$emit('update:value',newValue)

```

