<h2 align="center" id="cloudmusicapi">NeteaseCloud Music API</h2>

!> 网易云音乐API express 版本, 通过Web网页版请求网易云音乐接口数据, 有问题请提 [issue](https://github.com/yan123zi/cloudMusicApi/issues), or你有其他想法欢迎`PR`.

## API结构图

![cloud-music](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/cloudMusicApi.png)

## API接口

!> express 接口说明(参数, 地址, 效果图)

### 获取推荐模块的热门推荐

接口说明: 调用此接口, 可获取网易云的当前热门推荐（未登录）

接口地址: `/recommend/hotRecommend`

调用例子: `/recommend/hotRecommend`

实例截图：

**获取推荐模块的热门推荐**

![获取推荐模块的热门推荐](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/hotRecommend.png)

### 获取推荐模块的新碟上架

接口说明: 调用此接口, 可获取网易云的推荐模块的新碟上架

接口地址: `/recommend/newDisk`

调用例子: `/recommend/newDisk`

实例截图：

**获取推荐模块的新碟上架**

![获取推荐模块的新碟上架](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/recommendNewDisk.png)

### 获取推荐模块的榜单列表

接口说明: 调用此接口, 可获取网易云推荐模块的榜单列表

接口地址: `/recommend/musicTops`

调用例子: `/recommend/musicTops`

实例截图：

**获取推荐模块的榜单列表**

![获取推荐模块的榜单列表](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/musicTops.png)

### 获取推荐模块的横幅

接口说明: 调用此接口, 可获取网易云推荐模块的横幅（banner）

接口地址: `/recommend/indexBanner`

调用例子: `/recommend/indexBanner`

实例截图：

**获取推荐模块的横幅**

![获取推荐模块的横幅](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/banner.png)

### 获取所有歌单分类

接口说明: 调用此接口, 可获取所有歌单分类

接口地址: `/playLists/categories`

调用例子: `/playLists/categories`

实例截图：

**获取所有歌单分类**

![获取所有歌单分类](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/playListCategories.png)

### 获取某个歌单分类下的所有歌单列表

接口说明: 调用此接口, 可获取某歌单分类下的歌单列表

参数列表：

- 可选参数：

`cat`：歌单种类，默认值是全部

<details>
    <summary>cat</summary>
    
    {
      "desc": "categories",
      "count": 69,
      "categories": [
        {
          "title": "语种",
          "list": [
            {
              "name": "华语",
              "cat": "华语"
            },
            {
              "name": "欧美",
              "cat": "欧美"
            },
            {
              "name": "日语",
              "cat": "日语"
            },
            {
              "name": "韩语",
              "cat": "韩语"
            },
            {
              "name": "粤语",
              "cat": "粤语"
            }
          ]
        },
        {
          "title": "风格",
          "list": [
            {
              "name": "流行",
              "cat": "流行"
            },
            {
              "name": "摇滚",
              "cat": "摇滚"
            },
            {
              "name": "民谣",
              "cat": "民谣"
            },
            {
              "name": "电子",
              "cat": "电子"
            },
            {
              "name": "舞曲",
              "cat": "舞曲"
            },
            {
              "name": "说唱",
              "cat": "说唱"
            },
            {
              "name": "轻音乐",
              "cat": "轻音乐"
            },
            {
              "name": "爵士",
              "cat": "爵士"
            },
            {
              "name": "乡村",
              "cat": "乡村"
            },
            {
              "name": "R&B/Soul",
              "cat": "R%26B%2FSoul"
            },
            {
              "name": "古典",
              "cat": "古典"
            },
            {
              "name": "民族",
              "cat": "民族"
            },
            {
              "name": "英伦",
              "cat": "英伦"
            },
            {
              "name": "金属",
              "cat": "金属"
            },
            {
              "name": "朋克",
              "cat": "朋克"
            },
            {
              "name": "蓝调",
              "cat": "蓝调"
            },
            {
              "name": "雷鬼",
              "cat": "雷鬼"
            },
            {
              "name": "世界音乐",
              "cat": "世界音乐"
            },
            {
              "name": "拉丁",
              "cat": "拉丁"
            },
            {
              "name": "New Age",
              "cat": "New Age"
            },
            {
              "name": "古风",
              "cat": "古风"
            },
            {
              "name": "后摇",
              "cat": "后摇"
            },
            {
              "name": "Bossa Nova",
              "cat": "Bossa Nova"
            }
          ]
        },
        {
          "title": "场景",
          "list": [
            {
              "name": "清晨",
              "cat": "清晨"
            },
            {
              "name": "夜晚",
              "cat": "夜晚"
            },
            {
              "name": "学习",
              "cat": "学习"
            },
            {
              "name": "工作",
              "cat": "工作"
            },
            {
              "name": "午休",
              "cat": "午休"
            },
            {
              "name": "下午茶",
              "cat": "下午茶"
            },
            {
              "name": "地铁",
              "cat": "地铁"
            },
            {
              "name": "驾车",
              "cat": "驾车"
            },
            {
              "name": "运动",
              "cat": "运动"
            },
            {
              "name": "旅行",
              "cat": "旅行"
            },
            {
              "name": "散步",
              "cat": "散步"
            },
            {
              "name": "酒吧",
              "cat": "酒吧"
            }
          ]
        },
        {
          "title": "情感",
          "list": [
            {
              "name": "怀旧",
              "cat": "怀旧"
            },
            {
              "name": "清新",
              "cat": "清新"
            },
            {
              "name": "浪漫",
              "cat": "浪漫"
            },
            {
              "name": "伤感",
              "cat": "伤感"
            },
            {
              "name": "治愈",
              "cat": "治愈"
            },
            {
              "name": "放松",
              "cat": "放松"
            },
            {
              "name": "孤独",
              "cat": "孤独"
            },
            {
              "name": "感动",
              "cat": "感动"
            },
            {
              "name": "兴奋",
              "cat": "兴奋"
            },
            {
              "name": "快乐",
              "cat": "快乐"
            },
            {
              "name": "安静",
              "cat": "安静"
            },
            {
              "name": "思念",
              "cat": "思念"
            }
          ]
        },
        {
          "title": "主题",
          "list": [
            {
              "name": "影视原声",
              "cat": "影视原声"
            },
            {
              "name": "ACG",
              "cat": "ACG"
            },
            {
              "name": "儿童",
              "cat": "儿童"
            },
            {
              "name": "校园",
              "cat": "校园"
            },
            {
              "name": "游戏",
              "cat": "游戏"
            },
            {
              "name": "70后",
              "cat": "70后"
            },
            {
              "name": "80后",
              "cat": "80后"
            },
            {
              "name": "90后",
              "cat": "90后"
            },
            {
              "name": "网络歌曲",
              "cat": "网络歌曲"
            },
            {
              "name": "KTV",
              "cat": "KTV"
            },
            {
              "name": "经典",
              "cat": "经典"
            },
            {
              "name": "翻唱",
              "cat": "翻唱"
            },
            {
              "name": "吉他",
              "cat": "吉他"
            },
            {
              "name": "钢琴",
              "cat": "钢琴"
            },
            {
              "name": "器乐",
              "cat": "器乐"
            },
            {
              "name": "榜单",
              "cat": "榜单"
            },
            {
              "name": "00后",
              "cat": "00后"
            }
          ]
        }
      ]
    }
</details>

`offset`：分页偏移量，默认值是0，该分页默认显示35条数据，无法使用limit

接口地址: `/playLists/list`

调用例子: `/playLists/list`

实例截图：

**获取某个歌单分类下的所有歌单列表**

![获取某个歌单分类下的所有歌单列表](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/playLists.png)

**获取某个歌单分类下的所有歌单列表-带参数**

![获取某个歌单分类下的所有歌单列表-带参数](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/playListsWithParam.png)

### 获取歌单详情

接口说明: 调用此接口, 可获取歌单详情

参数列表：

- 必选参数：

`id`：歌单的id

接口地址: `/playList/detail/:id?`

调用例子: `/playList/detail/3066967341`

实例截图：

**获取歌单详情**

![获取歌单详情](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/playListDetail.png)

### 获取歌单歌曲列表

接口说明: 调用此接口, 可获取歌单的歌曲列表

参数列表：

- 必选参数：

`id`：歌单的id

接口地址: `/playList/songList/:id?`

调用例子: `/playList/songList/3066967341`

实例截图：

**获取歌单歌曲列表**

![获取歌单歌曲列表](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/playListSongList.png)

### 获取喜欢这个歌单的人

接口说明: 调用此接口, 可获取喜欢该歌单的人

参数列表：

- 必选参数：

`id`：歌单的id

接口地址: `/playList/loveThis/:id?`

调用例子: `/playList/loveThis/3066967341`

实例截图：

**获取喜欢这个歌单的人**

![获取喜欢这个歌单的人](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/loveThisPlayList.png)

### 获取歌单相关推荐

接口说明: 调用此接口, 可获取与该歌单相关的歌单

参数列表：

- 必选参数：

`id`：歌单的id

接口地址: `/playList/recommend/:id?`

调用例子: `/playList/recommend/3066967341`

实例截图：

**获取歌单相关推荐**

![获取歌单相关推荐](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/loveThisPlayList.png)

### 获取用户基本信息

接口说明: 调用此接口, 可获取用户的基本信息

参数列表：

- 必选参数：

`id`：用户的id

接口地址: `/user/detail/:id?`

调用例子: `/user/detail/587654095`

实例截图：

**获取用户基本信息**

![获取用户基本信息](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/userDetail.png)

### 获取用户听歌记录

接口说明: 调用此接口, 可获取用户的听歌记录

参数列表：

- 必选参数：

`id`：用户的id

- 可选参数：

`type`：记录的时间，默认值是1

<details>
    <summary>type</summary>
    
    "type":[
        {
            type: 0,
            name: "所有时间"
        },
        {
            type: 1,
            name: "最近一周"
        }
    ]
</details>

接口地址: `/user/record/:id?`

调用例子: `/user/record/587654095`

实例截图：

**获取用户听歌记录**

![获取用户听歌记录](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/userRecode.png)

**获取用户听歌记录-带参数**

![获取用户听歌记录-带参数](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/userRecodeWithParam.png)

### 获取用户的所有歌单

接口说明: 调用此接口, 可获取用户的所有歌单包括收藏和创建

参数列表：

- 必选参数：

`id`：用户的id

接口地址: `/user/playlist/:id?`

调用例子: `/user/playlist/587654095`

实例截图：

**获取用户的所有歌单**

![获取用户的所有歌单](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/userPlayList.png)

### 获取mv详情

接口说明: 调用此接口, 可获取mv详情

参数列表：

- 必选参数：

`id`：mv的id

接口地址: `/mv/detail/:id?`

调用例子: `/mv/detail/5468889`

实例截图：

**获取mv详情**

![获取mv详情](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/mvDetail.png)

### 获取mv相关的mv推荐

接口说明: 调用此接口, 可获取该mv相关的mv推荐

参数列表：

- 必选参数：

`id`：mv的id

接口地址: `/mv/relate/:id?`

调用例子: `/mv/relate/5468889`

实例截图：

**获取mv相关的mv推荐**

![获取mv相关的mv推荐](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/mvRelate.png)

### 获取video详情

接口说明: 调用此接口, 可获得video的详情

参数列表：

- 必选参数：

`id`：video的id

接口地址: `/video/detail/:id?`

调用例子: `/video/detail/243B7D51005C79AA984AF52EB2D2FDD4`

实例截图：

**获取video详情**

![获取video详情](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/videoDetail.png)

### 获取video播放链接

接口说明: 调用此接口, 可获得video的播放链接

参数列表：

- 必选参数：

`id`：video的id

接口地址: `/video/url/:id?`

调用例子: `/video/url/243B7D51005C79AA984AF52EB2D2FDD4`

实例截图：

**获取video播放链接**

![获取video播放链接](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/videoUrl.png)

### 获取video的相关video推荐

接口说明: 调用此接口, 可获得video的相关推荐

参数列表：

- 必选参数：

`id`：video的id

接口地址: `/video/relate/:id?`

调用例子: `/video/relate/243B7D51005C79AA984AF52EB2D2FDD4`

实例截图：

**获取video的相关video推荐**

![获取video的相关video推荐](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/videoRelate.png)

### 获取歌曲详情

接口说明: 调用此接口, 可获得歌曲的详情

参数列表：

- 必选参数：

`id`：歌曲的id

接口地址: `/song/detail/:id?`

调用例子: `/song/detail/1330348068`

实例截图：

**获取歌曲详情**

![获取歌曲详情](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/songDetails.png)

### 获取歌曲播放链接

接口说明: 调用此接口, 可获得歌曲的播放链接

参数列表：

- 必选参数：

`id`：歌曲的id

接口地址: `/song/url/:id?`

调用例子: `/song/url/1330348068`

实例截图：

**获取歌曲播放链接**

![获取歌曲播放链接](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/songUrl.png)

### 获取歌曲的歌词

接口说明: 调用此接口, 可获得歌曲的歌词

参数列表：

- 必选参数：

`id`：歌曲的id

接口地址: `/song/lyric/:id?`

调用例子: `/song/lyric/1330348068`

实例截图：

**获取歌曲的歌词**

![获取歌曲的歌词](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/songLyric.png)

### 获取歌曲的相似歌曲和包含该歌曲的歌单

接口说明: 调用此接口, 可获得歌曲的相似歌曲和包含该歌曲的歌单

参数列表：

- 必选参数：

`id`：歌曲的id

接口地址: `/song/simiAndcon/:id?`

调用例子: `/song/simiAndcon/1330348068`

实例截图：

**获取歌曲的相似歌曲和包含该歌曲的歌单**

![获取歌曲的相似歌曲和包含该歌曲的歌单](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/songSimiAndCon.png)

### 获取排行榜的所有分类

接口说明: 调用此接口, 可获得排行榜的所有分类

接口地址: `/topList/allLeaderBoard`

调用例子: `/topList/allLeaderBoard`

实例截图：

**获取排行榜的所有分类**

![获取排行榜的所有分类](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/allTopListCategories.png)

### 获取排行榜的详情

接口说明: 调用此接口, 可获得排行榜的详情

参数列表：

- 必选参数：

`id`：排行榜的id

接口地址: `/topList/detail/:id?`

调用例子: `/topList/detail/19723756`

实例截图：

**获取排行榜的详情**

![获取排行榜的详情](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/topListDetail.png)

### 获取新碟上架

接口说明: 调用此接口, 可获得新碟上架

- 可选参数：

`type`：专辑列表的范围，默认值是ALL（全部）

<details>
    <summary>type</summary>
    
    "type":[
        {
            type: "ALL",
            name: "全部"
        },
        {
            type: "ZH",
            name: "华语"
        },
        {
            type: "EA",
            name："欧美"
        },
        {
            type: "KR",
            name: "韩国"
        },
        {
            type: "JP",
            name: "日本"
        }
    ]
</details>

`offset`：分页的偏移量，默认值是0

`limit`：每页显示的专辑数量，默认值是35

接口地址: `/album/new`

调用例子: `/album/new`

实例截图：

**获取专辑列表**

![获取专辑列表](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/newDisk.png)

**获取专辑列表-带参数**

![获取专辑列表-带参数](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/newDistWithParam.png)

### 获取专辑内歌曲列表

接口说明: 调用此接口, 可获得专辑内歌曲列表

参数列表：

- 必选参数：

`id`：专辑的id

接口地址: `/album/songList/:id?`

调用例子: `/album/songList/83435731`

实例截图：

**获取专辑内歌曲列表**

![获取专辑内歌曲列表](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/albumSongList.png)

### 获取专辑详情

接口说明: 调用此接口, 可获得专辑详情

参数列表：

- 必选参数：

`id`：专辑的id

接口地址: `/album/detail/:id?`

调用例子: `/album/detail/83435731`

实例截图：

**获取专辑详情**

![获取专辑详情](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/albumDetail.png)

### 获取喜欢该专辑的人

接口说明: 调用此接口, 可获得喜欢该专辑的人

参数列表：

- 必选参数：

`id`：专辑的id

接口地址: `/album/loveThis/:id?`

调用例子: `/album/loveThis/83435731`

实例截图：

**获取喜欢该专辑的人**

![获取喜欢该专辑的人](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/loveThisAlbum.png)

### 获取异步搜索结果

接口说明: 调用此接口, 可获得未按下搜索键的异步搜索结果

参数列表：

- 必选参数：

`key`：搜索的关键字

接口地址: `/search/show/:key?`

调用例子: `/search/show/芒种`

实例截图：

**获取异步搜索结果**

![获取异步搜索结果](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/syncSearch.png)

### 获取搜索结果

接口说明: 调用此接口, 可获得搜索的结果

参数列表：

- 必选参数：

`key`：搜索的关键字

- 可选参数：

`type`：搜索结果显示的类型

<details>
    <summary>type</summary>
    
    "type":[
        {
            type: 1,
            name: "单曲"
        },
        {
            type: 10,
            name: "专辑"
        },
        {
            type: 1000,
            name: "歌手"
        },
        {
            type: 1002,
            name: "用户"
        },
        {
            type: 1004,
            name: "MV"
        },
        {
            type: 1006,
            name: "歌词"
        },
        {
            type: 1009,
            name: "电台"
        },
        {
            type: 1014,
            name: "视频"
        }
    ]
</details>

`limit`：每页显示的数量，默认值是30

`offset`：分页的偏移量，默认值是0

接口地址: `/search/:key?`

调用例子: `/search/芒种`

实例截图：

**获取搜索结果**

![获取搜索结果](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/search.png)

**获取搜索结果-带参数**

![获取搜索结果-带参数](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/searchWithParam.png)

### 获取热门歌手列表

接口说明: 调用此接口, 可获得热门歌手列表

接口地址: `/singerList/topArtists`

调用例子: `/singerList/topArtists`

实例截图：

**获取热门歌手列表**

![获取热门歌手列表](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/hotSingerList.png)

### 获取歌手列表按分类

接口说明: 调用此接口, 可获得分类的歌手列表

参数列表：

- 必选参数：

`id`：歌手的分类，默认值是1001（华语男歌手）

<details>
    <summary>id</summary>
    
    "id":[
        {
            id: 5001,
            name: "入驻歌手"
        },
        {
            id: 1001,
            name: "华语男歌手"
        },
        {
            id: 1002,
            name: "华语女歌手"
        },
        {
            id: 1003,
            name: "华语组合/乐队"
        },
        {
            id: 2001,
            name: "欧美男歌手"
        },
        {
            id: 2002,
            name: "欧美女歌手"
        },
        {
            id: 2003,
            name: "欧美组合/乐队"
        },
        {
            id: 6001,
            name: "日本男歌手"
        },
        {
            id: 6002,
            name: "日本女歌手"
        },
        {
            id: 6003,
            name: "日本组合/乐队"
        },
        {
            id: 7001,
            name: "韩国男歌手"
        },
        {
            id: 7002,
            name: "韩国女歌手"
        },
        {
            id: 7003,
            name: "韩国组合/乐队"
        },
        {
            id: 4001,
            name: "其他男歌手"
        },
        {
            id: 4002,
            name: "其他女歌手"
        },
        {
            id: 4003,
            name: "其他组合/乐队"
        }
    ]
</details>

- 可选参数：

`limit`：每页显示的数量，默认值是30

`offset`：分页的偏移量，默认值是0

`initial`: 按歌手的姓的拼音查询，值是由A-Z

接口地址: `/singerList/category/:id?`

调用例子: `/singerList/category`

实例截图：

**获取歌手列表按分类**

![获取歌手列表按分类](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/singList.png)

**获取歌手列表按分类-带参数**

![获取歌手列表按分类-带参数](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/singerListByCategoryWithParam.png)

### 获取歌手的简介

参数列表：

- 必选参数：

`id`：歌手的id

接口说明: 调用此接口, 可获取歌手的简介

接口地址: `/artist/desc/:id?`

调用例子: `/artist/desc/7763`

实例截图：

**获取歌手的简介**

![获取歌手的简介](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/singerDesc.png)

### 获取歌手的热门作品

参数列表：

- 必选参数：

`id`：歌手的id

接口说明: 调用此接口, 可获取歌手的热门作品

接口地址: `/artist/popSongs/:id?`

调用例子: `/artist/popSongs/7763`

实例截图：

**获取歌手的热门作品**

![获取歌手的热门作品](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/singerHotMusic.png)

### 获取歌手的所有专辑

参数列表：

- 必选参数：

`id`：歌手的id

接口说明: 调用此接口, 可获取歌手的所有专辑

接口地址: `/artist/albums/:id?`

调用例子: `/artist/albums/7763`

实例截图：

**获取歌手的所有专辑**

![获取歌手的所有专辑](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/singerAlbums.png)

### 获取歌手的所有mv

参数列表：

- 必选参数：

`id`：歌手的id

接口说明: 调用此接口, 可获取歌手的所有mv

接口地址: `/artist/mvs/:id?`

调用例子: `/artist/mvs/7763`

实例截图：

**获取歌手的所有mv**

![获取歌手的所有mv](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/singerMvs.png)

### 获取歌单，专辑，排行榜，歌曲，mv，video的评论

参数列表：

- 必选参数：

`id`：歌单，专辑，排行榜，歌曲，mv，video的id

`type`：获取评论的类型，即是歌单，专辑，排行榜，歌曲，mv还是video的评论

<details>
    <summary>type</summary>
    
    "type":[
        {
            type: "playlist",
            name: "歌单"
        },
        {
            type: "toplist",
            name: "排行榜"
        },
        {
            type: "album",
            name: "专辑"
        },
        {
            type: "song",
            name: "歌曲"
        },
        {
            type: "mv",
            name: "mv"
        },
        {
            type: "video",
            name: "video"
        }
    ]
</details>

`limit`：每页显示的数量，默认值是20

`offset`：分页的偏移量，默认值是0

接口说明: 调用此接口, 可获取歌手的所有mv

接口地址: `/comment/:id?/:type?`

调用例子: `/comment/3066967341/playlist`

实例截图：

**获取歌单，专辑，排行榜，歌曲，mv，video的评论**

![获取歌单，专辑，排行榜，歌曲，mv，video的评论](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/comment.png)

**获取歌单，专辑，排行榜，歌曲，mv，video的评论-带参数**

![获取歌单，专辑，排行榜，歌曲，mv，video的评论-带参数](https://raw.githubusercontent.com/yan123zi/cloudMusicApi/master/screenshot/commentWithParam.png)