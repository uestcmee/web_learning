// ﻿// require(["baseStock", "common"], function (baseStock, common) {

var baseStock = require('../old_b/basestock')
var common = require('../old_b/common')
var config = require('../../../config/web')


function futureStock() {
    baseStock.call(this);  //第二次调用基类的构造函数

    this.SameExchangeFutureCount = 12;
    this.FutureCount = 12;
    this.exchange = window.stockEnity.Exchange;
}

futureStock.prototype = new baseStock();
var instance = new futureStock();

futureStock.GetFutureContract = function () {
    var url = "//dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?type=qhhy&token=70f12f2f4f091e459a279469fe49eca5";
    var contractId;
    switch (window.stockEnity.Exchange) {
        case "UF_IPE_M": contractId = "NG"; break;
        case "UF_IPE_B": return; //布伦特原油数据源有两条，无法获取正确的结果，不显示 //contractId = "BZ"; break;
        default: contractId = window.stockEnity.Exchange.split("_")[2]; break;
    }
    $.ajax({
        type: "GET",
        url: url,
        data: {
            filter: "(TRANSCODE='" + contractId + "')"
        },
        dataType: "jsonp",
        success: function (data) {

            if (data instanceof Array) {
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    if (!item || item.MARKETCODE.indexOf("CN") === 0) continue;
                    $("#contract_table .jypz").html(common.cutstr(item.TRANSETYPE, 15)).attr("title", item.TRANSETYPE);
                    $("#contract_table .jydm").html(item.TRANSCODE);

                    $("#contract_table .scdm").html(item.MARKETCODE);


                    $("#contract_table .jydw").html(item.TRANSUNIT);
                    $("#contract_table .bjdw").html(item.PRICEUNIT);

                    $("#contract_table .zxbd").html('<span title="' + item.MINPCHANGE + '">' + common.cutString(item.MINPCHANGE, 13) + '</span>');
                    // $("#contract_table .zxbd").attr("title", item.MINPCHANGE);

                    $("#contract_table .hyyfsm").html('<span title="' + item.CONTRADATE + '">' + common.cutString(item.CONTRADATE, 13) + '</span>');
                    // $("#contract_table .hyyfsm").attr("title", item.CONTRADATE);

                    $("#contract_table .jyrsm").html('<span title="' + item.LTRANSDATE + '">' + common.cutString(item.LTRANSDATE, 13) + '</span>');
                    // $("#contract_table .jyrsm").attr("title", item.LTRANSDATE);

                    $("#contract_table .hyblx").html(item.CONTRSUBTYPE);
                }
            }
        }
    });
}

//新闻
futureStock.BindFutureNews = function () {
    // var html = $("#stocknews_table").html();
    // if (!html || html.trim().length == 0) {
    //     instance.getArticle(515, "stocknews_table");
    //     $("#news_name").html("外盘速递");
    //     $("#news_link").html("外盘速递");
    //     $("#news_name").attr("href", "http://futures.eastmoney.com/news/cwpsd.html");
    //     $("#news_link").attr("href", "http://futures.eastmoney.com/news/cwpsd.html");
    //     $("#news_more").attr("href", "http://futures.eastmoney.com/news/cwpsd.html");
    // }

    // if ($("#stocknotice_table").html().trim().length == 0) {
    //     instance.getArticle(513, "stocknotice_table");
    //     $("#comments_name").html("内盘评论");
    //     $("#comments_name").attr("href", "http://futures.eastmoney.com/news/cqspl.html");
    //     $("#comments_more").attr("href", "http://futures.eastmoney.com/news/cqspl.html");
    // }
}

futureStock.BindBulletin = function () {
    // $.ajax({
    //     url: "/web/api/StockApi/GetBulletin/" + 558,
    //     success: function (html) {
    //         if (!html) return;
    //         var cnt = "[头条]" + $(html).find("li h3 a").html();
    //         $(".topnav").append('<li class="fz12 clearfix fl"><a href="//futures.eastmoney.com" target="_blank" class="fl red" style="margin:0 0 0 10px;text-decoration:underline;font-weight:700">' + cnt + '</a></li>');
    //     }
    // });
    if(window.bulletinstr){
        var cnt = "[头条]" + $(window.bulletinstr).find("li h3 a").html();
        $(".topnav").append('<li class="fz12 clearfix fl"><a href="//futures.eastmoney.com" target="_blank" class="fl red" style="margin:0 0 0 10px;text-decoration:underline;font-weight:700">' + cnt + '</a></li>');
    }
}

futureStock.GetSameTypeFuture = function () {

    var url = "http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=C." + instance.exchange + "&sty=MPNSBAS&st=c&sr=-1&p=1&ps=" + (instance.SameExchangeFutureCount + 1)
        + "&cb=?&js=([(x)])&token=7bc05d0d4c3c22ef9fca8c2a912d779c";

    common.jsonP(url, function (json) {
        var html = "", nocnt = "<tr><td colspan='3'>暂无数据</td></tr>";
        html += '<tbody><tr><th>名称</th><th>最新价</th><th>涨跌幅</th></tr>';
        for (var i = 0; i < json.length; i++) {
            if (i >= instance.SameExchangeFutureCount) {
                break;
            }
            var item = json[i].split(",");
            if (item[1] == instance.code) {
                continue;
            }
            nocnt = "";
            var color = common.getColor(item[4]);
            html += '<tr><td title="' + item[2] + '"><a href="http://quote.eastmoney.com/globalfuture/' + item[1] + '.html" target="_blank">' + item[2].cutstr(10) + '</a></td>' +
                '<td class="' + color + '">' + item[3] + '</td><td class="' + color + '">' + item[4] + '</td></tr>';
        }
        html += nocnt + "</tbody>";
        $("#sameExchange_table").html(html);
    });

}

//快速行情
// futureStock.loadHqData = function (url, fieldList) {
//     common.jsonP(url, function (json) {
//         if (json && json[0] && json[0][0].stats != false) {
//             var stockData = json[0][0].split(',');
//             var zsjIndex, zdeIndex = 0;
//             //获取最新价和涨跌额的index
//             for (var i = 0; i < fieldList.length; i++) {
//                 var item = fieldList[i];
//                 if (item.name == "zjs") {
//                     zsjIndex = item.num;
//                 }
//                 if (item.name == "zde") {
//                     zdeIndex = item.num;
//                 }
//             }

//             for (var i = 0; i < fieldList.length; i++) {
//                 var field = fieldList[i];

//                 var data = stockData[field.num];
//                 //振幅和涨跌幅加百分比
//                 if (field.name == "zf" || field.name == "zdf" || field.name == "hsl" || field.name == "wb" || field.name == "roe") {
//                     data = data === "-" ? "-" : data + "%";
//                 } else {
//                     data = data === "-" ? "-" : data;
//                 }

//                 //开平
//                 if (field.name == "kp") {
//                     if (data == -1) {
//                         data = "-";
//                     } else if (data == 0) {
//                         data = "双开";
//                     } else if (data == 1) {
//                         data = "双平";
//                     } else if (data == 2) {
//                         data = "多换";
//                     } else if (data == 3) {
//                         data = "多开";
//                     } else if (data == 4) {
//                         data = "多平";
//                     } else if (data == 5) {
//                         data = "空换";
//                     } else if (data == 6) {
//                         data = "空开";
//                     } else if (data == 7) {
//                         data = "空平";
//                     }
//                 }
//                 //万百万缩写
//                 if (field.NumbericFormat && data) {
//                     data = data.NumbericFormat();
//                 }
//                 $("." + field.name).html(data);

//                 if (field.hasColor) {
//                     var zsj = stockData[zsjIndex];
//                     $("." + field.name).removeClass("red").removeClass("green");
//                     if (field.name == "wb" || field.name == "wc" || field.name == "rz" || field.name == "cc") {
//                         $("." + field.name).addClass(common.getColor(data));
//                     } else if (field.name != "zxj" && field.name != "zdf" && field.name != "zde" && !isNaN(data)) {
//                         if (data > zsj) {
//                             $("." + field.name).addClass("red");
//                         } else if (data < zsj) {
//                             $("." + field.name).addClass("green");
//                         }
//                     } else {
//                         var zde = stockData[zdeIndex];
//                         if (zde != 0 && !isNaN(zde)) {
//                             if (zde.isPositive()) {
//                                 $("." + field.name).addClass("red");
//                                 $("#arrow-find").removeClass("down-arrow").addClass("up-arrow");
//                             } else {
//                                 $("." + field.name).addClass("green");
//                                 $("#arrow-find").removeClass("up-arrow").addClass("down-arrow");
//                             }
//                         } else {
//                             $("#arrow-find").removeClass("up-arrow").removeClass("down-arrow");
//                         }
//                     }
//                 }
//             }

//             //行情时间
//             $("#stock_time").html("(" + stockData[3] + ")");

//             //涨跌平
//             var zdpList = stockData[25].split("|");

//             if ($(".pjs").length > 0) {
//                 $(".zjs").html(zdpList[0]);
//                 $(".pjs").html(zdpList[1]);
//                 $(".djs").html(zdpList[2]);
//             }

//             //阶段涨跌幅
//             var jdzdfList = stockData[26].split("|");

//             if ($(".5day").length > 0) {
//                 $(".5day").html(jdzdfList[0]);
//                 jdzdfList[0].isPositive() ? $(".5day").addClass("red") : $(".5day").addClass("green");
//                 $(".20day").html(jdzdfList[2]);
//                 jdzdfList[2].isPositive() ? $(".20day").addClass("red") : $(".20day").addClass("green");
//                 $(".60day").html(jdzdfList[3]);
//                 jdzdfList[3].isPositive() ? $(".60day").addClass("red") : $(".60day").addClass("green");
//                 $(".tillNow").html(jdzdfList[4]);
//                 jdzdfList[4].isPositive() ? $(".tillNow").addClass("red") : $(".tillNow").addClass("green");

//             }
//         }
//     });
// }

