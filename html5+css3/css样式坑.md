- li之间会产生间距

  ```js
  解决: font-size:0
  ```

- label标签可用做于表单元素美化

  ```js
  <label>
        <input type="checkbox"> //将表单元素隐藏，利用label特性点击div元素同时触发了表单元素
        <div>RRJw</div>	 	  //的功能
  </label>
  ```

- bfc规范：让容器内部的元素与外界隔离不受影响

  ```js
  例如:设置了overflow,float,display，position:ab绝对定位属性的元素
  不受margin叠加,传递
  ```

- data-set H5自定义属性

  ```js
  element.dataset // 自定义属性集合
  data-list-name // dataset.listName
  ```

- 行内块元素水平排列，如果内有文本则会产生排列问题

  1. 产生默认间距，（父元素设置font-size:0)可以解决
  2. ![1580114194957](C:\Users\冉季伟\AppData\Roaming\Typora\typora-user-images\1580114194957.png)
  3. 布局乱，可使用    vertical-align解决![1580114278750](C:\Users\冉季伟\AppData\Roaming\Typora\typora-user-images\1580114278750.png)

