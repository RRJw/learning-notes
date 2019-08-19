var http=require('http')

var server=http.createServer()

server.on('request',function(req,res){
     console.log('收到客户端的请求'+req.url)

    //  res.write('hello')
    //  res.write('node.js')
     
    //  res.end()
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.end('hello 世界')
})

server.listen(3000,function(){
    console.log('http://localhost:3000')
})