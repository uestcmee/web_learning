<?php
# MetInfo Enterprise Content Management System
# Copyright (C) MetInfo Co.,Ltd (http://www.metinfo.cn). All rights reserved.

defined('IN_MET') or exit('No permission');
load::sys_class('web');

class index extends web
{
    public function __construct()
    {
        global $_M;
        parent::__construct();
    }
    
    /**
     * 恢复栏目文件.
     */
    public function dorecover_column()
    {
        global $_M;
        $columnclass = load::mod_class('column/column_op', 'new');
        $columnclass->do_recover_column_files();
    }


    public function doupdate_sql()
    {
        global $_M;
        $base = $this->get_base_table();
        if (!$base) {
            return;
        }

        foreach ($base as $table_name => $table) {
            $table_field = [];
            $table_name_now = str_replace('met_', $_M['config']['tablepre'], $table_name);
            //改表名
            $query = "ALTER TABLE '{$table_name_now}' RENAME TO '{$table_name_now}_bak'";
            $update_table = DB::query($query);
            file_put_contents(PATH_WEB . 'updatedata.txt', $query . "\n", FILE_APPEND);
            if ($update_table) {
                //创建新表
                $creat_query = "CREATE TABLE \"main\".\"{$table_name_now}\" (  \"id\" integer NOT NULL PRIMARY KEY AUTOINCREMENT,";
                foreach ($table as $key => $field) {
                    $table_field[] = $field['Field'];
                    if ($key == 'id') {
                        continue;
                    }

                    $creat_query .= " `{$field['Field']}` {$field['Type']} ";
                    if ($field['Default'] === null) {
                        $creat_query .= " DEFAULT NULL ";
                    } else {
                        $creat_query .= " DEFAULT '{$field['Default']}' ";
                    }
                    $creat_query .= ',';
                }

                $creat_query = trim($creat_query, ',') . ');';
                $creat_result = DB::query($creat_query);
                file_put_contents(PATH_WEB . 'updatedata.txt', $creat_query . "\n", FILE_APPEND);
                if ($creat_result) {
                    $field_string = '`' . implode('`,`', $table_field) . '`';
                    //迁移数据
                    $query = "INSERT INTO `main`.`{$table_name_now}` ({$field_string}) SELECT {$field_string} FROM `main`.`{$table_name_now}_bak`;";
                    $move_result = DB::query($query);
                    file_put_contents(PATH_WEB . 'updatedata.txt', $query . "\n", FILE_APPEND);
                    if ($move_result) {
                        //删除老表
                        $query = "DROP TABLE {$table_name_now}_bak";
                        $del_res = DB::query($query);
                        file_put_contents(PATH_WEB . 'updatedata.txt', $query . "\n", FILE_APPEND);
                    }
                }
            }
        }

    }
    /**
     * 获取标准数据库文件
     * @return mixed
     */
    public function get_base_table()
    {
        $json_sql = "https://www.metinfo.cn/upload/json/v7.2.0mysql.json";
        $table_json = file_get_contents($json_sql);
        if (!$table_json) {
            $table_json = self::app_curl($json_sql);
        }
        $base = json_decode($table_json, true);
        return $base;
    }



    public function doInstall()
    {
        global $_M;
        $version = '7.2.0';
        $update_zip = PATH_WEB.'cache/update/'.$version.'.zip';
        if (!file_exists($update_zip)) {
            $this->error(1);
        }

        $zip = new ZipArchive();
        if ($zip->open($update_zip) === true) {
            $zip->extractTo(PATH_WEB);
            $zip->close();
        } else {
            $this->error(2);
        }

        $install_file = PATH_WEB.'install.class.php';
        if (!file_exists($install_file)) {
            $this->error(3);
        }

        require_once $install_file;
        $install = new install();
        $install->dosql();
        @unlink($install_file);
        $this->success($_M['word']['met_template_installok']);
    }

}



