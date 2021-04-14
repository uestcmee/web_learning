<footer class='met-foot-info border-top1' m-id='met_foot' m-type="foot">
    <div class="met-footnav text-xs-center p-b-20" m-id='noset' m-type='foot_nav'>
    <div class="container">
        <div class="row">
            <tag action='category' type='foot'>
            <if value="$m['_index'] lt 4">
            <div class="col-lg-2 col-md-3 col-xs-6 list foot-nav">
                <h4 class='font-size-16 m-t-0'>
                    <a href="{$m.url}" {$m.urlnew}  title="{$m.name}">{$m.name}</a>
                </h4>
                <if value="$m['sub']">
                <ul class='ulstyle m-b-0'>
                    <tag action='category' cid="$m['id']" type='son' num={$lang.num}>
                    <li>
                        <a href="{$m.url}" {$m.urlnew} title="{$m.name}">{$m.name}</a>
                    </li>
                    </tag>
                </ul>
                </if>
            </div>
            </if>
            </tag>
            <div class="col-lg-2 col-md-12 col-xs-12 info font-size-20" m-id='met_contact' m-type="nocontent">
                <if value="$lang['footinfo_tel']">
                <p class='font-size-26'>{$lang.footinfo_tel}</p>
                </if>
                <if value="$lang['footinfo_dsc']">
                <p><a href="tel:{$lang.footinfo_dsc}" title="{$lang.footinfo_dsc}">{$lang.footinfo_dsc}</a></p>
                </if>
                <if value="$lang['footinfo_qq_ok']">
                <a
                <if value="$lang['foot_info_qqtype'] eq 1">
                href="http://wpa.qq.com/msgrd?v=3&uin={$lang.footinfo_qq}&site=qq&menu=yes"
                <else/>
                href="http://crm2.qq.com/page/portalpage/wpa.php?uin={{$lang.footinfo_qq}&aty=0&a=0&curl=&ty=1"
                </if>
                rel="nofollow" target="_blank" class="p-r-5">
                    <i class="fa fa-qq"></i>
                </a>
                </if>
                <if value="$lang['footinfo_sina_ok']">
                <a href="{$lang.footinfo_sina}" rel="nofollow" target="_blank" class="p-r-5">
                    <i class="fa fa-weibo red-600"></i>
                </a>
                </if>
                <if value="$lang['footinfo_twitterok']">
                <a href="{$lang.footinfo_twitter}" rel="nofollow" target="_blank" class="p-r-5">
                    <i class="fa fa-twitter red-600"></i>
                </a>
                </if>
                <if value="$lang['footinfo_googleok']">
                <a href="{$lang.footinfo_google}" rel="nofollow" target="_blank" class="p-r-5">
                    <i class="fa fa-google red-600"></i>
                </a>
                </if>
                <if value="$lang['footinfo_facebookok']">
                <a href="{$lang.footinfo_facebook}" rel="nofollow" target="_blank" class="p-r-5">
                    <i class="fa fa-facebook red-600"></i>
                </a>
                </if>
                <if value="$lang['footinfo_emailok']">
                <a href="mailto:{$lang.footinfo_email}" rel="nofollow" target="_blank" class="p-r-5">
                    <i class="fa fa-envelope red-600"></i>
                </a>
                </if>
            </div>
             <if value="$lang['weixin']">
                <a class="icon fa fa-weixin"></a>
                    <div class=" col-lg-2 col-md-12 foot-nav wechat-code full-img">
                             <img src="{$lang.weixin_img|thumb:87,87}"/>
                              <if value="$lang['weixintext']">
                    <p class="wxtext">{$lang.weixintext}</p>
                    </if>
                    </div>
                </if>
        </div>
    </div>
</div>
    <if value="$lang['link_ok']">
    <tag action='link.list'></tag>
    <if value="$sub">
    <div class="met-link border-top1 text-xs-center p-y-10" m-id='noset' m-type='link'>
        <div class="container">
            <ul class="breadcrumb p-0 link-img m-0">
                <li class='breadcrumb-item'>{$lang.footlink_title} :</li>
                <tag action='link.list'>
                <li class='breadcrumb-item'>
                    <a href="{$v.weburl}" title="{$v.info}" {$v.nofollow} target="_blank">
                        <if value="$v.link_type eq 1">
                            <img data-original="{$v.weblogo}" alt="{$v.info}" height='40'>
                        <else/>
                            <span>{$v.webname}</span>
                        </if>
                    </a>
                </li>
                </tag>
            </ul>
        </div>
    </div>
    </if>
    </if>
    <div class="copy p-y-10 border-top1">
        <div class="container text-xs-center">
            <if value="$c['met_footright'] || $c['met_footstat']">
            <div>{$c.met_footright}</div>
            </if>
            <if value="$c['met_footaddress']">
            <div>{$c.met_footaddress}</div>
            </if>
            <if value="$c['met_foottel']">
            <div>{$c.met_foottel}</div>
            </if>
            <if value="$c['met_footother']">
            <div>{$c.met_footother}</div>
            </if>
            <if value="$c['met_foottext']">
            <div>{$c.met_foottext}</div>
            </if>
            <div class="powered_by_metinfo">{$c.met_agents_copyright_foot}</div>
                <if value="$c['met_ch_lang'] && $lang['cn1_position'] eq 0">
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
               <lang></lang>
                        <if value="$c['met_lang_mark'] && $lang[lang_ok] && $sub gt 1 && $lang['lang_position'] eq 0">
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
            </div>
        </div>
    </div>
</footer>
<div class="met-menu-list text-xs-center <if value="$_M['form']['pageset']">iskeshi</if>" m-id="noset" m-type="menu">
    <div class="main">
        <tag action="menu.list">
            <div style="background-color: {$v.but_color};">
                <a href="{$v.url}" class="item" <if value="$v['target']">target="_blank"</if> style="color: {$v.text_color};">
                    <i class="{$v.icon}"></i>
                    <span>{$v.name}</span>
                </a>
            </div>
        </tag>
    </div>
</div>
<met_foot />