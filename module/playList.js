const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
const cheerio = require("cheerio");
const getSongDetail=require("../utlis/songDetails");
//获取歌单详情
router.get("/detail/:id", (req, res, next) => {
    request("get","https://music.163.com/playlist?id="+req.params.id,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let picUrl=$(".j-img").attr("data-src");
        let info=$(".cntc");
        let playTimes=parseInt($("#play-count").text());
        let title=info.find("h2").text();
        let a=info.find(".face");
        let artistUrl=a.attr("href");
        let artistPic=a.find("img").attr("src").replace("?param=40y40","");
        let artistName=info.find(".s-fc7").text();
        let createTime=info.find(".time").text();
        let collection=parseInt(info.find(".u-btni-fav").attr("data-count"));
        let share=parseInt(info.find(".u-btni-share").attr("data-count"));
        let comments=parseInt(info.find("#cnt_comment_count").text());
        let tags=[];
        info.find(".tags").find("a").each((index,ele)=>{
           tags.push($(ele).text());
        });
        let ifm=info.find("#album-desc-more").text();
        let count=parseInt($("#playlist-track-count").text());
        let playlistinfo={
            desc:"playListInfo",ifm,picUrl,title,tags,collection,createTime,share,comments,playTimes,artist:{artistName,artistUrl,artistPic},count
        };
        res.send(playlistinfo);
    });
});
//获取歌单/榜单评论
router.get("/comments/:id", (req, res, next) => {
    //https://music.163.com/weapi/v1/resource/comments/A_PL_0_19723756?csrf_token=
    let dataTo = {
        rid: parseInt(req.params.id),
        offset: parseInt(req.query.offset) || 0,
        limit: parseInt(req.query.limit) || 20
    };
    request("post", "https://music.163.com/weapi/v1/resource/comments/A_PL_0_" + req.params.id, dataTo, {
        ua: "pc",
        crypto: "weapi"
    }).then(data => {
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        result.desc = "leader_comments";
        result.count = dataTo.limit;
        res.send(result);
    });
});
//喜欢这个歌单的人
router.get("/loveThis/:id",(req,res,next)=>{
    request("get","https://music.163.com/playlist?id="+req.params.id,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let userList={
            desc:"loveUsers",
            count:0,
            body:[]
        };
        $(".m-piclist").find("li").each((index,ele)=>{
            let a=$(ele).find("a");
            let img=a.find("img");
            let name=a.attr("title");
            let url=a.attr("href");
            let picUrl=img.attr("src").replace("?param=40y40","");
            userList.body.push({
                name,url,picUrl
            });
        });
        userList.count=userList.body.length;
        res.send(userList);
    });
});
//相关推荐
router.get("/recommend/:id",(req,res,next)=>{
    // m-rctlist
    request("get","https://music.163.com/playlist?id="+req.params.id,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let recommentPlayList={
            desc:"recommendPlayList",
            count:0,
            body:[]
        };
        $(".m-rctlist").find("li").each((index,ele)=>{
            let a=$(ele).find(".cver").find("a");
            let img=a.find("img");
            let user=$(ele).find(".nm");
            let name=a.attr("title");
            let url=a.attr("href");
            let picUrl=img.attr("src").replace("?param=50y50","");
            let username=user.attr("title");
            let userUrl=user.attr("href");
            recommentPlayList.body.push({
                name,url,picUrl,create:{username,userUrl}
            });
        });
        recommentPlayList.count=recommentPlayList.body.length;
        res.send(recommentPlayList);
    });
});
//获取歌单列表
router.get("/songList/:id",(req,res,next)=>{
    request("get","https://music.163.com/playlist?id="+req.params.id,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let list=[];
        let count=parseInt($("#playlist-track-count").text());
        let songList={
            desc:"songList",
            count:count,
            body:[]
        };
        // console.log(getSongDetail);
        $("ul.f-hide").eq(0).find("li").each(  async (index,ele)=>{
            let a=$(ele).find("a");
            let url=a.attr("href").replace("/song?id=","");
            let result=await getSongDetail(url).catch(reason => {console.log(reason)});
            result.url=url;
            list.push(result);
            if (list.length===count){
                songList.body=list;
                res.send(songList);
            }
        });
    });
});
module.exports = router;