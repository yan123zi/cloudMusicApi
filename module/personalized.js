const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
//推荐歌单
router.get("/playlist",(req,res,next)=>{
    const data = {
        limit: req.query.limit || 30,
        // offset: query.offset || 0,
        total: true,
        n: 1000
    };
    request(
        'POST', `https://music.163.com/weapi/personalized/playlist`, data,
        {crypto: 'weapi', ua:"pc"}
    ).then(data=>{
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.send(result);
    })
});
//推荐电台
router.get("/dj",(req,res,next)=>{
    request(
        'POST', `https://music.163.com/weapi/personalized/djprogram`, {},
        {crypto: 'weapi', ua:"pc"}
    ).then(data=>{
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.send(result);
    })
});
//推荐新歌
router.get("/newSong",(req,res,next)=>{
    const data = {
        type: 'recommend'
    };
    request(
        'POST', `https://music.163.com/weapi/personalized/newsong`, data,
        {crypto: 'weapi', ua:"pc"}
    ).then(data=>{
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.send(result);
    })
});
//推荐mv
router.get("/mv",(req,res,next)=>{
    request(
        'POST', `https://music.163.com/weapi/personalized/mv`, {},
        {crypto: 'weapi', ua:"pc"}
    ).then(data=>{
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.send(result);
    })
});
module.exports=router;
