<?php
include_once "functions.php";
include_once "file_error_code.php";

if (isset($_POST["rename"]) && !empty($_POST["rename"])) {
    $rename = $_POST["rename"];
}
else {
    $rename = "output";
}

$files = $_FILES["image"];
$formats = $_POST["format"];
$sizes = $_POST["size"];
$filenames = $files["name"];
$quality = intval($_POST["quality"]);

/* we only want the filename without the extension */
foreach ($filenames as &$filename)
{
    $filename = pathinfo($filename, PATHINFO_FILENAME);
}

function resizeImg($image, int $size, string $filename)
{
    $cloneImage = $image->clone();
    $cloneImage->resizeImage($size, 0, imagick::FILTER_LANCZOS, 0.5);
    print_log("Resize $filename to $size\n");
    return $cloneImage;
}

function convertImg($image, string $quality, string $format, string $fileName) 
{
    /* $image->setCompressionQuality($quality); */
    $image->setImageFormat($format);
    print_log("Convert $fileName to $format\n");
    return $image;
}

function createDir(string $dirName, string $path) 
{
    if (!mkdir($path . $dirName, 0775, true)) {
        print_log("Failed to create directories ...");
        return;
    }
}

if (!extension_loaded('imagick'))
{
    print_log("Error : imagick extension is not loaded.");
    die();
}

/* all new folder ierarchy with new image start at root directory */
createDir("resize_images", "./");

/* For each images, do */
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
        print_log($phpFileUploadErrors[$files["error"][$i]]);
    }
    else
    {
        $image = new Imagick($files["tmp_name"]);
        $image->setImageCompressionQuality($quality);
        $image->setCompressionQuality($quality);

        $filenameFolder = $filenames[$i] . "-" . $i;
        createDir($filenameFolder, "./resize_images/");

        /* for each format, do */
        for ($k = 0; $k < count($formats); $k++)
        {
            createDir($formats[$k], "./resize_images/$filenameFolder/");
            $formatFolder = "./resize_images/$filenameFolder/$formats[$k]/";

            /* for each size, do */
            for ($j = 0; $j < count($sizes); $j++)
            {
                $resizedImg = resizeImg($image, $sizes[$j], $rename);
                $convertedImg = convertImg($resizedImg, $quality, $formats[$k], $rename);
                $convertedImg->writeImage($formatFolder . "$rename-$sizes[$j].$formats[$k]");
            }
        }

        $image->destroy();
    }
}

/* if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $send = json_encode("hello");

    header("Content-type: application/json");
    echo $send;
} */