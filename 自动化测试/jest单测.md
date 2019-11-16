- 创建vue项目时添加测试配置

- 通过在新建测试文件example.spec.js**文件下导入测试文件

  ```js
  describe('测试名称'，()=>{
      //分组测试
      it('单个测试用例名称'，()=>{
          expect().toBe()  //expect函数的参数中写入测试函数的输入例如:add(1,2)，toBe方法中的参数写入期望的结果
      })
  })
  ```

- 通过`npm run text:unit`启动测试代码

##### vue-test-utils