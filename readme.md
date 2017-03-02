##在线网站
http://server.firstfly.cn:8082/
这是简单的通过pm2启动的线上服务器，即pm2 start server.js --watch

##quickly start
首先运行命令：npm start
然后打开在浏览器地址栏输入 localhost:8082
在第一次访问时，会自动设置一个cookie {userId：Math.random()) 作为唯一标志，可以实现数据云端存储，因作为练习regularjs所用，所以不支持用户名登录

------
##文件目录说明
/dist 
>用webpack打包之后的js/css文件，index.html直接引用这里的文件

/node_modules
/redux
>redux的action／reducer，组件的数据流动都是dispatch这里的action，导致最上层数据发生变化，然后调用最上层组件的this.$update()（在entry的中通过store.subscribe()实现）实现界面的刷新。
其中的action会在dispatch之前，先对服务器数据进行增删改查，等确认服务器数据操作成功之后，再更改本地数据。所以添加todo等界面显示较慢。
这儿与服务器数据交互、本地数据更改，是通过redux的中间件chunk，还有chrome原生支持的fetch函数完成。

/resource
>引用的资源regualrjs
还有一个工具包uitl.js，一些通用方法会放在这儿。比如解析cookie的方法

/serverTest
>之前学习nodejs的练习之作，对这个项目无用。

/style
>一个sass语法的scss文件,这个文件会通过webpack转换成css文件，放到dist／index.css中

##package scripts命令说明
####brs 
>编写前端代码时所用，用到工具browser-sync，实现自动刷新功能。搭建好服务器之后，因为涉及跨域和fetch请求地址等差异暂时不再使用

####build
>编写前端代码时所用，文件改变则自动打包打包到dist目录之下的功能，入口文件是entry.js

####start
>用node启动本地服务器

------

##技术原理
前端用regualrjs、sass、redux、fech，用webpack实现bable转义、sass转义并打包等功能，用browser-sync实现自动刷新（在需要调整页面样式时很有用）。
后端用ndoejs、mongodb，没有用封装的框架，比如express、connect等。只用http模块、url模块、fs模块等搭建。mongdb等驱动用的是官方等nodejs驱动，没用使用moogoose等第三方驱动。
mongdb数据库是直接使用自己搭建的远程数据库

##缺陷及改进想法
1，因为数据操作都得先在服务器上更改，再更改本地数据，所以操作起来速度太慢
2，fetch、nodejs对数据库操作等代码重复部分太多，应该抽取出来

------
##serverTest文件夹

	servermvc.js handlers.js
	是 /controller/action/a/b/c 的url形式

	server.js
	根据req的 method、url 共同来决定资源的调度情况

	serveruse.js action.js app.js
	模拟connection的use方法，添加路径与action中方法的对应关系

	mongodb.js 
	官方nodejs驱动mongodb的练习代码

	serverauth.js
	练习Basic Authorization的代码

##分支说明
	
	stage1 
	练习的代码

	stage2
	正式编写前的代码，已分了front、server两个文件夹，且增加了一些练习