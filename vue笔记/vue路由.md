## ref获取dom元素和组件 ##

1. 在元素上定义ref 例如: ref="自定义名" 
2. 调用这个元素 this.$refs.自定义名
3. 利用ref获取组件元素可以调用它的数据和方法等等

## 路由概念

路由本质上就是一个映射表，决定了数据包的指向。

映射表为

```js
映射表
[
    内网ip1：电脑mac地址
    内网ip2：电脑mac地址
]
```



## 前端路由 ##

1. 后端路由:对于普通网站，所有的超链接都是Url地址，所有的url地址都对应服务器上对应的资源
2. 前端路由:对于单页面程序来说，主要通过URl的hash(#)来实现页面之间的切换，hash有一个特点http请求不会包含hash相关的内容。

## 配置路由基本使用 ##

1. 创建模板对象 var xx={ template:'<></>' }
2. 创建一个路由对象，当导入vue-router后，在window全局对象中，就有了一个路由的构造函数，叫做Vuerouter
3. var 路由对象名=new VueRouter({ routes:[] //route表示路由的匹配规则 })
4. [ { path:'/login',component: 模板对象 } ] 路由匹配规则中有两个必须对象 path为表示监听路由将要跳转的链接地址 component为匹配规则匹配到了path的链接地址 则展示在链接地址中的页面为模板对象 
5. 在父组件中使用 router: 路由对象 加载路由 
6. 在页面中如果使用链接跳转 则正确写法为 #login 应为前端理由为hash的方式跳转hash需要加上#号 vue提供<router-link to="/login"></router-link> 默认渲染成为一个标签 使用tag="" 可以改变默认渲染成为哪一个标签
7. 在页面中写入占位标签<router-view></router-view>
8. 原理 在页面点击登录链接 route匹配规则匹配url地址 成功载入模板对象给父组件，加载到占位标签中去
9. 页面重定向redirect  当需要设置主页的时候设置根路径时，设置redirect 默认页面 例如`{ path:'/',redirect:'/login' }` 此时默认根路径为login
10. 为<router-link>修改默认的样式 需在构造函数中设置一个属性linkActiveClass:'自定义样式名'
	
## 在路由规则中定义传参数 ##

1.在<router-link to="/login？id=10"></router-link> 获取id数据 使用 $route.query.id
[ { path:'/login/:id',component: 模板对象 } ] to="/login/12"  获取12数据  $route.params.id 匹配多个login//

1. 嵌套路由 用于在父路由下 children[{ path:'login'}] 子路由中不加/

## 命名路由 ##

1. 需求: 当想在一个页面加载时加载不同的几个路由
2. [ {path:'/',components:{ '自定义名路由名':模板对象，'自定义名路由名':模板对象} ] 
3. 在<router-view name="自定义路由名"></router-view>

## 使用watch监听路由 ##

1. watch:{ '$route.path':function(newVal,oldVal){} } $route.path为监听的url地址的改变

### 通过代码修改路由

this.$router.push('路由') 可以返回

this.$router.replace('') 不能返回

#### 通过路由对象获取动态路由的参数

- 方法一

1. 通过router设置参数，path:'/user/:userId'

2. 在router-link中通过 :to="'user/'+userId"

3. 在组件中通过计算属性的方式动态的获取或者直接{{$route.params.userId}}

   > ```js
   > computed:{
   >     userId(){
   >       return this.$route.params.userId
   >     }
   > ```

- 方法二

1. 在router-link中通过v-bind，例如：<router-link :to="{ path:'/home',query:{ xx} }"
2. 在子组件中通过$route.query取出参数

#### 嵌套路由

- 在路由对象中写入 children:[{}],则可实现嵌套路由

  > 在子路由下不需要写完整路径
  >
  > 在组件中使用的时候，需要放到父组件页面中占位
  >
  > router-link中路径需要填写完整的例如: /home/new

#### 全局路由守卫

- 当页面之间进行跳转且需要进行一些操作的时候进行。

- 例如:在页面跳转实现网页title的不同实现:前置守卫（guard）

  > 在router.js中每个**route**对象即为: 路由对象
  >
  > 在route中配置meta{ title:'xx' } 
  >
  > ```js
  > router.beforeEach((to,form,next)=>{
  >     document.title=to.matched[0].meta.tltle
  >     //实际上to.meta即可拿到设置的meta对象，但是当路由中存在子路由时需要在matched数组对象中拿到数据
  >     next()
  > })
  > ```
  >
  > 后置钩子(hook)  afterEach(to,from)

#### 路由缓存

- 使用`keep-alive`,包裹router-link，实现页面的重复利用

- 在keep-alive中可使用cativated/deactivated 来实现页面是否活跃(是否在本页面上)

- 实现子路由的缓存

  - 在首页记录离开时的路径，在beforeRouteLeave中记录离开时的路径
  - 在处于活跃 状态时加载离开时路径

- 属性:include,exclude.可实现对单个页面是否重新渲染进行排除

  > 在属性中通过exclude排除需要重新渲染的页面

  ## this.$route.path表示处于活跃状态的路由对象
  
  ## this.$router表示路由对象
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

