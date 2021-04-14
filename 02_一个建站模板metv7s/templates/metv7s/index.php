<?php defined('IN_MET') or exit('No permission'); ?>
<include file="head.php" />
<main>
<!-- 产品区块 -->
<div class="met-index-product met-index-body text-xs-center" m-id="met_index_product">
    <div class="container">
        <if value="$lang['index_product_title']">
        <h2 class="m-t-0 " data-plugin="appear" data-animate="slide-top" data-repeat="false">{$lang.index_product_title}</h2>
        </if>
        <if value="$lang['index_product_desc']">
        <p class="desc m-b-0" data-plugin="appear" data-animate="fade" data-repeat="false">{$lang.index_product_desc}</p>
        </if>

        <div  class=' col-lg-3 col-md-3  nav-tabs-horizontal nav-tabs-inverse nav-tabs-animate' data-plugin="tabs" >
        <button type="button" class="btn btn-primary" data-toggle="collapse" 
        data-target="#demo" >
        <i class="icon wb-chevron-down m-r-5" aria-hidden="true"></i>
        </button>
            <ul id="demo" class="nav collapse nav-tabs nav-tabs-solid flex flex-center">
                <li class="nav-item  " role="presentation">
                    <tag action="category" type="current" cid="$lang['index_product_id']">
                    <if value='$lang[index_product_style_type]'>
                        <a class="nav-link product-list-all active radius0" data-toggle="tab" href="#all{$m.id}" aria-controls="all{$m.id}" role="tab" aria-expanded="true">
                            <h3 class='font-weight-500'>{$lang.index_product_all}</h3>
                        </a>
                    <else/>
                        <a class="nav-link product-list-all active radius0" href="{$m.url}" title="{$m.name}">
                            <h3 class='font-weight-500'>{$lang.index_product_all}</h3>
                        </a>
                    </if>
                    </tag>
                </li>
                <tag action="category" cid="$lang['index_product_id']" type="son">
                <li class='nav-item product-li ' role="presentation">
                    <a class="nav-link  radius0" <if value='$lang[index_product_style_type]'>href="#list_{$m.id}" data-toggle="tab" aria-controls="list_{$m.id}" role="tab" aria-expanded="true"<else/>href="{$m.url}"</if>  title="{$m.name}">
                        <h3 class='font-weight-400 '>{$m.name}</h3>
                    </a>
                </li>
                </tag>
            </ul>
        </div>
        <div class="tab-content col-lg-9 col-md-9 col-xs-12 right pull-md-right">
            <tag action="category" cid="$lang['index_product_id']" type="current">
            <ul class=" 
                <if value="$lang['index_product_column_xs'] eq 1">
                blocks-100
                <else/>
                blocks-xs-{$lang.index_product_column_xs}
                </if>
                blocks-md-{$lang.index_product_column_md} blocks-lg-{$lang.index_product_column_lg} blocks-xxl-{$lang.index_product_column_xxl} imagesize index-product-list clearfix tab-pane animation-scale-up active" id="all{$m.id}" data-scale='{$lang.index_product_img_h}X{$lang.index_product_img_w}'>
                <tag action="list" cid="$lang['index_product_id']" num="$lang['index_product_allnum']" type="$lang['index_product_type']">
                <li class=''>
                    <div class="card card-shadow">
                        <figure class="card-header cover">
                            <a href="{$v.url}" title="{$v.title}" class="block" target="{$lang.met_listurlblank}">
                                <img class="cover-image lazy" data-original="{$v.imgurl|thumb:$lang[index_product_img_w],$lang[index_product_img_h]}" alt="{$v.title}" >
                            </a>
                        </figure>
                        <a href="{$v.url}" title="{$v.title}" class="block txt-info" target="{$lang.met_listurlblank}">
                            <h4 class="card-title m-0 p-x-10 text-shadow-none text-truncate">
                            {$v._title}
                            </h4>
                            <if value="$v['description']">
                            <p class="m-b-0 text-truncate">{$v.description}</p>
                            </if>
                            <if value="$c['shopv2_open']">
                            <p class='m-b-0 m-t-5 red-600'>{$v.price_str}</p>
                            </if>
                        </a>
                    </div>
                </li>
                </tag>
            </ul>
            </tag>
            <if value="$lang[index_product_style_type]">
            <tag action="category" cid="$lang['index_product_id']" type="son">
            <ul class="
                <if value="$lang['column_xs'] eq 1">
                block-xs-100
                <else/>
                blocks-xs-{$lang.index_product_column_xs}
                </if>
                blocks-md-{$lang.index_product_column_md} blocks-lg-{$lang.index_product_column_lg} blocks-xxl-{$lang.index_product_column_xxl} no-space imagesize index-product-list tab-pane animation-scale-up"  id="list_{$m.id}"  role="tabpanel">
                <tag action="list" cid="$m['id']" num="$lang['index_product_allnum']" type="$lang['index_product_type']">
                <li class='p-r-10 m-b-10' data-type="list_{$v.class2}">
                    <div class="card card-shadow">
                        <figure class="card-header cover">
                            <a href="{$v.url}" title="{$v.title}" {$g.urlnew}>
                            <img class="cover-image lazy" data-original="{$v.imgurl|thumb:$lang[index_product_img_w],$lang[index_product_img_h]}" alt="{$v.title}" ></a>
                        </figure>
                        <h4 class="card-title m-0 p-x-10 text-shadow-none font-szie-16 font-weight-300">
                        <a href="{$v.url}" title="{$v.title}" class="block text-truncate" {$g.urlnew}><if value="$v['_title']">{$v._title}<else/>{$v.title}</if></a>
                        <tag action="category" type="current" cid="$lang['index_product_id']">
                        <if value="$m[module] eq 3">
                        <p class='m-b-0 m-t-5 red-600'>{$v.price_str}</p>
                        </if>
                         <if value="$v['description']">
                            <p class="m-b-0 text-truncate">{$v.description}</p>
                        </if>
                        </tag>
                        </h4>
                    </div>
                </li>
                </tag>
            </ul>
            </tag>
            </if>
        </div>
        
    </div>
