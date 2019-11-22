const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
//歌单评论
router.get("/:id?/:type?", (req, res, next) => {
    //https://music.163.com/weapi/v1/resource/comments/A_PL_0_19723756?csrf_token=
    let id = req.params.id;
    if (id) {
        let dataTo = {
            rid: parseInt(id),
            offset: parseInt(req.query.offset) || 0,
            limit: parseInt(req.query.limit) || 20,
            beforeTime: req.query.before || 0
        };
        let add = "";
        let type = req.params.type;
        if (type == "playlist"||type=="toplist") {
            add = "A_PL_0_";
        }else if (type=="album"){
            add="R_AL_3_";
        }else if (type=="song"){
            add="R_SO_4_";
        }else if (type=="mv"){
            add="R_MV_5_";
        }else if (type=="video") {
            add="R_VI_62_";
        }else {
            res.send({
                message:"type is not exist"
            });
            return;
        }
        request("post", "https://music.163.com/weapi/v1/resource/comments/" + add + "" + req.params.id, dataTo, {
            ua: "pc",
            crypto: "weapi"
        }).then(data => {
            let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
            result.desc = "leader_comments";
            res.send(result);
        });
    } else {
        res.send({message: "please input param of playList -> 'id'"});
    }
});
//排
module.exports = router;