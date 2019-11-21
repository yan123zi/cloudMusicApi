const express = require('express');
const router = express.Router();
const request=require("../utlis/request");
const cheerio=require("cheerio");
//专辑详情
router.get("/detail/:id?",(req,res,next)=>{
    let id = req.params.id;
    if (id) {
        request("get", "https://music.163.com/album?id=" + req.params.id, {}, {ua: "pc"}).then(data => {
            let $ = cheerio.load(data.body);
            let picUrl = $(".j-img").attr("data-src");
            let detail = $(".cntc");
            let name = detail.find(".tit").find("h2").text();
            let subName = detail.find(".tit").find("div") ? detail.find(".tit").find("div").text() : null;
            let a = detail.find(".s-fc7");
            let artistName = a.text();
            let artistId = parseInt(a.attr("href").replace("/artist?id=", ""));
            let releaseTime = detail.find(".intr").eq(1).text().replace("发行时间：", "");
            let releaseCompany=detail.find(".intr").eq(2).text().replace("发行公司：","").replace(/\n/g,"");
            let shareTimes = parseInt(detail.find(".u-btni-share").text().replace(/[()]/g, ""));
            let id = parseInt(detail.find(".u-btni-share").attr("data-res-id"));
            let comments = parseInt(detail.find(".u-btni-cmmt").text().replace(/[()]/g, ""));
            let desc = $("#album-desc-more").text();
            let album = {
                id, name, subName, picUrl, artist: {artistName, artistId}, releaseTime,releaseCompany, shareTimes, comments, desc
            };
            res.send(album);
        });
    } else {
        res.send({message: "please input param of album -> 'id'"});
    }
});
//专辑歌曲列表
router.get("/songList/:id?",(req,res,next)=>{
    let id = req.params.id;
    if (id) {
        request("get", "https://music.163.com/album?id=" + req.params.id, {}, {ua: "pc"}).then(data => {
            let $ = cheerio.load(data.body);
            let result = JSON.parse($("#song-list-pre-data").text().replace(/[\r\n]/g, ""));
            res.send(result);
        });
    } else {
        res.send({message: "please input param of album -> 'id'"});
    }
});
//获取喜欢该专辑的人
router.get("/loveThis/:id?",(req,res,next)=>{
    let id = req.params.id;
    if (id) {
        request("get", "https://music.163.com/album?id=" + req.params.id, {}, {ua: "pc"}).then(data => {
            let $ = cheerio.load(data.body);
            let loveThis={
                desc:"loveThisAlbum people",
                count:0,
                body:[]
            };
            $(".m-piclist").find("li").each((index,ele)=>{
                let a=$(ele).find("a");
                let img=$(ele).find("img");
                let userName=a.attr("title");
                let userId=parseInt(a.attr("href").replace("/user/home?id=",""));
                let picUrl=img.attr("src").replace("?param=40y40","");
                loveThis.body.push({
                    userId,
                    userName,
                    picUrl
                });
            });
            loveThis.count=loveThis.body.length;
            res.send(loveThis);
        });
    } else {
        res.send({message: "please input param of album -> 'id'"});
    }
});
//新碟上架
router.get("/new",(req,res,next)=>{
    let data={
        area:req.query.type||"ALL",// ALL,ZH,EA,KR,JP
        offset:req.query.offset||0,
        total:true,
        limit:req.query.limit||35,
        csrf_token:""
    };
    request("post","https://music.163.com/weapi/album/new",data,{ua:"pc",crypto:"weapi"}).then(data=>{
        let result=JSON.parse(data.body.replace(/[\r\n]/g,""));
        result.desc="newAlbums";
        res.send(result);
    });
});
module.exports=router;