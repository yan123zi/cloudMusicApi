const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = 'yzj';
// 改为使用异步的 `crypto.scrypt()`。
const key = crypto.scryptSync(password, 'yanzijiang', 24);
// 使用 `crypto.randomBytes()` 生成随机的 iv 而不是此处显示的静态的 iv。
const iv = Buffer.alloc(16, 0); // 初始化向量。
console.log("key:"+key,"iv:"+iv);

console.log(crypto.randomBytes(16).toString('base64'));

const cipher = crypto.createCipheriv(algorithm, key, iv);

let encrypted = cipher.update('要加密的数据', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);
// 打印: 3accbdcaf5574941a9c879da51711ffc2a5a017757fa736eacc579b9088ba712
console.log(16-"yan52lg13148z".length%16);