<?php

function count_lines($file_path)
{
    $file = fopen($file_path, 'r');

    if ($file)
    {
        $number_of_lines = 0;
        while (!feof($file))
        {
            fgets($file);
            $number_of_lines++;
        }

        fclose($file);

        return $number_of_lines;
    }
    else
    {
        echo "Unable to open file in $file_path, cannot count lines";
    }
}

function reset_file($file_path)
{
    $file = fopen($file_path, 'w');

    if ($file)
    {
        fwrite($file, '');

        fclose($file);
    }
    else
    {
        echo "Unable to open file in $file_path";
    }
}

echo(count_lines("log/error.log"));

if (count_lines("log/error.log") > 40)
{
    reset_file("log/error.log");
}