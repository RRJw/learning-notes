```js
module.exports = app =>{
  const express = require('express')
  const router = express.Router({
    mergeParams:true
    //合并路由参数，使根地址与router的地址合并，使params能够访问到路由中的参数
  })
  //子路由，当需要在接口上写入公共部分时使用
  //创建分类信息
  router.post('/', async(req,res) =>{
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //更新分类信息
  router.put('/:id', async(req,res) =>{
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })
  //获取分类列表
  router.get('/', async(req,res) =>{
    //这里存在不通用情况，进行特殊处理。0
    const queryOptions = {}
    if(req.Model.modelName === 'Category'){
      queryOptions.populate = 'parents'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    //数据中存在关联字段的话可以通过populate方法将这个关联的整个信息取出来
    res.send(items)
  })
  //根据id获取需要编辑的分类信息
  router.get('/:id', async(req,res) =>{
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  //
  router.delete('/:id', async(req,res) =>{
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success:true
    })
  })
    //cnpm i inflection
  app.use('/admin/api/rest/:resource', async(req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    //根据数据库命名规范将路由参数中的对象转换成数据库中的模型名称
    req.Model = require(`../../models/${modelName}`)
    //在req上添加属性，这种方法为中间件的形式。
    next()
  },router)
}
```

#### express静态文件托管及响应式解决

```js
app.use('访问方式，例如使用路径/upload来访问',express.static(__dirname + '/upload'))
//vue全局属性
this.$set(被赋值属性,被赋值的参数,值)
例如:在this.$set(this.model,'icon',res.url)
```

