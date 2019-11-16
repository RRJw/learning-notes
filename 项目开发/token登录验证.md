####  koa 框架的基本使用

- 导入koa框架，koa路由模块。

  ```js
  const koa = require('koa')
  const Router = require('koa-router')
  //实例化koa，router
  const app = new koa()
  const router = new Router()
  //配置路由
  app.use(router.routes()).use(router.allowedMethods())
  //开启服务
  const port = process.env.PORT || 5000
  app.listen(port, () => {
      console.log(`server started on ${port}`);
  })
  ```

- 设置请求接口

  ```js
  router.get('/', async ctx => {
          ctx.body = { msg: 'Hello koa interfaces' }
      })
  ```

- 配置路由模块，新建api接口文件夹，使其与入口文件关联

  user.js(接口文件)

  ```js
  //导入和实例化路由
  const Router = require('koa-router')
  const router = new Router()
  //将路由模块导出
  module.exports = router.routes()
  ```

  app.js(入口文件)

  ```js
  引入路由模块
  const users = require('./routes/api/users')
  //配置路由地址,如果路由访问地址为api/users开头的地址路由文件就会去找users文件下的访问路由
  router.use('/api/users', users)
  ```

- 获取请求体数据模块

  ```js
  const bodyParser = require('koa-body-parser')
  //初始化
  app.use(bodyParser())
  ```

- 引入数据库模块

  app.js

  ```js
  const mongoose = require('mongoose')
  //配置连接
  mongoose.connect("mongodb+srv://test:test123456@cluster0-xq4bg.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
      .then(() => {
          console.log('数据库连接成功!');
      })
      .catch(() => {
          console.log('数据库连接失败!');
      })
  ```

- 创建用户数据模型，并导出

  ```js
  const mongoose = require('mongoose')
  const Schema = mongoose.Schema
      //实例化数据模板
  const UserSchema = new Schema({
      name: {
          type: String,
          required: true
      },
      email: {
          type: String,
          required: true
      },
      password: {
          type: String,
          required: true
      },
      avatar: {
          type: String,
      },
      date: {
          type: Date,
          default: Date.now
      }
  })
  module.exports = User = mongoose.model('users', UserSchema)
  ```

- 注册密码加密模块

  ```js
  const bcrypt = require('bcryptjs')
  const tools = {
      enbcrypt(password) {
          var salt = bcrypt.genSaltSync(10)
          var hash = bcrypt.hashSync(password, salt)
          return hash
      }
  }
  
  module.exports = tools
  ```

- 在接口文件中引入数据加密文件，并使用

- 在接口文件中引入全球公认头像模块，并使用

  ```js
  const gravatar = require('gravatar') 
  ```

  

- 在接口文件中使用数据模型

  ```js
  const User = require('../../models/User')
  //通过注册接口，将数据存入数据库
   /**
       * @route POST api/users/register
       * @desc 注册接口地址
       * @access 接口是公开的 
       */
  router.post('/register', async ctx => {
          //查询数据库中是否存在邮箱
          const findResult = await User.find({ email: ctx.request.body.email })
          if (findResult.length > 0) {
              ctx.status = 500
              ctx.body = { email: '邮箱已被占用' }
          } else {
              const avatar = gravatar.url(ctx.request.body.email, { s: '200', r: 'pg', d: 'mm' }) //全球公认头像模块
              const newUser = new User({
                      name: ctx.request.body.name,
                      password: tools.enbcrypt(ctx.request.body.password),
                      email: ctx.request.body.email,
                      avatar
                  })
                  // await bcrypt.genSalt(10, (err, salt) => {
                  //     bcrypt.hash(newUser.password, salt, (err, hash) => {
                  //         // Store hash in your password DB.
                  //         //将加密后的密码添加到User数据中去
                  //         if (err) throw err
                  //         newUser.password = hash
                  //     });
                  // });
                  //将获取到的数据存储到数据库中
              await newUser.save().then((res) => {
                  //响应体
                  ctx.body = res
              }).catch((err) => {
                  console.log(err);
              })
          }
      })
  ```

- 编写登录接口，并使用生成token

  ```js
  const jwt = require('jsonwebtoken') //导入token令牌
  /**
       * @route POST api/users/login
       * @desc 登入接口地址，返回token
       * @access 接口是公开的 
       */
  router.post('/login', async ctx => {
      //首先查询账号是否存在
      //返回查询到的对象
      const findResult = await User.find({ email: ctx.request.body.email })
      const user = findResult[0]
      const password = ctx.request.body.password
      if (findResult.length == 0) {
          ctx.status = 404
          ctx.body = { email: '用户名不存在' }
      } else {
          //密码验证
          const result = await bcrypt.compareSync(password, user.password)
          if (result) {
              const payload = { id: user.id, name: user.name, avatar: user.avatar }
              const token = jwt.sign(payload, 'secret', { expiresIn: 3600 })
  
              ctx.status = 200
              ctx.body = { success: true, token: 'Bearer ' + token }
          } else {
              ctx.status = 400
              ctx.body = { password: '密码错误' }
          }
      }
  })
  ```

- 编写信息接口，返回用户信息(验证token)

  ```js
  //在入口文件中导入koa-passport
  const passport = require('koa-passport')
  //配置,导入验证文件
  app.use(passport.initialize())
  app.use(passport.session())
  require("./config/passport")(passport)
  //创建passport.js token验证文件
  const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
  const mongoose = require("mongoose");
  const User = mongoose.model("users");
  const keys = require("../config/keys");
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = keys.secretOrKey;
  
  module.exports = passport => {
      passport.use(
          new JwtStrategy(opts, async function(jwt_payload, done) {
              console.log(jwt_payload);
              const user = await User.findById(jwt_payload.id)
              if (user) {
                  return done(null, user)
              } else {
                  return done(null, false)
              }
          }));
  }
  ```

- 创建验证接口，并返回验证信息

  ```js
      /**
       * @route GET api/users/current
       * @desc 用户信息接口地址，返回用户信息
       * @access 接口是私密的 
       */
  router.get('/current', passport.authenticate('jwt', { session: false }), async ctx => {
      ctx.body = { success: true }
      ctx.body = {
          id: ctx.state.user.id,
          name: ctx.state.user.name,
          email: ctx.state.user.email
      }
  })
  ```

  

