## vue-resource基本使用 ##

- 当发起get请求之后，通过.then来设置成功的回调函数 例如:this.$http.get(url地址,【options】).then(function(result){ consloe.log(result.body)})
- post请求 this.$http.post('url',{提交对象}，{提交内容类型}).then(result=>{})
- emulateJSON：true 即内容类型为普通表单格式