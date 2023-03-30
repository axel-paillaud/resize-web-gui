<?php

$receive = json_decode(file_get_contents('php://input'), true);
$send = json_encode($receive);

header("Content-type: application/json");
echo $send;

/* if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $send = json_encode("hello");

    header("Content-type: application/json");
    echo $send;
} */