</div>
<!-- 简介区块 -->
<div class="met-index-about met-index-body text-xs-center" m-id="met_index_about" m-type="nocontent">
    <if value="$lang['home_about_title']">
    <h2 class="m-t-0" data-plugin="appear" data-animate="slide-top" data-repeat="false">{$lang.home_about_title}</h2>
    </if>
    <if value="$lang['home_about_desc']">
    <p class="desc m-b-0 font-weight-300" data-plugin="appear" data-animate="fade" data-repeat="false">{$lang.home_about_desc}</p>
    </if>
    <div class="row">
        <div class="text met-editor">
            {$lang.home_about_content}
        </div>
    </div>
    <if value="$lang['homet_about_ok']">

    <if value="$lang['home_about_ctitle']">
                <h3 class="cctitle">{$lang.home_about_ctitle}</h3>
                <div class="cline"></div>
                </if>
    <div class="course">
        <div class="bottomxian"></div>

        <div class="container">
            <ul class="main m-b-0">
                <li class="list fl dis   arrow   in">
                    <div class="left"><i class="icon pe-angle-left" ></i></div>
                </li>
              <if value="$lang['homet_about_ctitle']">
                <li class="list fl dis <if value='$v[com_ok]'>in<else/>noin</if> ">
                    <div class="fz12">{$lang.homet_about_ctitle}</div>
                    <div class="dian dis"></div>
                    <div class="fz14">
                        {$lang.homet_about_description|met_substr:0,$lang['home_about_long']}
                    </div>
                </li>
                </if>
                <if value="$lang['homet_about_ctitle2']">
                <li class="list fl dis <if value='$v[com_ok]'>in<else/>noin</if> ">
                <div class="fz12">{$lang.homet_about_ctitle2}</div>
                    <div class="dian dis"></div>
                    <div class="fz14">
                        {$lang.homet_about_description2|met_substr:0,$lang['home_about_long']}
                    </div>
                </li>
                </if>
                <if value="$lang['homet_about_ctitle3']">
                <li class="list fl dis <if value='$v[com_ok]'>in<else/>noin</if> ">
                     <div class="fz12">{$lang.homet_about_ctitle3}</div>
                    <div class="dian dis"></div>
                    <div class="fz14">
                        {$lang.homet_about_description3|met_substr:0,$lang['home_about_long']}
                    </div>
                </li>
                </if>
                <if value="$lang['homet_about_ctitle4']">
                <li class="list fl dis <if value='$v[com_ok]'>in<else/>noin</if> ">
                    <div class="fz12">{$lang.homet_about_ctitle4}</div>
                    <div class="dian dis"></div>
                     <div class="fz14">
                        {$lang.homet_about_description4|met_substr:0,$lang['home_about_long']}
                    </div>
                </li>
                </if>
                <if value="$lang['homet_about_ctitle5']">
                <li class="list fl dis <if value='$v[com_ok]'>in<else/>noin</if> ">
                  <div class="fz12">{$lang.homet_about_ctitle5}</div>
                    <div class="dian dis"></div>
                      <div class="fz14">
                        {$lang.homet_about_description5|met_substr:0,$lang['home_about_long']}
                    </div>
                </li>
                </if>
                <if value="$lang['homet_about_ctitle6']">
                <li class="list fl dis <if value='$v[com_ok]'>in<else/>noin</if> ">
                    <div class="fz12">{$lang.homet_about_ctitle6}</div>
                    <div class="dian dis"></div>
                    <div class="fz14">
                        {$lang.homet_about_description6|met_substr:0,$lang['home_about_long']}
                    </div>
                </li>
                </if>
                <if value="$lang['homet_about_ctitle7']">
                <li class="list fl dis <if value='$v[com_ok]'>in<else/>noin</if> ">
                <div class="fz12">{$lang.homet_about_ctitle7}</div>
                    <div class="dian dis"></div>
                    <div class="fz14">
                        {$lang.homet_about_description7|met_substr:0,$lang['home_about_long']}
                    </div>
                </li>
                </if>
                <if value="$lang['homet_about_ctitle8']">
                <li class="list fl dis <if value='$v[com_ok]'>in<else/>noin</if> ">
                <div class="fz12">{$lang.homet_about_ctitle8}</div>
                    <div class="dian dis"></div>
                     <div class="fz14">
                        {$lang.homet_about_description8|met_substr:0,$lang['home_about_long']}
                    </div>
                </li>
                </if>
                <li class="list fl dis arrow    in">
                    <div class="right"><i class="icon pe-angle-right" ></i></div>
                </li>
            </ul>
        </div>

    </div>
    </if>
