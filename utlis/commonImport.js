/*export const express = require('express');
export const router = express.Router();
export const request=require("request");
export const cheerio=require("cheerio");*/
/*
const request=require("../utlis/request");
module.exports=(req,res,next) => {
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
};*/
