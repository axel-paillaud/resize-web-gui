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
