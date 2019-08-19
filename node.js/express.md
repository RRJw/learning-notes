#### 基本使用express（npm init -y 创建package.json文件）

1. const express=require('express')   导入express框架模块
2. const app=express()   开启一个exoress框架的服务，相当于http.createServer
3. app.listen( )  监听一个端口
4. 安装热更新插件nodemon，`npm i nodemon -g`

#### 公开静态资源路径

1. app.use(' 网页路径 '，express.static(' 文件路径 '))

   > 路径拼接path.join(__dirname,xx)
   >
   > __dirname 动态的获取当前文件模块的路径
   >
   > __filename 动态的获取当前文件的路径
   >
   > 文件路径可以省略./
   >
   > 在node中./的含义为当前文件在执行node时，node所处的终端路径，node在哪个文件路径下执行就在哪个文件路径下找./后的文件
   >
   > 模块中的路径模块不受node命令影响，与文件路径模块不同

#### 在express中使用art-template模板渲染

1. 下载相关的包

   > ```
   > npm install --save art-template
   > npm install --save express-art-template 
   > ```

2. 配置art模板引擎

   > ```
   > app.engine('art', require('express-art-template'))
   > ```

3. 使用render渲染页面

   > ```
   > 默认art会去找views文件夹下的.art后缀的文件进行渲染，
   > 可以在配置art哪里去改回html
   > 这里的render第一个参数是文件路径可以省略./views,如果是找views文件下其他文件夹的话，同样可以省略。
   > 修改默认views(视图渲染文件夹)路径文件夹:app.set('views',文件路径)
   > app.get('/', function (req, res) {    
   >     res.render('index.art', {        
   >             user: {            
   >             name: 'aui',            
   >             tags: ['art', 'template', 'nodejs']        
   >             }    
   >         });
   >     });
   > ```

4. res.redirect( '  ') 重定向 

#### 在express中获取表单post请求体的数据

1. 安装`npm i body-parser -S`

2. 配置body-parser

   > ```javascript
   > app.use(bodyParser.urlencoded({ extended: false }))
   > app.use(bodyParser.json())
   > ```

3. req.body  获取表单的数据

