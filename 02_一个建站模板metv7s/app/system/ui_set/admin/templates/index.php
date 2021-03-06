<?php
# MetInfo Enterprise Content Management System
# Copyright (C) MetInfo Co.,Ltd (http://www.metinfo.cn). All rights reserved.
defined('IN_MET') or exit('No permission');
$html_class=$body_class='h-100';
$html_class.=' met-pageset';
$body_class.=' d-flex flex-column';
$pageset_css_filemtime = filemtime(PATH_OWN_FILE.'templates/css/pageset.css');
$pageset_js_filemtime = filemtime(PATH_OWN_FILE.'templates/js/pageset.js');
$met_title=$word['veditor'].'-'.$c['met_webname'];
$headnav_ml=$_M['langset']=='cn'?'ml-xl-3':'en-headnav-padiing';
?>
<include file="pub/header"/>
<link rel="stylesheet" href="{$url.public_fonts}metinfo-icon/metinfo-icon.css">
<link rel="stylesheet" href="{$url.own_tem}css/pageset.css?{$pageset_css_filemtime}">
<!-- 顶部导航 -->
<header class='pageset-head bg-dark' style="height: 50px;">
	<div class="container-fluid h-100 position-relative">
		<if value="$c['met_agents_pageset_logo'] eq 1 || !isset($c['met_agents_pageset_logo'])">
		<div class='float-left d-none d-lg-flex align-items-center h-100'>
			<a href="{$c.met_agents_linkurl}" title='{$word.metinfo}' target='_blank' class='text-white pageset-logo'><i class="icon metinfo-icon metinfo-icon-logobd font-size-18"></i> <span>{$word.loginmetinfo}</span></a>
		</div>
		</if>
		<if value="is_mobile()">
		<button class="btn btn-outline-light btn-sm btn-block mt-2 btn-pageset-mobile-menu">{$word.top_menu}</button>
		</if>
		<if value="is_mobile()"><div class="pageset-mobile-menu position-absolute bg-dark py-2"></if>
		<div class="container h-100">
			<div class="row h-100 navbar p-0 pageset-head-nav">
				<div>
	            	<a href class="btn btn-outline-light border-none pageset-view" title='{$word.uisetTips4}' target='_blank'>{$word.preview}</a>
                    <if value="$data['auth']['basic_info'] eq 1">
                    <a href='javascript:;' class="btn btn-outline-light border-none {$headnav_ml} pageset-other-config" data-config-url='{$url.own_form}a=doget_page_config' data-form_action="doset_page_config" title='{$word.uisetTips5}'>{$word.uisetTips6}</a>
                    </if>
                    <if value="$data['auth']['column'] eq 1">
                    <a href='javascript:;' class="btn btn-outline-light border-none {$headnav_ml}" data-toggle="modal" data-target=".pageset-nav-modal" data-url='column' title='{$word.columumanage}'>{$word.banner_column_v6}</a>
                    </if>
                    <if value="$data['auth']['content'] eq 1">
                    <a href='javascript:;' class="btn btn-outline-light border-none {$headnav_ml}" data-toggle="modal" data-target=".pageset-nav-modal" data-url='manage' title='{$word.indexcontent}'>{$word.content}</a>
                    </if>
					<div class="btn-group {$headnav_ml}">
						<button class="btn btn-outline-light border-none dropdown-toggle" type="button" data-toggle="dropdown">{$word.skinstyle}</button>
						<ul class="dropdown-menu mt-2">
                            <if value="$data['auth']['style_settings'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2 pageset-other-config' data-config-url='{$url.own_form}a=doget_public_config' data-form_action="doset_public_config">{$word.style_settings}</a>
                            </if>
                            <if value="$data['auth']['site_template'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2 nav-tem-choose' data-toggle="modal" data-target=".pageset-nav-modal" data-url='app/met_template'>{$word.appearance}</a>
                            </if>
                            <if value="$data['auth']['watermark_thumbnail'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='imgmanage'>{$word.watermarkThumbnail}</a>
                            </if>
                            <if value="$data['auth']['banner'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='banner'>{$word.indexflash}</a>
                            </if>
                            <if value="$data['auth']['mobile_menu'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='menu'>{$word.the_menu}</a>
                            </if>
						</ul>
					</div>
                    <if value="$data['auth']['seo'] eq 1">
                    <a href='javascript:;' class="btn btn-outline-light border-none {$headnav_ml}" data-toggle="modal" data-target=".pageset-nav-modal" data-url='seo'>SEO</a>
                    </if>
                    <if value="$data['auth']['language'] eq 1">
                    <a href='javascript:;' class="btn btn-outline-light border-none {$headnav_ml}" data-toggle="modal" data-target=".pageset-nav-modal" data-url='language'>{$word.multilingual}</a>
                    </if>
                    <if value="$data['auth']['myapp'] eq 1">
                    <a href="javascript:;" class='btn btn-outline-light border-none {$headnav_ml}' data-toggle="modal" data-target=".pageset-nav-modal" data-url='myapp'>{$word.myapp}</a>
                    </if>
					<div class="btn-group {$headnav_ml}">
						<button class="btn btn-outline-light border-none dropdown-toggle" type="button" data-toggle="dropdown">{$word.indexadmin}</button>
						<ul class="dropdown-menu mt-2">
                            <if value="$data['auth']['databack'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='databack'>{$word.data_processing}</a>
                            </if>
							<if value="$data['auth']['checkupdate'] eq 1">
							<a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='update'>{$word.checkupdate}</a>
							</if>
                            <if value="$data['auth']['online'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='online'>{$word.customerService}</a>
                            </if>
                            <if value="$data['auth']['user'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='user'>{$word.memberManage}</a>
                            </if>
                            <if value="$data['auth']['clear_cache'] eq 1">
                            <a href="{$url.own_form}n=ui_set&c=index&a=doclear_cache" class='dropdown-item px-3 py-2 clear-cache'>{$word.clearCache}</a>
	                        <a href="{$url.own_form}n=ui_set&c=index&a=doClearThumb" class='dropdown-item px-3 py-2 clear-cache'>{$word.clearThumb}</a>
                            </if>
	                        <if value="$c['met_agents_app'] && $data['auth']['myapp'] eq 1">
	                    	<list data="$data['applist']" name="$v">
							<a <if value="$v['version']">href="javascript:;" data-toggle="modal" data-target=".pageset-nav-modal" data-url='{$v.url}'<else/>href="{$v.url}" target="_blank"</if> class='dropdown-item px-3 py-2'>{$v.appname}</a>
							</list>
							</if>
						</ul>
					</div>
				</div>
				<div class="float-right">
					<div class="btn-group {$headnav_ml}">
						<button class="btn btn-outline-light border-none dropdown-toggle" type="button" data-toggle="dropdown">{$word.columnmore}</button>
						<ul class="dropdown-menu dropdown-menu-right mt-2">
                            <if value="$data['auth']['basic_info'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='webset'>{$word.baceinfo}</a>
                            </if>
                            <if value="$data['auth']['safe'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='safe'>{$word.safety_efficiency}</a>
                            </if>
                            <if value="$data['auth']['basic_info'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='webset/email'>{$word.sysMailboxConfig}</a>
							<a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='webset/thirdparty'>{$word.third_party_code}</a>
                            </if>
                            <if value="$data['auth']['nav_setting'] eq 1 && $data['auth']['myapp'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url='ui_set/pageset_nav/?c=index&a=doapplist'>{$word.navSetting}</a>
                            </if>
                            <if value="$data['auth']['admin_user'] eq 1">
							<a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url="admin/user">{$word.indexadminname}</a>
                            </if>
							<if value="$data['auth']['function_complete'] eq 1">
							<a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target="#functionEncy" data-modal-size="lg" data-modal-url="#pub/function_ency/?n=ui_set&c=index&a=get_auth" data-modal-refresh="one" data-modal-fullheight="1" data-modal-title="{$word.funcCollection}" data-modal-oktext="" data-modal-notext="{$word.close}">{$word.funcCollection}</a>
							</if>
                            <if value="$data['auth']['partner'] eq 1">
							<a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url="partner">{$word.cooperation_platform}</a>
                            </if>
						</ul>
					</div>
					<if value="$c['met_agents_metmsg']">
					<div class="btn-group {$headnav_ml}">
						<button class="btn btn-outline-light border-none dropdown-toggle" type="button" data-toggle="dropdown">{$word.stand_by}</button>
						<ul class="dropdown-menu dropdown-menu-right mt-2">
							<a href="{$c.help_url}" class='dropdown-item px-3 py-2' target='_blank'>{$word.help_manual}</a>
							<a href="{$c.edu_url}" class='dropdown-item px-3 py-2' target='_blank'>{$word.extension_school}</a>
							<a href="{$c.qa_url}" class='dropdown-item px-3 py-2' target='_blank'>{$word.online_quiz}</a>
							<a href="{$c.kf_url}" class='dropdown-item px-3 py-2' target='_blank'>{$word.online_work_order}</a>
                            <if value="$data['auth']['environmental_test'] eq 1">
                            <a href="javascript:;" class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url="system/envmt_check/?c=patch&a=docheckEnv">{$word.environmental_test}</a>
                            </if>
						</ul>
					</div>
					</if>
					<a href='{$url.site_admin}' class="btn btn-outline-light border-none {$headnav_ml}" target='_blank'>{$word.oldBackstage}</a>
					<if value="$c['met_agents_metmsg']">
					<a href='javascript:;' class="btn btn-outline-light border-none {$headnav_ml}" data-toggle="modal" data-target=".pageset-nav-modal" data-url='system/news' title='{$word.sysMessage}'>
						<i class="fa fa-bell-o"></i>
						<span class="sys-news-count">{$data.sys_news_num}</span>
					</a>
					</if>
					<div class="btn-group {$headnav_ml}">
						<button type="button" class="btn btn-outline-light border-none dropdown-toggle pageset-head-user" data-toggle="dropdown"><span class='text-truncate d-inline-block position-relative' style="max-width: 100px;top: 3px;">{$data.power.admin_id}</span></button>
						<ul class="dropdown-menu dropdown-menu-right mt-2">
							<a href='javascript:;' class='dropdown-item px-3 py-2' data-toggle="modal" data-target=".pageset-nav-modal" data-url="admin/user" title='{$word.indexadminname}'>{$word.modify_information}</a>
							<a href="{$url.site_admin}?n=login&c=login&a=dologinout" class='dropdown-item px-3 py-2'>{$word.indexloginout}</a>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<if value="is_mobile()"></div></if>
	</div>
