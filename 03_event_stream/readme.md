东方财富自己的代码



> 自动更新：
> AU2106: http://73.futsse.eastmoney.com/sse/113_au2106_qt?
> AUTD: http://18.futsse.eastmoney.com/sse/118_AUTD_qt
> 主动获取：
> 好像只要把sse改为static就行了
> AUTD: 当前数据http://futsse.eastmoney.com/static/118_autd_qt?callbackName=aa&cb=aa&_=1610097205632
> AUTD: 当前数据http://futsse.eastmoney.com/static/113_au2106_qt?callbackName=aa&cb=aa&_=1610097205632

```javascript
function sseHeadData() {
    // var secids = stockentry.marketnum +'.' + stockentry.code;

    //测试地址
    var url =  fan_qihuo_url + "/sse/"+ qihuo_market + "_" + qihuo_code + "_qt";      
    //正式地址
    //var url = "http://" + (Math.floor(Math.random() * 99) + 1) +".push2.eastmoney.com/api/qt/stock/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" + secids;


    var evtSource = new EventSource(url);
    evtSource.onmessage = function (json) {
        // console.log('head sse 推送')
        var obj = JSON.parse(json.data)
        // console.log(obj)
        
        if (obj.qt) {
            formatHead(obj.qt);
        }
    }
        

}

```



