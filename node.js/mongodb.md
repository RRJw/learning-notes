#### 启动数据库

- mongod
- 修改默认数据存储路径:mongod --dbpath=数据存储路径

#### 连接数据库

- mongo
- 退出:exit

#### 基本的命令

- show dbs:查看显示所有的数据库
- db:查看当前操作的数据库
- use 数据库名称：切换到指定的数据库(如果没有回自动创建)

#### 基本的使用

```
const mongoose = require('mongoose')
    //连接本地数据库
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
    //创建一个db连接状态
const db = mongoose.connection
    //创建链接失败的语句
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
    //创建一个kitty猫的模板(表结构，集合)
    const kittySchema = mongoose.Schema({
            name: {
                type: String,
                require: true //常见约束
            },
            gender: String
        })
        //创建一个kitty猫的模板实例模型
        //第一个参数：传入一个大写名称单数字符串，来表示你的数据库名称
        //返回值:模型构造函数(使用这个函数对数据集合中的数据进行增删改查)
    const Kitty = mongoose.model('Kitty', kittySchema)
        //创建实例
    const luckly = new Kitty({
        name: 'luckly',
        gender: '公'
    })

    //Kitty.find((err,ret)=>{}) 查询数据库中的所有数据，返回数组对象
    //findOne() 查询一个返回一个对象

    luckly.save((err, luckly) => {
        if (err) return console.log(err)
        console.log(luckly);
    })

})
```

1. 查询某个数据

   > xx.find({条件},(err,ret)=>{}) 查询所有
   >
   > xx.findOne({条件},(err,ret)=>{}) 查询一个

2. 删除某个数据

   > xx.remove({条件},(err,ret)=>{}) 不建议使用
   >
   > xx.deleteOne({条件},(err,ret)=>{})
   >
   > xx.deleteMany({条件},(err,ret)=>{})

3. 更新某个数据

   > findByIdAndUpate('id',{更新元素},(err,ret)=>{})
   >
   > xx.update()
   >
   > xx.updateOne()
   >
   > xx.updateMany()