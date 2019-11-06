const express = require('express');
const router = express.Router();
const request=require("../utlis/request");
const cheerio=require("cheerio");
//专辑详情
router.get("/detail/:id",(req,res,next)=>{
    request("get","https://music.163.com/album?id="+req.params.id,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let picUrl=$(".j-img").attr("data-src");
        let detail=$(".cntc");
        let name=detail.find(".tit").find("h2").text();
        let subName=detail.find(".tit").find("div")?detail.find(".tit").find("div").text():null;
        let a=detail.find(".s-fc7");
        let authorName=a.text();
        let authorUrl=a.attr("href");
        let releaseTime=detail.find(".intr").eq(1).text().replace("发行时间：","");
        let shareTimes=parseInt(detail.find(".u-btni-share").text().replace(/[()]/g,""));
        let id=parseInt(detail.find(".u-btni-share").attr("data-res-id"));
        let comments=parseInt(detail.find(".u-btni-cmmt").text().replace(/[()]/g,""));
        let desc=$("#album-desc-more").text();
        let album={
            id,name,subName,picUrl,author:{authorName,authorUrl},releaseTime,shareTimes,comments,desc
        };
        res.send(album);
    });
});
//专辑歌曲列表
router.get("/songList/:id",(req,res,next)=>{
    request("get","https://music.163.com/album?id="+req.params.id,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let result = JSON.parse($("#song-list-pre-data").text().replace(/[\r\n]/g, ""));
        res.send(result);
    });
});
//专辑评论
router.get("/comments/:id",(req,res,next)=>{
    const data = {
        rid: req.params.id,
        limit: req.query.limit || 20,
        offset: req.query.offset || 0,
        beforeTime: req.query.before || 0
    };
    request("post","https://music.163.com/weapi/v1/resource/comments/R_AL_3_"+req.params.id,data,{ua:"pc",crypto:"weapi"}).then(data=>{
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.send(result);
    });
});
module.exports=router;