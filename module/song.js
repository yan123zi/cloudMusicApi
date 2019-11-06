const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
const cheerio = require("cheerio");
//https://music.163.com/song?id=210674
const getSongDetail=require("../utlis/songDetails");
//歌曲详情
router.get("/detail/:id",async (req,res,next)=>{
    let result=await getSongDetail(req.params.id);
    result.url=parseInt(req.params.id);
    console.log(getSongDetail);
    res.send(result);
});
//歌曲评论
router.get("/comments/:id",(req,res,next)=>{
    const data = {
        rid: req.params.id,
        limit: req.query.limit || 20,
        offset: req.query.offset || 0,
        beforeTime: req.query.before|| 0
    };
    request("post","https://music.163.com/api/v1/resource/comments/R_SO_4_"+req.params.id,data,{ua:"pc",crypto:"weapi"}).then(data=>{
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.send(result);
    });
});
//歌曲歌词
router.get("/lyric/:id",(req,res,next)=>{
    // https://music.163.com/weapi/song/lyric?csrf_token=
    //{"id":"545592301","lv":-1,"tv":-1,"csrf_token":""}
    let data={
        id:req.params.id,
        lv:-1,
        tv:-1
    };
    request("post","https://music.163.com/weapi/song/lyric",data,{ua:"pc",crypto: "weapi"}).then(data=>{
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.send(result);
    });
});
//歌曲相似,歌单包含
router.get("/simiAndcon/:id",(req,res,next)=>{
    request("get","https://music.163.com/song?id="+req.params.id,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let contains=$(".m-rctlist").find("li");
        let simis=$(".m-sglist").find("li");
        let songSiCon={
            desc:"",
            containPlayLists:[],
            similar:[]
        };
        //包含歌单
        contains.each((index,ele)=>{
            let a=$(ele).find("a").eq(0);
            let name=a.attr("title");
            let url=a.attr("href");
            let picUrl=a.find("img").attr("src").replace("?param=50y50","");
            let a2=$(ele).find(".nm");
            let username=a2.attr("title");
            let userUrl=a2.attr("href");
            songSiCon.containPlayLists.push({
                name,url,picUrl,create:{username,userUrl}
            });
        });
        //相似歌曲
        simis.each((index,ele)=>{
            let a=$(ele).find(".f-thide").eq(0).find("a");
            let a2=$(ele).find(".f-thide").eq(1).find("a");
            let name=a.attr("title")?a.attr("title"):"null";
            let url=a.attr("href")?a.attr("href"):"null";
            let username=a2.text()?a2.text():"null";
            let userUrl=a2.attr("href")?a2.attr("href"):"null";
            if (name!=="null"||url!=="null"||username!=="null"||userUrl!=="null"){
                songSiCon.similar.push({
                    name,url,artist:{username,userUrl}
                });
            }
        });
        res.send(songSiCon);
    });
});
//歌曲外链
router.get("/url/:id",(req,res,next)=>{
    //https://music.163.com/weapi/song/enhance/player/url/v1?csrf_token=
    //{"ids":"[1400436688]","level":"standard","encodeType":"aac","csrf_token":""}
    const data={
        ids:"["+req.params.id+"]",
        level:"standard",
        encodeType:"aac"
    };
    request("post","https://music.163.com/weapi/song/enhance/player/url/v1",data,{ua:"pc",crypto:"weapi"}).then(data=>{
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.send(result);
    });
});
module.exports=router;