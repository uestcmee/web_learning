<met_meta page="$met_page" />
<if value="$lang['navfixed_ok']">
<body class="met-navfixed">
</if>
<if value="$lang['navfixed_ok']">
<header class='met-head navbar-fixed-top'  m-id='met_head' m-type="head_nav">
<else/>
<header class='met-head' m-id='met_head' m-type='head_nav'>
</if>
    <nav class="navbar navbar-default box-shadow-none met-nav">
        <div class="nav-top">
        <div class="container">
            <div class="row">
            <div class="clearfix">
                <if value="$data[classnow] eq 10001">
                    <h1 hidden>{$c.met_webname}</h1>
                    <else/>
                    <h3 hidden>{$c.met_webname}</h3>
                </if>
                <if value="($data[classnow] neq 10001&&!$data[id])||$data[module] eq 1">
                    <h1 hidden>{$data.name}</h1>
                    <if value="$data[classtype] neq 1">
                        <tag action="category" type="current" cid="$data['class1']">
                            <h2 hidden>{$m.name}</h2>
                        </tag>
                    </if>
                    <else/>
                    <if value="!$data[id]&&$data[classnow] neq 10001">
                        <h1 hidden>{$data.name}</h1>
                    </if>
                </if>
                <!-- logo -->
                <div class="navbar-header pull-xs-left">
                    <a href="{$c.index_url}" class="met-logo vertical-align block pull-xs-left" title="{$c.met_webname}">
                        <div class="vertical-align-middle">
                            <img src="{$c.met_logo}" alt="{$c.met_logo_keyword}" class="hidden-sm-down">
                            <img src="{$c.met_mobile_logo}" alt="{$c.met_logo_keyword}" class="hidden-md-up">
                            </div>
                    </a>
                </div>
                <!-- logo -->
                <button type="button" class="navbar-toggler hamburger hamburger-close collapsed p-x-5 met-nav-toggler" data-target="#met-nav-collapse" data-toggle="collapse">
                    <span class="sr-only"></span>
                    <span class="hamburger-bar"></span>
                </button>
                <!-- 会员注册登录 -->
                <if value="$c[met_member_register]&&$lang[member]">
                <button type="button" class="navbar-toggler collapsed m-0 p-x-5 met-head-user-toggler" data-target="#met-head-user-collapse" data-toggle="collapse"> <i class="icon wb-user-circle" aria-hidden="true"></i> <i class="icon wb-user" aria-hidden="true"></i>
                </button>
                <div class="collapse navbar-collapse navbar-collapse-toolbar pull-md-right p-0" id='met-head-user-collapse' m-id='member' m-type='member'>
                <if value="$user">
                    <if value="$c['shopv2_open']">
                        <ul class="navbar-nav vertical-align p-l-0 m-b-0 met-head-user met-head-shop" m-id="member" m-type="member">
                            <li class="dropdown inline-block text-md-center vertical-align-middle animation-slide-top">
                                <a
                                    href="javascript:;"
                                    class="navbar-avatar dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                <span class="avatar m-r-5"><img src="{$user.head}" alt="{$user.username}"/></span>
                                    {$user.username}
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-right animate" role="menu">
                                    <list data="$_M['html']['app_sidebar']" name="$v">
                                    <?php
                                    $v['active']=$c['own_active'][$v['no'].'_'.$v['own_order']];
                                    $v['target']=$v['target']?' target="_blank"':'';
                                    ?>
                                    <li role="presentation">
                                        <a href="{$v.url}" class="dropdown-item" {$v.target}><i class="icon wb-settings" aria-hidden="true"></i> {$v.title}</a>
                                    </li>
                                    </list>
                                     <tag action="app_column" name="$v">
                                     <li role="presentation">
                                        <a href="{$v.url}" class="dropdown-item" {$v.target}><i class="icon wb-settings" aria-hidden="true"></i> {$v.title}</a>
                                    </li>
                                    </tag>
                                    <li role="presentation">
                                        <a href="{$url.shop_member_login_out}" class="dropdown-item" role="menuitem"><i class="icon wb-power" aria-hidden="true"></i> {$word.app_shop_out}</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown inline-block shop_cart text-md-center vertical-align-middle animation-slide-top">
                                <a
                                    href="javascript:void(0)"
                                    title="{$word.app_shop_cart}"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                    data-animation="slide-bottom10"
                                    role="button"
                                >
                                    <i class="icon wb-shopping-cart" aria-hidden="true"></i>
                                    {$word.app_shop_cart}
                                    <span class="badge badge-danger up hide topcart-goodnum"></span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-right dropdown-menu-media topcartremove animation-slide-bottom10" role="menu">
                                    <li class="dropdown-menu-header">
                                        <h5>{$word.app_shop_cart}</h5>
                                        <span class="label label-round label-danger">{$word.app_shop_intotal} <span class="topcart-goodnum"></span> {$word.app_shop_piece}{$word.app_shop_commodity}</span>
                                    </li>
                                    <li class="list-group dropdown-scrollable" role="presentation">
                                        <div data-role="container">
                                            <div data-role="content" id="topcart-body"></div>
                                        </div>
                                    </li>
                                    <li class="dropdown-menu-footer" role="presentation">
                                        <div class="dropdown-menu-footer-btn">
                                            <a href="{$url.shop_cart}" class="btn btn-squared btn-danger margin-bottom-5 margin-right-10">{$word.app_shop_gosettlement}</a>
                                        </div>
                                        <span class="red-600 font-size-18 topcarttotal"></span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <else/>
                        <ul class="navbar-nav vertical-align p-l-0 m-b-0 met-head-user" m-id="member" m-type="member">
                            <li class="dropdown text-xs-center vertical-align-middle animation-slide-top">
                                <a
                                    href="javascript:;"
                                    class="navbar-avatar dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                <span class="avatar m-r-5"><img src="{$user.head}" alt="{$user.username}"/></span>
                                    {$user.username}
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-right animate">
                                    <tag action="app_column" name="$v">
                                    <li role="presentation">
                                        <a href="{$c.met_weburl}member/login.php?lang={$_M[lang]}&a=dologout" class="dropdown-item" role="menuitem"><i class="icon wb-power" aria-hidden="true"></i> {$word.memberIndex10}</a>
                                    </li>
                                    </tag>
                                </ul>
                            </li>
                        </ul>
                    </if>
                    <else/>
                    <ul class="navbar-nav vertical-align p-l-0 m-b-0 met-head-user" m-id="member" m-type="member">
                        <li class=" text-xs-center vertical-align-middle animation-slide-top">
                            <a href="{$_M[url][site]}member/login.php?lang={$_M[lang]}" class="btn btn-squared btn-primary btn-outline m-r-10">{$word.login}</a>
                            <a href="{$_M[url][site]}member/register_include.php?lang={$_M[lang]}" class="btn btn-squared btn-success">{$word.register}</a>
                        </li>
                    </ul>
                </if>
                </div>
                <else/>
                <!-- icon -->
                <div class="eco_header pull-right hidden-xs hidden-sm">
                    <if value="$lang['adress'] || $lang['adress1']">
                        <div class="top-info">
                          <div class="icon-box"> <span class="fa fa-map-marker"></span> </div>
                          <div class="content-box">
                            <p>{$lang.adress}<br>
                              <span>{$lang.adress1}</span></p>
                          </div>
                        </div>
                    </if>
                    <if value="$lang['tel'] || $lang['email']">
                    <div class="top-info">
                      <div class="icon-box"> <span class="fa fa-phone"></span> </div>
                      <div class="content-box">
                        <p><a href="tel:{$lang.tel}" title="{$lang.tel}">{$lang.tel}</a><br>
                          <span><a href="mailto:{lang.email}" rel="nofollow" target="_blank">{$lang.email}</a></span></p>
                      </div>
                    </div>
                    </if>
                     <if value="$lang['stime'] || $lang['otime']">
                        <div class="top-info">
                          <div class="icon-box"> <span class="fa fa-calendar"></span> </div>
                          <div class="content-box">
                            <p>{$lang.stime}<br>
                            <span>{$lang.otime}</span></p>
                          </div>
                        </div>
                    </if>

                    </div>
                </if>
                <li class='nav-item_l m-l-{$lang.nav_ml}  '>
                        <if value="$lang[nav_rtxt]">
                                {$lang.nav_rtxt|met_substr:0,12}
                        </if>

                        <?php $img2=strstr($lang['nav_ricon'],"upload"); ?>
                        <if value="$lang[nav_ricon] && $img2">
                                    <img src="{$lang.nav_ricon}">
                        </if>
                    </li>
                    <li class='nav-item_l1'>
                        <if value="$lang[nav_rtxt1]">
                                {$lang.nav_rtxt1|met_substr:0,8}
                        </if>
                    </li>
                </div>
                </div>
        </div>
        </div>
                <!-- 会员注册登录 -->
                <!-- 导航 -->
                <div class="fullnav collapse navbar-collapse navbar-collapse-toolbar p-0" id="met-nav-collapse">
                    <div class="container">
                        <div class="row">
                    <ul class="nav navbar-nav navlist clearfix <if value='$lang[nav_w]'>fixedw</if>">
                        <!-- 正常模式开始 -->
                            <li class='nav-item'>
                                <a href="{$c.index_url}" title="{$word.home}" class="nav-link
                                <if value="$data['classnow'] eq 10001">
                                active
                                </if>
                                ">{$word.home}</a>
                            </li>
                            <tag action='category' type='head' class='active' hide="$kang['hide']">
                            <if value="$lang['navdropdown_ok'] && $m['sub']">
                                <li class="nav-item dropdown m-l-{$lang.nav_ml}">
                                        <a
                                            href="{$m.url}"
                                            {$m.urlnew}
                                            title="{$m.name}"
                                            class="nav-link dropdown-toggle {$m.class}"
                                            data-toggle="dropdown"
                                            data-hover="true"
                                        ><if value="$m['_name']">{$m._name}<else/>{$m.name}</if></a>
                                    <div class="dropdown-menu animate two-menu">
                                        <if value="$m[module] neq 1 || $m['isshow']">
                                        <a href="{$m.url}" {$m.urlnew} title="{$lang.all}" class='dropdown-item nav-parent hidden-lg-up'>{$lang.all}</a>
                                        </if>
                                        <tag action='category' cid="$m['id']" type='son' class='active'>
                                        <if value="$m['sub']">
                                        <div class="dropdown-submenu <if value='!$lang[navbullet_ok]'>animate</if>">
                                            <a href="{$m.url}" {$m.urlnew} class="dropdown-item {$m.class}" data-hover="true"><if value="$m['_name']">{$m._name}<else/>{$m.name}</if></a>
                                            <div class="dropdown-menu <if value='!$lang[navbullet_ok]'>animate</if>">
                                                <tag action='category' cid="$m['id']" type='son' class='active'>
                                                    <a href="{$m.url}" {$m.urlnew} class="dropdown-item {$m.class}" ><if value="$m['_name']">{$m._name}<else/>{$m.name}</if></a>
                                                </tag>
                                            </div>
                                        </div>
                                        <else/>
                                        <a href="{$m.url}" {$m.urlnew} title="{$m.name}" class='dropdown-item hassub {$m.class}'><if value="$m['_name']">{$m._name}<else/>{$m.name}</if></a>
                                        </if>
                                        </tag>
                                    </div>
                                </li>
                            <else/>
                                <li class='nav-item m-l-{$lang.nav_ml}'>
                                    <a href="{$m.url}" {$m.urlnew} title="{$m.name}" class="nav-link {$m.class}"><if value="$m['_name']">{$m._name}<else/>{$m.name}</if></a>
                                </li>
                            </if>
                            </tag>
                        <!-- 正常模式结束 -->
                        <if value="$c['met_ch_lang'] && $lang['simplified']&& $lang['cn1_position'] eq 1">
                            <if value="$data[lang] eq cn">
                                <li class="met-langlist met-s2t nav-item" m-id="lang" m-type="lang">
                                <div class="">
                                    <button type="button" class="btn btn-convertnav-link btn-outline btn-default btn-squared btn-lang btn-cntotc" data-tolang='tc'>繁体</button>
                                    <elseif value="$data[lang] eq tc"/>
                                    <button type="button" class="btn nav-link btn-outline btn-default btn-squared btn-lang btn-cntotc"  data-tolang='cn'>简体</button>
                                </div>
                            </li>
                            </if>
                        </if>
                        <!-- 多语言 -->
                        <lang></lang>
                        <if value="$c['met_lang_mark'] && $lang[lang_ok] && $sub gt 1 && $lang['lang_position'] eq 1">
                            <li class="met-langlist nav-item vertical-align" m-id='lang' m-type='lang'>
                                <div class="inline-block dropdown">
                                    <lang>
                                    <if value="($sub gt 2)?($data['lang'] eq $v['mark']):$data['lang'] neq $v['mark']">
                                    <if value="$sub gt 2">
                                    <button type="button" data-toggle="dropdown" class="btn btn-outline btn-default btn-squared dropdown-toggle btn-lang nav-link">
                                    <else/>
                                    <a href="{$v.met_weburl}" title="{$v.name}" <if value="$v['newwindows']">target="_blank"</if> class="btn btn-outline btn-default btn-squared btn-lang nav-link">
                                    </if>
                                        <if value="$lang['langlist_icon_ok']">
                                        <img src="{$v.flag}" alt="{$v.name}" style="max-width:100%;">
                                        </if>
                                        <span>{$v.name}</span>
                                    <if value="$sub gt 2"></button><else/></a></if>
                                    </if>
                                    </lang>
                                    <if value="$sub gt 2">
                                    <div class="dropdown-menu dropdown-menu-right animate animate-reverse" id="met-langlist-dropdown" role="menu">
                                        <lang>
                                        <if value="$data['lang'] neq $v['mark']">
                                        <a href="{$v.met_weburl}" title="{$v.name}" <if value="$v['newwindows']">target="_blank"</if> class='dropdown-item'>
                                            <if value="$lang['langlist_icon_ok']">
                                            <img src="{$v.flag}" alt="{$v.name}" style="max-width:100%;">
                                            </if>
                                            {$v.name}
                                        </a>
                                        </if>
                                        </lang>
                                    </div>
                                    </if>
                                </div>
                            </li>
                        </if>
                    </ul>
                </div>
                <!-- 导航 -->
            </div>
        </div>
    </nav>
