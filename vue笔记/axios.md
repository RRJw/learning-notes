#### 一.axios的基本使用

- 理论:进行网络请求（请求后端接口数据）

- 基本使用:

  ```js
  import axios from 'axios'
  
  axios.get('url').then(res =>{
      //请求结果
  })
  ```

  axios发送并发请求

  ```js
  axios.all([
      axios({
          url:'xx',
          params:{
              xx   //params中的参数最终会拼接到rul请求地址上作为参数进行请求
          }
      }),
      axios({
          url:'xx'
      })
  ]).then( (result) =>{
      log(result[0])
      log(result[1])
  })
  //或则使用
  .then(axios.spread( (res1,res2) =>{
       log(res1)
       log(res2)
  } ))
  ```

  当程序中出现较多重复代码时，提取全局配置

  ```js
  axios.defaults.baseUrl='xx'
  //在程序中设置默认公共的属性
  ```

####  二.创建axios的实例

- 全局配置请求会出现接口部署在不同服务器上问题时，所以开发常用实例方式

  ```js
  const axios1 = axios.crete({
      //实例的默认配置
      baseURL:'xx',
      timeout:xx
  })
  //使用实例来进行网络请求
  axios1({
    	url:'/home'
  }).then(res =>{
      log(res)
  })
  ```

####  三.对axios进行封装

- 为什么要封装:如果当axios不在进行维护后或者出现重大的bug时，需要对程序进行修改或则换网络请求框架时，是一件非常麻烦的事情。

- 最好的封装方法最终方法

  封装方法1:

  ```js
  //创建一个单独的axios的文件存放封装的文件
  //这里的request为之定义的使用名，参数分别是:axios的配置，成功的回调，失败的回调
  export function request(config,success,failure){
      const instance = axios.crete({  //创建axios的实例
          baseURL:'xx',  //默认配置
          timeout:xx
      })
      
      instance(config)
      	.then(res =>{
          	success(res) //将成功的信息通过回调函数传递出去
      	})
      	.catch(err =>{
          	failure(err) //同理
      })
  }
  ```

  在程序中调用时:

  ```js
  //首先先调用这个封装的文件
  import {request} from 文件地址
  request({
      url:'xx'
  },res =>{
      log(res)
  },err =>{
      log(err)
  })
  ```

  封装方法2:

  ```js
  //将参数作为一个对象传递进来
  export function request(config){
      const instance = axios.crete({  
          baseURL:'xx', 
          timeout:xx
      })
      
      instance(config.baseConfig)
      	.then(res =>{
          	config.success(res) 
      	})
      	.catch(err =>{
          	config.failure(err) 
      })
  }
  ```

  调用：

  ```js
  request({
      baseConfig:{
      },
      success:function(res){
  	},
      failure:function(err){
      }
  })
  ```

  封装方法3：

  ```js
  //通过返回一个promise对象
  export function request(config){
  	return new Promise( (resolve,reject)=>{
      const instance = axios.crete({  
          baseURL:'xx', 
          timeout:xx
      })
      
      instance(config)
      	.then(res =>{
          	reslove(res)	
      	})
      	.catch(err =>{
          	reject(err)
      	})
      })
  }
  ```

  调用：

  ```js
  request({
      url:'xx'
  }).then( res=>{
      
  }).catch( err=>{
      
  })
  ```

  **最终方案**:

  ```js
  export function request(config){
      const instance = axios.crete({  
          baseURL:'xx', 
          timeout:xx
      })
      
      return instance(config) //由于实例本身返回的就是一个promise对象
  }
  
  //调用同上
  ```


#### 四.axios的拦截器

- 基本使用:

  ```js
  //在axios实例对象中
  //请求拦截,两个参数一个为配置对象，一个为失败对象
  instance.interceptors.request.use(
      config =>{
          /*
          拦截器作用
          1:例如config中不符合服务器要求的一些内容
          2:例如:在每次发送网络请求时，在等待期间显示一个请求的图标，例如很多软件有的转圈圈的那个图标
          3:例如:某些网络请求(比如说登入(token))必须携带一些特殊的信息
          
          */
          return config
      },
      err =>{  
      }
  )
  instance.interceptors.response.use(res =>{
      return res.data
  },err =>{
      
  })
  ```

  