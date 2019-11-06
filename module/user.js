//https://music.163.com/weapi/user/playlist?csrf_token=//用户所有歌单
//https://music.163.com/weapi/v1/play/record?csrf_token=//用户听歌记录
const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
const cheerio = require("cheerio");
//用户基本信息
//https://music.163.com/user/home?id=100674139
router.get("/detail/:id", (req, res, next) => {
    request("get", "https://music.163.com/user/home?id=" + req.params.id, {}, {ua: "pc"}).then(data => {
        //head-box
        let $ = cheerio.load(data.body);
        let detail = $("#head-box");
        let picUrl = detail.find("dt").find("img").attr("src").replace("?param=180y180", "");
        let content = detail.find("dd");
        let name = content.find("span").eq(0).text();
        let level = parseInt(content.find("span").eq(2).text());
        let dynamicNum = parseInt(content.find("#event_count").text());
        let follow = parseInt(content.find("#follow_count").text());
        let funs = parseInt(content.find("#fan_count").text());
        let intro = content.find(".f-brk").text();
        let div1 = content.find("div.inf").eq(1);
        let addr = div1.find("span").eq(0).text();
        let age = parseInt(div1.find("span").eq(1).attr("data-age"));
        let ul = content.find(".u-logo");
        let social = [];
        let id = parseInt(req.params.id);
        if (ul) {
            ul.find("li").each((index, ele) => {
                let name = $(ele).find("a").attr("title");
                let url = $(ele).find("a").attr("href");
                social.push({
                    name, url
                });
            });
        }
        let userDetail = {
            desc: "userDetail", name, picUrl, id, level, dynamicNum, follow, funs, intro, addr, age, social
        };
        res.send(userDetail);
    });
});
//用户听歌记录
router.get("/record/:id", (req, res, next) => {
    //{"uid":"3063545","type":"0","limit":"1000","offset":"0","total":"true","csrf_token":""}
    let data = {
        uid: req.params.id,
        type: req.query.type || 1, //最近一周1，所有时间0
    };
    request("post", "https://music.163.com/weapi/v1/play/record", data, {ua: "pc", crypto: "weapi"}).then(data => {
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        result.id=parseInt(req.params.id);
        res.send(result);
    });
});
//用户所有歌单
router.get("/playlist/:id", (req, res, next) => {
    let data = {
        uid: req.params.id,
        limit: req.query.limit || 30,
        offset: req.query.offset || 0
    };
    //https://music.163.com/weapi/user/playlist?csrf_token=
    request("post", "https://music.163.com/weapi/user/playlist", data, {ua: "pc", crypto: "weapi"}).then(data => {
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        result.id=parseInt(req.params.id);
        res.send(result);
    });
});
module.exports = router;