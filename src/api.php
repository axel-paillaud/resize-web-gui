<?php
include_once "functions.php";
include_once "file_error_code.php";

if (isset($_POST["rename"]) && !empty($_POST["rename"])) {
    $filename = $_POST["rename"];
}
else {
    $filename = "output";
}

$files = $_FILES["image"];
print_log($files);

function resizeImg($image, int $size, string $fileName, string $fileExtension) {
    global $dirName;
    $cloneImage = $image->clone();
    $cloneImage->resizeImage($size, 0, imagick::FILTER_LANCZOS, 0.5);
    $cloneImage->writeImage("./$dirName/original/$fileName-$size.$fileExtension");
    echo "Write $fileName-$size.$fileExtension in ./$dirName/original/\n";
    return $cloneImage;
}

function convertImg($image, int $size, string $format, string $fileName) {
    global $dirName;
    $image->setOption('quality', '80');
    $image->setImageFormat($format);
    $image->writeImage("./$dirName/avif/$fileName-$size.avif");
    echo "Write $fileName-$size.avif in ./$dirName/avif/\n";
}

function createDir(string $dirName, string $path) {
    if (!mkdir($path . $dirName, 0775, true)) {
        print_log("./error.log", "Failed to create directories ...");
        return;
    }
}

createDir("resize_images", "./");

for ($i = 0; $i < count($files["name"]); $i++)
{
/*     print_log($files["name"][$i]);
    print_log($files["full_path"][$i]);
    print_log($files["type"][$i]);
    print_log($files["tmp_name"][$i]);
    print_log($files["error"][$i]);
    print_log($files["size"][$i]); */
    if ($files["error"][$i] !== 0)
    {
        print_log($files["name"][$i]);
        print_log($phpFileUploadErrors[$files["error"][$i]]);
    }
    else
    {
        
    }
}

/* if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $send = json_encode("hello");

    header("Content-type: application/json");
    echo $send;
} */