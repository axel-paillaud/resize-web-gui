<?php
include_once "functions.php";
include_once "file_error_code.php";

ob_implicit_flush(true);

header('Content-type: application/json');

if (!extension_loaded('imagick')) 
{
    print_log("Error : imagick extension is not loaded.");
    die();
}

/* check php.ini value like upload_max_filesize or post_max_size, throw
warning if limit is set */

check_php_config();

if (empty($_POST) || empty($_FILES))
{
    print_log("Error: Form data is empty. Abort");
    die();
}

if (isset($_POST["rename"]) && !empty($_POST["rename"])) 
{
    $rename = $_POST["rename"];
}

$files = $_FILES["image"];
$formats = $_POST["format"];
$side = $_POST["side"];
$sizes = $_POST["size"];
$filenames = $files["name"];
$quality = intval($_POST["quality"]);

if ($side === 'width' || !isset($side) || empty($side))
{
    foreach ($sizes as $size)
    {
        $width[] = $size;
        $height[] = 0;
    }
}
else
{
    foreach($sizes as $size)
    {
        $width[] = 0;
        $height[] = $size;
    }
}

/* we only want the filename without the extension */

foreach ($filenames as &$filename) 
{
    $filename = pathinfo($filename, PATHINFO_FILENAME);
}

function resizeImg($image, int $width, int $height, string $filename)
{
    $cloneImage = $image->clone();
    $cloneImage->resizeImage($width, $height, imagick::FILTER_LANCZOS, 0.5);
    if ($width != 0) $size = $width;
    else $size = $height;
    print_log("Resize $filename to $size");
    ob_flush();
    return $cloneImage;
}

function convertImg($image, string $quality, string $format, string $fileName)
{
    $image->setImageFormat($format);
    print_log("Convert $fileName to $format");
    return $image;
}

/* if resize_images folder already exists, delete it to start with empty directory */

if (file_exists("./resize_images")) 
{
    deleteFiles("./resize_images");
}

/* all new folder hierarchy with new image start at root directory */

createDir("resize_images", base_path("/"));
$resizeImagesFolder = base_path("/resize_images");

/* if we have only one image, don't zip folder, convert image and send it
directly to the client */

$single_file = check_single_file($files["name"], $formats, $sizes);

if ($single_file) 
{
    
    if ($files["error"][0] !== 0) 
    {
        print_log($phpFileUploadErrors[$files["error"][0]]);
        die();
    }
    $image = new Imagick($files["tmp_name"]);
    $image->setImageCompressionQuality($quality);
    $image->setCompressionQuality($quality);

    if (isset($rename) && !empty($rename)) {
        $filename = $rename;
    }
    else {
        $filename = $filenames[0];
    }

    $resizedImg = resizeImg($image, $width[0], $height[0], $filename);
    $convertedImg = convertImg($resizedImg, $quality, $formats[0], $filename);
    $newFullImageName = $filename . "-" . $sizes[0] . "." . $formats[0];

    $imagePath = base_path("/resize_images/" . $newFullImageName);
    $convertedImg->writeImage($imagePath);

    $image->destroy();

    /* empty PHP buffer, and receive only name of new image */

    ob_clean();
    echo $newFullImageName;
} 
else 
{

    /* create zip archive for download after resize/convert */

    $zip = new ZipArchive();
    $zipFilename = "resize_images.zip";
    $zipPath = $resizeImagesFolder . "/" . $zipFilename;

    if (!$zip->open($zipPath, ZipArchive::CREATE)) {
        print_log("Impossible to create zip archives '$zipFilename'");
    }

    /* For each images, do */

    for ($i = 0; $i < count($files["name"]); $i++) {
        if ($files["error"][$i] !== 0) 
        {
            print_log($phpFileUploadErrors[$files["error"][$i]]);
            die();
        }
        $filenameFolder = $filenames[$i] . "-" . $i;
        createDir($filenameFolder, $resizeImagesFolder . "/");

        /* for each format, do */

        for ($k = 0; $k < count($formats); $k++)
        {
            createDir($formats[$k], "./resize_images/$filenameFolder/");
            $formatFolder = "./resize_images/" . $filenameFolder . "/" . $formats[$k] . "/";

            /* for each size, do */

            for ($j = 0; $j < count($sizes); $j++) 
            {

                $image = new Imagick($files["tmp_name"][$i]);
                $image->setImageCompressionQuality($quality);
                $image->setCompressionQuality($quality);

                if (isset($rename) && !empty($rename)) {
                    $filename = $rename;
                }
                else {
                    $filename = &$filenames[$i];
                }

                $newImageName = $filename . "-" . $sizes[$j] . "." . $formats[$k];

                $resizedImg = resizeImg($image, $width[$j], $height[$j], $filename);
                $convertedImg = convertImg($resizedImg, $quality, $formats[$k], $filename);
                $convertedImg->writeImage($formatFolder . $newImageName);
                echo "Resize <b>$filenames[$i]</b> to <b>$newImageName\n";

                if(!$zip->addFile($formatFolder . $newImageName)) 
                {
                    print_log("Impossible to zip file" . $newImageName);
                }

                $image->destroy();
            }
        }
    }
    $zip->close();

    ob_clean();
    echo $zipFilename;
}
