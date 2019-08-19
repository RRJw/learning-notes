# Vue 插槽详细分析 #

----------
1.**插槽概念分析**：在子组件内容中填写元素是无法渲染的，此时在模板内加入**`<slot></slot>`**元素，当渲染时插槽即`<slot></slot>`会被替换成输入的元素或内容。

例如：创建一个`<base-layout>`组件

    <base-layout>
       context			此时在浏览器中context是无法渲染出来的
    </base-layout>
现在在模板组件中加入插槽

    <div> <slot></slot> </div>
当组件渲染时，插槽内可以是任何模板代码包括html，甚至其他组件

    <div> context </div>
	
2.**编译的作用域：**插槽跟模板的其它地方一样可以访问相同的实例属性 (也就是相同的“作用域”)，而不能访问 <base-layout> 的作用域，简单来说就是**模板内插槽的作用域就是模板的作用域**
例如：
    
    <base-layout url="/profile">
       	Clicking here will send you to: {{ url }}		
		这里的 `url` 会是 undefined，因为 "/profile" 是
  		传递给 <base-layout> 的而不是
  		在 <base-layout> 组件*内部*定义的。
    </base-layout>
