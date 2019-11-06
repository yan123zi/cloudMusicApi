const express = require('express');
const router = express.Router();
const request=require("../utlis/request");
const cheerio=require("cheerio");
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