- url：url.parse(,true) true会使传入的url内容转换为字符串。
- 重定向:setHeader('Location','路径')。
- 默块中都会有 return module.exports ，使用module.exports={}或者exports.xx=xx 

#### 请求参数获取方法

1. req.body:这个方法用来获取post请求中请求体中的数据

   > 使用req.body需要安装body-parser中间件才能使用

2. req.query：用来解析get请求中的参数

3. req.params：多适用于restful风格url中的参数的解析

   > ```
   > req.params包含路由参数（在URL的路径部分），而req.query包含URL的查询参数（在URL的？后的参数）
   > ```

#### 中间件

请求中间件时，匹配万能，其次限制，再者看next()

