## node.js是什么 ##

- node.js可以解析和执行javascript代码

- 优势：便于前端人员入手，性能高，利于和前端代码整合

- 服务器端开发运行环境，提供服务器级别的操作api，例如:文件读写，网络服务的构建，http服务器等

	1.文件操作 fs为file-system的简写，就是文件系统的意思，在node中其提供了操作操作文件相关的API,fs.readFile就是用来读取文件的
	
	**加载fs核心模块**  
	　　例如:var fs=require('fs')  
	**读取文件**  
	　　1.第一个参数为将要读取文件的路径  
	　　2.第二个参数是一个回调函数  
		function(error,data)  
	读取成功  
		　　data数据  
		　　error null  
	读取失败  
		　　data null  
		　　error 错误对象   
    fs.readFile('')

	
	
	writeHeader(); 
	
	##### 写入文件
	
```
  var fs=require('fs')
  
  //第一个参数：文件路径
  //第二个参数：文件内容
  //第三个参数：回调函数
  // 文件写入成功 error返回null，失败返回错误信息 
  fs.writeFile('./你好.md','大家好我是冉小冉',function (error) {
      console.log('文件写入成功')  
  })
  对象为true
  if(error){ conlose.log('文件写入失败了') }else{}
```

  ##### 一个简单的http请求: 

  ```
  //导入node中的http模块
  var http=require('http')
  
  //使用http.createServer()方法创建一个web服务器
  
  var server=http.createServer()
  
  //注册request请求事件
  //当客户端请求过来，就会自动触发服务器的request请求事件，然后执行第二个参数：回调函数
  server.on('request',function(){
       console.log('收到客户端的请求')
  })
  
  //绑定端口号启动服务器
  server.listen(3000,function(){
      console.log('http://localhost:3000')
  })
  ```

  **在node.js中只要是核心模块都需要使用var 定义然后require引入**

require是一个方法，他是用来加载执行模块的。在node.js中有三种模块1.具名模块，例如：fs，http， 在**node存在这模块作用域**，**node不存在全局作用域**

2.用户自定义的文件模块，使用require访问自定义文件模块时，需要加上./ 因为相对路径必须加    

3.**node可以拿到被加载文件模块导出的接口对象**

> 在每个文件模块中**默认都提供了一个接口对象**，exports
> 		**exports默认是一个空对象**，使用exports.xx=xx 可以给exports接口对象提供对象或方法等等
> 		在其他文件中**使用require加载了定义了exports接口对象的文件时**，require返回一个接口对象里面就是exports定义的数据

##### 监听:等待客户端的连接

##### 端口号：

1.ip地址是用来定位计算机的

2.端口号是用来定位具体的应用程序

3.所有需要联网通信的应用程序都会占用一个端口号



