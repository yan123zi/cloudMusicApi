const express = require('express');
const router = express.Router();
const request=require("../utlis/request");
const cheerio=require("cheerio");
let Entities = require('html-entities').XmlEntities;
let entities = new Entities();
let basicMsg=($,id)=>{
    let detail=$(".g-wrap6");
    let names=detail.find(".btm");
    let name=names.find("h2").text();
    let subName=names.find("h3")?names.find("h3").attr("title"):null;
    let picUrl=detail.find("img").attr("src").replace("?param=640y300","");
    let basicMsg={
        name,subName,picUrl,id
    };
    return basicMsg;
};
//热门作品
router.get("/popSongs/:id?",(req,res,next)=>{
    let id = req.params.id;
    if (id) {
        request("get", "https://music.163.com/artist?id=" + id, {}, {ua: "pc"}).then(data => {
            let $ = cheerio.load(data.body);
            let detail = $(".g-wrap6");
            let basic = basicMsg($,parseInt(id));
            let songList = JSON.parse(detail.find("textarea").text().replace(/[\r\n]/g, ""));
            let popSongs = {
                desc: "popSongs", count: songList.length, id: parseInt(req.params.id), basicMsg: basic, songList
            };
            res.send(popSongs);
        });
    } else {
        res.send({message: "please input param of artist -> 'id'"});
    }
});
//所有专辑
router.get("/albums/:id?",(req,res,next)=>{
    let id = req.params.id;
    if (id) {
        //m-song-module
        request("get", "https://music.163.com/artist/album?id=" + id, {}, {ua: "pc"}).then(async data => {
            let $ = cheerio.load(data.body);
            let basic = basicMsg($,parseInt(id));
            let total = $(".zpgi").last().text() * 12;
            console.log(total)
            let allAlbums = {
                desc: "allAlbums", count: 0, basic, albums: []
            };
            let albums = await getAll("album", req.params.id, total);
            allAlbums.albums = albums;
            allAlbums.count = albums.length;
            res.send(allAlbums);
        });
    } else {
        res.send({message: "please input param of artist -> 'id'"});
    }
});
//所有mv
router.get("/mvs/:id?",(req,res,next)=>{
    let id = req.params.id;
    if (id) {
        //m-song-module
        request("get", "https://music.163.com/artist/mv?id=" + id, {}, {ua: "pc"}).then(async data => {
            let $ = cheerio.load(data.body);
            let basic = basicMsg($,parseInt(id));
            let total = $(".zpgi").last().text() * 12;
            // if (total==0){
            //
            // }
            // console.log(total)
            let allMvs = {
                desc: "allMvs", count: 0, basic, mvs: []
            };
            let mvs = await getAll("mv", req.params.id, total);
            allMvs.mvs = mvs;
            allMvs.count = mvs.length;
            res.send(allMvs);
        });
    } else {
        res.send({message: "please input param of artist -> 'id'"});
    }
});
//歌手简介
router.get("/desc/:id?",(req,res,next)=>{
    let id = req.params.id;
    if (id) {
        //n-artdesc
        request("get", "https://music.163.com/artist/desc?id=" + req.params.id, {}, {ua: "pc"}).then(data => {
            let $ = cheerio.load(data.body);
            let desc = {
                messages: []
            };
            $(".n-artdesc").find("h2").each((index, ele) => {
                let title = $(ele).text();
                let text = entities.decode($(ele).next().html()).replace(/<br>/g, "\n");
                desc.messages.push({
                    title, text
                });
            });
            res.send(desc);
        });
    } else {
        res.send({message: "please input param of artist -> 'id'"});
    }
});
let getAll=async (type,id,total)=>{
    if (total==0){
        total="";
    }else {
        total="&limit="+total;
    }
    return await request("get","https://music.163.com/artist/"+type+"?id="+id+""+total,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let all=[];
        if (type==="album") {
            $("#m-song-module").find("li").each((index, ele) => {
                let con = $(ele).find("div").last();
                let span = $(ele).find("span");
                let name = con.attr("title");
                let picUrl = con.find("img").attr("src").replace("?param=120y120", "");
                let albumId = parseInt(con.find("a").eq(0).attr("href").replace("/album?id=",""));
                let createTime = span.text();
                all.push({
                    name, picUrl, albumId, createTime
                });
            });
            return all;
        }else {
            $("#m-mv-module").find("li").each((index, ele) => {
                let picUrl=$(ele).find("img").attr("src").replace("?param=137y103","");
                console.log(picUrl)
                let a=$(ele).find(".tit");
                let name=a.text();
                let mvId=parseInt(a.attr("href").replace("/mv?id=",""));
                console.log(name)
                all.push({
                    name,picUrl,mvId
                });
            });
            return all;
        }
    });
};


module.exports=router;