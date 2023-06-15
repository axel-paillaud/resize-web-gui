# TODO List

Inno setup for Windows, Appimage for Linux

- [x] ~~We don't only want zip for multiple images, but also for multiple size or format ( = multiple images also)~~
  
- [x] ~~Find a solution to don't have 109239082398232 line of error.log (maybe create error<date>.log)~~

- [ ] Problem with PHP Timeout set to 30s 

- [x] ~~Catch error file for single image too~~
  
- [x] ~~Instead of output-768.jpg, I thinks its better to keep the original image name~~

- [ ] Find also all "set_timeout" parameters, to set it to infinite 

- [ ] Add favicon 

- [ ] Actual PHP Warning/Error have to be save in error.log file 

- [x] ~~Add code to check if `upload_max_filesize` and `post_max_size` are set to infinite.~~

- ~~[x] Resize by width or height -> only added in HTML, handle it in JavaScript and PHP.~~

- [ ] Make drag and drop files possible.

- [ ] Make "add picture's" btn focusable 

- [x] ~~Issues : When add a lot of images and PHP script abort, resetForm don't remove images in the DOM (or maybe its CSS class ?)~~

~~? Can't reproduce this bug ? -> Its when we have red error message~~

- [x] ~~Sometime, the window "move" when the text take two line instead of one.~~

- [x] ~~Play text animation on resize info to each new text~~

- [x] ~~Rework animation of error message : do the same animation of information text on resize image (remove absolute position)~~

- [x] ~~We have to check if input file is correct image, before update thumbnail. If we add, for example, pdf, we have an empty square~~

- [x] ~~Refacto imgUpdateContainer js function (so ugly)~~ 

- [x] ~~If we have error, like empty form because too much files, in front we see "Done" message, we have to display error.~~

- [x] ~~If we first resize img, not download but reload the page, then download, we don't have thumbnail~~
~~but we can resize. If we resize, we have a display bug with "add picture's" btn + success message.~~
~~Maybe we can empty form on reload ? I have to find a solution to reset only input file.~~

- [x] ~~After resize, we have to flush input files~~

- [x] ~~If we change form after download, it does not reset imgContainer~~

- [x] ~~Sometime, the image is not on the same order between PHP file and imgContainer~~  

- [x] ~~Thumbnails are not deleted in the same order than PHP files~~ 

- [x] ~~Sometime, width is not checked. See that, and by default in PHP api, check it.~~
  - [x] ~~Note : checked by default OK. Now see PHP API~~

- [ ] When we resize image, make all checkbox and radio disable 
