# Web Greeter for LightDM

This is a try to update the [Antergos web-greeter](https://github.com/Antergos/web-greeter), following what they left, so all the credits should go with them.

As this is based on the [master release](https://github.com/Antergos/web-greeter/tree/master), which does some API changes, actual themes would need to do changes to work correctly.

## Dependencies
|                       |     arch      |        ubuntu        |       fedora        |       openSUSE        | 
|-----------------------|---------------|----------------------|---------------------|-----------------------|
|**[whither][whither]** | \*install it from source\*
|**liblightdm-gobject** |lightdm        |liblightdm-gobject-dev|lightdm-gobject-devel|liblightdm-gobject-1-0 |
|**pygobject**          |python-gobject |python3-gi            |pygobject3           |python3-gobject        |
> ***NOTE*** Be sure to have [whither][whither] installed from this source

### PIP
You can install the above dependencies with pip. **liblightdm-gobject** should be accesible if you have installed lightdm.
```sh
pip install PyGObject
```

## Download & Install
```sh
git clone https://github.com/JezerM/web-greeter.git
cd web-greeter
sudo make install
```

## Theme Javascript API
[Antergos][Antergos] documentation is no longer available. Although, you can see the man-pages `man web-greeter` for some documentation and explanation. Also, you can explore the provided [themes](./themes) for real use cases.

## Enable features
### Brightness control
To control the brightness inside the greeter, I recommend to use [acpilight][acpilight] replacement for `xbacklight`.

udev rules are needed to be applied before using it. Then, lightdm will need to be allowed to change backlight values, to do so add lightdm user to **video** group: `sudo usermod -a -G video lightdm`

If you don't want to or don't have a compatible device, disable it inside `/etc/lightdm/web-greeter.yml`

### Battery status
`acpi` is the only tool you need (and a battery).

You can disable it inside `/etc/lightdm/web-greeter.yml`

## Debugging
You can run the greeter from within your desktop session if you add the following line to the desktop file for your session located in `/usr/share/xsessions/`: `X-LightDM-Allow-Greeter=true`.

You have to log out and log back in after adding that line. Then you can run the greeter from command line.

Themes can be opened with a debug console if you set `debug_mode` as `true` inside `/etc/lightdm/web-greeter.yml`. Or, you could run the `web-greeter` with the parameter `--debug`. I recommend to use the last one, as it is easier and handy.

```sh
web-greeter --debug
```

> ***Note:*** Do not use `lightdm --test-mode` as it is not supported.

[antergos]: https://github.com/Antergos "Antergos"
[whither]: https://github.com/JezerM/whither "Whither"
[acpilight]: https://gitlab.com/wavexx/acpilight "acpilight"
