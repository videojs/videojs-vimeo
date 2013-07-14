# Video.js - Vimeo Source Support
Allows you to use Vimeo URL as source with [Video.js](https://github.com/zencoder/video-js/).

## How does it work?
Including the script vjs.vimeo.js will add the Vimeo as a tech. You just have to add it to your techOrder option.

Here is an example:

	<link href="../lib/video-js.css" rel="stylesheet">
	<script src="../lib/video.js"></script>
	<script src="../vjs.vimeo.js"></script>
	<video id="vid1" src="" class="video-js vjs-default-skin" controls preload="auto" width="640" height="360" data-setup='{ "techOrder": ["vimeo"], "src": "https://vimeo.com/63186969", "loop": true, "autoplay": false }'>
	  <p>Video Playback Not Supported</p>
	</video>

## Additional Informations
We cannot hide the Vimeo controls bar, they do not allow it.

## Warning
It will not run properly without a Web server.

##Special Thank You
Thanks to John Hurliman for the original code on the old Video.js