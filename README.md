# 好用的工具/资源聚合仓库
- 本仓库用来收集好用的工具/资源
- 推荐好用的工具/资源，请[提交 Issue](https://github.com/yuniorzen/hub/issues) 。

```
Created by Yunior  2014-6-14 17:37
```


## <a name="list"></a> 目录
- [创意](#idea)
- [效率](#good)
- [设计](#design)
- [前端](#frontend)
- [后端](#backend)
- [区块链](#blockchain)
- [人工智能](#AI)
- [免费教程资源](#freebook)
- [其它](#other)    

## 创意 <a name="idea"></a>
[cartoonify](https://github.com/danmacnish/cartoonify)   
![](https://www.wangbase.com/blogimg/asset/201807/bg2018071315.jpg)   
非常有创意发明：自制的"拍立得"照相机，拍出来的不是照片，而是卡通图片！它的内部是摄像头+树莓派+热敏打印机。获得照片以后，自动调用谷歌的服务，处理成卡通图片，然后打印出来。


[Emoji 官方表情搜索](https://emojiratings.tumblr.com)   
输入表情，搜索展示全球大厂的官方表情，可以清晰看出各家设计风格的不同。

[Radio Garden](http://radio.garden/live/)   
![](https://www.wangbase.com/blogimg/asset/201806/bg2018062225.jpg)   
世界地图上每一个绿点，就代表一个当地的电台。光标移上去，就可以听到该电台的现场直播。   
原站点无法访问，可以访问谷歌商店下载应用体验。

[Gource](http://gource.io/)   
![](https://www.wangbase.com/blogimg/asset/201806/bg2018062220.jpg)   
Gource 是一个很好玩的可视化工具，可以将代码仓库的历史变成视频，支持 Git 和 SVN 等多种格式。只要在仓库目录执行 gource 命令，就能看到提交历史的视频。

[如何在抖音上找到漂亮小姐姐？](https://github.com/wangshub/Douyin-Bot)   
作者用 Python + ADB 做的 Bot。它会自动打开 APP 对视频截图，然后请求腾讯的 [人脸识别 API](http://ai.qq.com/)，当颜值大于门限值 `BEAUTY_THRESHOLD`时，点赞并关注，接着翻到下一页，重复进行该过程用来收集漂亮的小姐姐。

[github-contributions-chart](https://github.com/sallar/github-contributions-chart)（[Demo](https://github-contributions.now.sh/)）  
GitHub 用户主页有一张图，每一天就是一个小格子。你只要在这一天提交了代码，这个格子就是绿色。但是，这张图只显示过去的一年，即365个格子。   
这个工具可以生成从你加入 GitHub 那天起的所有格子。

[rebound](https://github.com/shobrook/rebound)   
![](http://www.ruanyifeng.com/blogimg/asset/2018/bg2018042812.jpg)   
有人终于把这个工具写出来了，一旦 Python 或 JS 脚本报错，就到 Stack Overflow 取回报错信息的解释。

[Remote Browser](https://github.com/intoli/remote-browser)   
一个浏览器自动化框架，可以用脚本控制已经打开的浏览器。


## 效率 <a name="good"></a>
[ReLaXed](https://github.com/RelaxedJS/ReLaXed)   
一个将 HTML 文件转为 PDF 文件的命令行工具。


## 设计 <a name="design"></a>
[Lottie](http://airbnb.io/lottie/)   
Airbnb 推出的动画效果库，可以把 Adobe After Effects 制作的动画用于 Web、安卓和 iOS。

[Cool Backgrounds](https://coolbackgrounds.io/)   
![](https://www.wangbase.com/blogimg/asset/201806/bg2018060823.jpg)   
自动生成背景图片的工具网站，现在提供五种风格，每种都可以定制，看上去赏心悦目。

[Feature Icons](https://github.com/feathericons/feather)   
一个开源图标库，提供一些简单漂亮的常用图标。


## 前端 <a name="frontend"></a>
[wired-elements](https://github.com/wiredjs/wired-elements)   
![](https://www.wangbase.com/blogimg/asset/201806/bg2018061427.jpg)   
一个有手绘效果的网页组件库。但是，真正特别之处在于它的底层是 Web components，让我们看到了除了React/Vue之外，还有其他的路。

[JavaScript 算法与数据结构](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)   
这个仓库收集了30多种算法的 JavaScript 实现。

[tlsh-js](https://github.com/idealista/tlsh-js)   
一个生成字符串哈希的 JavaScript 库。它的特点是，字符串越相似，或者重复同样的模式，生成的哈希也越相似，可以用来计算两个字符串的相似程度。

[css-protips](https://github.com/AllThingsSmitty/css-protips/tree/master/translations/zh-CN)   
一个收集 CSS 使用技巧的库。

[img-2](https://github.com/RevillWeb/img-2)   
一个 WebComponent 组件，使用  &lt;img-2> 取代  &lt;img>，可以只显示第一屏的图片，其他图片通过 Web Worker 预下载，一旦该图片进入可视区域后再加载显示。

[Proton Native](https://proton-native.js.org/)   
React Native 可以写桌面应用了，不必使用 Electron 了。有人写了一个渲染器，把 RN 渲染成桌面操作系统的 Native 应用。为了表示跟 Electron （电子）项目的竞争关系，它故意起名为 Proton（质子）。


## 后端 <a name="backend"></a>
[Jib](https://jaxenter.com/jib-java-containerization-146647.html)   
谷歌开源的 Java 应用容器生成工具，不用写 Dockerfile，构造过程中自动生成一个 Docker 容器。

[Gitea](https://gitea.io/en-us/)   
类似于 GitHub 和 GitLab 的开源项目，用于个人架设 Git 代码托管服务，使用 Go 语言实现。

[bat](https://github.com/sharkdp/bat)   
![](https://camo.githubusercontent.com/67e44f4a68150325f74b3a46820b7473ff7b91a6/68747470733a2f2f692e696d6775722e636f6d2f326c53573452452e706e67)   
命令行的 cat 命令用来显示文件的内容，bat 命令完全跟 cat 一致，只有一个地方不一样，就是现在的内容会带有行号和代码高亮。


## 区块链 <a name="blockchain"></a>
[GitTorrent](https://blog.printf.net/articles/2015/05/29/announcing-gittorrent-a-decentralized-github/)   
一个采用 BitTorrent 协议的 GitHub 替代品，真正做到了无中心。虽然这个项目很久没有更新了，但是可以阅读上面的文章，了解它的原理。

[IPFS 教程](https://github.com/miaoski/ipfs-tutorial)   
![](https://www.wangbase.com/blogimg/asset/201806/bg2018062911.jpg)   
如果你想把一个文件放到网上，从此任何人无法删除和屏蔽，别人只要想看就能看到，你可以使用 IPFS。

它是一个分布式网络，采用点对点通信。内部是一个区块链，文件写入以后就没法删除了，然后通过哈希可以读出文件。缺点是本地需要架设一个客户端，资源开销有点大。


## 人工智能 <a name="AI"></a>
[faceai](https://github.com/vipstone/faceai)   
一款入门级的人脸、视频、文字检测以及识别的项目。

[机器学习50个最佳免费数据集](https://gengo.ai/articles/the-50-best-free-datasets-for-machine-learning/)   
这里列出50个可以用来训练模型的免费大型数据集。

[self-driving-toy-car](https://github.com/experiencor/self-driving-toy-car)   
![](https://www.wangbase.com/blogimg/asset/201806/bg2018060821.jpg)   
一个开源的自动驾驶玩具车，在小车上面绑了一个树莓派和摄像头。

## 免费教程资源 <a name="freebook"></a>
[C 语言教程：构建 Lisp 编译器](https://ksco.gitbooks.io/build-your-own-lisp/)   
一本免费电子书，从零开始讲解 C 语言，目标是写出一个 Lisp 语言的编译器。

[WebAssembly 现状与实战](https://www.ibm.com/developerworks/cn/web/wa-lo-webassembly-status-and-reality/index.html)   
WebAssembly 并不是一门编程语言，而是一份字节码标准，需要用高级编程语言编译出字节码放到 WebAssembly 虚拟机中才能运行， 浏览器厂商需要做的就是根据 WebAssembly 规范实现虚拟机。本文重点介绍如何使用 AssemblyScript 来编写 WebAssembly。


[Python - 100天从新手到大师](https://github.com/jackfrued/Python-100-Days)   
一本针对初学者的 Python 教程。

[前端人工智能？TensorFlow.js 学会游戏通关](https://zhuanlan.zhihu.com/p/35451395)   
作者使用 TensorFlow.js，让程序自动完成 Chrome 浏览器的内置小游戏"恐龙快跑"。

[只有 13 台 DNS 根域名服务器原因](https://jaminzhang.github.io/dns/The-Reason-of-There-Is-Only-13-DNS-Root-Servers/)   
我们经常听到 DNS 根域名服务有 13 台，那么是为什么呢？ 今天我们来深入了解下。

[互联网公司技术架构](https://github.com/davideuler/architecture.of.internet-product)   
作者收集的国内各大互联网公司技术架构的资料。

[《React in patterns》](https://sangka.github.io/react-in-patterns-cn/)   
介绍了使用 React 开发时的一些常用设计模式，其中包括的技术有组合( composition )、数据流、依赖管理，等等。

[GitHub 最受欢迎的20个课程仓库](https://education.github.community/t/20-of-the-most-popular-courses-on-github/27832)  
很多开放课程的仓库放在 GitHub 上面，GItHub 官方列出了最受欢迎的20个仓库。

[《计算与推断：数据科学基础》](https://ds8.gitbooks.io/textbook/content/)   
本书是加州大学伯克利分校《数据科学导论》课程的教材，现在开源了。


## 其它 <a name="other"></a>
[Google CTF 的试题](https://github.com/google/google-ctf)   
这个是试题库，收集了 Google 主办的黑客安全大赛 CTF 的题目。

[docsmall](https://docsmall.com/image-compress)   
国内开发团队打造的工具，可能是国内最棒的在线压缩工具。支持JPG、PNG、GIF、PDF，单个文件最大25Mb。

[merge-images](https://github.com/lukechilds/merge-images)    
多张图片合成一张图片的浏览器 JS 库，使用了 Canvas。