</header>

<!-- 轮播图 -->
<if value="$data['classnow']">
<tag action="banner.list"></tag>
<if value="$sub || $data['classnow'] eq 10001">
<div class="met-banner carousel slide" id="exampleCarouselDefault" data-ride="carousel" m-id='banner'  m-type='banner'>
    <ol class="carousel-indicators carousel-indicators-fall">
        <tag action="banner.list">
            <li data-slide-to="{$v._index}" data-target="#exampleCarouselDefault" class="<if value="$v['_first']">active</if>"></li>
        </tag>
    </ol>
    <div class="carousel-inner <if value="$data['classnow'] eq 10001 && $sub eq 0">met-banner-mh</if>" role="listbox">
        <tag action="banner.list">
            <div class="carousel-item <if value="$v['_first']">active</if>">
                <if value="$v['mobile_img_path']">
                    <img class="w-full mobile_img" src="{$v.mobile_img_path}" srcset='{$v.mobile_img_path} 767w,{$v.mobile_img_path}' sizes="(max-width: 767px) 767px" alt="{$v.img_title_mobile}" pch="{$v.height}" adh="{$v.height_t}" iph="{$v.height_m}">
                    <img class="w-full pc_img" src="{$v.img_path}" srcset='{$v.img_path} 767w,{$v.img_path}' sizes="(max-width: 767px) 767px" alt="{$v.img_title}" pch="{$v.height}" adh="{$v.height_t}" iph="{$v.height_m}">
                    <else/>
                    <img class="w-full mobile_img" src="{$v.img_path}" srcset='{$v.img_path} 767w,{$v.img_path}' sizes="(max-width: 767px) 767px" alt="{$v.img_title}" pch="{$v.height}" adh="{$v.height_t}" iph="{$v.height_m}">
                    <img class="w-full pc_img" src="{$v.img_path}" srcset='{$v.img_path} 767w,{$v.img_path}' sizes="(max-width: 767px) 767px" alt="{$v.img_title}" pch="{$v.height}" adh="{$v.height_t}" iph="{$v.height_m}">
                </if>
                <if value="$v['img_title'] || $v['img_des'] || $v['button'] || $v['img_link']">
                    <div class="met-banner-text pc-content" met-imgmask>
                        <div class='container'>
                            <div class='met-banner-text-con p-{$v.img_text_position}'>
                                <div>
                                    <if value="$v['img_link']">
                                        <a href="{$v.img_link}" title="{$v.img_des}" class="all-imgmask" <if value="$v['target']">target="_blank"</if>></a>
                                    </if>
                                    <if value="$v['img_title']">
                                    <h3 class="animation-slide-top animation-delay-300 font-weight-500" style="color:{$v.img_title_color};font-size: {$v.img_title_fontsize}px;">{$v.img_title}</h3>
                                    </if>
                                    <if value="$v['img_des']">
                                    <p class="animation-slide-bottom animation-delay-600" style='color:{$v.img_des_color};font-size: {$v.img_des_fontsize}px;'>{$v.img_des}</p>
                                    </if>
                                    <list data="$v['button']" name="$btn">
                                        <a href="{$btn.but_url}" title="{$btn.but_text}" <if value="$btn['target']">target="_blank"</if> class="btn slick-btn <if value='$btn[is_mobile] eq 1'>pc<elseif value='$btn[is_mobile] eq 2'/>mobile</if>" infoset="{$btn.but_text_size}|{$btn.but_text_color}|{$btn.but_text_hover_color}|{$btn.but_color}|{$btn.but_hover_color}|{$btn.but_x}|{$btn.but_y}">{$btn.but_text}</a>
                                    </list>
                                </div>
                            </div>
                        </div>
                    </div>
                </if>
                <if value="$v['img_title_mobile'] || $v['img_des_mobile'] || $v['button'] || $v['img_link']">
                    <div class="met-banner-text mobile-content" met-imgmask>
                        <div class='container'>
                            <div class='met-banner-text-con p-{$v.img_text_position_mobile} '>
                                <div>
                                    <if value="$v['img_link']">
                                        <a href="{$v.img_link}" title="{$v.img_des}" class="all-imgmask" <if value="$v['target']">target="_blank"</if>></a>
                                    </if>
                                    <if value="$v['img_title_mobile']">
                                    <h3 class="animation-slide-top animation-delay-300 font-weight-500" style="color:{$v.img_title_color_mobile};font-size: {$v.img_title_fontsize_mobile}px;">{$v.img_title_mobile}</h3>
                                    </if>
                                    <if value="$v['img_des_mobile']">
                                    <p class="animation-slide-bottom animation-delay-600" style='color:{$v.img_des_color_mobile};font-size: {$v.img_des_fontsize_mobile}px;'>{$v.img_des_mobile}</p>
                                    </if>
                                    <list data="$v['button']" name="$btn">
                                        <a href="{$btn.but_url}" title="{$btn.but_text}" <if value="$btn['target']">target="_blank"</if> class="btn slick-btn <if value='$btn[is_mobile] eq 1'>pc<elseif value='$btn[is_mobile] eq 2'/>mobile</if>" infoset="{$btn.but_text_size}|{$btn.but_text_color}|{$btn.but_text_hover_color}|{$btn.but_color}|{$btn.but_hover_color}|{$btn.but_x}|{$btn.but_y}">{$btn.but_text}</a>
                                    </list>
                                </div>
                            </div>
                        </div>
                    </div>
                </if>
            </div>
        </tag>
        <a class="left carousel-control" href="#exampleCarouselDefault" role="button" data-slide="prev">
          <span class="icon" aria-hidden="true"><</span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#exampleCarouselDefault" role="button" data-slide="next">
          <span class="icon" aria-hidden="true">></span>
          <span class="sr-only">Next</span>
        </a>
    </div>
</div>
<else if value="$data['classnow'] neq 10001"/>
<tag action='category' type="current" cid="$data['classnow']">
<div class="met-banner-ny vertical-align text-center" m-id="banner">
    <if value="$m['module'] eq 1">
        <h2 class="vertical-align-middle">{$m.name}</h2>
        <else/>
        <h3 class="vertical-align-middle">{$m.name}</h3>
    </if>
</div>
</tag>
</if>

<if value="$data['classnow'] neq 10001"/>
    <if value="$data['name'] && $data['module'] neq 3">
        <include file="subcolumn_nav.php" />
    <else/>
        <include file="position.php" />
    </if>
</if>
</if>