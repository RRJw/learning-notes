#### transform(2d)

1. scale(缩放):当缩放大于1时为放大，小于1时为缩小，缩放方向(x,y)轴。
2. translate(移动):移动方向x，y轴。
3. rotate(旋转)：角度deg，顺时针为正，逆时针为负。
4. skew(斜切)：用来指定元素在x轴，或y轴的倾斜程度。角度为正则为逆时针倾斜，反之同。

> 上通xxxX()；

tuansform：origin 旋转的轴心  可设置x，y或者特殊关键字top，left，right，bottom。

> 注意：先移动再旋转，由于先旋转坐标轴已经改变

**使用transform+定位position来实现任意元素的垂直居中显示。**

transform移动是参照元素本身的宽高来实现的。

transition复合写法会根据后写的属性先执行。

```js
transition: rotate(30deg) translate() //先执行移动，再旋转
//位移会受到 旋转，斜切等其他元素影响
```



#### transform3d与2d同

transform3d:rotate(x,y,z,deg)

**transform-style:flat不保留3d位置|preserve-3d 保留3d变换后的位置**  （**需要设置在父元素中**）

perspectice：景深父元素设置

perspectice-origin：景深视角

backface-visibility: hidden; 设置旋转元素后将元素隐藏。



### 动画

1. 创建动画名称：animation-name：xx。
2. 设置动画总共的耗时：animation-duration'：xs；
3. 创建动画 @keyframes 动画名称{ 0%{}  100%{} }
4. 默认动画响应次数:animation-iteration-count：infinite；无限次、、
5. 交替动画：animation-direction：alternate；
6. 动画开始延迟：animation-delay：2s；
7. 设置动画结束时的状态,默认会回到原始状态：animation-fill-mode：
   - forwards：会保留动画结束时的状态
   - backwards：添加动画延迟的情况下，立即进入初始状态，等待开始
   - both：包括上两者都有。
8. 动画的时间函数：animation-timing-function：ease|linear 等等。steps()分布完成
9. 设置动画播放的状态:animation-play-state：paused|running；