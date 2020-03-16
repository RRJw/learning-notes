#### let

- **作用域**:只在自己的花括号内有效。
- 变量的使用一定要在声明后，否则会报错。
- 在块级作用域内，声明的变量与全局变量相同时，且**全局变量调用在前就会报错**，称为"暂时性死区"。
- 不允许重复声明同一个变量
- 全局声明的let变量，window(顶层对象)无法访问。
- 在声明前调用，会出现错误去，因为let存在临时性死区

#### const

- 声明一个只读的常量，常量声明后就不能改变了。声明的同时赋值，否则会报错。
- 作用域：只在声明的块级作用域中有效。
- const定义的对象是可以改变的

#### var

- 可以重复声明
- 没有块级作用域
- 不能限制
- 存在函数作用域，或者说是局部作用域
- 变量提升，在变量声明前调用会出现undefined

#### 解构赋值

- 左右两边类型相同或者说一样

- 右边是一个数组或者对象或json

- 例如`let [a,b,c]=[a:10,b:20,c:30]` 这里数组[a,b,c]就是[10,20,30]

- ...xxx **剩余参数**  例如:`let [a,b,..array]=[1,2,3,4,5] ` 这里的...array为 3,4,5

- ...xxx **展开数组**  例如: `let arr=[1,2,3] console,log(...arr)` 这是打印的就为数组arr的内容

  > 可以将字符串数组，转换为单个字符的数组对象 例如:[...'ranxiaoran']
  >
  > 还可以进行数组的合并等等，操作
  >
  > 可以将nodelist(可遍历对象转化为数组）[....nodelist]

#### 对象结构

可以用在默认的回滚值上：

```
const person = {
            name: 'ran',
            age: 21,
            address: 'high home',
            family: {
                father: 'ran father',
                brother: 'ran brother'
            }
        }
        const name = 'ranxiaoran';
        const {
            name: n,
            age,
            address
        } = person
        console.log(n, age, address);
```



#### 系统对象

**1.Array**

- map 一对一映射元素对元素进行操作(不会改变数组元素类型为值类型的元素，但是会改变引用数据类型的元素)

> ```
> let arr = [99, 22, 97, 85, 50, 20, 99, 21]
> 
>         /*console.log(arr.map(function(item) {
>             if (item >= 60) {
>                 return true
>             } else {
>                 return false
>             }*/
>         //将数组中大于等于60的元素映射为true，其他为false
>          console.log(arr.map(item =>item >= 60));
> ```

- forEach 遍历循环数组元素 字符串模板``${}``

- filter 过滤器

  > ```
  > let arr2 = arr.filter(function(item) {
  >             if (item >= 60) {
  >                 return item
  >             }
  >         })
  > ```

- reduce  多对一数据映射，常用于数据的求和，

- > reduce为每个元素依次执行回调，

  > ```
  > arr.reduce(function(map, item, index) {
  >             alert(`第${index}次求和，${map}+${item}`)
  >             return map + item
  >         })
  > ```
  
- Array.from() 将类数组转换成数组

**2. String**

- 字符串模板 `${}`

- startsWith 查看某个字符串是否以xx开头 例如 xx.startsWith('xx')

- endsWith   同理可得

- includes() 查看字符串是否包含某个字符串

- ' '.repeat(number)  写入重复的字符串

  > ```
  >  const id = '532155125522';
  >         const fan = 'I LOVE MAMMAN';
  > 
  >         function padder(string, length = 20) {
  >             return `${' '.repeat(Math.max(length-string.length,0))}${string}`
  >         }
  >         console.log(padder(id));
  >         console.log(padder(fan));
  > ```

**3.  JSON**

- 标准写法

  > { "key":value } 

- json对象

  > json.parse  字符串转json
  >
  > stringify json转字符串

#### 异步处理

- promise

  > 异步回调处理，promise.all([]).then( )
  >
  > axios

- async/await

  ```js
  async函数内部存在异步操作，await作为内部异步函数运行成功后的then方法。
  await后的异步函数如果返回了reject，将不再执行后续代码
  async函数返回一个promise，通过.then可以获取函数中的返回值return，当async函数出现return语句及表示这个reslove，当抛出异常则reject
  ```
  
  
  
  > async function xx(){}
  
  ```javascript
  const fs = require('fs')
  
  function pReadFile(filePath) {
      return new Promise((resolve, reject) => {
          fs.readFile(filePath, (err, data) => {
              if (err) {
                  reject(err)
              }
              resolve(data)
          })
      })
  }
  
  
  pReadFile('./a.txt')
      .then(function(data) {
          console.log(data)
          return pReadFile('./b.txt')
      })
      .then(function(data) {
          console.log(data)
      })
  ```
  

####  同步的问题

当程序为同步执行时，如果代码中存在网络请求(网络请求较耗时)就会产生阻塞，后面代码得等到请求完成才能执行导致页面参数空白等等==

#### 对异步操作参数的操作、

```javascript
 new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('aaa')
            }, 1000)
        }).then(res => {
            console.log('res的第一层处理')
                /*原生版本
                return  new Promise( resolve =>{
                    reslove(res + '111')
                })*/
            return res + '111' // 简写版本一 return Promise.resolve(res + '111')
        }).then(res => {

            console.log('res的第二层处理')
            return res + '222'
        }).then(res => {
            console.log(res)
        })
```

#### pormise的基本使用

```js
   new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        }).then(() => {
            console.log('成功的promise异步操作');
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('这是失败的异步操作信息')
                })
            }).catch(err => {
                console.log(err);
            })
        })
```

#### promise.all使用

```js
 Promise.all([
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('冉小小')
                }, 1000)
            }),
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('叶大大')
                }, 1000)
            })
        ]).then(reslove => {
            c
```

##### 字符串

- xx.statrsWith('111'),判断某个 字符串是否是以111开头的。
- endsWith() 同理
- function.bind() 可用于绑定作用域 this指向问题解决