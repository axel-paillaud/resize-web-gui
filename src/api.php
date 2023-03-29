<?php

$receive = json_decode(file_get_contents('php://input'), true);

print_r($receive);

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $send = json_encode("hello");

    header("Content-type: application/json");
    echo $send;
}