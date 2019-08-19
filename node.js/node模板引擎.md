### 什么是模板引擎

1.**模板引擎是一个将页面模板和要显示的数据结合生成HTML页面的工具**

2.安装 npm i art-template -S

3.在node中使用模板引擎，动态的改变页面的值

#### 1.客户端渲染

1.客户端发送请求，服务器端响应返回一个html页面

2.客户端解析页面，发现ajax请求，再次发起请求，服务器端接受返回数据，

3.客户端接受数据并且使用模板引擎渲染页面，客户端渲染在网页源码中看不到。

#### 2.静态资源请求

1.当浏览器接收到响应html页面后，在解析的同时，如果发现带有href，src等等静态资源时，浏览器会自动**对这些资源发起新的请求**

2.此时，我们可以通过把所有的静态资源放到一个公共的空间去，例如public中，然后在通过判断请求url中是否带有统一的资源请求路径，在去读取他。

```
var http = require('http')
var fs = require('fs')

http
    .createServer(function (req, res) {
        var url = req.url
        if (url === '/') {
            fs.readFile('./src/index.html', function (err, data) {
                if (err) {
                    return console.log('文件读取失败，请稍后重试!!')
                }
                res.end(data)
            })
        } else if (url.indexOf('/public/') === 0) {
            fs.readFile('.' + url, function (err, data) {
                console.log(url)
                if (err) {
                    return console.log('文件读取失败，请稍后重试1!!')
                }
                res.setHeader('Content-Type', 'text/css;charset=utf-8')
                res.end(data)
            })
        }
    })
    .listen(3000, function () {
        console.log('http://localhost:3000')
    })
```

> 注意：此时在html页面就不需要使用相对路径导入所需要的静态资源了，因为这个时候所有的资源都是通过url标识来获取的，服务器开放了 /public/路径。