</header>
<!-- 后台文件夹安全提示 -->
<if value="!$data['admin_folder_safe']">
<div class="text-center mb-0 bg-grey alert pageset-tips">
    <button type="button" class="close" aria-label="Close" data-dismiss="alert">
        <span aria-hidden="true">×</span>
    </button>
    <p>{$word.help2}：<span class='text-danger'>{$word.tips8_v6}！</span></p>
    <div>
        <button type='button' class="btn btn-default no-prompt" data-url="{$url.site_admin}?n=index&c=index&a=do_no_prompt" data-dismiss="alert">{$word.nohint}</button>
        <button type='button' data-url="safe" class="btn btn-primary ml-5 btn-adminfolder-change" title="{$word.safety_efficiency}" data-toggle="modal" data-target=".pageset-nav-modal" data-dismiss="alert">{$word.tochange}</button>
    </div>
</div>
</if>
<!-- 可视化窗口 -->
<iframe src="{$data.pageset_iframe_src}" class='page-iframe flex-fill' frameborder="0" width="100%"></iframe>
<button type="button" data-toggle="modal" class="btn-pageset-common-modal" hidden></button>
<button type="button" class="btn-pageset-common-page" hidden></button>
<!-- 可视化窗口中部分情况右键菜单 -->
<menu class="met-menu position-fixed m-0 pl-0 border bg-light shadow rounded">
    <li class="menu-item d-block">
        <button type="button" class="btn btn-light text-left menu-btn obj-remove">
        	<small class="d-block">
	            <i class="icon wb-eye-close mr-1"></i>
	            <span class="menu-text">{$word.uisetTips8}</span>
            </small>
        </button>
    </li>
