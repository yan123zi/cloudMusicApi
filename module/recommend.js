const express = require('express');
const router = express.Router();
const request=require("../utlis/request");
const cheerio=require("cheerio");
const spiderUrl='https://music.163.com/discover';
//将通用的页面的document返回出来
let getDocument=async ()=>{
    let data=await request('get',spiderUrl,{},{ua:"pc"});
    let $=cheerio.load(data.body);
    return $;
};
//获取主页上的热门歌单推荐
router.get("/hotRecommend",(req,res,next)=>{
    getDocument().then($=>{
        let hotrecItmes={
            desc:"hot_recommend",
            count:0,
            body:[]
        };
        let nums=0;
        $('.m-cvrlst').eq(0).find("li").each((index,ele)=>{
            let title=$(ele).find('.msk').attr("title");
            let id=$(ele).find('.msk').attr("href").replace("/playlist?id=","");
            let pic=$(ele).find("img").attr("src").replace("?param=140y140","");
            let count=$(ele).find(".nb").text();
            hotrecItmes.body.push({
                title,
                id,
                pic,
                // type:,
                count
            });
            hotrecItmes.count=++nums;
        });
        res.send(hotrecItmes);
    });
});
//获取主页上的新碟上架
router.get("/newDisk",(req,res,next)=>{
    getDocument().then($=>{
        let newDisks={
            desc:"newDisks",
            count:0,
            body:[]
        };
        let i=0;
        $(".u-cover-alb1").each((index,ele)=>{
            if (index<=9){
                let pic=$(ele).find("img").attr("data-src").replace("?param=100y100","");
                let title=$(ele).find(".msk").attr("title");
                let albumId=parseInt($(ele).find(".msk").attr("href").replace("/album?id=",""));
                let aut=$(ele).next().next();
                let artistName=aut.attr("title");
                let res=aut.html();
                let a=cheerio.load(res);
                let artistId=parseInt(a(".s-fc3").attr("href").replace("/artist?id=",""));
                newDisks.body.push({
                    pic,title,albumId,artistName,artistId
                });
                newDisks.count=++i;
            }
        });
        res.send(newDisks);
    });
});
//获取主页上的榜单列表
router.get("/musicTops",(req,res,next)=>{
    getDocument().then($=>{
        let musicTops={
            desc:"musicTops",
            count:30,
            body:[]
        };
        $("#top-flag").find("dl").each((index,ele)=>{
            let div=$(ele).find("dt").find(".cver");
            let pic=$(div).find("img").attr("data-src").replace("?param=100y100","");
            let title=$(div).find("a").attr("title");
            let musicTopUrl=parseInt($(div).find("a").attr("href").replace("/discover/toplist?id=",""));
            let musicTop={
                pic,title,musicTopUrl,list:[]
            };
            let lis=$(ele).find("dd").find("ol").find("li");
            lis.each((i,e)=>{
                let a=$(e).find(".nm");
                let musicName=$(a).attr("title");
                let musicId=parseInt($(a).attr("href").replace("/song?id=",""));
                musicTop.list.push({
                    musicName,musicId
                });
            });
            musicTops.body.push(musicTop);
        });
        res.send(musicTops);
    });
});
//获取主页上的banner
router.get("/indexBanner",(req,res,next)=>{
    getDocument().then($=>{
        let banner={
            desc:"banner",
            count:0,
            body:[]
        };
        let script=$("script").eq(3).html();//获取script标签中的内容
        let all=eval(script.substring(script.indexOf("["),script.length-2).replace(/[\r\n]/g,""));
        for (let i of all.keys()){
            if (all[i].url.indexOf("song")!=-1){
                all[i].type="song";
                all[i].url=parseInt(all[i].url.replace("/song?id=",""));
            }else if (all[i].url.indexOf("album")!=-1){
                all[i].type="album";
                all[i].url=parseInt(all[i].url.replace("/album?id=",""));
            }else if (all[i].url.indexOf("mv")!=-1){
                all[i].type="mv";
                all[i].url=parseInt(all[i].url.replace("/mv?id=",""));
            }else if (all[i].url.indexOf("playlist")!=-1){
                all[i].type="playlist";
                all[i].url=parseInt(all[i].url.replace("/playlist?id=",""));
            }
        }
        // let reg=/picUrl : "(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"/g;
        let cou=0;
        for (let i of all.keys()){
            banner.body.push({
                picUrl:all[i].picUrl,
                id:all[i].url,
                type:all[i].type
            });
            banner.count=++cou;
        }
        banner.count=all.length;
        res.send(banner);
    });
});
module.exports=router;