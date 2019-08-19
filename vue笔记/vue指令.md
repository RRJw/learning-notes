## 讲解v-cloak，v-html，v-text ##

使用v-cloak能够解决，插值表达式闪烁的问题，配合样式[v-cloak]{display：none}使用    闪烁为渲染速度，例如网速导致

v-text没有闪烁问题，v-text会覆盖元素中原本的内容，但是插值表达式只会替换自己这个站位符{{}}，不会清空这个元素

v-pre阻止默认事件，v-once 执行一次

**v-on:click/@click跑马灯小程序**

    <body>
    <d	iv id="app" class="container">
        <button style="margin-top: 10px" class="btn-secondary" @click="move">浪起来!</button>
        <button class="btn-danger" @click="stop">停下</button>
        <h3>{{msg}}</h3>
    </div>
    <script>
        var vm=new Vue({
            el:'#app',
            data:{
                msg:'别浪，稳定发育!',
                stopInterval:null
            },
            methods: {
                move(){
    				//当多次点击move会多次启动定时器所以判断null是否为空来作为开启定时器
                    if(this.stopInterval!=null) return; 
                    this.stopInterval=setInterval(() =>{
                        var start=this.msg.substring(0,1)
                        var end=this.msg.substring(1)
                        this.msg=end+start
                    },500) 	//substring字符串截取第一个参数为下标，第二位个数
                },
                stop(){
                    clearInterval(this.stopInterval)
    				//每当清除定时器后重新赋值以防止stopInterval不为null无法重新开启定时器
                    this.stopInterval=null
                }
            },
        })
    </script>
    /body>
## v-on事件修饰符 ##
- .stop 阻止冒泡 　　　　　　(全角空格学习)例如:`<div @click=""> <button @click=""></button> </div>` 内部点击嵌套在外的会发生冒泡点击，解决内部加入`@click.stop=""`
- .prevent 阻止默认事件
- .capture 添加事件侦听器时使用事件捕获模式  **与冒泡事件相反**（从外到内）
- .self 只当事件在该元素本身（比如不是子元素）触发时触发回调  **（只是阻止自身的冒泡行为）**
- .once 事件只触发一次

　　**（注意）修饰符可以串联不同顺序也会有不同效果** 例如:.once.prevent 事件触发一次

　　eval()解析字符串然后执行  例如:eval('parseInt(x)'+'parseInt(y)')

## 过滤器 ##

过滤器只能在**插值表达式**和**v-bind**中使用

过滤器格式： {{ data | 过滤器的名称}}

Vue.filter('过滤器的名称'，function(data){
})

## 自定义按键修饰符 ##

@keyup.键盘码="" 绑定键盘按键事件

自定义键盘修饰符Vue.config.keyCodes.f2= 113

## 自定义指令 ##

Vue.directive('focus',{钩子函数})

钩子： 
- bind:function(el){} el为被绑定的元素 为原生js对象，当指令绑定到元素上或者说dom树上是执行
- inserted(){} inserted表示元素插入到dom中的时候，执行
- updated(){}	更新元素的时候调用执行
- bind是在加入内存中就马上调用，inserted是渲染页面加入dom中调用，
- 和样式相关可以在bind中执行，js相关的在insered中执行、

参数
binding

value:传入的字符串 ，例如v-color="'bule'"  el.style.color=binding.value

expression：传入的字符串表达式

函数简写: 指令名:function(){} 默认为bind和update钩子函数  

## computed计算属性 ##

1.计算属性使用时，把他当做普通属性使用  
2.当计算属性监听到data数据的改变时，就会立刻重新进行计算  
3.计算属性的值会存在缓存，就是重复调用会直接引用计算值

#### input焦点事件

@blur和@focus 失去焦点和获取焦点

#### v-model 修饰符

- lazy 在事件完成后显示，例如输入框回车或失去焦点时绑定
- number 强制输入为number类型
- trim 删除用户输入两侧的空格

v-model的本质是:`v-bind:value="" @input="$event.target.value"`

