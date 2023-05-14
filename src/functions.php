<?php

const BASE_PATH = __DIR__;

function print_log($string)
{
    $folder =  "../log/error.log";
    $string = print_r($string, true);
    $date = date('l jS \of F Y h:i:s A');
    $string = $date . "\n" . $string;
    error_log($string . "\n\n", 3, $folder);
}

function base_path($path)
{
    return BASE_PATH . $path;
}

function check_single_file($files, $formats, $sizes)
{
    return (count($files) === 1 && count($formats) === 1 && count($sizes) === 1) ? true : false;
}

function deleteFiles($folder)
{
    $files = glob($folder . '/*');
    foreach ($files as $file) {
        if (is_dir($file)) { // recursive function
            deleteFiles($file);
        } else {
            if (!unlink($file)) {
                print_log("Impossible to delete file ...");
            }
        }
    }
    if (!rmdir($folder)) {
        print_log("Impossible to delete folder ...");
    }
}

function createDir(string $dirName, string $path)
{
    if (!mkdir($path . $dirName, 0775, true)) {
        print_log("Failed to create directories ...");
        return;
    }
}

function check_php_config()
{
    $upload_max_filesize = ini_get('upload_max_filesize');
    $post_max_size = ini_get('post_max_size');
    $max_file_uploads = ini_get('max_file_uploads');
    $max_execution_time = ini_get('max_execution_time');
    $max_input_time = ini_get('max_input_time');

    if ($upload_max_filesize != 0) {
        print_log("Warning: PHP upload max filesize have this current limit: "
            . $upload_max_filesize);
    }
    if ($post_max_size != 0) {
        print_log("Warning: PHP post max size have this current limit: "
            . $post_max_size);
    }
    if ($max_file_uploads != 9999) {
        print_log("Warning: PHP max file uploads have this current limit: "
            . $max_file_uploads);
    }
    if ($max_execution_time != 0) {
        print_log("Warning: PHP max file uploads have this current limit: "
            . $max_execution_time);
    }
    if ($max_input_time != -1) {
        print_log("Warning: PHP max input time have this current limit: "
            . $max_input_time);
    }
}
