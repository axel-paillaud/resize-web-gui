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

/* if we have only one image, don't zip folder, convert image and send it
directly to the client */
if (count($files["name"]) === 1)
{
    $image = new Imagick($files["tmp_name"]);
    $image->setImageCompressionQuality($quality);
    $image->setCompressionQuality($quality);

    $resizedImg = resizeImg($image, $sizes[0], $rename);
    $convertedImg = convertImg($resizedImg, $quality, $formats[0], $rename);

    $imagePath = "./resize_images/" . $rename . "-" .$sizes[0] . "." . $formats[0];
    $convertedImg->writeImage($imagePath);

    $imageType = mime_content_type($imagePath);
    header('Content-type: ' . $imageType);
    readfile($imagePath);
}
else
{
    /* For each images, do */
    for ($i = 0; $i < count($files["name"]); $i++)
    {
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
}


// TODO
$zip = new ZipArchive();

/* if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $send = json_encode("hello");

    header("Content-type: application/json");
    echo $send;
} */