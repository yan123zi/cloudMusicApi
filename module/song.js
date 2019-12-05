const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
const cheerio = require("cheerio");
//https://music.163.com/song?id=210674
const getSongDetail = require("../utlis/songDetails");
//歌曲详情
router.get("/detail/:id?", async (req, res, next) => {
    req.query.ids = req.query.ids.split(/\s*,\s*/)
    const data = {
        c: '[' + req.query.ids.map(id => ('{"id":' + id + '}')).join(',') + ']',
        ids: '[' + req.query.ids.join(',') + ']'
    }
    return request(
        'POST', `https://music.163.com/weapi/v3/song/detail`, data,
        {crypto: 'weapi', ua:"pc"}
    ).then(data=>{
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.send(result);
    });
});
//歌曲歌词
router.get("/lyric/:id?", (req, res, next) => {
    // https://music.163.com/weapi/song/lyric?csrf_token=
    //{"id":"545592301","lv":-1,"tv":-1,"csrf_token":""}
    let id = req.params.id;
    if (id) {
        let data = {
            id: req.params.id,
            lv: -1,
            tv: -1
        };
        request("post", "https://music.163.com/weapi/song/lyric", data, {ua: "pc", crypto: "weapi"}).then(data => {
            let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
            res.send(result);
        });
    } else {
        res.send({
            message: "please input param of song -> 'id'"
        });
    }
});
//歌曲相似,歌单包含
router.get("/simiAndcon/:id?", (req, res, next) => {
    let id = req.params.id;
    if (id) {
        request("get", "https://music.163.com/song?id=" + req.params.id, {}, {ua: "pc"}).then(data => {
            let $ = cheerio.load(data.body);
            let contains = $(".m-rctlist").find("li");
            let simis = $(".m-sglist").find("li");
            let songSiCon = {
                desc: "simiSongAndContainPlayLists",
                containPlayLists: [],
                similar: []
            };
            //包含歌单
            contains.each((index, ele) => {
                let a = $(ele).find("a").eq(0);
                let name = a.attr("title");
                let playListId = parseInt(a.attr("href").replace("/playlist?id=", ""));
                let picUrl = a.find("img").attr("src").replace("?param=50y50", "");
                let a2 = $(ele).find(".nm");
                let username = a2.attr("title");
                let userUrl = a2.attr("href");
                songSiCon.containPlayLists.push({
                    name, playListId, picUrl, create: {username, userUrl}
                });
            });
            //相似歌曲
            simis.each((index, ele) => {
                let a = $(ele).find(".f-thide").eq(0).find("a");
                let a2 = $(ele).find(".f-thide").eq(1).find("a");
                let name = a.attr("title") ? a.attr("title") : "null";
                let url = a.attr("href") ? a.attr("href") : "null";
                let username = a2.text() ? a2.text() : "null";
                let userUrl = a2.attr("href") ? a2.attr("href") : "null";
                if (name !== "null" || url !== "null" || username !== "null" || userUrl !== "null") {
                    songSiCon.similar.push({
                        name, url, artist: {username, userUrl}
                    });
                }
            });
            res.send(songSiCon);
        });
    } else {
        res.send({
            message: "please input param of song -> 'id'"
        });
    }
});
//歌曲外链
router.get("/url/:id?", (req, res, next) => {
    //https://music.163.com/weapi/song/enhance/player/url/v1?csrf_token=
    //{"ids":"[1400436688]","level":"standard","encodeType":"aac","csrf_token":""}
    let id = req.params.id;
    if (id) {
        const data = {
            ids: "[" + req.params.id + "]",
            level: "standard",
            encodeType: "aac"
        };
        request("post", "https://music.163.com/weapi/song/enhance/player/url/v1", data, {
            ua: "pc",
            crypto: "weapi"
        }).then(data => {
            let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
            res.send(result);
        });
    } else {
        res.send({
            message: "please input param of song -> 'id'"
        });
    }
});
module.exports = router;
