##### 1.在现有的项目中安装插件`vue add @vue/eslint`

> 这个命令不代表能够代替一些普通包的安装命令，那些仍然需要使用npm或yarn安装

如果你的插件在项目之外的其他`package.json`文件中，你可以在自己项目package.json中设置

```
{
  "vuePlugins": {
    "resolveFrom": ".config"
  }
}
```

depebdebcies 运行时依赖，devDependebcies 开发时的依赖

runtime-only 1.性能高

vm.options.template->parse解析->ast抽象语法树->编译->render函数->虚拟dom