```javascript
function renderHead(items) {         
    var list = [
        { "name": "zxj", "item": items.p  == "-" ? "-" : cancelZsjd(items.p, items.zsjd), "color": getColor(items.zdf) },
        { "name": "zde", "item": items.zde  == "-" ? "-" : cancelZsjd(items.zde, items.zsjd), "color": getColor(items.zdf) },
        { "name": "zdf", "item": items.zdf  == "-" ? "-" : (items.zdf).toFixed(2) + '%', "color": getColor(items.zdf) },
        { "name": "jkj", "item": items.o  == "-" ? "-" : cancelZsjd(items.o, items.zsjd), "color": getColor(items.o - items.zjsj) },
        { "name": "zjs", "item": items.zjsj  == "-" ? "-" : cancelZsjd(items.zjsj, items.zsjd) },
        { "name": "zgj", "item": items.h  == "-" ? "-" : cancelZsjd(items.h, items.zsjd), "color": getColor(items.h - items.zjsj) },
        { "name": "zdj", "item": items.l  == "-" ? "-" : cancelZsjd(items.l, items.zsjd), "color": getColor(items.l - items.zjsj) },
        { "name": "cjl", "item": items.vol == "-" ? "-" : NumbericFormat(items.vol) },
        { "name": "ccl", "item": items.ccl == "-" ? "-" : NumbericFormat(items.ccl) },
        { "name": "wp", "item": items.wp == "-" ? "-" : NumbericFormat(items.wp), "color": 'red' },
        { "name": "np", "item": items.np == "-" ? "-" : NumbericFormat(items.np), "color": 'green' },
        { "name": "cc", "item": items.cclbh == "-" ? "-" : NumbericFormat(items.cclbh) },
        { "name": "rz", "item": items.rz  == "-" ? "-" : items.rz, "color": getColor(items.rz) },
        { "name": "zsj", "item": items.qrspj  == "-" ? "-" : cancelZsjd(items.qrspj, items.zsjd)},
        { "name": "mcj", "item": items.mcj  == "-" ? "-" : cancelZsjd(items.mcj, items.zsjd), "color": getColor(items.mcj - items.zjsj)},
        { "name": "mcl", "item": items.mcl  == "-" ? "-" : items.mcl},
        { "name": "mrj", "item": items.mrj  == "-" ? "-" : cancelZsjd(items.mrj, items.zsjd), "color": getColor(items.mrj - items.zjsj)},
        { "name": "mrl", "item": items.mrl  == "-" ? "-" : items.mrl},
        { "name": "quote_title_0", "item": items.name  == "-" ? "-" : items.name},
        { "name": "quote_title_1", "item": items.dm  == "-" ? "-" : (items.dm).toUpperCase()}
        // { "name": "zde", "item": items.f169 == "-" ? "-" : (items.f169), "color": getColor(items.zdf) },
        // { "name": "zdf", "item": items.f170 == "-" ? "-" : (items.f170) + "%", "color": getColor(items.zdf) },
        // { "name": "jk", "item": items.f46 == "-" ? "-" : (items.f46), "color": getColor(items.f46 - items.f60) },
        // { "name": "zs", "item": items.f60 == "-" ? "-" : (items.f60)},
        // { "name": "zg", "item": items.f44 == "-" ? "-" : (items.f44), "color": getColor(items.f44 - items.f60) },
        // { "name": "zd", "item": items.f45 == "-" ? "-" : (items.f45), "color": getColor(items.f45 - items.f60) },
        // { "name": "zt", "item": items.f51 == "-" ? "-" : (items.f51), "color": getColor(items.f51 - items.f60) },
        // { "name": "dt", "item": items.f52 == "-" ? "-" : (items.f52), "color": getColor(items.f52 - items.f60) },
        // { "name": "hs", "item": items.f168 == "-" ? "-" : items.f168 + "%" },
        // { "name": "lb", "item": items.f50 == "-" ? "-" : (items.f50)},
        // { "name": "cjl", "item": items.f47 == "-" ? "-" : NumbericFormat(items.f47) },
        // { "name": "cje", "item": items.f48 == "-" ? "-" : NumbericFormat(items.f48) },
        // { "name": "sy", "item": items.f162 == "-" ? "-" : (items.f162)},
        // { "name": "sj", "item": items.f167 == "-" ? "-" : (items.f167)},
        // { "name": "zsz", "item": items.f116 == "-" ? "-" : NumbericFormat(items.f116) },
        // { "name": "ltsz", "item": items.f117 == "-" ? "-" : NumbericFormat(items.f117) }
    ];
    for (var i = 0; i < list.length; i++) {
        var name = $("." + list[i].name);
        name.text(list[i].item);
        name.removeClass("red").removeClass("green").addClass(list[i].color);
    }

    // //箭头颜色
    // onChangeDataRender(items.zdf);

    //时间
    if(items.jyzt == 0) {
        // var jyr = Dealjyr(items.jyr, "-")
        if(items.utime) {
            var jysj =  Dealjysj(items.utime, "-");
            $("#stock_time").html('('+ jysj + ')');
        }
        

    }else {
        // var jyr = Dealjyr(items.jyr, "-")
        if(items.spsj) {
            var spsj = Dealjysj(items.spsj, "-");
            $("#stock_time").html('('+ spsj + ')');
        }
        

    }

 }

//处理成交量数据格式
function NumbericFormat(string) {
    var context = Number(string);
    //var fushu = false;
    if (!isNaN(context)) {
        var item = parseInt(string);
        if ((item > 0 && item < 1e4) || (item < 0 && item > -1e4)) {
            return item;
        } else if ((item > 0 && item < 1e6) || (item < 0 && item > -1e6)) {
            item = item / 10000;
            return item.toFixed(2) + "万";
        } else if ((item > 0 && item < 1e7) || (item < 0 && item > -1e7)) {
            item = item / 10000;
            return item.toFixed(1) + "万";
        } else if ((item > 0 && item < 1e8) || (item < 0 && item > -1e8)) {
            item = item / 10000;
            return item.toFixed(0) + "万";
        } else if ((item > 0 && item < 1e10) || (item < 0 && item > -1e10)) {
            item = item / 1e8;
            return item.toFixed(2) + "亿";
        } else if ((item > 0 && item < 1e11) || (item < 0 && item > -1e11)) {
            item = item / 1e8;
            return item.toFixed(1) + "亿";
        } else if ((item > 0 && item < 1e12) || (item < 0 && item > -1e12)) {
            item = item / 1e8;
            return item.toFixed(0) + "亿";
        } else if ((item > 0 && item < 1e14) || (item < 0 && item > -1e14)) {
            item = item / 1e12;
            return item.toFixed(2) + "万亿";
        } else if ((item > 0 && item < 1e15) || (item < 0 && item > -1e15)) {
            item = item / 1e12;
            return item.toFixed(1) + "万亿";
        } else if ((item > 0 && item < 1e16) || (item < 0 && item > -1e16)) {
            item = item / 1e12;
            return item.toFixed(0) + "万亿";
        } else {
            return item;
        }
    }
    return context.toString();
}



//处理价格的展示精度
function cancelZsjd(value, zsjd) {

    if(value !== '-') {
        return value.toFixed(zsjd);
    }


}



//处理数据颜色
function getColor(str) {
    var context = str.toString();
    context = context.replace("%", "");
    if (context == 0 || isNaN(context)) {
        return "";
    } else if (context > 0) {
        return "red";
    } else {
        return "green";
    }
}



```