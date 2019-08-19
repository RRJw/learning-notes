#### 基本使用方法

1. 创建一个异步对象

   > ```
   > var xmlhttp=new XMLHttpRequest()；
   > ```

2. 设置请求方法和请求地址

   > method：请求的类型；get，post
   > url：请求在服务器上的位置
   > async：true(异步)||false(同步)
   >
   > ```
   > xmlhttp.open(上面三个参数)；
   > ```

3. 发送请求

   > ```
   > xmlhttp.send();
   > ```

4. 监听状态的变化

   > ```
   > xmlhtttp.onreadystatechang=function(){
   > 	/*
   > 	0:请求未初始化
   > 	1：服务器连接已建立
   > 	2：请求已接受
   > 	3：请求处理中
   > 	4：请求已完成，且响应已就绪
   > 	*/
   > 	if(xmlhttp.readyState===4){//判断的请求状态
   > 	      //判断请求是否成功,判断http状态码
   > 	      if(xmlhttp.status>=200&&xmlhttp.status<300||xmlhttp.status===304){
   > 				5.处理返回的结果	      		
   > 	      }else{
   > 	      		
   > 	      }
   > 	}
   > }
   > ```

   ```
   <script>
           window.onload = function() {
               var btn = document.querySelector("[type='button']");
               btn.onclick = function() {
                   var xmlhttp = n = new XMLHttpRequest();
                   xmlhttp.open("get", "./ajax-get.php", true);
                   xmlhttp.send();
                   xmlhttp.onreadystatechange = function() {
                       if (xmlhttp.readyState === 4) {
                           if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
                               console.log("请求成功");
                           } else {
                               console.log("请求失败");
                           }
                       }
                   }
               }
           }
       </script>
   ```

   > **注意**：ie缓存问题，当ie每次请求服务器返回数据成功后，会认为这个数据就是这个请求地址的唯一数据，当修改后ie浏览器任然显示的是原来的数据
   >
   > 可以在请求地址上加上随机的数字或时间，来达成每次请求的地址不同，从而内容时刻在改变的问题。
   >
   > ```
   > var xmlhttp;//ie兼容性问题
   > if(window.XMLHttpRequest){
   > 	xmlhttp=new XMLHttpRequest();
   > }else{
   > 	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
   > }
   > xmlHttp.open("get",url+"?t="+(new Date().getTime()),true);//ie缓存
   > ```
   >
   > 

   #### ajax封装

   ```
   
   function ajax(url, success, err) {
       var xmlhttp = n = new XMLHttpRequest();
       xmlhttp.open("get", url, true);
       xmlhttp.send();
       xmlhttp.onreadystatechange = function() {
           if (xmlhttp.readyState === 4) {
           	//清除响应超时定时器
               if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
                   success(xmlhttp);
               } else {
                   err(xmlhttp);
               }
           }
       }
   }
   ```

   **当需要传递参数给url地址时**

   在封装ajax中，添加一个新的参数来接收参数并转换为url地址上需要的格式。

   ```
   function obj2str(obj){
   	var res=[];
   	for(var key in obj){
   		res.push(key+"="+obj[key]);
   	}
   	reutrn res.join("&");  //join方法能够数组转换为字符串然后使用&进行连接
   }
   ajax(url,obj,success,error){
   	var str=obj2str(obj);
   }
   ```

   ## 设置响应超时

   在封装函数中传入响应超时时间，并定义一个定时器。

   ```
   ajax(url,obj,timeout,success,error){
   	var time;
   	//判断外界是否传入了超时时间
   	if(timeout){
   		time=setInterval(function(){
   			xmlhttp.abort(); //终止请求
   			clearInterval(time); 
   			},timeout)
   	}
   }
   
   注意:在响应完成处清除定时器。
   
   ```

   #### 在提交的url中不能包含中文

   ```
   res.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
   ```

   #### post请求传递参数

   ```
   在open和send中写入requestHeader信息来传递
   xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
   xmlhttp.send("userName=zx&userPwd=123");
   ```

#### ajax-xml

1. 创建xml数据文件，`<?xml version="1.0" encoding="utf-8" ?>`

   > 注意：xml中与html文件格式相同，必须有一个根标签，其他标签随便写。

2. 在php文件中获取xml文件，使用`file_get_contents(xml文件)`

   > 注意:在php文件返回xml文件需要在文件顶部设置头信息
   >
   > `header("content-type:text/xml;charset=utf-8")`

3. 在前端文件中通过responseXML方法获取数据

   > 获取的数据使用document方法获取标签中的数据。

#### json

json与js互相转换：

- js对象转换为json，使用JSON.stringify()
- json转换为js对象，使用JSON.parse()