# TODO List

- Grid system to display thumbnails images inside the light red container
" Add picture(s)".
    - When only one image, display one big image that take all the height of the
    container
    - When we have multiple image, display all in a grid that fit inside the
    light red container

When we click on submit button :
    - Do again a checkInput to see if at least one checkbox in each field is checked,
    and if at least one image is upload.
    - Add a check valid image to see if the file is really an image file
    - create formData object, add all form field inside the formData
    - Send it to PHP backend

Check if we can add an entire folder with file to zipArchive. If, create zipArchive
at the end of the php script, and add the folder and subfolders to it.
If not, create zipArchive at the beginning of nested loop to convert img, and add
each new folder and file to zipArchive.

To get only data image, instead of write on disk : $imageData = $image->getImageBlob();

Inno setup for Windows, Appimage for Linux

- [x] ~~We don't only want zip for multiple images, but also for multiple size or format ( = multiple images also)~~
  
- [ ] Find a solution to don't have 109239082398232 line of error.log (maybe create error<date>.log)

- [ ] Catch error file for single image too
  
- [ ] Instead of output-768.jpg, I thinks its better to keep the original image name