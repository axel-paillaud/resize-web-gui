<?php

function print_log($string)
{
    $folder=  "./error.log";
    $string = print_r($string, true);
    $date = date('l jS \of F Y h:i:s A');
    $string = $date . "\n" . $string;
    error_log($string . "\n\n", 3, $folder);
}
