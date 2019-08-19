## css盒子模型 ##

内联元素 inline 不能设置宽高，前后没有换行符

内联块元素 能设置宽高，前后没有换行符

box-sizing：border-box 将div的设置的宽度平均分配给盒子除了外边距

两个盒子相邻会出现外边距重叠，谁的外边距大用谁

## css常用布局 ##

1. clear:both 清除两侧浮动
2. line-height设置为父容器相同+text-align 可设置文字垂直居中与父容器
3. 绝对布局 postion:absolute top right bottom left
4. 相对布局 postion:relative
5. 固定布局 postion:fixed

#### 多列布局

1. 设置列数：column-count: 1;
2. 设置列间隙样式:column-rule：dashed 3px red；虚线，红色，3像素。
3. 设置列间隙大小:column-gap：50px；
4. 设置列宽:column-width：；当设置的宽大于实际列数总和宽时，取大优先；并合并列。
5. 设置元素跨多列：column-span：

## 弹性布局

display：flex；

1. **justify-content**：**设置子元素的排列方式**

   - flex-start：让子元素从父容器的起始位置排列
   - flex-end：让子元素从父容器的结束位置排列(即，一行的末尾。)上同；
   - center：让子元素居中对齐
   - space-between：左右对齐父元素的起始和末尾，中间平均分布产生相同的间距。
   - space-around：将多余的空间平均分配个每个子元素，产生相同的左右外间距。

2. flex-wrap：控制元素是否换行，nowrap：不换行|wrap：换行|wrap-direction：设置翻转排列。

3. flex-direction：控制元素的排列方向，column：垂直排列|column-reverse：垂直相反排列。

   > 简写：**flex-flow**：综合上flex-wrap，flex-direction

   对子元素

4. flex-grow：可以扩展子元素的宽度，设置当前元素所占剩余空间的比例值。

   > 默认值为0，设置后为子元素加上剩余比例空间。

5. flex-shrik：当设置display：flex后若子元素的宽大于父元素的宽后，子元素将进行平均收缩，此时flex-shrik可以设置各个子元素可占据的收缩比例。

6. align-self：子元素的对齐方式，同justify-content，align-items

   > 默认值为1，

> **简写flex：1，让元素占据父元素的整个空间。多个元素就分配。**

 **align-items:center** 设置在垂直方向(侧轴方向)的对齐方式



