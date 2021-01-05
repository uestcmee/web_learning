/*#文件名称:metinfo.js #米拓企业建站系统 #Copyright (C) 长沙米拓信息技术有限公司 (http://www.metinfo.cn). All rights reserved.*/
/*!
 * M['weburl']      网站网址
 * M['lang']        网站语言
 * M['tem']         模板目录路径
 * M['classnow']    当前栏目ID
 * M['id']          当前页面ID
 * M['module']      当前页面所属模块
 * met_prevarrow,
   met_nextarrow    slick插件翻页按钮自定义html
 * M['device_type'] 客户端判断（d：PC端，t：平板端，m：手机端）
 */
$(function(){
    /*导航处理*/
   var aLink=$(".met-nav").find('.dropdown a.nav-link');
   if(M.device_type!='d') aLink.removeAttr('data-hover');
    aLink.click(function(){
        if((M.device_type=='d'||Breakpoints.is('lg')||Breakpoints.is('xlg')) && $(this).attr("data-hover")){
            if($(this).attr('target')=='_blank'){
                window.open($(this).attr('href'));
            }else{
                location=$(this).attr('href');
            }
        }
    });
$('.met-nav .navlist .nav-item').mouseover(function(event) {
        $(this).siblings('.nav-item').removeClass('open');
    });
    var nav_li=$(".navlist .dropdown");
    $.fn.hoverDelay = function(options){
        var defaults = {
            // 鼠标经过的延时时间
            hoverDuring: 200,
            // 鼠标移出的延时时间
            outDuring: 0,
            // 鼠标经过执行的方法
            hoverEvent: function(){
                // 设置为空函数，绑定的时候由使用者定义
                $.noop();
            },
            // 鼠标移出执行的方法
            outEvent: function(){
                $.noop();
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer;
        return $(this).each(function(){
            // 保存当前上下文的this对象
            var $this = $(this)
            $this.hover(function(){
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function () {
                    // 调用替换
                    sets.hoverEvent.apply($this);
                }, sets.hoverDuring);
            }, function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function () {
                    sets.outEvent.apply($this);
                }, sets.outDuring);
            });
        });
    };
    // 具体使用，给id为“#test”的元素添加hoverEvent事件
    nav_li.hoverDelay({
        // 自定义，outEvent同
        hoverEvent: function(){
           $(this).addClass('open');
        },
                outEvent: function(){
                   $(this).removeClass('open');
                }
    });

    // 导航下拉菜单三级栏目展开处理
    $met_navlist=$('.met-nav .navlist');
    if(M['device_type']=='d'){
        if($met_navlist.find('.dropdown-submenu').length){
            $met_navlist.find('.dropdown-submenu').hover(function(){
                $(this).parent('.dropdown-menu').addClass('overflow-visible');
            },function(){
                $(this).parent('.dropdown-menu').removeClass('overflow-visible');
            });
        }
    }else{
        if($met_navlist.find('.dropdown-submenu').length){
            setTimeout(function(){
                $met_navlist.find('.dropdown-submenu .dropdown-menu').addClass('block box-shadow-none').prev('.dropdown-item').addClass('dropdown-a');
            },0)
        }
    }
    /*banner只有一张的时候*/
    var bannerlen=$("#exampleCarouselDefault").find('.carousel-item').length;
    if(bannerlen<=1){
        $(".carousel-control").hide();
        $(".carousel-indicators").hide();
    }
    /*banner 自定义高度*/
    var img = $(".met-banner").find('img').eq(0);
    function imgh(){
        img.imageloadFun(function() {
            Breakpoints.on('md lg', {
                enter: function() {
                     $(".carousel-item").each(function(){
                        var ph=$(this).find('img').attr('pch');//pc端
                        if(ph!=0){
                            $(this).find('img').height(ph);
                        }
                    });
                }
            })
            Breakpoints.on('sm', {
                enter: function() {
                     $(".carousel-item").each(function(){
                        var ah=$(this).find('img').attr('adh');//平板
                        if(ah!=0){
                            $(this).find('img').height(ah);
                        }
                    });
                }
            })
            Breakpoints.on('xs', {
                enter: function() {
                     $(".carousel-item").each(function(){
                        var ih=$(this).find('img').attr('iph');//手机端
                        if(ih!=0){
                            $(this).find('img').height(ih);
                        }
                    });
                }
            })
        })
    }
    imgh();
    $(window).resize(function() {
        imgh();
    });
    // banner新增设置
    var btns=$(".met-banner .slick-btn");
    if(btns.length){
        btns.each(function(){
            var set=$(this).attr("infoset"),
            arr=set.split("|");
            fontsize=arr[0]!=0?arr[0]:16,
            btn_txt_color=arr[1],
            hbtn_txt_color=arr[2],
            but_bg_color=arr[3],
            hbut_bg_color=arr[4],
            but_x=arr[5]!=0?arr[5]:"auto",
            but_y=arr[6]!=0?arr[6]:"auto",
            $(this).css({
                "font-size":fontsize+'px',
                "color":btn_txt_color,
                "background-color":but_bg_color,
                "width":but_x,
                "height":but_y
            });
        });
        btns.hover(function(){
            var set=$(this).attr("infoset"),
            arr=set.split("|");
            hbtn_txt_color=arr[2],
            hbut_bg_color=arr[4];
            $(this).css({
                "color":hbtn_txt_color,
                "background-color":hbut_bg_color
            });
        },function(){
            var set=$(this).attr("infoset"),
            arr=set.split("|");
            btn_txt_color=arr[1],
            but_bg_color=arr[3];
            $(this).css({
                "color":btn_txt_color,
                "background-color":but_bg_color
            });
        });
    }
    //简体繁体互换
     var b=$('.btn-cntotc');
        b.on('click', function(event) {
             var lang=$(this).attr('data-tolang');
  
         if (lang=='tc') {
            $('body').s2t();
            $(this).attr('data-tolang', 'cn');
            $(this).text('简体');
         } else if(lang=='cn') {
            $('body').t2s();
            $(this).attr('data-tolang', 'tc');
            $(this).text('繁體');
         }
      });
    // 底部微信
    if($('#met-weixin').length){
        var $met_weixin=$('#met-weixin');
        Breakpoints.on('xs',{
            enter:function(){
                if($met_weixin.offset().left < 80) $met_weixin.attr({'data-placement':'right'});
                if($(window).width()-$met_weixin.offset().left-$met_weixin.outerWidth() < 80) $met_weixin.attr({'data-placement':'left'});
            }
        })
        if($met_weixin.data('trigger')=='click'){
            $met_weixin.mouseup(function(){
                $(this).click();
            });
        }
    }
    // 底部导航手机端处理
    if($('.met-footnav .mob-masonry .masonry-item').length){
        Breakpoints.get('xs').on({
            enter:function(){
                $('.met-footnav .mob-masonry').masonry({itemSelector:".masonry-item"});
            }
        });
    }
    // 底部菜单处理
    var $foot_menu=$(".met-menu-list");
    if($foot_menu.length){
        var h_m=$foot_menu.height();
        $(window).resize(function(){
            pd();
        })
        function pd(){
            if($foot_menu.hasClass('iskeshi') || $(window).width()<768){
                    $(".met-foot-info").css("padding-bottom",h_m);
                    $(".shop-product-intro .cart-favorite").css("bottom",h_m);
                }
        }
        pd();
    }
    var $foot_menu_list=$foot_menu.find(".item");
    $foot_menu_list.each(function(){
            var href=$(this).attr("href");
            if(href.indexOf("http://wpa.qq.com/")>=0){
                var patt1 = /uin=\d+&/;
                var qq=href.match(patt1);
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
                         $(this).attr("href","mqqwpa://im/chat?chat_type=wpa&"+qq[0]+"version=1&src_type=web&web_src=oicqzone.com");
                    }
            }
        });
    //产品列表
    var $met_indexpro=$('.met-index-product'),
        $met_indexpro_navtabs=$met_indexpro.find(".nav-tabs");
    if($met_indexpro_navtabs.length){
        // if( M['device_type']=="m"){
        // $met_indexpro_navtabs.navtabSwiper();// 选项卡水平滚动
        // }
        if($('.index-product-list').length>1){
            $('.index-product-list li [data-original]').lazyload({event:'sporty'});
            $met_indexpro_navtabs.find('li a').click(function() {
                $($(this).attr('href')+' li [data-original]').trigger('sporty');
            });
        }
    }

     // 文章区块
    var $met_inde_news=$('.met-index-news'),
       $met_index_news_main=$met_inde_news.find(".nav-tabs");
    if($met_index_news_main.length){
        $met_index_news_main.navtabSwiper();// 选项卡水平滚动
        if($('.index-news-list').length>1){
            $('.index-news-list li [data-original]').lazyload({event:'sporty'});
            $met_index_news_main.find('li a').click(function() {
                $($(this).attr('href')+' li [data-original]').trigger('sporty');
            });
        }
    }
    //tab选项卡切换
