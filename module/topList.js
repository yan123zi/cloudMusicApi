const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
const cheerio = require("cheerio");
const comment=require("../utlis/commonImport");
//获取所有的榜单种类
router.get("/allLeaderBoard", (req, res, next) => {
    request("get", "https://music.163.com/discover/toplist", {}, {ua: "ua"}).then(data => {
        let $ = cheerio.load(data.body);
        let musicLists = {
            desc: "allMusicList",
            count: 0,
            body: []
        };
        let cou = 0;
        $(".n-minelst-2").find("ul").each((index, ele) => {
            let musicList = {
                desc: (index === 0) ? "云音乐特色榜" : "全球媒体榜",
                count: 0,
                list: []
            };
            let c = 0;
            $(ele).find("li").each((i, e) => {
                let a = $(e).find("a").eq(0);
                let img = a.find("img");
                let title = $(img).attr("alt");
                let picUrl = $(img).attr("src").replace("?param=40y40","");
                let topListId = parseInt($(a).attr("href").replace("/discover/toplist?id=",""));
                musicList.list.push({
                    title, picUrl, topListId
                });
                c = i;
            });
            musicList.count = c + 1;
            musicLists.body.push(musicList);
            cou = index;
        });
        musicLists.count = cou + 1;
        res.send(musicLists);
    });
});
//每个榜单的详情除了评论
router.get("/detail/:id?", (req, res, next) => {
    let id=req.params.id;
    request("get", "https://music.163.com/discover/toplist?id=" + id, {}, {ua: "pc"}).then(data => {
        if (id) {
        let $ = cheerio.load(data.body);
        let musicLearBoard = {
            desc: "musicTopList",
            count: 100,
        };
        let musicList = eval($("#song-list-pre-cache").find("textarea").text());
        musicLearBoard.body = musicList;
        musicLearBoard.collection = parseInt(($("#toplist-fav").find("i").text()).replace(")", "").replace("(", ""));
        musicLearBoard.share = parseInt(($("#toplist-share").find("i").text()).replace(")", "").replace("(", ""));
        musicLearBoard.comment = parseInt($("#comment-count").text());
        musicLearBoard.playCount = parseInt($("#play-count").text());
        musicLearBoard.picUrl = $(".u-cover-rank").find("img").attr("src").replace("?param=150y150","");
        musicLearBoard.boardName = $("h2.f-ff2").text();
        musicLearBoard.lastUpdate = $("span.sep.s-fc3").text();
        musicLearBoard.updateTime = $("span.s-fc4").text().replace(/[（）]/g,"");
        musicLearBoard.count = musicLearBoard.body.length;
        // ($("link").eq(0).attr("href")).match(/id=\d+/g)[0].replace("id=","")
        musicLearBoard.id = parseInt(id);
        res.send(musicLearBoard);
        }else {
            res.send({message:"please input param of topList -> 'id'"});
        }
    });
});
module.exports = router;
