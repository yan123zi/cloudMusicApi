const express = require('express');
const router = express.Router();
const request=require("../utlis/request");
const cheerio=require("cheerio");
//获取所有歌单种类
router.get("/categories",(req,res,next)=>{
    request("get","https://music.163.com/discover/playlist/",{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let categories={
            desc:"categories",
            count:0,
            categories:[]
        };
        $("div.bd").find("dl").each((index,ele)=>{
            let title=$(ele).find("dt").text();
            let category={
                title,
                list:[]
            };
            $(ele).find("dd").find("a").each((i,e)=>{
               let name=$(e).text();
               let url=decodeURI($(e).attr("href"));
               category.list.push({
                   name,url
               });
            });
            categories.count+=category.list.length;
            categories.categories.push(category);
        });
        res.send(categories);
    });
});
//获取所有歌单的信息（分页）
router.get("/playLists",(req,res,next)=>{
    //m-pl-container
    let offset=req.query.offset?"&offset="+req.query.offset:"";
    let cat=req.query.cat?"&cat="+req.query.cat:"";
    let param=offset+encodeURI(cat);
    let url="https://music.163.com/discover/playlist/?order=hot"+param;
    console.log(url);
    request("get",url,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let playList={
          desc:"playList",
          count:0,
          total:0,
          body:[]
        };
        $("#m-pl-container").find("li").each((index,ele)=>{
            let picUrl=$("img").attr("src");
            let a=$(ele).find(".msk");
            let title=a.attr("title");
            let url=a.attr("href");
            let count=$(ele).find(".nb").text();
            let au=$(ele).find(".nm");
            let name=au.attr("title");
            let link=au.attr("href");
            playList.body.push({
                title,url,count,picUrl,
                authorBy:{
                    name,link
                }
            });
            playList.count++;
        });
        playList.total=parseInt($(".zpgi").last().text());
        res.send(playList);
    }).catch(err=>{
        console.log(err);
    });
});
module.exports=router;