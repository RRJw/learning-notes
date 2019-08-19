#### express路由基本使用

router.js

```
//安装express并创建express对象
const express=require('express')
//创建路由express容器
const router = rxpress.Router()
//把路由挂载到router容器中去
router.get()/router.post
//把router到处
module.exports=router
```

app.js

```
//导入路由文件
const router=require('./router')
//把路由挂载到app服务中去
app.use(router)
```

在函数中操作异步数据的时候，通常使用**回调函数**来操作数据。例如：

```
function fn(callback){
	setTimeout(()=>{
		var data='hello'
		callback(data)
	},1000)
}
//这里当上面执行到回调函数时，既传递了参数又调用了方法，实现了在异步操作中来操作数据的目的。
fn((data)=>{
	console.log(data)
})
```

