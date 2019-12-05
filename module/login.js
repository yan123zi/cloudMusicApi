const express = require('express');
const router = express.Router();
const request = require("../utlis/request");
const crypto = require('crypto')
router.get("/cellphone", (req, res, next) => {
    let query = Object.assign({}, req.query, req.body, {cookie: req.cookies});
    query.cookie.os = 'pc'
    const data = {
        phone: query.phone,
        countrycode: query.countrycode,
        password: crypto.createHash('md5').update(query.password).digest('hex'),
        rememberLogin: 'true'
    }
    return request(
        'POST', `https://music.163.com/weapi/login/cellphone`, data,
        {crypto: 'weapi', ua: 'pc', cookie: query.cookie}
    ).then(data=>{
        let result = JSON.parse(data.body.replace(/[\r\n]/g, ""));
        res.append('Set-Cookie', data.cookie)
        res.status(data.status).send(data.body)
        // res.send(result);
    }).catch(answer => {
        console.log('[ERR]', decodeURIComponent(req.originalUrl))
        if(answer.status == '301') answer.body.msg = '需要登录'
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
    });
});
module.exports=router;
