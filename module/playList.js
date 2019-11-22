const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
const cheerio = require("cheerio");
const getSongDetail = require("../utlis/songDetails");
//获取歌单详情
router.get("/detail/:id?", (req, res, next) => {
    let id = parseInt(req.params.id);
    if (id) {
        request("get", "https://music.163.com/playlist?id=" + id, {}, {ua: "pc"}).then(data => {
            let $ = cheerio.load(data.body);
            let picUrl = $(".j-img").attr("data-src");
            let info = $(".cntc");
            let playTimes = parseInt($("#play-count").text());
            let title = info.find("h2").text();
            let a = info.find(".face");
            let artistId = parseInt(a.attr("href").replace("/user/home?id=", ""));
            let artistPic = a.find("img").attr("src").replace("?param=40y40", "");
            let artistName = info.find(".s-fc7").text();
            let createTime = info.find(".time").text();
            let collection = parseInt(info.find(".u-btni-fav").attr("data-count"));
            let share = parseInt(info.find(".u-btni-share").attr("data-count"));
            let comments = parseInt(info.find("#cnt_comment_count").text());
            let tags = [];
            info.find(".tags").find("a").each((index, ele) => {
                tags.push($(ele).text());
            });
            let ifm = info.find("#album-desc-more").text();
            let count = parseInt($("#playlist-track-count").text());
            let playlistinfo = {
                desc: "playListInfo",
                ifm,
                picUrl,
                title,
                tags,
                collection,
                createTime,
                share,
                comments,
                playTimes,
                artist: {artistName, artistId, artistPic},
                count
            };
            res.send(playlistinfo);
        });
    } else {
        res.send({message: "please input param of playlist -> 'id'"});
    }
});
//喜欢这个歌单的人
router.get("/loveThis/:id?", (req, res, next) => {
    let id = req.params.id;
    if (id) {
        request("get", "https://music.163.com/playlist?id=" + id, {}, {ua: "pc"}).then(data => {
            let $ = cheerio.load(data.body);
            let userList = {
                desc: "loveUsers",
                count: 0,
                body: []
            };
            $(".m-piclist").find("li").each((index, ele) => {
                let a = $(ele).find("a");
                let img = a.find("img");
                let name = a.attr("title");
                let userId = parseInt(a.attr("href").replace("/user/home?id=", ""));
                let picUrl = img.attr("src").replace("?param=40y40", "");
                userList.body.push({
                    name, userId, picUrl
                });
            });
            userList.count = userList.body.length;
            res.send(userList);
        });
    } else {
        res.send({message: "please input param of playlist -> 'id'"});
    }
});
//相关推荐
router.get("/recommend/:id?", (req, res, next) => {
    let id = req.params.id;
    if (id) {
        // m-rctlist
        request("get", "https://music.163.com/playlist?id=" + id, {}, {ua: "pc"}).then(data => {
            let $ = cheerio.load(data.body);
            let recommentPlayList = {
                desc: "recommendPlayList",
                count: 0,
                body: []
            };
            $(".m-rctlist").find("li").each((index, ele) => {
                let a = $(ele).find(".cver").find("a");
                let img = a.find("img");
                let user = $(ele).find(".nm");
                let name = a.attr("title");
                let playListId = parseInt(a.attr("href").replace("/playlist?id=", ""));
                let picUrl = img.attr("src").replace("?param=50y50", "");
                let userName = user.attr("title");
                let userId = parseInt(user.attr("href").replace("/user/home?id=", ""));
                recommentPlayList.body.push({
                    name, playListId, picUrl, createBy: {userName, userId}
                });
            });
            recommentPlayList.count = recommentPlayList.body.length;
            res.send(recommentPlayList);
        });
    } else {
        res.send({message: "please input param of playlist -> 'id'"});
    }
});
//获取歌单列表
router.get("/songList/:id?", (req, res, next) => {
    let id = req.params.id;
    if (id) {
        const data = {
            id,
            n: 100000,
            s: req.query.s || 8
        };
        request(
            'post', "https://music.163.com/weapi/v3/playlist/detail", data,
            { ua: "pc",
                crypto: "linuxapi"}
        ).then(data=>{
            let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
            res.send(result);
        });
    } else {
        res.send({message: "please input param of playlist -> 'id'"});
    }
});
module.exports = router;