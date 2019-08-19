## vue webpack3初步使用 ##

1.在项目中创建入口js文件，和主页
		2.使用`npm init -y`创建package.json文件
		3.对js文件进行打包 `webpack .\src\main.js -o .\dist\bundle.js --mode=development    

> webpack能够处理js文件之间的互相依赖关系；
>         webpack能够处理js的兼容性问题，把高级的，浏览器不能执行的语法转化为别的语法，浏览器支持的。

##### 编写webpack.config.js文件

```
const path = require('path') //node路径模块

//这个配置文件就是一个js文件，通过node中中的模块操作，向外暴露了一个对象
module.exports={

    entry: path.join(__dirname,'./src/main.js'), //指定入口文件，表示要webpack打包那个文件
    output: {
        path: path.join(__dirname,'./dist'),// 指定打包好的文件，输出到那个目录中去
        filename: 'bundle.js' //指定输出的文件名称
    }
}
```

> 通过编写webpack.config.js可以实现入口文件更新后，后续重新打包实现，使用命令`webpack`更新
> 注意: 在安装依赖时，尽量使用cnpm安装，在webpack4中与webpack-cli分离需两个都安装进项目中

##### 安装webpack-dev-server来实现自动编译的功能

1.终端输入:` cnpm i webpack-dev-server-D`
		2.在package.json中的scripts中写入配置`"dev": "webpack-dev-server"`
		3.运行 `npm run dev`

> **注意**：
>
> 1.如果想要webpack-dev-server正常运行，本地必须安装webpack，webpack-cli
> 		2.webpack-dev-server 帮我们打包生成的bundle.js文件，并没有放到实际的物理磁盘上；而是，直接托管到了电脑的内存中，所以我们在项目的根目录中根本找不到这个打包好的bundle.js;
> 		3.我们可以认为webpack打包好的文件，以一种虚拟的形式，托管到了我们的项目的根目录中。
> 		4.这样能够方便我们的打包效率
> 		5.在package.json配置中`"dev": "webpack-dev-server"后加入` `--open`可以实现自动打开浏览器，继续加入`--port 3000` 可以实现选择将要打开的端口，继续加入`--contentBase src`可以实现默认展示的文件位置，例如上述为src目录下的文件
> 		6.`--hot`热加载，异步加载，实现在网页不刷新的情况下加载页面//第二种方式启动热跟新，在webpack.config中配置

##### 使用html-webpack-plugin来动态的引入script标签

**需求**：在引入js文件时，需要考虑内存中与磁盘中都会有文件的存在，此时引入文件时路径就存在问题
		**html-webpack-plugin**：能够自动在内存中根据指定页面自动生成一个内存中的页面，自动把打包好的bundle.js文件追加到页面中去。
		使用:

```
1.首先安装插件 cnpm i html-webpack-plugin -D
2.在webpack.config.js文件中导入插件	const htmlWebpackPlugin=require('html-webpack-plugin')
3.只要是插件都应该放入到plugins配置插件节点中
plugins:[
        new htmlWebpackPlugin({ //创建一个在内存中生成html页面插件
            //将会根据指定的模板页面创建内存中的页面
            template: path.join(__dirname,'./src/index.html'),
            //指定在内存中生成的页面名称
            filename:'index.html'
        })
    ]
```

#### 引入样式css文件

1.如果想要打包处理css文件，需要安装`cnpm i style-loader css-loader -D`

2.在webpack.config.js这个配置文件，在里面，新增一个配置 节点，叫做module，他是一个对象；在这个module对象身上，有个rules属性，这个rules属性是一个数组，在这个数组中存放了所有第三方文件的配置和处理规则；

3.首先在main.js文件中导入css文件 例如`import './css/index.css'`

4.在webpack.config.js中配置

```
 module:{ 
        rules:[ //所有第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']}  //配置处理.css文件的第三方loader
        ]
    }
```

##### 引入sass配置

1安装`cnpm i sass-loader -D`

2`cnpm i node-sass -D` {use:['style-loader','css-loader','sass-loader']} 同理其他css样式文件配置相同

> 注意:默认情况下webpack不能处理css文件中的url地址，不管是图片还是字体库，只要是url地址都无法处理。

##### 引入url-loader模块

`cnpm i url-loader file-loader -D`

匹配规则:`{text: /\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=7631&name=[name].[ext]'}`

> 第一个参数:limit给定的值是图片的大小单位是byte，如果我们引用的图片大于或等于给定的limit值，则不会转换成base64格式
>
> 第二个参数：name=[name].[ext]表示在url中显示原生的图片名称
>
> 图片会存在重名情况，此时又想要原生图片名称 可在`name=[hash:8]+[name].[ext]`加上8位哈希地址名称

##### 使用bootstrap 

1.安装 cnpm i bootstrap -S

2.在main.js中导入文件，如果导入node-modules文件夹中的文件可以不加node-modules前缀

`import bootstrap/dist/css/bootstrap.css`

3.在webpack.config.js中引入匹配规则

`{ test: /\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'}`处理字体文件的loader 

> 注意4.x版本bootstrap将样式与图标分离了，所以我们在引入图标时还应该安装open-iconic
>
> `cnpm i https://github.com/iconic/open-iconic.git -S`
>
> 然后在main.js中引入`import 'open-iconic/font/css/open-iconic-bootstrap.css'`
>
> **注意：**使用时要注意各种包的安装 这里需要的是 `cnpm i url-loader --save`这个包不要漏掉安装。
>
> 图标:`<span class="oi oi-trash"></span>`

##### 安装babel，来执行将高级es6语法，转换为低级语法

安装包:1.`cnpm i babel-core babel-loader@7 babel-plugin-transform-runtime -D` 想当于转换器，虽然转换了但是解释不了是什么

​			2.`cnpm i babel-preset-env babel-preset-stage-0 -D`语法，将高级语法转换为低级语法

在webpack的配置文件，在module节点下的rules数组中，添加一个新的匹配规则

```
{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/, //排除不需要转化的文件
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'] //这一句会报错，暂时删除不了解
        }
      }
    }
```

在项目的根目录下新建一个叫做.babelrc 的babel配置文件，这个配置文件属于json格式，所以，在写.babelrc配置的时候必须符合json规范，例如字符必须双引号

在其中配置

```
{
	"presets":["env","stage-0"], //语法
	"plugins":["transform-runtime"] //插件
}
```

配置图片loader时，注意：

> 当图片的大小大于limit，需要安装file-loader。
>
> 小于limit时，图片会被编译成base64字符串形式
>
> 大于limit的图片编译后会存放在dist文件夹中，因此url会发生改变。所有需要在
>
> webpack.config.js文件中配置 output:下写入:  publicPath:'dist/' 仅供在开发环境测试
>
> 为了让图片资源统一需要在option配置下写入:  name:'image/[name].[hash:8].[ext]'

#### 配置文件的抽离与合并

合并需要安装npm i webpack-merge

然后在需要和并的其中一个文件夹中导入

const xx=requir('其一配置文件')

const webpackMerge=require('webpack-merge')

model.exports=webpackMerge('其一配置文件'，{其二配置})

分离后需要到package.json文件中配置路径