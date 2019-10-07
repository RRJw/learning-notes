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
6. postion:sticky 这个属性配合top使用可实现磁吸效果，让设置这个属性的元素在距离top的距离之内使其变成postion:fixed;

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

#### grid布局

- 基本使用:

  ```html
  <div class='container'>
      
  </div>
  <style>justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。
  
  align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。
      .container{
          display:grid;//设置容器为grid布局
          grid-template-colums:repeat(3,100px);//设置内容为3列，列宽为100px
          grid-template-rows：repeat(3,100px);//设置内容为3行，行高为100px; repeat()第一个参数为重复的次数，第二个参数是为所重复的值
          //第二个参数可以为一种模式：定义6列 repeat(2,100px 20px 30px) 意思为有列宽分别为100px，20px，30px的列2份，顺序排列
      }
  </style>
  ```

- auto-fill:为自动填充，当父容器高度不确定或没有设置时，子元素设置的内容自动填充满，直到不能放置更多的列或宽

- fr:表示元素所占的比例大小，例如1fr 2fr 表示1fr的宽或高为2fr的一半

- `row-gap`属性设置行与行的间隔（行间距），`column-gap`属性设置列与列的间隔（列间距）

  > 合并简写:gap:行，列

- grid-auto-flow:子元素放置的顺序，默认的放置顺序是"先行后列"

- `justify-items`属性设置单元格内容的水平位置（左中右），`align-items`属性设置单元格内容的垂直位置（上中下）。**子元素**‘/项目

  > 简写:place-items：align,justify

- `justify-content`属性是整个内容区域在容器里面的水平位置（左中右），`align-content`属性是整个内容区域的垂直位置（上中下）。**父元素**/容器

- ```css
  grid-auto-rows 设置新增的行或列的高度
  例如:grid-row-start:4 ,让开始在4行出现的子元素，系统生成的空白元素高度为设置的高度
  ```

- grid-xx-start/end :**指定项目的四个边框，分别定位在哪根网格线**\

-  grid-template-areas：设置网格的布局模型

  > 例如: grid-template-areas: 'a b c'
  >                      						  'd e f'
  >                                                'g h i';

- `grid-area`属性指定项目放在哪一个区域。

- `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。

  `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。 **项目的内容**

#### vertical-align: middle只对行内元素有效

