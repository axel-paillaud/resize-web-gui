<?php

$post_debug = print_r($_POST, true);
$file_debug = print_r($_FILES["image"], true);
error_log($post_debug . "\n", 3, "./error.log");
error_log($file_debug . "\n", 3, "./error.log");


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $send = json_encode("hello");

    header("Content-type: application/json");
    echo $send;
}