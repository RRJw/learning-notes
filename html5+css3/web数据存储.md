#### sessionStorage数据存储

1. 这个数据本质是存储在当前页面的内存中的，存储的内容大约为5mb
2. 它的生命周期为关闭当前页面，当前页面关闭，数据就消失了

> 使用:window.sessionStorage.setItem("key",value);
>
> setItem(key,value) ：存储数据，以键值对的方式存储
> 		getItem(key):获取数据，通过指定名称的key获取对应的value值
> 		removeItem(key):删除数据，通过指定的名称删除对应的值
> 		clear():清空所有的数据

##### localStorage数据存储

1. 存储的内容给大约在20mb
2. 不同浏览器不能共享数据，但是再同一个浏览器的不同窗口中可以共享数据
3. 永久生效的，它的数据是存储在硬盘上的，并不会随着页面或者浏览器的关闭而器清除

#### 应用程序缓存

cache manifest 缓存清单，当网页中，失去网络连接时需要缓存的文件列表

```
CACHE MANIFEST
#缓存清单，必须写在文件的开头处
#在需要缓存的文件html头部，写入mainfest="缓存文件.appcache"

CACHE:
#下面为需要进行缓存的清单列表
*为缓存所有文件

NETWORK:
#下面为每一次都需要进行网络请求的资源列表


FALLBACK:
#配置如果无法获取到文件则使用指定的文件进行代替
#xx xx，以空格隔开前面是无法获取的文件后面为代替的文件
/为所有找不到的文件
```

> 注意：.appcache 扩展名可能不可用需要手动在电脑上配置
>
> 在window中搜索 inetmgr，添加扩展名.appcache,mime类型为：text/cache-mainfest