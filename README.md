# Resize web GUI

Resize one or more images with standard web format. GUI version, can be launched in the browser.

---

<p align="center">
    <img width=90% src="/assets/images/screenshot/resize-web-gui-screenshot.png">
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

### Quick installation on Linux

If you want to setup this locally, you basically need to install `php`, `imagemagick`, `php-zip` and `php-imagick` package, and launch a PHP server.

On debian :

`sudo apt install php php-imagick php-zip`

(php only if you don't already have php on your machine)

You also have to install Image magick :

`sudo apt install imagemagick`

After that, you can launch shell script for quick test and setup.

Make sure it is executable :

`sudo chmod +x dev-start.sh`

Then, you can run :

`./dev-start.sh`

And go to the url : `http://localhost:8090`

You should see the application page. If you have problem to load Imagick library, you get error message when you start resize some images.

The problem with this setup is, you have to restart the development server every time you restart your machine.

To avoid that, you can install Apache server locally, then add the path to the project in apache configuration file (`etc/apache2/sites-available` on Debian). You will also have to edit the `/etc/hosts` file.

### What can be added and improved

- Add **drag-and-drop** interface in HTML form.
- Make embedded window, like the Electron framework, but with PHP
