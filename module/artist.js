const express = require('express');
const router = express.Router();
const request=require("../utlis/request");
const cheerio=require("cheerio");
let Entities = require('html-entities').XmlEntities;
let entities = new Entities();
let basicMsg=($)=>{
    let detail=$(".g-wrap6");
    let names=detail.find(".btm");
    let name=names.find("h2").text();
    let subName=names.find("h3")?names.find("h3").attr("title"):null;
    let picUrl=detail.find("img").attr("src").replace("?param=640y300","");
    let basicMsg={
        name,subName,picUrl
    };
    return basicMsg;
};
//热门作品
router.get("/popSongs/:id",(req,res,next)=>{
    request("get","https://music.163.com/artist?id="+req.params.id,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let detail=$(".g-wrap6");
        let basic=basicMsg($);
        let songList=JSON.parse(detail.find("textarea").text().replace(/[\r\n]/g, ""));
        let popSongs={
            desc:"popSongs",count:songList.length,id:parseInt(req.params.id),basicMsg:basic,songList
        };
        res.send(popSongs);
    });
});
//所有专辑
router.get("/albums/:id",(req,res,next)=>{
    //m-song-module
    request("get","https://music.163.com/artist/album?id="+req.params.id,{},{ua:"pc"}).then(async data=>{
        let $=cheerio.load(data.body);
        let basic=basicMsg($);
        let total=$(".zpgi").last().text()*12;
        let allAlbums={
            desc:"allAlbums",count:0,basic,albums:[]
        };
        let albums=await getAll("album",req.params.id,total);
        allAlbums.albums=albums;
        allAlbums.count=albums.length;
        res.send(allAlbums);
    });
});
//所有mv
router.get("/mvs/:id",(req,res,next)=>{
    //m-song-module
    request("get","https://music.163.com/artist/mv?id="+req.params.id,{},{ua:"pc"}).then(async data=>{
        let $=cheerio.load(data.body);
        let basic=basicMsg($);
        let total=$(".zpgi").last().text()*12;
        let allMvs={
            desc:"allMvs",count:0,basic,mvs:[]
        };
        let mvs=await getAll("mv",req.params.id,total);
        allMvs.mvs=mvs;
        allMvs.count=mvs.length;
        res.send(allMvs);
    });
});
//歌手简介
router.get("/desc/:id",(req,res,next)=>{
    //n-artdesc
    request("get","https://music.163.com/artist/desc?id="+req.params.id,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let desc={
            messages:[]
        };
        $(".n-artdesc").find("h2").each((index,ele)=>{
            let title=$(ele).text();
            let text=entities.decode($(ele).next().html()).replace(/<br>/g,"\n");
            desc.messages.push({
                title,text
            });
        });
        res.send(desc);
    });
});
let getAll=async (type,id,total)=>{
    return await request("get","https://music.163.com/artist/"+type+"?id="+id+"&limit="+total,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let all=[];
        if (type==="album") {
            $("#m-song-module").find("li").each((index, ele) => {
                let con = $(ele).find("div").last();
                let span = $(ele).find("span");
                let name = con.attr("title");
                let picUrl = con.find("img").attr("src").replace("?param=120y120", "");
                let url = con.find("a").eq(0).attr("href");
                let createTime = span.text();
                all.push({
                    name, picUrl, url, createTime
                });
            });
            return all;
        }else {
            $("#m-mv-module").find("li").each((index, ele) => {
                let picUrl=$(ele).find("img").attr("src").replace("?param=137y103","");
                let a=$(ele).find(".tit");
                let name=a.text();
                let url=a.attr("href");
                all.push({
                    name,picUrl,url
                });
            });
            return all;
        }
    });
};


module.exports=router;