//财经日历
futureStock.getFinanceCalendar = function () {
    var url = "//datainterface.eastmoney.com/EM_DataCenter/js.aspx?type=GJZB&sty=RLLB&mkt=&fd=" + common.formatDate(new Date(), "yyyy-MM-dd") + "&stat=1&p=1&ps=8&cb=?&js=([(x)])";
    var levelArray = ["高", "中", "低"];
    common.jsonP(url, function (json) {
        var html = "";
        for (var i = 0; i < json.length; i++) {
            var item = json[i].split(",");
            var levelColor = item[11] == "1" ? "red" : "";
            html += '<tr><td>' + item[0] + '</td><td>'
                + item[7] + '</td><td class="w150">'
                + common.cutString(item[8], 12) + '</td><td>' + common.formatDate(new Date(item[3]), "yyyy-MM-dd") + '</td>'
                + '<td class="' + levelColor + '">' + levelArray[item[11] - 1] + '</td><td>' + (item[12] == "" ? "-" : item[12] + item[6])
                + '</td><td>' + (!item[10] ? "-" : item[10]) + '</td><td>' + (!item[9] ? "-" : item[9]) + '</td></tr>';
        }
        $("#calendar_table").html(html);
    });

}

//10档明细
futureStock.prototype.loadDetailData = function () {
    var url = "http://pdfm.eastmoney.com/em_ubg_pdti_fast/api/js?id=" + this.stockId + "&type=detail&js=var%20HqDetail=(x)";

    $.getScript(url, function () {
        $("#deal_table").html("");
        if (!window.HqDetail) return;
        var length = window.HqDetail.data.length > 9 ? 10 : window.HqDetail.data.length;
        for (var i = 0; i < length; i++) {
            var itemList = window.HqDetail.data[i].split(",");
            var sellColor = common.getColor(itemList[3]);
            var color = common.getColor(itemList[1] - window.HqDetail.pc);

            $("#deal_table").append('<tr><td><a href="javascript:;" target="_blank">' + itemList[0] + '</a></td>' +
                '<td class="' + color + '">' + itemList[1] + '</td>' +
                '<td class="' + sellColor + '">' + itemList[2] + '</td>');
        }
    });
}

var fieldList = [
    { "name": "jkj", "num": 7, "hasColor": true, "NumbericFormat": false },
    { "name": "zsj", "num": 13, "hasColor": true, "NumbericFormat": false },
    { "name": "zxj", "num": 4, "hasColor": true, "NumbericFormat": false },
    { "name": "zde", "num": 6, "hasColor": true, "NumbericFormat": false },
    { "name": "zdf", "num": 5, "hasColor": true, "NumbericFormat": false },
    { "name": "ztj", "num": 29, "hasColor": true, "NumbericFormat": true },
    { "name": "dtj", "num": 30, "hasColor": true, "NumbericFormat": true },
    { "name": "cjl", "num": 9, "hasColor": false, "NumbericFormat": true },
    { "name": "cje", "num": 15, "hasColor": false, "NumbericFormat": true },
    { "name": "np", "num": 11, "hasColor": false, "NumbericFormat": true },
    { "name": "wp", "num": 17, "hasColor": false, "NumbericFormat": true },
    { "name": "zgj", "num": 8, "hasColor": true, "NumbericFormat": false },
    { "name": "zdj", "num": 14, "hasColor": true, "NumbericFormat": false },
    { "name": "mrj", "num": 10, "hasColor": true, "NumbericFormat": false },
    { "name": "mcj", "num": 16, "hasColor": true, "NumbericFormat": false },
    { "name": "ccl", "num": 34, "hasColor": false, "NumbericFormat": true },
    { "name": "rz", "num": 35, "hasColor": true, "NumbericFormat": false },
    { "name": "zjs", "num": 37, "hasColor": false, "NumbericFormat": false },
    { "name": "cc", "num": 36, "hasColor": false, "NumbericFormat": false },
    { "name": "mrl", "num": 39, "hasColor": false, "NumbericFormat": false },
    { "name": "mcl", "num": 40, "hasColor": false, "NumbericFormat": false }
];

function bindEvent() {

    $(".tabLi").mouseenter(function () {
        $(this).parent().find("li").removeClass("cur");
        $(this).addClass("cur");

        var index = $(this).index();
        if ($(this).parents(".tabExchangeCon").length > 0) {
            $(this).parents(".tabExchangeCon").find(".info_list").removeClass("active");
            $(this).parents(".tabExchangeCon").find(".info_list").eq(index).addClass("active");

            $(this).parents(".tabExchangeCon").find(".more").hide();
            $(this).parents(".tabExchangeCon").find(".more").eq(index).show();

        } else {
            $(this).parents(".side_box").find(".info_list").removeClass("active");
            $(this).parents(".side_box").find(".info_list").eq(index).addClass("active");
        }

    });

    $(".myselect").click(function (e) {
        if ($(this).find("dl").css("display") == "none") {
            $(this).find("dl").show();
        } else {
            $(this).find("dl").hide();
        }
        e.stopPropagation();
    });

    $("body").click(function () {
        $(".myselect dl").hide();
    });


    //<期货下拉框查询相关开始>
    bingSelectExchange();

    $("#international").click(function () {

        // var html = '';
        // html += '<dd value="C._CTR_UFBK_COBOT" mktid="103">COBOT-芝加哥期货交易所</dd>' +
        //     '<dd value="C._CTR_UFBK_COMEX" mktid="101">COMEX-纽约商品交易所</dd>' +
        //     '<dd value="C._CTR_UFBK_NYBOT" mktid="108">NYBOT-纽约期货交易所</dd>' +
        //     '<dd value="C._CTR_UFBK_NYMEX" mktid="102">NYMEX-纽约商业交易所</dd>' +
        //     '<dd value="C._CTR_UFBK_LME" mktid="109">LME-伦敦金属交易所</dd>' +
        //     '<dd value="C._CTR_UFBK_TOCOM" mktid="111">TOCOM-东京商品交易所</dd>' +
        //     '<dd value="C._CTR_UFBK_SGX" mktid="104">SGX-新加坡交易所</dd>' +
        //     '<dd value="C._CTR_UFBK_IPE" mktid="112">IPE-洲际交易所</dd>' +
        //     '<dd value="C._CTR_UFBK_MDEX" mktid="110">MDEX-马来西亚衍生品交易所</dd>';

        // $("#select1 dl").html(html);
        // $("#select1 span").html("交易所");
        // $("#select2 span").html("品种");
        // $("#select2 dl").html("");

        // $("#select3 span").html("合约");
        // $("#select3 dl").html("");
        // $("#select3 span").attr("value", "");
        // bingSelectExchange();

        showGwjys();
    });

    $("#china").click(function () {
        // var html = '';
        // html += '<dd value="C._CTR_FBK_SHFE" mktid="113">上期所</dd><dd value="C._CTR_FBK_INE" mktid="142">上期能源</dd><dd value="C._CTR_FBK_DCE" mktid="114">大商所</dd><dd value="C._CTR_FBK_CZCE" mktid="115">郑商所</dd><dd value="C._CTR_FBK_INE" mktid="142">上海能源期货交易中心</dd><dd value="R._CTR_ITFBK_I_FO|_CTR_ITFBK_T_FO" mktid="220">中金所</dd>';
        // $("#select1 dl").html(html);
        // $("#select1 span").html("交易所");

        // $("#select2 span").html("品种");
        // $("#select2 dl").html("");

        // $("#select3 span").html("合约");
        // $("#select3 dl").html("");
        // $("#select3 span").attr("value", "");

        // bingSelectExchange();

        showGnjys();
    });

    $(".search_btn").click(function () {
        var code = $("#select3 span").attr("value");
        if (!code) {
            alert("请选择品种合约");
            return;
        }
        if ($("#international").prop("checked")) {
            window.open("http://quote.eastmoney.com/globalfuture/" + code + ".html");
        } else {
            if ($("#select1 span").html() == "CFFEX-中金所") {
                window.open("http://quote.eastmoney.com/gzqh/" + code + ".html");
            } else {
                window.open("http://quote.eastmoney.com/qihuo/" + code + ".html");
            }
        }
    });

    //<期货下拉框查询相关结束>

    $('#contract_table .clickTd').click(function () {
        if ($("#contract_table .table_show").hasClass("table_close")) {
            $('#contract_table .addTr').hide();
            $("#contract_table .table_show").removeClass("table_close");
        } else {
            $('#contract_table .hide').show();
            $("#contract_table .table_show").addClass("table_close");
        }
    });

    $('#calSearch').click(function () {
        window.open("http://forex.eastmoney.com/fc.html?date=" + $('#txtBeginDate').val());
    });

    bindRelation();
}

function bindRelation() {
    //1对多关系设置
    if (window.stockEnity.Relate != "") {
        $("#globalRelated_table").show();
        var futureList = window.stockEnity.Relate.split(",");
        //1对1
        if (futureList.length == 1) {
            instance.FutureCount = 9;
            instance.SameExchangeFutureCount = 8;
            $("#sameExchange_table").parent().css("min-height", "230px");

        } else if (futureList.length == 2) {
            //1对2
            instance.FutureCount = 5;
            instance.SameExchangeFutureCount = 5;
            $("#sameExchange_table").parent().css("min-height", "155px");
        }

        if (futureList.length > 0) {
            $("#oneToOne").show();
            $('#oneToOne img').attr("src", "//webquotepic.eastmoney.com/GetPic.aspx?id=" + futureList[0] + "&imageType=RT&token=44c9d251add88e27b65ed86506f6e5da");
            $('#oneToOne a').attr("href", "http://quote.eastmoney.com/qihuo/" + futureList[0].substring(0, futureList[0].length - 1) + ".html");
        }

        if (futureList.length > 1) {
            $("#oneToTwo").show();
            $('#oneToTwo img').attr("src", "//webquotepic.eastmoney.com/GetPic.aspx?id=" + futureList[1] + "&imageType=RT&token=44c9d251add88e27b65ed86506f6e5da");
            $('#oneToTwo a').attr("href", "http://quote.eastmoney.com/qihuo/" + futureList[1].substring(0, futureList[1].length - 1) + ".html");
        }
    } else {
        $("#future_box").hide();
    }
}

