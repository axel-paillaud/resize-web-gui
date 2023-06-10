# Resize web GUI

Resize one or more images with standard web format. GUI version, can be launched in the browser.

---

<p align="center">
    <img width=100% src="/assets/images/screenshot/resize-web-gui-screenshot.png">
</p>

> Resize web GUI is a onepage application which can convert one or mores images with
> standard web format, like png, jpeg, webp, avif and svg, and resize it to
> common responsive web size : 1920, 1536, 1280, 1024, 768, 640.

You can resize one or more images :

<p align="center">
    <img width="400" src="/assets/images/screenshot/resize-web-single-image.png" alt="Only one image added by the user">
    <img width="400" src="/assets/images/screenshot/resize-web-more-images.png" alt="A lot of images added by the user">
</p>
<sup>Thanks to Laracasts for the illustrations</sup>

Once you click on the "Resize and convert" button, you have a dynamic refresh of images grid, for each images being resized

<p align="center">
    <img width="400" src="/assets/images/screenshot/resize-web-start-resize.png" alt="Images start resizing">
    <img width="400" src="/assets/images/screenshot/resize-web-start-resize-2.png" alt="Images start resizing">
</p>

After that, you have a zip file if you upload multiples images, or directy a single image if you add only one.

For multiple images: All images are stored in separate folders. In these folders: one folder per format, then all sizes in the format folder.

<p align="center">
    <img width="400" src="/assets/images/screenshot/resize-web-all-folder.png" alt="Example of image organization">
    <img width="400" src="/assets/images/screenshot/resize-web-all-format.png" alt="Example of image organization">
</p>

### Installation on Linux

If you want to setup this locally, you basically need to install `php-imagick` package, and launch a PHP server.

On debian :

`sudo apt install php php-imagick`

(php only if you don't already have php on your machine)

You also have to install Image magick :

`sudo apt install imagemagick`

Then add this line to your `/etc/php/php.ini` config file, below all the `;extention=foobar` section (the path can be different, im on arch linux btw) :

`extension=imagick`

The quickest way is to start PHP CLI server (development php server).

Go to the root folder of the project, and run :

`php -S localhost:8080`

(You can change the port to your need) Then go to `http://localhost:8080`

You should see the application page. If you have problem to load Imagick library, you get error message when you start resize some images.

The problem with this setup is, you have to restart the development server every time you restart your machine.

To avoid that, you can install Apache server locally, then add the path to the project in apache configuration file. You will also have to edit the `/etc/hosts` file. (more on that later).


### What can be added and improved

- Add **drag-and-drop** interface in HTML form.
- Setup a php.ini file locally to the project, add `extension=imagick` and set all the php configuration file to maximum (file upload, timeout ...)
- The PHP script is OK but the JavaScript is messy.