const crypto = require('crypto');
const firstParam={"rid":"R_SO_4_571338279","offset":"0","total":"true","limit":"20","csrf_token":""};
const secondParam="010001";
const thirdParam="00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7";
const forthParam="0CoJUm6Qyw8W8jud";
const song_comment_url="https://music.163.com/api/v1/resource/comments/R_SO_4_571338279";
//随机生成字符
const randChar=(num)=>{
    let template="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result="";
    for (let i=0;i<num;i++){
        let tmp=Math.floor(Math.random()*template.length);
        result+=template.charAt(tmp);
    }
    return result;
};
const aesEnc=(buffer,key)=>{
    let iv="0102030405060708";
    const cipher=crypto.createCipheriv('aes-128-cbc',key,iv);
    return Buffer.concat([cipher.update(buffer), cipher.final()]);
};
const rsaEnc = (buffer, key) => {
    buffer = Buffer.concat([Buffer.alloc(128 - buffer.length), buffer]);
    return crypto.publicEncrypt({key: key, padding: crypto.constants.RSA_NO_PADDING}, buffer)
};
// const cipher=crypto.createCipheriv("aes-128-cbc",key,iv);
// console.log(Buffer.concat([cipher.update(Buffer.from("yzj")),cipher.final()]).toString("base64"));

const s=crypto.randomBytes(16).map(n => ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(n % 62).charCodeAt()))
crypto.randomBytes(16).map(n => (console.log(n)));
// console.log(s.toString('base64'));
let cipher=crypto.createCipheriv('aes-128-cbc',"0CoJUm6Qyw8W8jud","0102030405060708");
let f=cipher.update(Buffer.from(JSON.stringify(firstParam))).toString('base64')+cipher.final().toString('base64');
cipher=crypto.createCipheriv('aes-128-cbc',s,"0102030405060708");
console.log(cipher.update(Buffer.from(f)).toString('base64')+cipher.final().toString('base64'));

