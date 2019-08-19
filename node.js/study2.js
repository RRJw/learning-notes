// var fs=require('fs')

// //第一个参数：文件路径
// //第二个参数：文件内容
// //第三个参数：回调函数
// // 文件写入成功 error返回null，失败返回错误信息 
// fs.writeFile('./你好.md','大家好我是冉小冉',function (error) {
//     console.log('文件写入成功')
// })

var http=require('http')

//使用http.createServer()方法创建一个web服务器

var server=http.createServer()

//注册request请求时间
//当客户端请求过来，就会自动触发服务器的request请求事件，然后执行第二个参数：回调函数
server.on('request',function(){
     console.log('收到客户端的请求')
})

//绑定端口号启动服务器
server.listen(3000,function(){
    console.log('http://localhost:3000')
})