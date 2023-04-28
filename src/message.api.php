<?php

date_default_timezone_set("America/New_York");
header("Content-Type: text/event-stream");

while(1) {
    echo "event: ping\n";
    echo 'data: Hello, world!' . "\n";

    sleep(1);

    flush();
}

