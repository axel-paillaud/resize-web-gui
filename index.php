<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/fonts.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Resize Web</title>
</head>
<body>
    <main>
        <h1 class="mb-16">Resize web</h1>
        <form class="form-container" id="form" method="post" enctype="multipart/form-data">
            <div id="add-img" class="add-img-container">
                <img src="assets/images/picture-svgrepo.svg" alt="Add images graphics">
                <label for="image-file" class="btn">
                    <input type="file" id="image-file" name="image-file" class="hidden" accept="image/*" required multiple>
                    + Add picture(s)
                </label>
            </div>
            <label class="label-field m-separate-field" for="rename">Rename output</label>
            <input class="input-field" id="rename" name="rename" type="text"
                placeholder="Not required. If omitted, the images will keep their original names" maxlength="255">
            <!-- Output size start here -->
            <fieldset>
                <legend class="m-separate-field">Output size</legend>
                <div class="checkbox-container">
                    <div>
                        <input type="checkbox" id="size-1920" name="size">
                        <label for="size-1920">1920</label>
                    </div>
                    <div>
                        <input type="checkbox" id="size-1539" name="size">
                        <label for="size-1539">1536</label>
                    </div>
                    <div>
                        <input type="checkbox" id="size-1280" name="size">
                        <label for="size-1280">1280</label>
                    </div>
                    <div>
                        <input type="checkbox" id="size-1024" name="size">
                        <label for="size-1024">1024</label>
                    </div>
                    <div>
                        <input type="checkbox" id="size-768" name="size">
                        <label for="size-768">768</label>
                    </div>
                    <div>
                        <input type="checkbox" id="size-640" name="size">
                        <label for="size-640">640</label>
                    </div>
                </div>
            </fieldset>
            <!-- Output format start here -->
            <fieldset>
                <legend class="m-separate-field">Output format</legend>
                <div class="checkbox-container">
                    <div>
                        <input type="checkbox" id="format-avif" name="format">
                        <label for="format-avif">AVIF</label>
                    </div>
                    <div>
                        <input type="checkbox" id="format-webp" name="format">
                        <label for="format-webp">WebP</label>
                    </div>
                    <div>
                        <input type="checkbox" id="format-png" name="format">
                        <label for="format-png">PNG</label>
                    </div>
                    <div>
                        <input type="checkbox" id="format-jpg" name="format">
                        <label for="format-jpg">JPG</label>
                    </div>
                    <div>
                        <input type="checkbox" id="format-gif" name="format">
                        <label for="format-gif">GIF</label>
                    </div>
                    <div>
                        <input type="checkbox" id="format-svg" name="format">
                        <label for="format-svg">SVG</label>
                    </div>
                </div>
            </fieldset>
            <hr class="my-24">
            <button id="submit" class="submit-btn" disabled>Resize and convert</button>
            <div id="js-error-msg"></div>
            <!--<div id="js-error-msg" class="error-msg">etset<img class="fa-mark" src="assets/images/xmark-solid.svg" alt="x mark to close error message"></div>-->
        </form>
    </main>
    <script src="assets/script.js"></script>
</body>
</html>