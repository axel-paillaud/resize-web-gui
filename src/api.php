<?php

$receive = json_decode(file_get_contents('php://input'), true);
$send = json_encode($receive);

$post_debug = print_r($_POST, true);
error_log($post_debug . "\n", 3, "./error.log");


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $send = json_encode("hello");

    header("Content-type: application/json");
    echo $send;
}