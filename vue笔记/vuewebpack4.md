### vue webpack4初步使用

1.安装: `npm init -y  npm i webpack webpack-cli -D`
		2.添加scripts，在生成的package.json中添加：

```
"scripts": {
    "build": "webpack --mode production"
  }
```

> --`mode` 模式 (必选，不然会有 `WARNING`)，是 `webpack4` 新增的参数选项，默认是 `production`

表示生产环境

新建`src/index.js`,然后执行`npm run build`此时系统自动创建一个dist文件夹其中是main.js文件

####  新建webpack.config.js文件

