<?php
include_once "functions.php";
include_once "file_error_code.php";

if (isset($_POST["rename"]) && !empty($_POST["rename"])) {
    $rename = $_POST["rename"];
} else {
    $rename = "output";
}

$files = $_FILES["image"];
$formats = $_POST["format"];
$sizes = $_POST["size"];
$filenames = $files["name"];
$quality = intval($_POST["quality"]);

/* we only want the filename without the extension */
foreach ($filenames as &$filename) {
    $filename = pathinfo($filename, PATHINFO_FILENAME);
}

function resizeImg($image, int $size, string $filename)
{
    $cloneImage = $image->clone();
    $cloneImage->resizeImage($size, 0, imagick::FILTER_LANCZOS, 0.5);
    print_log("Resize $filename to $size");
    return $cloneImage;
}

function convertImg($image, string $quality, string $format, string $fileName)
{
    /* $image->setCompressionQuality($quality); */
    $image->setImageFormat($format);
    print_log("Convert $fileName to $format");
    return $image;
}

if (!extension_loaded('imagick')) {
    print_log("Error : imagick extension is not loaded.");
    die();
}

/* if resize_images folder already exists, delete it to start with empty directory */
if (file_exists("./resize_images")) {
    deleteFiles("./resize_images");
}

/* all new folder hierarchy with new image start at root directory */
createDir("resize_images", base_path("/"));
$resizeImagesFolder = base_path("/resize_images");

/* if we have only one image, don't zip folder, convert image and send it
directly to the client */
if (count($files["name"]) === 1) {
    $image = new Imagick($files["tmp_name"]);
    $image->setImageCompressionQuality($quality);
    $image->setCompressionQuality($quality);

    $resizedImg = resizeImg($image, $sizes[0], $rename);
    $convertedImg = convertImg($resizedImg, $quality, $formats[0], $rename);
    $newImageName = $rename . "-" . $sizes[0] . "." . $formats[0];

    $imagePath = base_path("/resize_images/" . $newImageName);
    $convertedImg->writeImage($imagePath);

    $image->destroy();

    /* empty PHP buffer, and receive only name of new image */
    ob_clean();
    header('Content-type: application/json');
    echo $newImageName;
} else {

    /* create zip archive for download after resize/convert */
    $zip = new ZipArchive();
    $zipFilename = "resize_images.zip";
    $zipPath = $resizeImagesFolder . "/" . $zipFilename;

    if (!$zip->open($zipPath, ZipArchive::CREATE)) {
        print_log("Impossible to create zip archives '$zipFilename'");
    }

    /* For each images, do */
    for ($i = 0; $i < count($files["name"]); $i++) {
        if ($files["error"][$i] !== 0) {
            print_log($phpFileUploadErrors[$files["error"][$i]]);
        } else {
            $image = new Imagick($files["tmp_name"]);
            $image->setImageCompressionQuality($quality);
            $image->setCompressionQuality($quality);

            $filenameFolder = $filenames[$i] . "-" . $i;
            createDir($filenameFolder, "./resize_images/");
            //$zip->addFile("./resize_images/$filenameFolder", $zipPath);

            /* for each format, do */
            for ($k = 0; $k < count($formats); $k++) {
                createDir($formats[$k], "./resize_images/$filenameFolder/");
                $formatFolder = "./resize_images/$filenameFolder/$formats[$k]/";

                /* for each size, do */
                for ($j = 0; $j < count($sizes); $j++) {
                    $resizedImg = resizeImg($image, $sizes[$j], $rename);
                    $convertedImg = convertImg($resizedImg, $quality, $formats[$k], $rename);
                    $convertedImg->writeImage($formatFolder . "$rename-$sizes[$j].$formats[$k]");
                }
            }
            $image->destroy();
        }
    }

    /*     $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($resizeImagesFolder));
    foreach ($files as $file) {
        // ignore empty folder
        if (!$file->isDir()) {
            print_log($file);
            // obtenir le chemin du fichier source
            $filePath = $file->getrealPath();
            print_log("here is filepath for source file : " . $filePath);

            // créer un chemin relatif pour l'archive ZIP
            $relativePath = substr($filePath, strlen($resizeImagesFolder) + 1);
            print_log("here is relative path for zip archive : " . $relativePath);

            // ajouter le fichier à l'archive ZIP
            $zip->addFile($filePath, $relativePath);
            print_log($zip);
        }
    } */
}
