const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
//热门歌手列表
router.get("/topArtists", (req, res, next) => {
    let data = {
        limit: req.query.limit || 50,
        offset: req.query.offset || 0,
        total: true
    };
    request("post", "https://music.163.com/weapi/artist/top?csrf_token=", data, {
        ua: "pc",
        crypto: "weapi"
    }).then(data => {
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.send(result);
    });
});
/*
    categoryCode 取值
    入驻歌手 5001
    华语男歌手 1001
    华语女歌手 1002
    华语组合/乐队 1003
    欧美男歌手 2001
    欧美女歌手 2002
    欧美组合/乐队 2003
    日本男歌手 6001
    日本女歌手 6002
    日本组合/乐队 6003
    韩国男歌手 7001
    韩国女歌手 7002
    韩国组合/乐队 7003
    其他男歌手 4001
    其他女歌手 4002
    其他组合/乐队 4003

    initial 取值 a-z/A-Z
*/
//获取各分类歌手列表
router.get("/category/:id?", (req, res, next) => {
    let id = req.params.id;
    if (id) {
        const data = {
            categoryCode: id || '1001',
            initial: (req.query.initial || '').toUpperCase().charCodeAt() || '',
            offset: req.query.offset || 0,
            limit: req.query.limit || 30,
            total: true
        };
        request("post", "https://music.163.com/weapi/artist/list?csrf_token=", data, {
            ua: "pc",
            crypto: "weapi"
        }).then(data => {
            let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
            res.send(result);
        });
    } else {
        res.send({message: "please input param of category id for singer -> 'id'"});
    }
});

module.exports = router;