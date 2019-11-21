const request = require("../utlis/request");
const cheerio = require("cheerio");
let getSongDetail=async (url)=>{
    return await request("get","https://music.163.com/song?id="+url,{},{ua:"pc"}).then(data=>{
        let $=cheerio.load(data.body);
        let picUrl=$(".j-img").attr("data-src");
        let detail=$("div.cnt").eq(0);
        let mv=parseInt(detail.find("a[title='播放mv']").attr("href").replace("/mv?id=",""))||null;
        let artists=detail.find("p.des").eq(0).find("a");
        let album=detail.find("p.des").eq(1).find("a");
        let name=detail.find("em").eq(0).text();
        let arts=[];
        artists.each((index,ele)=>{
            let artistName=$(ele).text();
            let artistId=parseInt($(ele).attr("href").replace("/artist?id=",""));
            arts.push({
                artistName,artistId
            });
        });
        let albumName=album.text();
        let albumId=parseInt(album.attr("href").replace("/album?id=",""));
        let time=parseInt($("meta[property='music:duration']").attr("content"));
        let songDetail={
            name,picUrl, mv, artist: arts, album: {albumName, albumId}, time
        };
        return songDetail;
    });
};
module.exports=getSongDetail;