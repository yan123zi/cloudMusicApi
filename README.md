# 网易云音乐 API [![Build Status](https://www.travis-ci.org/yan123zi/cloudMusicApi.svg?branch=master)](https://www.travis-ci.org/yan123zi/cloudMusicApi)

网易云音乐 Node.js API service

> 网易云音乐API express 版本, 通过Web网页版请求QQ音乐接口数据, 有问题请提 [issue](https://github.com/yan123zi/cloudMusicApi/issues)

> 当前代码仅共学习，不可做商业用途

### API结构图

![cloud-music](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/cloudMusicApi.png)

### 📦 安装

```
git clone git@github.com:yan123zi/cloudMusicApi.git
npm install
```

### 🔨项目启动
```
npm run start 
```

项目监听端口是`3100`

## 功能包含

1.获取推荐模块的热门推荐

2.获取推荐模块的新碟上架

3.获取推荐模块的榜单列表

4.获取推荐模块的横幅

5.获取所有歌单分类

6.获取某个歌单分类下的所有歌单列表

7.获取歌单详情

8.获取歌单歌曲列表

9.获取喜欢这个歌单的人

10.获取歌单相关推荐

11.获取用户基本信息

12.获取用户听歌记录

13.获取用户的所有歌单

14.获取mv详情

15.获取mv相关的mv推荐

16.获取video详情

17.获取video播放链接

18.获取video的相关video推荐

19.获取歌曲详情

20.获取歌曲播放链接

21.获取歌曲的歌词

22.获取歌曲的相似歌曲和包含该歌曲的歌单

23.获取排行榜的所有分类

24.获取排行榜的详情

25.获取新碟上架

26.获取专辑内歌曲列表

27.获取专辑详情

28.获取喜欢该专辑的人

29.获取异步搜索结果

30.获取搜索结果

31.获取热门歌手列表

32.获取歌手列表按分类

33.获取歌手的简介

34.获取歌手的热门作品

35.获取歌手的所有专辑

36.获取歌手的所有mv

37.获取歌单，专辑，排行榜，歌曲，mv，video的评论

### 使用文档

使用`apis`详见[文档](https://yan123zi.github.io/cloudMusicApi/#/)

### 关于项目

**打包发布**

```
使用nodejs和它的框架express做的爬虫项目，用来提供api服务，使用docker和持续集成打包发布到服务器。
只需修改.travis.yml文件和替换id_rsa.enc文件即可
```

**灵感来自**

[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

**参考内容**

[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

### 项目不足

登录模块未编写敬请期待！

#### 👨‍🏭 作者

> just one student for javaEE,like to study some technologies

- [Github](https://github.com/yan123zi)

#### 📝 License

[MIT](https://github.com/yan123zi/cloudMusicApi/blob/master/LICENSE)

Copyright (c) 2019 [yan123zi](https://github.com/yan123zi).