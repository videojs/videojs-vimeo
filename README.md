# Vimeo Playback Technology<br />for [Video.js](https://github.com/videojs/video.js)

## Install
You can use bower (`bower install videojs-vimeo`), npm (`npm install videojs-vimeo`) or the source and build it using `npm run build`. Then, the only file you need is dist/Vimeo.min.js.

## Version Note
Use branch `vjs4` if you still using old VideoJS `v4.x`.

## Example
```html
<!DOCTYPE html>
<html>
<head>
  <link type="text/css" rel="stylesheet" href="../node_modules/video.js/dist/video-js.min.css" />
</head>
<body>
  <video
    id="vid1"
    class="video-js vjs-default-skin"
    controls
    autoplay
    width="640" height="264"
    data-setup='{ "techOrder": ["vimeo"], "sources": [{ "type": "video/vimeo", "src": "https://vimeo.com/153979733"}] }'
  >
  </video>

  <script src="../node_modules/video.js/dist/video.min.js"></script>
  <script src="../dist/Vimeo.min.js"></script>
</body>
</html>
```

See the examples folder for more

## How does it work?
Including the script Vimeo.min.js will add the Vimeo as a tech. You just have to add it to your techOrder option. Then, you add the option src with your Vimeo URL.

It supports:
- vimeo.com as well as youtu.be
- Regular URLs: https://vimeo.com/153979733

## Options
It supports every regular Video.js options. Additionally, you can change any [Vimeo parameter](https://developers.google.com/vimeo/player_parameters?hl=en#Parameters). Here is an example of setting the `iv_load_policy` parameter to `1`.

```html
<video
  id="vid1"
  class="video-js vjs-default-skin"
  controls
  autoplay
  width="640" height="264"
  data-setup='{ "techOrder": ["vimeo"], "sources": [{ "type": "video/vimeo", "src": "https://vimeo.com/153979733"}], "vimeo": { "iv_load_policy": 1 } }'
>
</video>
```

### Vimeo controls
Because `controls` is already a Video.js option, to use the Vimeo controls, you must set the `ytControls` parameter.

```html
<video
  id="vid1"
  class="video-js vjs-default-skin"
  controls
  autoplay
  width="640" height="264"
  data-setup='{ "techOrder": ["vimeo"], "sources": [{ "type": "video/vimeo", "src": "https://vimeo.com/153979733"}], "vimeo": { "ytControls": 2 } }'
>
</video>
```

##Special Thank You
Thanks to Steve Heffernan for the amazing Video.js and to John Hurliman for the original version of the Vimeo tech

## Change Log

- Added with npm package dependency
- Fixed bug: Video displayed outside of player frame #70
