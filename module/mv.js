const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
const cheerio = require("cheerio");
let Entities = require('html-entities').XmlEntities;
let entities = new Entities();
//获取mv的详情
router.get("/detail/:id?", (req, res, next) => {
    let id=req.params.id;
    if (id) {
        const data = {
            id
        };
        request(
            'POST', `https://music.163.com/weapi/mv/detail`, data,
            {crypto: 'weapi', ua: "pc"}
        ).then(data => {
            let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
            res.send(result);
        });
    }else {
        res.send({
            message:"please input param of mv -> 'id'"
        });
    }
});
//获取相关的mv
//n-mvlist
//https://music.163.com/weapi/cloudvideo/v1/allvideo/rcmd
router.get("/relate/:id?", (req, res, next) => {
    let id=req.params.id;
    if (id) {
        request(
            'POST', "https://music.163.com/mv?id="+id,{},
            { ua: "pc"}
        ).then(data => {
            let $ = cheerio.load(data.body);
            let relateMv={
                desc:"relateMv",
                count:5,
                body:[]
            };
            $(".n-mvlist").find("li").each((index,ele)=>{
                let div0=$(ele).find("div").eq(0);
                let div1=$(ele).find("div").eq(1);
                let picUrl=div0.find("img").attr("src").replace("?param=96y54","");
                let playCount=div0.find("p").text();
                let link=div0.find("a").attr("href");
                let Id="";
                let type="";
                if (link.indexOf("mv")!=-1){
                    Id=parseInt(link.replace("/mv?id=",""));
                    type="mv";
                }else {
                    Id=link.replace("/video?id=","");
                    type="video";
                }
                let name=div0.find("a").attr("title");
                let time=div1.find("p").eq(1).text();
                let userName="";
                let userId="";
                let userType="";
                if (type=="mv"){
                    let a=div1.find("p").eq(2).find("span").find("a");
                    userName=a.text();
                    userId=parseInt(a.attr("href").replace("/artist?id=",""));
                    userType="artist";
                }else {
                    let a=div1.find("p").eq(2).find("a");
                    userName=a.text();
                    userId=parseInt(a.attr("href").replace("/user/home?id=",""));
                    userType="user";
                }
                relateMv.body.push({
                   name,picUrl,Id,playCount,time,type,createBy:{userName,userId,userType}
                });
            });
            res.send(relateMv);
        }).catch(error=>{
            console.log(error);
        });
    }else {
        res.send({
            message:"please input param of mv -> 'id'"
        });
    }
});
module.exports=router;