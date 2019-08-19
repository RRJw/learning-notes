#### php基本语法

定义变量:$xx=xx;

输出打印:echo $xx;

定义数组:$xx =array(); 输入print_r($xx);

定义字典(对象):$xx=array("xx"=>"xx");

获取$_GET["userName"]请求；

> get请求用于发送小数据和非敏感信息
>
> post请求用于发送大数据和敏感信息 

post请求发送文件，在表单中<form>需要加上 enctype="mulyipart/form-data"

并且在服务器端获取时须使用$_files获取。

#### 保存上传到服务器端的文件

1. 首先获取上传的文件对象数组；`$file=$_FILES["useFile"];`

   > 注意，php打印对象数组时需使用print_r();

2. 获取上传文件的名称和上传文件保存的临时路径。

   > ```
   > $fileName=$file["name"];
   > $filePath=$file["tmp_name"];
   > ```

3. 移动文件，保存。

   > ```
   > $fileName=$file["name"];
   >     iconv("UTF-8","gbk",$fileName);
   >     $filePath=$file["tmp_name"];
   >     move_uploaded_file($filePath,"./".$fileName); 旧路径，新路径拼接文件路径
   > ```

   > 当上传大文件时，可能web服务器会有上传大小限制，此时需要修改php.ini文件。

 