//绑定交易所拉下框事件
function bingSelectExchange() {
    $("#select1 dl dd").unbind("click");
    $("#select1 dl dd").click(function (e) {
        $(this).parents(".myselect").find("span").html($(this).html());
        $("#select2 span").html("品种");
        $("#select3 span").html("合约");


        // bindFutureCag($(this).attr("value"));
        bindFutureCag($(this).attr("mktid"));
        $("#select1 dl").hide();
        e.stopPropagation();
    });
}

//绑定品种拉下框事件
function bingSelectCag() {
    $("#select2 dl dd").unbind("click");
    $("#select2 dl dd").click(function (e) {
        $(this).parents(".myselect").find("span").html($(this).html());
        $("#select3 span").html("合约");

        // bindDetailFuture($(this).attr("value"));
        bindDetailFuture($(this).attr("value"), $(this).attr("vcode"));
        $("#select2 dl").hide();
        e.stopPropagation();
    });
}

//绑定合约下拉框事件
function bingSelectContract() {
    $("#select3 dl dd").unbind("click");
    $("#select3 dl dd").click(function (e) {
        $(this).parents(".myselect").find("span").html($(this).html());
        $(this).parents(".myselect").find("span").attr("value", $(this).attr("value"));

        $("#select3 dl").hide();
        e.stopPropagation();
    });
}

//品种数据源
function bindFutureCag(codeKey) {
    var callbackName = 'jqueryCallback' + codeKey;
    var url = qihuo_surl + '/redis?msgid=' + codeKey + '&callbackName=' + callbackName;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: callbackName
    }).then(function (json) {
        // console.log(json);
        $("#select2 dl").html("");
        for (var i = 0; i < json.length; i++) {
            var itemlist = json[i];
            $("#select2 dl").append('<dd value="' + itemlist.mktid + '" vcode="' + itemlist.vcode +'">' + itemlist.vname + '</dd>');
        }

        bingSelectCag();

    })
}

//合约数据源
function bindDetailFuture(mktid, vcode) {
    var callbackName = 'jqueryCallback' + vcode;
    var url = qihuo_surl + "/redis?";
    $.ajax({
        url: url,
        type: "GET",
        data: {
            msgid: mktid + '_' + vcode.toLowerCase(),
            callbackName: callbackName
        },
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: callbackName
    }).then(function (json) {
        // console.log(json);
        $("#select3 dl").html("");
        for (var i = 0; i < json.length; i++) {
            var itemlist = json[i];
            $("#select3 dl").append('<dd value="' + itemlist.code + '" vcode="' + itemlist.code +'">' + itemlist.name + '</dd>');
        }
        bingSelectContract();
    })



}

//股市直播
function scrollNews() {
    $.ajax({
        url: '//cmsdataapi.eastmoney.com/api/CmsNews/QueryCmsNewsByColumn?columns=514&pageindex=1&pagesize=1',
        dataType: "jsonp",
        jsonp: "cb",
        success: function (data) {
            if (data && data.Result.length > 0) {
                var _data = data.Result[0];
                var $dom = $('#ScrollMIIRBox');
                var $link = $('<a href="' + _data.Art_Url + '" target="_blank">' + _data.Art_Title + '</a>')
                $dom.find('.t').html($link);
                $dom.find('.dt').html(common.formatDate(_data.Art_Showtime, 'HH:mm'));
            }

        }

    })
}


var imgevt = instance.bindChartImgEvent();
// imgevt.bindEvent();
bindEvent();

init();

/**
 * 正式接口地址
 * qihuo_url: 行情相关接口
 * qihuo_surl：静态数据接口
 * fan_qihuo_url：行情推送接口
 */
var qihuo_url = "//futsse.eastmoney.com";
var qihuo_surl = "//futsse-static.eastmoney.com";
var fan_qihuo_url = "//"+ Math.floor(Math.random()*100+1) +".futsse.eastmoney.com";


/**
 * 测试接口地址
 * url中添加hq-env参数，切换测试接口
 */
if (common.getQueryString("hq-env") === "test") {
    qihuo_url = "http://futssetest.eastmoney.com";
    qihuo_surl = "http://static.futssetest.eastmoney.com";
    fan_qihuo_url = "http://futssetest.eastmoney.com";
}
//市场和code  暂时写死
// var qihuo_market = 102,
//     qihuo_code = 'NG00Y',
//     qihuo_mktcode = '102_ng',
//     qihuo_mktc = '4';
var qihuo_market = stockEnity.MktNum,
    qihuo_code = stockEnity.stockCode,
    qihuo_mktcode = stockEnity.MktNum + '_' + stockEnity.TypeUS,
    qihuo_mktc = stockEnity.TypeUS;

/**
 * 行情换源入口
 */
hangQing();

//guba.init("gubalisttable", window.stockEnity.gubaId, { listcount: 12, titlecut: 42 });
instance.setHotGuba(15);
setInterval(function () {
    init();
}, 20 * 1000);

// futureStock.GetFutureContract();
futureStock.getFinanceCalendar();
futureStock.BindFutureNews();
futureStock.BindBulletin();

function init() {
    var hqurl = "http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=" + futureStock.prototype.stockId + "&sty=FDPBPFBTA&st=z&sr=&p=&ps=&cb=?&js=([[(x)]])&token=7bc05d0d4c3c22ef9fca8c2a912d779c";
    // futureStock.loadHqData(hqurl, fieldList);
    scrollNews()
    // instance.loadDetailData();
    // imgevt.changeImg();
    // futureStock.GetSameTypeFuture();

    // instance.bindDataTemplate("http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=C._F_MAIN&sty=MPNSBAS&st=c&sr=-1&p=1&ps=" + instance.FutureCount
    //     + "&cb=?&js=([(x)])&token=7bc05d0d4c3c22ef9fca8c2a912d779c", "Future_table", "future");

    // instance.bindDataTemplate("http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=C.bk0" + window.stockEnity.HyId.substring(5, 8) + "1&sty=MPNSBAS&st=c&sr=-1&p=1&ps=10"
    //     + "&cb=?&js=([(x)])&token=7bc05d0d4c3c22ef9fca8c2a912d779c", "hyStock_table", "AB");

    // instance.bindDataTemplate("http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=C._SG&sty=MPNSBAS&st=c&sr=-1&p=1&ps=5"
    //     + "&cb=?&js=([(x)])&token=7bc05d0d4c3c22ef9fca8c2a912d779c", "globalXH_table", "xh");

    // instance.bindDataTemplate("http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=C.HKPM&sty=MPNSBAS&st=c&sr=-1&p=1&ps=5"
    //     + "&cb=?&js=([(x)])&token=7bc05d0d4c3c22ef9fca8c2a912d779c", "HKXH_table", "xh");

    // instance.bindDataTemplate("http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&" +
    //     "cmd=0000011,NKY_UIFO,HSI5,INDU_UIFO,DAX_UIFO&sty=MPNSBAS&st=z&sr=1&p=1&ps=1000&cb=?&js=([(x)])&token=7bc05d0d4c3c22ef9fca8c2a912d779c", "globalTable", "global");
}