$(".met-index-news .nav-tabs").navtabSwiper();// 选项卡水平滚动
    // 简介区块时间轴
    var $met_index_about_main=$('.met-index-about').find(".main");
    if($met_index_about_main.length){
        $met_index_about_main.navtabSwiper();// 选项卡水平滚动
    }
    // 新闻列表侧边栏
    var $list = $('.met-news').find('.imgbox');
        if ($list.length) {
            $list.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
                dots: true,
                autoplay:true,
                autoplaySpeed:2000,
            })
        }

    // 图片区块
    var $met_indexcase=$('.met-index-case').find(".met-index-list");
    var index_case_column_xs=$met_indexcase.data('index_case_column_xs');
    var index_case_column_md=$met_indexcase.data('index_case_column_md');
    var index_case_column_lg=$met_indexcase.data('index_case_column_lg');
    var index_case_column_xxl=$met_indexcase.data('index_case_column_xxl');
    new Swiper('.met-index-case .swiper-container',{
    slidesPerView: index_case_column_xxl,//一行显示个数
    slidesPerColumn: 2,//显示2行
    pagination: '.swiper-pagination',
    paginationClickable:true,
    breakpoints: {
      1600: {
      slidesPerView: index_case_column_lg,
     },
     992: {
      slidesPerView: index_case_column_md,
     },
    //当宽度小于等于767
     767: {
      slidesPerView: index_case_column_xs,
     },
  }

  });
});