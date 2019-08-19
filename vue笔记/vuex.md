#### 一.基本使用

- 首先安装插件`npm i vuex --save`

- 建议创建store文件夹来放置状态管理的文件

- 创建index.js文件

  > ```js
  > import Vue from 'vue'
  > import Vuex from 'vuex'
  > //1.安装插件
  > Vue.use(Vuex)
  > //2.创建对象
  > const store=new Vuex.store({
  >     state:{
  >         
  >     },
  >     mutations:{
  >         
  >     },
  >     actions:{
  >         
  >     },
  >     getters:{
  >     },
  >     modules:{
  >         
  >     }
  > })
  >  exports.default=store
  > ```

- 在入口文件中导入index.js文件,并在vue实例中注册store对象

- 在组件中使用: $store.state.xx
  

#### 二.通过mutations来修改状态

- 首先在musitions中定义方法

  > ```js
  > mutations:{
  >     //传入state作为参数
  >     increment(state){
  >         //在这里对state进行操作，例如:
  >         state.count++
  >     }
  > }
  > ```

- 在组件中通过自定义方法来实现,例如:

  ```js
  increment(){
      //调用状态管理中的mutations中的方法来实现状态的改变
      this.$state.commit('increment')
  }
  ```

- 传递参数

  ```js
  //在组件的方法中
  increment(count){
      //调用时传入参数
      this.$state.commit('increment',count)
  }
  //在状态管理文件中
  mutations:{
      //接收参数
      increment(state,count){
          state.counter+=count
      }
  }
  ```

- 提交风格其二

  ```js
  //在组件的方法中
  increment(count){
      //调用时传入参数
      this.$state.commit({
      type:'increment',
      count
      )
  }
  //在状态管理文件中
  mutations:{
      //接收参数,在这种提交风格中提交的第二个参数是一个对象,可以传入多个数据
      increment(state,payload){
          state.counter+=payload.count
      }
  }
  ```

- 响应式原理: 当在state中定义好的元素在界面中更改时，都会是响应式的。

  ```js
  //当需要在其他地方对state中的元素添加时，不会遵循响应式的原理
  //但是可以通过vue的方法来实现响应式
  Vue.set(添加的对象或数组,key|number,value)
  Vue.delete(删除的对象或数组,value)
  ```

- 常量的统一管理:在mutations文件下建立一个管理常量的文件夹

  ```javascript
  exports const xxx=xxx
  ```

  

#### 三.Getters基本使用

- 定义:类似于vue中的计算属性，常用于对某些状态需要经过一系列的改变而的到的数据

- 基本使用:

  ```js
  getters:{
   	xx(state){
          return xx
      }   
  }
  //在组件中通过$state.getters.xx来使用
  /*在getters的方法中，可以传入两个参数，一个为state对象，另一个为getters对象
  这样来实现getters的复用*/
  xx(state,getters){
  }
  /*在getter的方法中如果return一个函数的话，在调用这个getters的方法时，可以传入参数使用*/
  xx(state){
      return function(xx){
          
      }
  }
  //$state.getters.xx(xx)
  //filter() 过滤器
  ```

#### 四.actions的基本使用

- 问题：当mutations中的元素需要经过异步操作更改时，直接使用commit提交是无法重根本上修改的，此时就需要经过actions这一步。

  ```js
  //第一步，在状态管理文件中actions写入相应的更改方法
  actions方法名(context,payload){ //context相当于states
      setTimeout( ()=>{
          context.commit('mutations方法名') //这里的方法名为mutations中的修改方法
      })
  }
  //第二步，在组件中通过
  mutations方法名(){
      this.$store.dispatch('actions方法名',payload) //payload为可选参数
  }
  //dospatch可以作为一个对象返回
  //在状态文件中
  actions方法名(context,payload){ 
  return new Promise( (resolve,reject)=>{
      setTimeout( ()=>{
          context.commit('mutations方法名')
          console.log(payload)
          resolve() //这里可以传递参数给then
      })
  })
  //在组件中
      mutations方法名(){
      this
          .$store.dispatch('actions方法名',payload)
          .then( reslove()=>{
          
      		})
  		}		
  ```

#### 五.modules

- 由来:当状态文件中的state内容过多需要创建跟多模块的state时，可在modules中创建更多的对象。

  ```js
  const modulesA={
      state:{
          
      },
      moutations:{
          
      }...
  }
  const store=new Vuex.store({
      ...
      modules:{
         a:modulesA 
      }
  })
  //使用方法与父store一致
  //在子store中想访问父中的states时，可传入参数rootstate，这个参数为父中的state对象，rootgetters
  ```

  



