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

We need to set in php.ini file `upload_max_filesize` to infinite value (0),
but also dont forget `post_max_size` , which is about upload multiple file

Check if we can add an entire folder with file to zipArchive. If, create zipArchive
at the end of the php script, and add the folder and subfolders to it.
If not, create zipArchive at the beginning of nested loop to convert img, and add
each new folder and file to zipArchive.

To get only data image, instead of write on disk : $imageData = $image->getImageBlob();

Inno setup for Windows, Appimage for Linux

- [x] ~~We don't only want zip for multiple images, but also for multiple size or format ( = multiple images also)~~
  
- [ ] Find a solution to don't have 109239082398232 line of error.log (maybe create error<date>.log)

- [ ] We also have to send message to front if errors appear 

- [x] ~~Catch error file for single image too~~
  
- [x] ~~Instead of output-768.jpg, I thinks its better to keep the original image name~~

- [ ] Find also all "set_timeout" parameters, to set it to infinite 

- [x] Add code to check if `upload_max_filesize` and `post_max_size` are set to infinite.

- ~~[x] Resize by width or height -> only added in HTML, handle it in JavaScript and PHP.~~

- [ ] Make drag and drop files possible.

- [ ] Make "add picture's" btn focusable 

- [x] ~~Sometime, the window "move" when the text take two line instead of one.~~

- [ ] Play text animation on resize info to each new text 

- [ ] Rework animation of error message : do the same animation of information text on resize image (remove absolute position)

- [ ] Verify maximum PHP execution time, show error if we have one

- [ ] If we have error, like empty form because too much files, in front we see "Done" message, we have to display error.

- [x] ~~If we first resize img, not download but reload the page, then download, we don't have thumbnail~~
~~but we can resize. If we resize, we have a display bug with "add picture's" btn + success message.~~
~~Maybe we can empty form on reload ? I have to find a solution to reset only input file.~~

- [x] ~~After resize, we have to flush input files~~

- [x] ~~If we change form after download, it does not reset imgContainer~~

- [ ] Sometime, the image is not on the same order between PHP file and imgContainer  

- [x] Sometime, width is not checked. See that, and by default in PHP api, check it.
  - [ ] Note : checked by default OK. Now see PHP API


If not, throw an error. 
