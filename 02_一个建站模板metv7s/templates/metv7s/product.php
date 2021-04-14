<?php defined('IN_MET') or exit('No permission'); ?>
<include file="head.php" />

<div class="met-product-list animsition">
    <div class="container">
            <div class="less-page-content col-lg-9 col-md-8 col-xs-12 pull-md-right">
                    <tag action='product.list' num="$c['met_product_list']"></tag>
                    <if value="$sub">
                    <ul class="met-product blocks blocks-100 blocks-xlg-4 blocks-md-3 blocks-sm-2 blocks-xs-1 ulstyle met-pager-ajax imagesize " data-scale='{$c.met_productimg_y}x{$c.met_productimg_x}' m-id="noset">
                        <include file='ajax/product'/>
                    </ul>
                    <else/>
                    <div class='h-100 text-xs-center font-size-20 vertical-align' m-id="noset">{$lang.nodata}</div>
                    </if>
                    <div class='m-t-20 text-xs-center hidden-sm-down' m-type="nosysdata">
                        <pager type="$c['met_product_page']" />
                    </div>
                    <div class="met-pager-ajax-link hidden-md-up" m-type="nosysdata" data-plugin="appear" data-animate="slide-bottom" data-repeat="false">
                        <button type="button" class="btn btn-primary btn-block btn-squared ladda-button" id="met-pager-btn" data-plugin="ladda" data-style="slide-left" data-url="" data-page="1">
                            <i class="icon wb-chevron-down m-r-5" aria-hidden="true"></i>
                            {$lang.page_ajax_next}
                        </button>
                    </div>
            </div>

            <div class="met-sidebar col-lg-3 col-md-3 col-xs-12">
             <div class="row">
                 <aside class=" panel-body m-b-0 <if value='$lang[bgcolor]'>bgcolor</if>" boxmh-h m-id='met_sidebar' m-type='nocontent'>
                 <div class="sidebar-search" data-placeholder="{$ui.sidebar_search_placeholder}">
                 <tag action="search.column"></tag>
             </div>
                   <tag action='category' type="son" cid="$data['class1']" num="$c[met_product_list]" ></tag>
                   <if value="$lang['sidebar_column_ok'] && $sub">
                   <tag action='category' cid="$data['class1']">
                   <div class="product">
                    <ul class="sidebar-column list-icons" id="accordion" role="tablist" aria-multiselectable="true">
                    <li class="titlebox panel panel-default">
                       <a  href="{$m.url}" title="{$m.name}">
                                <span class="sidebar-tile ">{$m.name}</span>
                       </a>
                    </li>
                  <tag action='category' cid="$m['id']" type='son' num="$lang['sidebar_column_num']" class='active'>
                  <li class="panel panel-default">
                    <if value="$m['sub'] && $lang['product_bar_column3_ok']">
                    <a title="{$m.name}" class='{$m.class}' {$m.urlnew} data-toggle="collapse" data-parent="#accordion"
                     href="#list_{$m['id']}" aria-expanded="true" aria-controls="#list_{$m['id']}"
                    >
                        {$m.name}
                        <i class="wb-chevron-right-mini"></i>
                    </a>
                    <div class="sidebar-column3-{$m._index} collapse sidebar-column3 panel-collapse" aria-expanded="false" id="list_{$m['id']}" role="tabpanel" aria-labelledby="headingOne">
                        <ul class="">
                            <li><a href="{$m.url}" {$m.urlnew} title="{$lang.product_bar_all}" class="{$m.class}">{$lang.product_bar_all}</a></li>
                            <tag action='category' cid="$m['id']" type='son' class='active'>
                            <li><a href="{$m.url}" {$m.urlnew} title="{$m.name}" class='{$m.class}'>{$m.name}</a></li>
                            </tag>
                        </ul>
                    </div>
                    <else/>
                    <a href="{$m.url}" title="{$m.name}" class='{$m.class}'>{$m.name}</a>
                    </if>
                </li>
                </tag>
            </ul>
        </div>
        </tag>
        </if>
        
        <if value="$lang['sidebar_productlist_ok']">
        <div class="contant">
            <div class="titlebox">
                <if value="$lang['sidebar_productlist_title']">
                <span class="sidebar-tile <if value='$lang[csecond]'>hasborder<else/>notborder</if>">
                    {$lang.sidebar_productlist_title}
                </span>
                </if>
                <if value="$lang['csecond']">
                <p class="secondt">{$lang.csecond}</p>
                </if>
            </div>
            <div class="side-tel met-editor">{$lang.side_desc}</div>
        </div>
        </if>

    </aside>
</div>
</div>
    </div>
</div>
<include file="foot.php" />