</div>
<!-- 落地页区块 -->
<if value="$lang['tagshow_1'] || $_M['form']['pageset'] eq 1">
<div class="met_index_landingpage met-index-body text-xs-center" m-id="met_index_landingpage" m-type="nocontent" >
    <div class="container">
        <if value="$lang['home_landingpage_title']">
        <h2 class="m-t-0 invisible" data-plugin="appear" data-animate="slide-top" data-repeat="false">{$lang.home_landingpage_title}</h2>
        </if>
        <if value="$lang['home_landingpage_desc']">
        <p class="desc m-b-0 font-weight-300 invisible" data-plugin="appear" data-animate="fade" data-repeat="false">{$lang.home_landingpage_desc}</p>
        </if>
        <div class="row">
            <div class="text met-editor">
                {$lang.home_landingpage_content}
            </div>
        </div>
    </div>
</div>
</if>
<!-- 文章区块 -->
<div class="met-index-news met-index-body text-xs-center" m-id="met_index_news">
    <div class="container">
        <if value="$lang['index_news_title']">
        <h2 class="m-t-0 " data-plugin="appear" data-animate="slide-top" data-repeat="false">{$lang.index_news_title}</h2>
        </if>
        <if value="$lang['index_news_desc']">
        <p class="desc m-b-0 font-weight-300 " data-plugin="appear" data-animate="fade" data-repeat="false">{$lang.index_news_desc}</p>
        </if>
        <div class="met-case-list clearfix">


        <div class="col-lg-8 col-md-8  news-list-right invisible"  data-plugin="appear" data-animate="slide-right50" data-repeat="false">
        <ul class="nav nav-tabs nav-tabs-solid col-xs-12">
                <tag action="category" cid="$lang['home_news_right_id']" type="son">
                <li class='nav-item' role="presentation">
                    <a class="nav-link <if value='$m[_index] eq 0'>active</if> radius0" href="#listss_{$m.id}" data-toggle="tab" title="{$m.name}">
                      <h3 class="title ">{$m.name}</h3>
                    </a>
                </li>
                </tag>
            </ul>
                <div class="tab-content">
                            <tag action="category" type="son" cid="$lang['home_news_right_id']">
                            <div class=" tab-pane animation-scale-up  <if value='$m[_index] eq 0'>active</if>"  id="listss_{$m.id}"  role="tabpanel">
                                    <tag action="list" type="all" cid="$m['id']" num="$lang['home_news_right_num']">
                                    <li class=''>
                                    <if value="$v['_index'] lt 1">
                                        <a href="{$v.url}" title="{$v.title}" {$v.urlnew} class="transition list-item clearfix">
                                            <div class="full-img list-img col-lg-5">
                                                <img class="transition" src="{$v.imgurl|thumb:$lang['home_product_right_w'],$lang['home_product_right_h']}" alt="{$v.title}" />
                                            </div>
                                            <div class="list-detail col-lg-7">
                                                <h4 class="transition list-title">
                                                    <span class="time-text float-right">{$v.updatetime}</span>
                                                    <p><if value="$v['_title']">{$v._title}<else/>{$v.title}</if></p>
                                                </h4>
                                                <p class="list-msg">{$v.description|met_substr:0,$lang['home_news_desc_num']}</p>
                                            </div>
                                        </a>
                                        <div class="line"></div>
                                        <else/>
                                        <div class="list-detail">
                                                <h4 class="transition list-title">
                                                    <span class="time-text float-right">{$v.updatetime}</span>
                                                    <p><if value="$v['_title']">{$v._title}<else/>{$v.title}</if></p>
                                                </h4>
                                                <p class="list-msg text-xs-left">{$v.description|met_substr:0,$lang['home_news_desc_num']}</p>
                                            </div>
                                        </if>
                                        </li>
                                    </tag>
                                 </div>
                            </tag>
                </div>
            </div>
            <ul class="ulstyle met-headline-case col-lg-4 col-md-4" data-plugin="appear" data-animate="slide-left10" data-repeat="false">
              <tag action="category" type="current" cid="$lang['home_news_id']" >
              <h4 class="newstitle">{$m.name}</h4>
             </tag>
             <div class="bgright">
                <tag action="list" cid="$lang['home_news_id']" num="$lang['home_news_num']" type="$lang['home_news_type']">
                <if value="$v['_first']">
                <li>
                    <div class="headline-case-title">
                        <h4 class="m-0"><a href="{$v.url}" title="{$v.title}" class="transition" {$g.urlnew}><if value="$v['_title']">{$v._title}<else/>{$v.title}</if></a></h4>
                        <p class="desc">{$v.description|met_substr:0,$lang['home_news_img_maxnum']}...</p>
                    </div>
                </li>
                <else/>
                <li class="headline-case-title">
                    <h4 class="m-0"><a href="{$v.url}" title="{$v.title}" class="transition" {$g.urlnew}><if value="$v['_title']">{$v._title}<else/>{$v.title}</if></a></h4>
                    <p class="desc">{$v.description|met_substr:0,$lang['home_news_img_maxnum']}...</p>
                </li>
                </if>
                </tag>
                 </div>
            </ul>
        </div>
    </div>
