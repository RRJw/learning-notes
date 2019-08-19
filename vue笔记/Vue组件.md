## 组件 ##

1. 组件的第一种注册方式:	var x1=Vue.extend({ template:'<><>'}) 创建组件返回一个对象，使用Vue.complete('组件名称',创建的组件对象)。
2. 组件的第二种注册方式:Vue.complate('组件名称'，Vue.extend({template:'<><>'}))
	Vue.complate('组件名称'，{template:'<><>'})	组件中必有一个唯一的根元素。
1. 组件的第三种注册方式：在外部定义组件的结构	 Vue.complate('组件的名称'，{template:'#id'})在#app外部创建模板，<template id='#id'></template>
2. 定义私有的组件components:{ 组件名称：{template：‘’} } 可在外部定义

## 组件的data，methods ##

1. 组件的data必须是一个function且返回一个对象，防止多个相同组件串用一个数据，例如return外部对象
2. 组件的切换方式:<component :is=""></component> v-bind:xx="表达式" | " '这样才是一个字符串' " 
3. 组件过渡动画 <transition mode="out-in"></transition> mode模式过渡先离开后在进入

## 父组件向子组件传值 ##

1. 在父组件引入子组件的时候，通过属性绑定(v-bind)的形式，吧需要传递给子组件的数据，以属性绑定的形式，传递到子组件的内部 例如:v-bind:自定义名字="msg"

2. 在父传子的引用:bind时，如果存在驼峰命名的话需要用-连接这里不支持驼峰命名法

3. 然后在子组件模板中使用props接受  例如:props:['自定义的名字']，props中的数据是只读的，而data中的数据是可读可写的。

   ```
   props:{
   	xx:type
   	xx:{
   		type：xxx,
   		default：‘学习’,
   		required：true
   	}
   }
   当默认值为函数或则数组的时候必须是一个函数
   default:function(){
   	return []
   }
   ```

4. 父组件向子组件传递方法，使用v-on:自定义方法名="父方法" shou()带括号表示调用后传递给方法

5. 子组件调用 this.$emit('自定义方法名'，可选参数) emit表示触发，调用的意思----可选参数是父方法上传入的参数 例如：父方法(参数).  

## 子组件向父组件传值 ##

1. 在子组件中使用this.$emit('自定义方法名'，参数)，在父组件中调用@自定义名='父方法'

   > 默认情况下传递的参数如果在父方法中没有()，也可以在methods中写入使用
   >
   > ```
   > 子:
   > methods: {
   >                 transmit() {
   >                     this.$emit('transmit-fruit', this.firuts)
   >                 }
   >             }
   > 调用:
   > <cop @transmit-fruit="show"></cop>
   > 父:
   >  methods: {
   >                 show(firuts) {
   >                     console.log('transmit-fruit', firuts);
   >                 }
   >             }
   > ```
   >
   > 

2. 子组件调用父组件的方法，同时传入参数,在父组件方法内接收参数后修改

##### 使用render函数渲染函数

```js
render:function(createElements){ //createElement是一个方法，调用它能够吧指定的组件模板对象渲染为html结构
	return createElements(模板对象)
}
//基本使用方法
createElements('标签','标签属性',[标签内容])
```

render会把整个页面替换渲染

#### 父子组件之间的访问

1. 父组件访问子组件的方法或者属性。

   > 在子组件中使用ref='xx',来获取这个组件的实例，在父组件中使用this.$refs.xx.xx来调用方法或者属性，返回对象类型默认为一个空对象
   >
   > $children来获取子组件，返回的是一个数组



#### 在webpack中使用vue；

1.安装vue的包；cnpm i vue -S

2.由于在webpack中，需要使用.vue这个模板文件定义组件，所以需要安装能够解析这种文件的loader		`cnpm i vue-loader vue-template-compiler -D`

在配置文件中加入匹配规则`{ text:/\.vue$/, use:'vue-loader'} `

在vue-loader15以上需要在webpack.config.js中加入配置

`const { VueLoaderPlugin } = require('vue-loader')`

在plugs中加入`new VueLoaderPlugin()`使用这个插件，来完成vue-loader的后续解析问题

3.在main.js中`import VueRouter from 'vue-router'`  然后使用路由`Vue.use(VueRouter)`

4.在main.js中，导入vue模块文件  import  组件模板名称 from .vue模板文件路径

5.在vm实例中 写入render：createElement => createElement(组件模板名称)

##### export default 和exports的使用方法

1.export default是es6语法中向外暴露成员的方法；在其他文件中使用 import 自定义对象名 from 路径  接收。 

​	在一个模块中可以同时使用export 和 export default 向外暴露对象，但是export default只能有一个。

使用export  var  xx= ' xx '  接收=>  import {xx}  xx名必须是相同的 	 

export { xx，xx}

如果export导出的成员向要换名字 ，可以使用{ xx as xx} 

##### 在路由模板中的样式会存在全局样式情况 

所以在style中使用	scoped 设置样式限制作用域

#### 项目中文件夹起别名，便于文件路径的修改

- 在webpack.base.config.js文件中的reslove选项下修改
- 在非import下引入文件地址需要在路径前加上~符号

