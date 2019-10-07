#### mixin

- mixin混入:着手于解决在不同组件中的重复代码的抽离。

  ```js
  //基本是使用
  var mixin = {
    created: function () { console.log(1) }
  }
  var vm = new Vue({
    created: function () { console.log(2) },
    mixins: [mixin]
  })
  // => 1
  // => 2
  ```

- 这个混入对象可以想正常的实例对象一样包含选项。