</menu>
<!-- 手机端引导图 -->
<if value="$c['met_uiset_guide'] && !is_mobile()">
<div class="modal fade met-scrollbar met-modal show alert p-0 mb-0 border-none rounded-0" data-keyboard="false" data-backdrop="false" style="display: block;">
	<div class="modal-dialog modal-dialog-centered modal-xl">
		<div class="modal-content bg-none border-none">
			<div class="modal-body text-center">
				<div class="d-inline-block">
					<div class="text-right">
						<button type='button' class="btn btn-danger" data-dismiss="alert">{$word.close_this_time}</button>
		        		<button type='button' class="btn btn-danger btn-uiset-guide-cancel" data-url="{$url.own_form}a=dono_uisetguide" data-dismiss="alert">{$word.nohint}</button>
	        		</div>
					<img src="{$url.own_tem}images/uiset_guide.gif" width="100%" class="bg-white p-3">
				</div>
			</div>
		</div>
	</div>
</div>
</if>
<!-- 手机端提示 -->
<if value="is_mobile() && !$_COOKIE['pageset_mobile_tips_hide']">
<div class="pageset-mobile-tips-wrapper" hidden><span class="pageset-mobile-tips">{$word.visualization1}</span></div>
</if>
<!-- 系统许可协议 -->
<if value="!$data['license']">
<div class="modal fade show met-scrollbar met-modal alert p-0 met-agreement-modal" data-keyboard="false" data-backdrop="false" style="display: block;">
	<div class="modal-dialog modal-dialog-centered modal-lg my-0 mx-auto h-100">
		<div class="modal-content h-100">
			<div class="modal-header justify-content-center">
				<h5 class="modal-title">{$word.read_protocol}</h5>
			</div>
			<div class="modal-body p-0" style="height:calc(100% - 115px);">
				<iframe src="{$data.license_url}" frameborder="0" width="100%" height="100%" style="vertical-align: top;"></iframe>
			</div>
			<div class="modal-footer justify-content-center">
				<a href="{$url.site_admin}?n=login&c=login&a=dologinout" class="btn btn-default mr-5">{$word.disagree}</a>
				<button type="button" class="btn btn-primary" data-dismiss="alert">{$word.agree}</button>
			</div>
		</div>
	</div>
</div>
</if>
<include file="pub/footer"/>
<script src="{$url.own_tem}js/pageset.js?{$pageset_js_filemtime}"></script>