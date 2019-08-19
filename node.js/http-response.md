1.Request 请求事件处理函数，需要接受两个对象参数:
						request请求对象，可以用来获取客户端的一些请求信息；例如；请求路径
						response响应对象，可以用来给客户端部发送响应信息

```
例如: server.on('request',function(){
		//response对象有一个方法：write可以用来给客户端发送响应数据
		//write可以使用多次，但是最后一定要使用end()来结束响应，否则客户端会一直等待
		response.write('hello')
		response.write('node.js')
		
		response.end()
	})
```

JSON.stringify() 能够将数值对象，转化为字符串

> 注意:在服务器端默认发送的数据，其实是utf8编码的内容，然而浏览器在不知道服务器响应内容的编码情况的时候，会默认按照操作系统的默认编码去解析。
>
> 解决方法:`res.setHeader('Content-Type','text/plain;charset=utf-8')`

```
var http=require('http')
var server=http.createServer()

var fs=require('fs')

server.on('request',function(req,res){
    var url=req.url

    if(url==='/'){

        fs.readFile('./index.html',function(err,data){
            if(err){
                res.setHeader('Content-Type','text/plain;charset=utf-8')
                res.end('文件读取失败，请稍后重试!!')
            }else{
                res.setHeader('Content-Type','text/html;charset=utf-8')
                res.end(data)
            }
        })
    }else if(url==='/hello'){
        fs.readFile('./hello.md',function(err,data){
            if(err){
                res.setHeader('Content-Type','text/plain;charset=utf-8')
                res.end('文件读取失败，请稍后重试!!')
            }else{
                res.setHeader('Content-Type','text/plain;charset=utf-8')
                res.end(data)
            }
        })
    }
})




server.listen(3000,function(){
    console.log('http://localhost:3000')
})
```

> 使用无分号风格代码是，注意不要以 `,{,[ 为代码开头，否则在前面加上分号；