jQuery.fn.extend({
    calendar: function (c) {
        function r() {
            $("#" + c.controlId).find(".tabD a").mouseup(function () {
                var a = new Date($("#" + c.controlId).find(".currentYear").text() + "/" + $("#" + c.controlId).find(".currentMonth").text() + "/1");
                if ($(this).hasClass("prevD")) {
                    a.setMonth(a.getMonth() - 1);
                    a.setDate($(this).text());
                    var b = c.speed;
                    c.speed = 0;
                    $("#" + c.controlId).find(".prevMonth").triggerHandler("mouseup");
                    c.speed = b
                } else if ($(this).hasClass("nextD")) {
                    a.setMonth(a.getMonth() + 1);
                    a.setDate($(this).text());
                    b = c.speed;
                    c.speed = 0;
                    $("#" + c.controlId).find(".nextMonth").triggerHandler("mouseup");
                    c.speed = b
                }
                var d = $(this).text();
                a = a.getFullYear() + "-" + (Number(a.getMonth() + 1) < 10 ? "0" + Number(a.getMonth() + 1) : Number(a.getMonth() + 1)) + "-" + (Number(d) < 10 ? "0" + d : d);
                n.val(a);
                $("#" + c.controlId + " div table a").removeClass("select");
                $("#" + c.controlId + " .tabD a:contains('" + d + "')").each(function () {
                    d == $(this).text() && !$(this).hasClass("prevD") && !$(this).hasClass("nextD") && $(this).addClass("select")
                });
                $("#" + c.controlId).hide();
                c.callback()
            }).hover(function () {
                    $(this).addClass("hover")
                },
                function () {
                    $(this).removeClass("hover")
                })
        }
        function u() {
            $("#" + c.controlId).find(".tabM a").mouseup(function () {
                var a = s(Number($("#" + c.controlId).find(".currentYear").text()), Number($(this).attr("val")));
                D(a);
                r();
                $("#" + c.controlId).find(".currentMonth").text(Number($(this).attr("val")) + 1)
            }).hover(function () {
                    $(this).addClass("hover")
                },
                function () {
                    $(this).removeClass("hover")
                })
        }
        function v() {
            $("#" + c.controlId).find(".tabY a").mouseup(function () {
                var a = s(Number($(this).text()), Number($("#" + c.controlId).find(".currentMonth").text()) - 1);
                D(a);
                r();
                $("#" + c.controlId).find(".currentYear").text(Number($(this).text()))
            }).hover(function () {
                    $(this).addClass("hover")
                },
                function () {
                    $(this).removeClass("hover")
                })
        }
        function s(a, b) {
            newDate = new Date(a, b, 1);
            newDate.setDate(0);
            var d = 1,
                h = newDate.getDate();
            newDate.setDate(1);
            newDate.setMonth(newDate.getMonth() + 1);
            var m = newDate.getDay();
            if (m == 0) m = 7;
            h = h - m + 1;
            newDate.setMonth(newDate.getMonth() + 1);
            newDate.setDate(0);
            var o = newDate.getDate(),
                g = "<table class='tabD'>";
            g += "<tr><th>\u65e5</th><th>\u4e00</th><th>\u4e8c</th><th>\u4e09</th><th>\u56db</th><th>\u4e94</th><th>\u516d</th></tr>";
            var i = w(),
                l = "",
                p = "",
                t = "";
            c.complement || (t = "style='display:none'");
            for (var x = 0; x < 6; x++) {
                g += "<tr>";
                for (var y = 0; y < 7; y++) {
                    var j = x * 7 + y + 1 - m;
                    p = l = "";
                    if (c.lowerLimit != NaN && c.lowerLimit > new Date(newDate.getFullYear(), newDate.getMonth(), j) || c.upperLimit != NaN && new Date(newDate.getFullYear(), newDate.getMonth(), j) > c.upperLimit) if (0 < j && j <= o) {
                        if (newDate.getFullYear() == e && newDate.getMonth() == f && j == q) l = "current";
                        g += "<td><span class='" + l + "'>" + j + "</span></td>"
                    } else if (j <= 0) {
                        if (newDate.getFullYear() == e && newDate.getMonth() - 1 == f && h == q) l = "current";
                        g += "<td><span class='" + l + "' " + t + ">" + h + "</span></td>";
                        h++
                    } else {
                        if (j > o) {
                            if (newDate.getFullYear() == e && newDate.getMonth() + 1 == f && d == q) l = "current";
                            g += "<td><span class='" + l + "' " + t + ">" + d + "</span></td>";
                            d++
                        }
                    } else if (0 < j && j <= o) {
                        if (newDate.getFullYear() == e && newDate.getMonth() == f && j == q) l = "current";
                        if (newDate.getFullYear() == i.getFullYear() && newDate.getMonth() == i.getMonth() && j == i.getDate()) p = "select";
                        g += "<td><a class='" + p + " " + l + "'>" + j + "</a></td>"
                    } else if (j <= 0) {
                        if (newDate.getFullYear() == e && newDate.getMonth() - 1 == f && h == q) l = "current";
                        if (newDate.getFullYear() == i.getFullYear() && newDate.getMonth() - 1 == i.getMonth() && h == i.getDate()) p = "select";
                        g += "<td><a class='prevD " + p + " " + l + "' " + t + ">" + h + "</a></td>";
                        h++
                    } else if (j > o) {
                        if (newDate.getFullYear() == e && newDate.getMonth() + 1 == f && d == q) l = "current";
                        if (newDate.getFullYear() == i.getFullYear() && newDate.getMonth() + 1 == i.getMonth() && d == i.getDate()) p = "select";
                        g += "<td><a class='nextD " + p + " " + l + "' " + t + ">" + d + "</a></td>";
                        d++
                    }
                    g = g.replace("class=' '", "")
                }
                g += "</tr>"
            }
            g += "</table>";
            return g
        }
        function z(a) {
            var b = w(),
                d = "<table class='tabM'>";
            d += "<tr>";
            d += "<td><a val='0' " + (a == b.getFullYear() && 0 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 0 == f ? "class='current'" : "") + ">\u4e00\u6708</a></td>";
            d += "<td><a val='1' " + (a == b.getFullYear() && 1 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 1 == f ? "class='current'" : "") + ">\u4e8c\u6708</a></td>";
            d += "<td><a val='2' " + (a == b.getFullYear() && 2 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 2 == f ? "class='current'" : "") + ">\u4e09\u6708</a></td>";
            d += "<td><a val='3' " + (a == b.getFullYear() && 3 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 3 == f ? "class='current'" : "") + ">\u56db\u6708</a></td>";
            d += "</tr>";
            d += "<tr>";
            d += "<td><a val='4' " + (a == b.getFullYear() && 4 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 4 == f ? "class='current'" : "") + ">\u4e94\u6708</a></td>";
            d += "<td><a val='5' " + (a == b.getFullYear() && 5 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 5 == f ? "class='current'" : "") + ">\u516d\u6708</a></td>";
            d += "<td><a val='6' " + (a == b.getFullYear() && 6 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 6 == f ? "class='current'" : "") + ">\u4e03\u6708</a></td>";
            d += "<td><a val='7' " + (a == b.getFullYear() && 7 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 7 == f ? "class='current'" : "") + ">\u516b\u6708</a></td>";
            d += "</tr>";
            d += "<tr>";
            d += "<td><a val='8' " + (a == b.getFullYear() && 8 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 8 == f ? "class='current'" : "") + ">\u4e5d\u6708</a></td>";
            d += "<td><a val='9' " + (a == b.getFullYear() && 9 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 9 == f ? "class='current'" : "") + ">\u5341\u6708</a></td>";
            d += "<td><a val='10' " + (a == b.getFullYear() && 10 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 10 == f ? "class='current'" : "") + ">\u5341\u4e00\u6708</a></td>";
            d += "<td><a val='11' " + (a == b.getFullYear() && 11 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 11 == f ? "class='current'" : "") + ">\u5341\u4e8c\u6708</a></td>";
            d += "</tr>";
            d += "</table>";
            return d
        }
        function A(a) {
            a = Math.floor(a / 10) * 10;
            var b = "<table class='tabY'>",
                d = w(),
                h = "",
                m = "",
                o = "";
            c.complement || (o = "style='display:none'");
            for (var g = 0; g < 3; g++) {
                b += "<tr>";
                for (var i = 0; i < 4; i++) {
                    m = h = "";
                    if (g + 1 * i + 1 != 1 && (g + 1) * (i + 1) != 12) {
                        if (a == d.getFullYear()) h = "select";
                        if (a == e) m = "current";
                        b += "<td><a class='" + h + " " + m + "' >" + a + "</a></td>";
                        a++
                    } else if (g + 1 * i + 1 == 1) {
                        if (a - 1 == d.getFullYear()) h = "select";
                        if (a - 1 == e) m = "current";
                        b += "<td><a class='prevY " + h + " " + m + "' " + o + ">" + (a - 1) + "</a></td>"
                    } else {
                        if (a == d.getFullYear()) h = "select";
                        if (a == e) m = "current";
                        b += "<td><a class='nextY " + h + " " + m + "' " + o + ">" + a + "</a></td>"
                    }
                }
                b += "</tr>"
            }
            b += "</table>";
            return b
        }
        function B(a) {
            var b = $("#" + c.controlId).find(".reserve"),
                d = $("#" + c.controlId).find(".enabled");
            b.stop();
            d.stop();
            b.removeClass("reserve").addClass("enabled");
            d.removeClass("enabled").addClass("reserve");
            b.css({
                "margin-left": d.width() + "px",
                "margin-top": "0px"
            });
            b.empty().append(a);
            b.animate({
                    "margin-left": "0px"
                },
                c.speed);
            d.animate({
                    "margin-left": "-" + d.width() + "px"
                },
                c.speed,
                function () {
                    d.empty()
                })
        }
        function C(a) {
            var b = $("#" + c.controlId).find(".reserve"),
                d = $("#" + c.controlId).find(".enabled");
            b.stop();
            d.stop();
            b.removeClass("reserve").addClass("enabled");
            d.removeClass("enabled").addClass("reserve");
            b.css({
                "margin-left": "-" + d.width() + "px",
                "margin-top": "0px"
            });
            b.empty().append(a);
            b.animate({
                    "margin-left": "0px"
                },
                c.speed);
            d.animate({
                    "margin-left": d.width() + "px"
                },
                c.speed,
                function () {
                    d.empty()
                })
        }
        function D(a) {
            var b = $("#" + c.controlId).find(".reserve"),
                d = $("#" + c.controlId).find(".enabled");
            b.stop();
            d.stop();
            b.removeClass("reserve").addClass("enabled");
            d.removeClass("enabled").addClass("reserve");
            $("#" + c.controlId).css({
                "z-index": 1
            });

            b.css({
                "z-index": -1
            });
            d.css({
                "z-index": -1
            });
            b.css({
                "margin-left": "0px",
                "margin-top": d.height() + "px"
            });
            b.empty().append(a);
            b.animate({
                    "margin-top": "0px"
                },
                c.speed);
            d.animate({
                    "margin-top": "-" + d.width() + "px"
                },
                c.speed,
                function () {
                    d.empty();
                    $("#" + c.controlId).css({
                        "z-index": 0
                    });
                    b.css({
                        "z-index": 0
                    });
                    d.css({
                        "z-index": 0
                    })
                })
        }
        function E(a) {
            var b = $("#" + c.controlId).find(".reserve"),
                d = $("#" + c.controlId).find(".enabled");
            b.stop();
            d.stop();
            b.removeClass("reserve").addClass("enabled");
            d.removeClass("enabled").addClass("reserve");
            $("#" + c.controlId).css({
                "z-index": 1
            });
            b.css({
                "z-index": -1
            });
            d.css({
                "z-index": -1
            });
            b.css({
                "margin-left": "0px",
                "margin-top": "-" + d.height() + "px"
            });
            b.empty().append(a);
            b.animate({
                    "margin-top": "0px"
                },
                c.speed);
            d.animate({
                    "margin-top": d.width() + "px"
                },
                c.speed,
                function () {
                    d.empty();
                    $("#" + c.controlId).css({
                        "z-index": 0
                    });
                    b.css({
                        "z-index": 0
                    });
                    d.css({
                        "z-index": 0
                    })
                })
        }
        function w() {
            re = /(\d\d\d\d)(\W)?(\d\d)(\W)?(\d\d)/g;
            var a = n.val();
            a = a.replace(re, "$1/$3/$5@").split("@")[0];
            return new Date(a)
        }
        function F(a) {
            var b = [];
            b.x = a.offsetLeft;
            for (b.y = a.offsetTop; a = a.offsetParent;) {
                b.x += a.offsetLeft;
                b.y += a.offsetTop
            }
            return b
        }
        c = jQuery.extend({
                controlId: $(this).attr("id") + "Calendar",
                speed: 200,
                complement: true,
                readonly: true,
                upperLimit: NaN,
                lowerLimit: NaN,
                callback: function () { }
            },
            c || {});
        var n = $(this);
        if (c.readonly) {
            n.attr("readonly", true);
            n.bind("keydown",
                function () {
                    if (event.keyCode == 8) event.keyCode = 0
                })
        }
        today = new Date;
        var e = today.getFullYear(),
            f = today.getMonth(),
            q = today.getDate(),
            k = "";
        k += "<div id='" + c.controlId + "'class='calendar'>";
        k += "  <div class='calMain'>";
        k += "    <div class='calTitle'>";
        k += "      <a class='prevMonth'></a><span class='t_date'><span class='currentYearText'><a class='currentYear'>" + e + "</a>\u5e74</span><span class='currentMonthText'><a class='currentMonth'>" + (f + 1) + "</a>\u6708</span></span><a class='nextMonth'></a>";
        k += "    </div>";
        k += "    <div class='calContent'>";
        k += "      <div class='reserve'>";
        k += "      </div>";
        k += "      <div class='enabled'>";
        k += s(e, f);
        k += "      </div>";
        k += "    </div>";
        k += "  </div>";
        k += "</div>";
        $("body").append(k);
        r();
        $("#" + c.controlId).find(".prevMonth").mouseup(function () {
            if ($("#" + c.controlId).find(".enabled > .tabD").length > 0) {
                var a = $("#" + c.controlId).find(".currentYear"),
                    b = $("#" + c.controlId).find(".currentMonth"),
                    d = s(Number(a.text()), Number(b.text()) - 2);
                C(d);
                if (Number(b.text()) != 1) b.text(Number(b.text()) - 1);
                else {
                    a.text(Number(a.text()) - 1);
                    b.text("12")
                }
                r()
            } else if ($("#" + c.controlId).find(".enabled > .tabM").length > 0) {
                d = z(Number($("#" + c.controlId).find(".currentYear").text()) - 1);
                C(d);
                u();
                $("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) - 1)
            } else if ($("#" + c.controlId).find(".enabled > .tabY").length > 0) {
                d = A(Number($("#" + c.controlId).find(".currentYear").text()) - 10);
                C(d);
                v();
                $("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) - 10)
            }
        });
        $("#" + c.controlId).find(".nextMonth").mouseup(function () {
            if ($("#" + c.controlId).find(".enabled > .tabD").length > 0) {
                var a = $("#" + c.controlId).find(".currentYear"),
                    b = $("#" + c.controlId).find(".currentMonth"),
                    d = s(Number(a.text()), Number(b.text()));
                B(d);
                if (Number(b.text()) != 12) b.text(Number(b.text()) + 1);
                else {
                    a.text(Number(a.text()) + 1);
                    b.text("1")
                }
                r()
            } else if ($("#" + c.controlId).find(".enabled > .tabM").length > 0) {
                d = z(Number($("#" + c.controlId).find(".currentYear").text()) + 1);
                B(d);
                u();
                $("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) + 1)
            } else if ($("#" + c.controlId).find(".enabled > .tabY").length > 0) {
                d = A(Number($("#" + c.controlId).find(".currentYear").text()) + 10);
                B(d);
                v();
                $("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) + 10)
            }
        });
        $("#" + c.controlId).find(".currentMonthText").mouseup(function () {
            if (!($("#" + c.controlId).find(".enabled > .tabM").length > 0)) {
                var a = z(Number($("#" + c.controlId).find(".currentYear").text()));
                E(a);
                u()
            }
        });
        $("#" + c.controlId).find(".currentYearText").mouseup(function () {
            if (!($("#" + c.controlId).find(".enabled > .tabY").length > 0)) {
                var a = A(Number($("#" + c.controlId).find(".currentYear").text()));
                E(a);
                v()
            }
        });
        n.bind("click focus",
            function () {
                if ($("#" + c.controlId + ":hidden").length != 0) {
                    $(".calendar").hide();
                    var a = $("#" + c.controlId),
                        b = F(n[0]),
                        d = b.x + Number(n.attr("clientLeft")) - 1;
                    b = b.y + Number(n.attr("clientTop")) + Number(n.attr("clientHeight")) - 1;
                    a.css({
                        top: b + "px",
                        left: d + "px"
                    });
                    d = $("#" + c.controlId).width();
                    b = $("#" + c.controlId).height();
                    a.width(0);
                    a.height(0);
                    a.show().animate({
                            width: d + "px",
                            height: b + "px"
                        },
                        c.speed);
                    a.bind("selectstart",
                        function () {
                            return false
                        }).bind("mousedown",
                        function () {
                            return false
                        });
                    $("#cal_div").append($("#divDate"));
                }
            });
        $(document).mouseup(function (a) {
            if ($(a.target).attr("id") != n.attr("id") && ($(a.target).parentsUntil("#" + c.controlId).parent().length == 0 || $(a.target).parentsUntil("#" + c.controlId).parent()[0].id != c.controlId)) $("#" + c.controlId).hide()
        })
    }
});


$("#txtBeginDate").calendar({
    controlId: "divDate",                                 // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
    speed: 200,                                           // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
    complement: true,                                     // 是否显示日期或年空白处的前后月的补充,默认：true
    readonly: true,                                       // 目标对象是否设为只读，默认：true
    upperLimit: new Date(),                               // 日期上限，默认：NaN(不限制)
    lowerLimit: new Date("2011/01/01"),                   // 日期下限，默认：NaN(不限制)
    callback: function () {

    }
});

// 期货大赛广告需求 2017-10-23
$("#ov10 iframe").attr("src", "//same.eastmoney.com/s?z=eastmoney&c=1501&op=1");


//行情数据
function hangQing() {

    //国外所有交易所的数据 写死 后续需要变动
    var qihuoData = [{"mktid":"101","mktshort":"COMEX","vcode":"QI","vname":"迷你白银","vtype":"6"},{"mktid":"101","mktshort":"COMEX","vcode":"SI","vname":"COMEX白银","vtype":"5"},{"mktid":"101","mktshort":"COMEX","vcode":"QO","vname":"迷你黄金","vtype":"2"},{"mktid":"101","mktshort":"COMEX","vcode":"GC","vname":"COMEX黄金","vtype":"1"},{"mktid":"101","mktshort":"COMEX","vcode":"HG","vname":"COMEX铜","vtype":"4"},{"mktid":"101","mktshort":"COMEX","vcode":"MGC","vname":"微型黄金","vtype":"3"},
        {"mktid":"102","mktshort":"NYMEX","vcode":"HO","vname":"NYMEX燃油","vtype":"5"},{"mktid":"102","mktshort":"NYMEX","vcode":"NG","vname":"天然气","vtype":"4"},{"mktid":"102","mktshort":"NYMEX","vcode":"PL","vname":"NYMEX铂金","vtype":"7"},{"mktid":"102","mktshort":"NYMEX","vcode":"PA","vname":"NYMEX钯金","vtype":"6"},{"mktid":"102","mktshort":"NYMEX","vcode":"CL","vname":"NYMEX原油","vtype":"1"},{"mktid":"102","mktshort":"NYMEX","vcode":"RB","vname":"NYMEX汽油","vtype":"3"},{"mktid":"102","mktshort":"NYMEX","vcode":"HR","vname":"热轧钢卷","vtype":"14"},{"mktid":"102","mktshort":"NYMEX","vcode":"QM","vname":"迷你原油","vtype":"12"},
        {"mktid":"103","mktshort":"COBOT","vcode":"US","vname":"30年美国债","vtype":"16"},{"mktid":"103","mktshort":"COBOT","vcode":"UL","vname":"超国债","vtype":"17"},{"mktid":"103","mktshort":"COBOT","vcode":"XW","vname":"迷你小麦","vtype":"10"},{"mktid":"103","mktshort":"COBOT","vcode":"EH","vname":"乙醇","vtype":"11"},{"mktid":"103","mktshort":"COBOT","vcode":"FV","vname":"5年美国债","vtype":"14"},{"mktid":"103","mktshort":"COBOT","vcode":"TY","vname":"10年美国债","vtype":"15"},{"mktid":"103","mktshort":"COBOT","vcode":"YM","vname":"小型道指","vtype":"12"},{"mktid":"103","mktshort":"COBOT","vcode":"TU","vname":"2年美国债","vtype":"13"},{"mktid":"103","mktshort":"COBOT","vcode":"ZL","vname":"豆油","vtype":"4"},{"mktid":"103","mktshort":"COBOT","vcode":"ZM","vname":"豆粕","vtype":"3"},{"mktid":"103","mktshort":"COBOT","vcode":"ZO","vname":"燕麦","vtype":"6"},{"mktid":"103","mktshort":"COBOT","vcode":"ZW","vname":"小麦","vtype":"5"},{"mktid":"103","mktshort":"COBOT","vcode":"XK","vname":"迷你大豆","vtype":"8"},{"mktid":"103","mktshort":"COBOT","vcode":"ZR","vname":"稻谷","vtype":"7"},{"mktid":"103","mktshort":"COBOT","vcode":"XC","vname":"迷你玉米","vtype":"9"},{"mktid":"103","mktshort":"COBOT","vcode":"ZC","vname":"玉米","vtype":"2"},{"mktid":"103","mktshort":"COBOT","vcode":"ZS","vname":"大豆","vtype":"1"},
        {"mktid":"104","mktshort":"SGX","vcode":"TF","vname":"20号合成胶","vtype":"3"},{"mktid":"104","mktshort":"SGX","vcode":"RT","vname":"3号烟片胶","vtype":"2"},{"mktid":"104","mktshort":"SGX","vcode":"FB","vname":"380cst燃油","vtype":"4"},{"mktid":"104","mktshort":"SGX","vcode":"CN","vname":"A50期指","vtype":"1"},
        {"mktid":"108","mktshort":"NYBOT","vcode":"SB","vname":"糖11号","vtype":"1"},{"mktid":"108","mktshort":"NYBOT","vcode":"CT","vname":"棉花","vtype":"3"},{"mktid":"108","mktshort":"NYBOT","vcode":"SF","vname":"糖16号","vtype":"2"},
        {"mktid":"109","mktshort":"LME","vcode":"LLDI","vname":"场内铅","vtype":"19"},{"mktid":"109","mktshort":"LME","vcode":"LTNI","vname":"场内锡","vtype":"18"},{"mktid":"109","mktshort":"LME","vcode":"LZNI","vname":"场内锌","vtype":"15"},{"mktid":"109","mktshort":"LME","vcode":"LCPI","vname":"场内铜","vtype":"14"},{"mktid":"109","mktshort":"LME","vcode":"LNKI","vname":"场内镍","vtype":"17"},{"mktid":"109","mktshort":"LME","vcode":"LALI","vname":"场内铝","vtype":"16"},{"mktid":"109","mktshort":"LME","vcode":"LNKT","vname":"综合镍","vtype":"11"},{"mktid":"109","mktshort":"LME","vcode":"LALT","vname":"综合铝","vtype":"10"},{"mktid":"109","mktshort":"LME","vcode":"LLDT","vname":"综合铅","vtype":"13"},{"mktid":"109","mktshort":"LME","vcode":"LTNT","vname":"综合锡","vtype":"12"},{"mktid":"109","mktshort":"LME","vcode":"LZNS","vname":"LmeS_锌","vtype":"2"},{"mktid":"109","mktshort":"LME","vcode":"LCPS","vname":"LmeS_铜","vtype":"1"},{"mktid":"109","mktshort":"LME","vcode":"LNKS","vname":"LmeS_镍","vtype":"4"},{"mktid":"109","mktshort":"LME","vcode":"LALS","vname":"LmeS_铝","vtype":"3"},{"mktid":"109","mktshort":"LME","vcode":"LDRC","vname":"伦铅现","vtype":"25"},{"mktid":"109","mktshort":"LME","vcode":"ALRC","vname":"伦铝现","vtype":"22"},{"mktid":"109","mktshort":"LME","vcode":"LLDS","vname":"LmeS_铅","vtype":"6"},{"mktid":"109","mktshort":"LME","vcode":"LTNS","vname":"LmeS_锡","vtype":"5"},{"mktid":"109","mktshort":"LME","vcode":"ZNRC","vname":"伦锌现","vtype":"21"},{"mktid":"109","mktshort":"LME","vcode":"LCPT","vname":"综合铜","vtype":"8"},{"mktid":"109","mktshort":"LME","vcode":"TNRC","vname":"伦锡现","vtype":"24"},{"mktid":"109","mktshort":"LME","vcode":"LAAS","vname":"LmeS合金","vtype":"7"},{"mktid":"109","mktshort":"LME","vcode":"NKRC","vname":"伦镍现","vtype":"23"},{"mktid":"109","mktshort":"LME","vcode":"LZNT","vname":"综合锌","vtype":"9"},{"mktid":"109","mktshort":"LME","vcode":"CPRC","vname":"伦铜现","vtype":"20"},
        {"mktid":"110","mktshort":"MDEX","vcode":"MPM","vname":"棕榈油","vtype":"1"},
        {"mktid":"111","mktshort":"TOCOM","vcode":"JKE","vname":"日煤油","vtype":"7"},{"mktid":"111","mktshort":"TOCOM","vcode":"JCO","vname":"日原油","vtype":"6"},{"mktid":"111","mktshort":"TOCOM","vcode":"JGL","vname":"日汽油","vtype":"8"},{"mktid":"111","mktshort":"TOCOM","vcode":"JRU","vname":"日橡胶","vtype":"1"},{"mktid":"111","mktshort":"TOCOM","vcode":"JAG","vname":"日白银","vtype":"3"},{"mktid":"111","mktshort":"TOCOM","vcode":"JAU","vname":"日黄金","vtype":"2"},{"mktid":"111","mktshort":"TOCOM","vcode":"JPL","vname":"日铂金","vtype":"5"},{"mktid":"111","mktshort":"TOCOM","vcode":"JPA","vname":"日钯金","vtype":"4"},
        {"mktid":"112","mktshort":"IPE","vcode":"B","vname":"布伦特原油","vtype":"2"},{"mktid":"112","mktshort":"IPE","vcode":"G","vname":"重柴油","vtype":"1"},{"mktid":"112","mktshort":"IPE","vcode":"M","vname":"天然气","vtype":"3"}
    ];

    if(stockEnity.MktNum == '') {
        for(var i=0;i<  qihuoData.length;i++)
        {
            var item=qihuoData[i];

            if(stockEnity.stockCode.toUpperCase().indexOf(item.vcode.toUpperCase()) == 0 && stockEnity.stockName.toUpperCase().indexOf(item.vname.toUpperCase()) == 0){
                stockEnity.MktNum=item.mktid;
                stockEnity.TypeUS=item.vtype;
                qihuo_mktc = stockEnity.TypeUS;
                qihuo_market = stockEnity.MktNum;
                qihuo_mktcode = stockEnity.MktNum + '_' + stockEnity.TypeUS;
                break;
            }
        }

    }


    getHeadData();
}

//期货换源
var zuoshou = '';

/**
 * get方法获取行情报价
 */
function getHeadData() {
    // var secids = stockentry.marketnum +'.' + stockentry.code;
    //正式地址：
    // var url = "http://" + (Math.floor(Math.random() * 99) + 1) +".push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" + secids;

    //测试地址：
    var url = qihuo_url + "/static/" + qihuo_market + "_" + qihuo_code + "_qt?callbackName=aa";

    $.ajax({
        url: url,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: 'aa',
        success: function (json) {
            // console.log('json');
            // console.log(json);


            if(json.qt) {
                formatHead(json.qt)
                /**
                 * 判断浏览器是否为ie7及以下
                 * 若是则不使用sse方法
                 * 改成15s自刷
                 */
                if (document.all && !document.querySelector) {
                    setInterval(function(){
                        getHeadData();
                    }, 15*1000);

                } else {

                    /**
                     * 浏览器为ie8及以上
                     * 使用sse方法
                     */
                    sseHeadData();
                }


                zuoshou = json.qt.zjsj;

                //画图
                if(json.qt.dm && json.qt.sc) {
                    stockId = json.qt.sc + '.' + json.qt.dm;

                    var imgevt = instance.bindChartImgEvent()
                    imgevt.bindEvent(stockId);
                    imgevt.changeImg("r",stockId)
                    imgevt.changeImg("k",stockId)

                }
            }

        }
    });

}

/**
 * 行情报价接入sse接口
 * 支持ie8及以上浏览器
 */
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


//head format
var headSourceData;


/**
 * 数据处理
 * @param {object} data : 数据
 */
function formatHead(data) {

    renderHead(data)
}


/**
 * 渲染头部
 * @param {object} items
 * zxj: 最新价
 * zde: 涨跌额
 * zdf: 涨跌幅
 * jkj: 今开价
 * zjs: 昨结算
 * zgj: 最高价
 * zdj：最低价
 * cjl: 成交量
 * ccl: 持仓量
 * wp:外盘
 * np:内盘
 * cc:仓差
 * rz:日增
 * zsj：昨收价
 * mcj:卖出价
 * mcl:卖出量
 * mrj:买入价
 * mrl:买入量
 * dtj：跌停价
 * cje：成交额
 * kp： 开平
 * quote_title_0：名称
 * quote_title_1： 代码
 * jzjs： 今结算价
 * zsjd：展示精度
 */
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

    //箭头颜色
    onChangeDataRender(items.zdf);

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


//箭头颜色变化
function onChangeDataRender(item) {

    if (item != 0 && item != "-") {
        if (item > 0) {
            $("#arrow-find").removeClass("down-arrow").addClass("up-arrow");

        } else {
            $("#arrow-find").removeClass("up-arrow").addClass("down-arrow");
        }
    }

    if(item == 0){
        $("#arrow-find").removeClass("up-arrow").removeClass("down-arrow");
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



//处理时间
function DealTime(val) {
    try {
        //     val = '' + val;
        //    if(val.length == 5) {
        //        val = '0' + val;
        //    }

        //    //时间精确到秒
        //    var fulltime = val.substr(0,2) + ':' + val.substr(2,2) + ':' + val.substr(4,2)
        //    return fulltime;

        var d = new Date(val * 1000);  //("0" + (d.getMonth() + 1)).slice(-2)    d.getMinutes()  d.getMinutes()  d.getSeconds()
        var jysj = ("0" + (d.getHours())).slice(-2) + ':' + ("0" + (d.getMinutes())).slice(-2) + ':' + ("0" + (d.getSeconds())).slice(-2);

        return jysj;



    } catch(e) {
        return '-'
    }

}

/**
 * 处理交易时间
 * @param {number} val :待处理的值
 * @param {string} fuhao ：拼接符号
 */
function Dealjysj(val, fuhao) {
    try {
        //     val = '' + val;
        //    if(val.length == 5) {
        //        val = '0' + val;
        //    } else if(val.length == 4) {
        //      val = '00' + val;
        //    } else if(val.length == 3) {
        //      val = '000' + val;
        //    } else if(val.length == 2) {
        //      val = '0000' + val;
        //    } else if(val.length == 2) {
        //      val = '0000' + val;
        //    } else if(val.length == 1) {
        //     val = '00000' + val;
        //    } else if(val == '0'){
        //      val = '000000';
        //    }


        //    var fulltime = val.substr(0,2) + fuhao + val.substr(2,2) + fuhao + val.substr(4,2);
        //    return fulltime;

        var d = new Date(val * 1000);  //("0" + (d.getMonth() + 1)).slice(-2)    d.getMinutes()  d.getMinutes()  d.getSeconds()
        var jysj = d.getFullYear() + fuhao + (("0" + (d.getMonth() + 1)).slice(-2)) + fuhao + (("0" + (d.getDate())).slice(-2)) + ' ' + ("0" + (d.getHours())).slice(-2) + ':' + ("0" + (d.getMinutes())).slice(-2) + ':' + ("0" + (d.getSeconds())).slice(-2);

        return jysj;

    } catch(e) {
        return '-'
    }

}


/**
 *
 * @param {number} val :值
 * @param {string} fuhao: 拼接符号
 */
function Dealjyr(val, fuhao) {
    try {
        val = '' + val;
        if(val.length == 5) {
            val = '0' + val;
        }

        var fulltime = val.substr(0,4) + fuhao + val.substr(4,2) + fuhao + val.substr(6,2);
        return fulltime;

    } catch(e) {
        return '-'
    }

}

//fenshi
getFenshi();
var fenshiJson = [];
//分时成交
function getFenshi() {
    var url = qihuo_url + "/static/"+ qihuo_market +"_" + qihuo_code + "_mx/11?callbackName=zz";

    $.ajax({
        url: url,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: 'zz',
        success: function (json) {
            // console.log('分时成交');
            // console.log(json);
            if(json.mx) {
                fenshiJson = json.mx;
                // formatFenshi(json.mx)

                renderFenshi(json.mx);

                //增加判断浏览器是否为ie7及以下
                if (document.all && !document.querySelector) {
                    setInterval(function(){
                        getFenshi();
                    }, 15*1000);

                } else {
                    getsseFenshi();
                }


            }

        }
    });

}


//分时成交sse方法
function getsseFenshi() {

    var url = fan_qihuo_url + "/sse/"+ qihuo_market +"_"+ qihuo_code +"_mx";

    var evtSource = new EventSource(url);
    evtSource.onmessage = function (json) {
        // console.log('分时成交sse');
        var obj = JSON.parse(json.data)
        // console.log(obj);

        if(obj.mx) {
            formatFenshi(obj.mx)
        }

    }

}


/**
 * 分时成交数据处理
 * @param {array} json :分时成交数据
 */
function formatFenshi(json) {
    if(json && json.length){
        fenshiJson.unshift(json[0]);
    }
    if(fenshiJson.length > 11) {
        fenshiJson.pop();
    }

    renderFenshi(fenshiJson)
}


/**
 * 渲染分时成交
 * @param {array} newjson :处理后的分时成交数据
 */
function renderFenshi(newjson) {
    if(newjson) {
        // console.log(newjson);

        var data = newjson;

        var mrj = $(".mrj").text()
        var datas = [];
        var lastcolor = '';

        var number = '';
        if(newjson.length >= 11) {
            number = 9
        }else {
            number = newjson.length-1;
        }

        if(number >= 0) {

            for (var i = number; i >=0 ; i--) {
                var lastjw = data[i+1]? data[i+1].p : '';
                var vals = data[i];

                var time =  vals.utime? DealTime(vals.utime) : '-';
                var jw = cancelZsjd(vals.p, vals.zsjd);  //价格
                var xs = vals.vol; //现量
                var zc = vals.zcl; //仓差
                var kc = transvals(xs, zc, vals.jylx);
                // console.log(jw, lastjw, kc)
                // console.log(zuojie);

                // var c = jw > lastjw ? 'red' : jw < lastjw ? 'green' : ((kc == "多开" || kc == "空平" || kc == "多换") ? 'red' : ((kc == "空开" || kc == "多平" || kc == "空换") ? 'green' : (jw >= mrj ? "red" : "green")))
                var c;
                if(kc == "多开" || kc == "空平" || kc == "多换"){
                    c = 'red'
                } else if(kc == "空开" || kc == "多平" || kc == "空换"){
                    c = 'green'
                } else if(kc == "双开" || kc == "双平") {
                    if(jw > lastjw) {
                        c = 'red';
                    } else if(jw < lastjw) {
                        c = 'green';
                    } else {
                        if(lastcolor){
                            c = lastcolor;
                        } else{
                            if(jw > zuoshou) {
                                c = 'red'
                            } else if(jw < zuoshou) {
                                c = 'green'
                            }
                        }

                    }

                }

                lastcolor = c;

                var color = common.getColor(jw - zuoshou)
                datas.push({ "time": time, "jw": jw, "xs": xs, "zc": zc, "color": color, "sellcolor": c,"kc": kc });
            }

        }



        var htm = "";

        //显示10条分时成交
        for (var i = datas.length-1; i >=0 ; i--) {
            htm += '<tr>' +
                '<td>' + datas[i].time + '</td>' +
                '<td class="' + datas[i].color + '">' + datas[i].jw + '</td>' +
                '<td class="' + datas[i].sellcolor + '">' + datas[i].xs + '</td>' +
                '</tr>'
        }


        $("#deal_table").html(htm)
    }


}


function transvals(CurrentVolume, ChangeHeldVolume, BSFlag) {
    var openVol = parseInt(CurrentVolume) + parseInt(ChangeHeldVolume)
    var closeVol = parseInt(CurrentVolume) - parseInt(ChangeHeldVolume)
    if (openVol == 0) {
        return "双平";
    } else if (closeVol == 0) {
        return "双开"
    } else if (openVol == closeVol) {
        if (BSFlag == 2) {
            return "多换"
        } else {
            return "空换"
        }
    } else if (openVol > closeVol) {
        if (BSFlag == 2) {
            return "多开"
        } else {
            return "空开"
        }
    } else {
        if (BSFlag == 2) {
            return "空平"
        } else {
            return "多平"
        }
    }
}


//沪银相关行业股票
relateStock()
function relateStock() {
    var url = qihuo_surl + "/redis?msgid="+ qihuo_mktcode +"_stock&callbackName=jqueryCallback2";

    //118市场单独处理
    if(qihuo_market == '118') {
        url = qihuo_surl + "/redis?msgid=118_0_stock&callbackName=jqueryCallback2";
    }

    $.ajax({
        url: url,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: 'jqueryCallback2',
        success: function (json) {
            // console.log('沪银相关行业股票');
            // console.log(json);

            //相关股票链接
            if (json) {
                $("#relateStock .header a").attr('href', "http://quote.eastmoney.com/center/boardlist.html#boards2-90." + json.stocknum);
                $("#relateStock .moreMsg a").attr('href', "http://quote.eastmoney.com/center/boardlist.html#boards2-90." + json.stocknum);
            }


            if(json) {
                var url = '//push2.eastmoney.com/api/qt/clist/get?pn=1&pz=10&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=b:'+ json.stocknum +'&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152'
                $.ajax({
                    url: url,
                    scriptCharset: "utf-8",
                    dataType: "jsonp",
                    jsonp: "cb",
                    success: function (json) {
                        // console.log('沪银相关行业股票--行情数据');
                        // console.log(json);

                        if(json) {
                            var tbody = $("#hyStock_table").find("tbody");
                            tbody.html('<tr><th class="">名称</th><th>最新价</th><th>涨跌幅</th></tr>');
                            var data = json.data;
                            if (data) {
                                var list = data.diff;
                                for (var i = 0, len = list.length; i < len; i++) {
                                    var row = list[i];
                                    // var fs = Math.pow(10, row.f1);

                                    var tr = $("<tr></tr>");
                                    var td1 = $("<td></td>");
                                    var td1a = $("<a target='_blank' style='width: 70px;display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'></a>").text(row.f14).attr("href", "http://quote.eastmoney.com/unify/r/" + row.f13 + "." + row.f12).attr("title", row.f14);
                                    td1.append(td1a);

                                    var td2 = $("<td></td>").text(row.f2 == '-'?  '-': (row.f2).toFixed(2));
                                    var td3 = $("<td></td>").text(row.f3 == '-'?  '-': (row.f3).toFixed(2) + "%");

                                    if (row.f3 < 0) {
                                        td2.addClass("green");
                                        td3.addClass("green");
                                    }
                                    if (row.f3 > 0) {
                                        td2.addClass("red");
                                        td3.addClass("red");
                                    }

                                    tr.append(td1).append(td2).append(td3);
                                    tbody.append(tr);
                                }

                            }



                        }

                    }
                });



            }


        }
    });



}


//交易品种
getJypz();
function getJypz() {
    var url = qihuo_surl + "/redis?msgid="+ qihuo_mktcode +"_info&callbackName=jqueryCallback";

    if(stockEnity.MktNum == 118){
        url = config.getPath('qihuo') + "redis?msgid=118_"+ stockEnity.stockCode.toLowerCase()  +"_info&callbackName=jqueryCallback";
    }

    // console.info(qihuo_mktcode)

    $.ajax({
        url: url,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: 'jqueryCallback',
        success: function (json) {
            // console.info(url)
            // console.log(json);

            if(json.vname) {
                var item = json;
                $("#contract_table .jypz").attr("title", item.vname).html(MycutString(item.vname, 15));
                $("#contract_table .jydm").html(item.vcode);
                // $("#contract_table .scdm").html();
                $("#contract_table .jysjc").html(item.market);
                if (item.market) {
                    $("#marketfullnamespan").show()
                    $("#marketfullname").html(item.market);
                }
                else{
                    $("#marketfullnamespan").hide()
                }

                $("#contract_table .jydw").html(MycutString(item.jydw, 15)).attr("title", item.jydw);
                $("#contract_table .jyrsm").html(MycutString(item.zhjyr, 15)).attr('title', item.zhjyr);
                $("#contract_table .zxbd").html('<span title="' + item.zxbddw + '">' + MycutString(item.zxbddw, 15) + '</span>');
                $("#contract_table .hyyfsm").html('<span title="' + item.hyjgyf + '">' + MycutString(item.hyjgyf, 15) + '</span>');

            }


        }
    });


}

//获取交易所和市场代码
getScdm();
function getScdm() {
    var url = qihuo_surl + '/redis?msgid=gw&callbackName=jqueryCallback22';

    $.ajax({
        url: url,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: 'jqueryCallback22',
        success: function (json) {
            // console.log(json);
            json.map(function(obj) {
                if(obj.mktid == qihuo_market) {
                    // console.log(obj);
                    if(obj && obj.mktshort) {
                        $("#contract_table .scdm").html(obj.mktshort);
                        $(".jysuo").html(obj.mktname);
                    }

                }

                //118市场单独处理
                if(qihuo_market == '118') {
                    $(".jysuo").html('上海黄金交易所').attr('href', 'http://quote.eastmoney.com/center/hjsc.html');
                }

            })


        }
    });

}


//获取国内的交易所
function getGnjys(type) {
    var url = qihuo_surl + '/redis?msgid='+type+'&callbackName=jqueryCallback'+type;

    return $.ajax({
        url: url,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: 'jqueryCallback'+type
    });

}

//国内
var Gnhtm = '';
var Gwhtm = '';
//默认展示国内标签
showGnjys();
function showGnjys() {

    if(Gnhtm == '') {
        var info = getGnjys('gnweb');
        info.then(function(json) {

            //获取交易所和市场代码
            json.map(function(obj) {

                var each = '<dd mktid="'+ obj.mktid +'">'+ obj.mktshort +'-'+ obj.mktname +'</dd>';
                Gnhtm += each;
            })

            // console.log(Gnhtm);

            $("#select1 dl").html(Gnhtm);
            $("#select1 span").html("交易所");

            $("#select2 span").html("品种");
            $("#select2 dl").html("");

            $("#select3 span").html("合约");
            $("#select3 dl").html("");
            $("#select3 span").attr("value", "");

            bingSelectExchange();

        })

    } else {

        $("#select1 dl").html(Gnhtm);
        $("#select1 span").html("交易所");

        $("#select2 span").html("品种");
        $("#select2 dl").html("");

        $("#select3 span").html("合约");
        $("#select3 dl").html("");
        $("#select3 span").attr("value", "");

        bingSelectExchange();
    }
}


//国外
// showGwjys()
function showGwjys() {
    if(Gwhtm == '') {
        var info = getGnjys('gw');
        info.then(function(json) {

            //获取交易所和市场代码
            json.map(function(obj) {

                if(obj.mktid == qihuo_market) {
                    if(obj && obj.mktshort) {
                        $("#contract_table .scdm").html(obj.mktshort);
                        $(".jysuo").html(obj.mktname);
                    }

                }

                var each = '<dd mktid="'+ obj.mktid +'">'+ obj.mktshort +'-'+ obj.mktname +'</dd>';
                if(obj.mktid !== '130' && obj.mktid !== '131' && obj.mktid !== '132' && obj.mktid !== '134' && obj.mktid !== '139') {
                    Gwhtm += each;
                }
            })


            $("#select1 dl").html(Gwhtm);
            $("#select1 span").html("交易所");
            $("#select2 span").html("品种");
            $("#select2 dl").html("");

            $("#select3 span").html("合约");
            $("#select3 dl").html("");
            $("#select3 span").attr("value", "");
            bingSelectExchange();



        })

    } else {
        // console.log('不  请求接口');
        $("#select1 dl").html(Gwhtm);
        $("#select1 span").html("交易所");
        $("#select2 span").html("品种");
        $("#select2 dl").html("");

        $("#select3 span").html("合约");
        $("#select3 dl").html("");
        $("#select3 span").attr("value", "");
        bingSelectExchange();

    }
}


function MycutString(string, num) {
    if(string && string.length >=num ) {
        return string.substr(0,num) + '...';
    } else {
        return string;
    }

}


//期货品种一览
getNewFuturesVarieties();
function getNewFuturesVarieties(callback) {

    //获取第1层数据
    $.ajax({
        url: qihuo_surl + '/redis?msgid=gnweb&callbackName=jqueryCallback_n1',
        type: "GET",
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: "jqueryCallback_n1"
    }).then(function (json) {
        // console.log('第1级数据1111....')
        // console.log(json);
        var url = qihuo_surl + "/redis?";
        json.map(function (v) {
            // console.log(v);
            $.ajax({
                type: "GET",
                url: url,
                data: {
                    msgid: v.mktid,
                    callbackName: 'jqueryCallback' + v.mktid
                },
                dataType: "jsonp",
                jsonp: "cb",
                jsonpCallback: 'jqueryCallback' + v.mktid,
                success:function name(json) {
                    // console.log(json);
                    var htm = ''
                    json.map(function (val) {
                        //去除显示中金所  暂时写死 因为地址跳转问题
                        if(val.mktid !== '8') {
                            if(val.vcode == 'RI') {
                                val.vcode = 'ER'
                            }

                            if(val.vcode == 'PM') {
                                val.vcode = 'WT'
                            }

                            var each = '<a href="http://futures.eastmoney.com/qihuo/'+ val.vcode +'.html" target="_blank">'+ val.vname +'</a>' + ' ';
                            htm += each;
                        }

                    })
                    // console.log(htm);
                    if(json[0].mktshort) {
                        var cont = json[0].mktshort;
                        $('.'+cont+'').html(htm)
                    }

                    //中金所写死
                    var zjshtml = '<a href="http://stock.eastmoney.com/gzqh.html#500" target="_blank">中证500</a> '
                        + '<a href="http://stock.eastmoney.com/gzqh.html#300" target="_blank">沪深300</a> '
                        + '<a href="http://stock.eastmoney.com/gzqh.html#50" target="_blank">上证50</a> '
                        + '<a href="http://futures.eastmoney.com/bond.html#10" target="_blank">10年期国债</a> '
                        + '<a href="http://futures.eastmoney.com/bond.html#5" target="_blank">5年期国债</a> '
                        + '<a href="http://futures.eastmoney.com/bond.html#2" target="_blank">2年期国债</a> '
                    $(".CFFEX").html(zjshtml)



                }

            });
        })

    })

        .fail(function() {
            console.log('fail.....')
        })



}


//全球指数
getQqzs()
function getQqzs() {
    //获取第1层数据
    $.ajax({
        url: '//push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&ut=bd1d9ddb04089700cf9c27f6f7426281&fields=f1,f2,f3,f12,f13,f14,f152&secids=1.000001,100.N225,100.HSI,100.DJIA,100.GDAXI',
        type: "GET",
        dataType: "jsonp",
        jsonp: "cb"
    }).then(function (json) {
        //   console.log('全球指数')
        //   console.log(json)
        if(json && json.data.diff.length > 0) {
            renderQqzs('#globalTable', json.data.diff)
        }


    })

        .fail(function() {
            console.log('fail.....')
        })



}

/**
 *
 * @param {string} selector:dom选择
 * @param {*} data ：数据
 */
function renderQqzs(selector, data) {

    var content = $(selector)
    var tbody = content.find("tbody");
    tbody.html('<tr><th class="">名称</th><th>最新价</th><th>涨跌幅</th></tr>');

    if (data) {
        // console.log(data);

        var list = data;
        for (var i = 0, len = list.length; i < len; i++) {
            var row = list[i];

            var tr = $("<tr></tr>");
            var td1 = $("<td></td>");
            var td1a = $("<a target='_blank' style='width: 70px;display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'></a>").text(row.f14).attr("href", "http://quote.eastmoney.com/unify/r/" + row.f13 + '.' + row.f12).attr("title", row.f14);
            td1.append(td1a);

            var td2 = $("<td></td>").text(row.f2 ? row.f2: '-');
            var td3 = $("<td></td>").text((row.f3).toFixed(2) + "%");

            if (row.f3 < 0) {
                td2.addClass("green");
                td3.addClass("green");
            }
            if (row.f3 > 0) {
                td2.addClass("red");
                td3.addClass("red");
            }

            tr.append(td1).append(td2).append(td3);
            tbody.append(tr);
        }

    }

}


//其他合约
getQtzlhy()
function getQtzlhy() {
    var url = qihuo_url + "/list/variety/"+ qihuo_market +"/" + qihuo_mktc + "?orderBy=zdf&sort=desc&pageSize=12&pageIndex=0&callbackName=hh";

    $.ajax({
        url: url,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: 'hh',
        success: function (json) {
            // console.log('其他合约');
            // console.log(json);

            //118单独处理
            if(json && qihuo_market!== '118') {
                $("#qtzlhy .header a").attr('href', 'http://quote.eastmoney.com/center/gridlist2.html#futures_' + qihuo_market);
            } else if(json && qihuo_market == '118') {
                $("#qtzlhy .header a").attr('href', 'http://quote.eastmoney.com/center/gridlist.html#gold_sh_spotgoods');
            }


            if(json && json.list) {
                renderQthybj('#sameExchange_table', json)
            }


        }
    });

}


//渲染期货列表
function renderQthybj(selector, data) {

    var content = $(selector)
    var tbody = content.find("tbody");
    tbody.html('<tr><th class="">名称</th><th>最新价</th><th>涨跌幅</th></tr>');

    if (data) {

        var list = data.list;
        for (var i = 0, len = list.length; i < len; i++) {
            var row = list[i];
            // var fs = Math.pow(10, row.f1);

            var tr = $("<tr></tr>");
            var td1 = $("<td></td>");

            //去除本身  不显示在表格里面
            if(row.dm !== stockEnity.stockCode) {
                var td1a = $("<a target='_blank' style='width: 70px;display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'></a>").text(row.name).attr("href", "http://quote.eastmoney.com/unify/r/" + row.sc + '.' + row.dm).attr("title", row.name);
                td1.append(td1a);



                var td2 = $("<td></td>").text(row.p !=='-' ? cancelZsjd(row.p, row.zsjd): '-');
                var td3 = $("<td></td>").text(row.zdf !== '-'? (row.zdf).toFixed(2) + "%" : '-');

                if (row.zdf < 0) {
                    td2.addClass("green");
                    td3.addClass("green");
                }
                if (row.zdf > 0) {
                    td2.addClass("red");
                    td3.addClass("red");
                }

                tr.append(td1).append(td2).append(td3);
                tbody.append(tr);

            }


        }

    }

}



//国内期货合约报价
Gnqhhybj()
function Gnqhhybj() {
    var url = qihuo_url + '/list/main/113,114,115,142,8?orderBy=zdf&sort=desc&pageSize=12&pageIndex=0&callbackName=h8';

    $.ajax({
        url: url,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "cb",
        jsonpCallback: 'h8',
        success: function (json) {
            // console.log('国内期货合约报价');
            // console.log(json);

            if(json && json.list) {
                renderQthybj('#Future_table', json)
            }


        }
    });

}



setInterval(function () {
    Gnqhhybj()
    getQtzlhy()
    getQqzs()
    relateStock()
    getJypz();

}, 20 * 1000);










// });


