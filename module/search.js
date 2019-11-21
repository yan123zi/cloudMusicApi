//https://music.163.com/weapi/search/suggest/web?csrf_token=
const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
const cheerio = require("cheerio");
//未搜索前点击的ajax响应
router.get("/show/:key?", (req, res, next) => {
    let key=req.params.key;
    let data = {
        s: key,
        limit: 10
    };
    if (key) {
        request("post", "https://music.163.com/weapi/search/suggest/web", data, {
            ua: "pc",
            crypto: "weapi"
        }).then(data => {
            let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
            res.send(result);
        });
    }else {
        res.send({
            message:"please input param of search -> 'key'"
        });
    }
});
//https://music.163.com/weapi/cloudsearch/get/web?csrf_token=
//搜索点击
router.get("/:key?", (req, res, next) => {
    let key=req.params.key;
    let data = {
        s: key,
        type: req.query.type || 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        limit: req.query.limit || 30,
        offset: req.query.offset || 0
    };
    if (key) {
        request("post", "https://music.163.com/weapi/cloudsearch/get/web", data, {
            ua: "pc",
            crypto: "weapi"
        }).then(data => {
            let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
            res.send(result);
        });
    }else {
        res.send({
            message:"please input param of search -> 'key'"
        });
    }
});
module.exports = router;