</div>
<!-- 图片区块 -->
<div class="met-index-case met-index-body text-xs-center" m-id="met_index_case">
    <div class="container">
        <if value="$lang['home_case_title']">
        <h2 class="m-t-0 " data-plugin="appear" data-animate="slide-top" data-repeat="false">{$lang.home_case_title}</h2>
        </if>
        <if value="$lang['home_case_desc']">
        <p class="desc m-b-0 font-weight-300" data-plugin="appear" data-animate="fade" data-repeat="false">{$lang.home_case_desc}</p>
        </if>
        <div class="swiper-container" data-plugin="appear">
            <ul class="ulstyle
                <if value="$lang['column_xs'] eq 1">
                block-xs-100
                <else/>
                blocks-xs-{$lang.index_case_column_xs}
                </if>
                blocks-md-{$lang.index_case_column_md} blocks-lg-{$lang.index_case_column_lg} blocks-xxl-{$lang.index_case_column_xxl} no-space imagesize tab-pane met-index-list swiper-wrapper animation-scale-up"  id="list_{$m.id}" role="tabpanel" data-index_case_column_xs="{$lang.index_case_column_xs}" data-index_case_column_md="{$lang.index_case_column_md}"
                data-index_case_column_lg="{$lang.index_case_column_lg}"
                data-index_case_column_xxl="{$lang.index_case_column_xxl}"
                >
                <tag action="list" cid="$lang['home_case_id']" num="$lang['home_case_num']" type="$lang['home_case_type']">
                <li class="case-list swiper-slide">
                    <if value="$lang['home_case_linkok']">
                    <a href="{$v.url}" title="{$v.title}" target="{$lang.met_listurlblank}">
                        </if>
                        <img src="{$v.imgurl|thumb:$lang[home_case_imgw],$lang[home_case_imgh]}" alt="{$v.title}" style="max-width: 100%; max-height: 100%; width:100%; " />
                        <if value="$lang['home_case_linkok']">
                    </a>
                    </if>
                </li>
                </tag>
            </ul>
            <div class="swiper-pagination m-t-5"></div>
        </div>
    </div>
</div>
</main>
<include file="foot.php" />