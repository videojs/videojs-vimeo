## Now fully support VideoJS 4.3.0!

# Video.js - Vimeo Source Support
Allows you to use Vimeo URL as source with [Video.js](https://github.com/zencoder/video-js/).

## How does it work?
Including the script vjs.vimeo.js will add the Vimeo as a tech. You just have to add it to your techOrder option.

Here is 2 examples:
1. using loop
2. using JavaScript events

	<!DOCTYPE html>
	<html>
	<head>
	  <link href="video-js.min.css" rel="stylesheet" />
	</head>
	<body>
	  <video id="vid1" src="" class="video-js vjs-default-skin" controls preload="auto" width="640" height="360" data-setup='{ "techOrder": ["vimeo"], "src": "https://vimeo.com/63186969", "loop": true, "autoplay": false }'>
		  <p>Video Playback Not Supported</p>
		</video>
	  <br />
	  <video id="vid2" src="" class="video-js vjs-default-skin" controls preload="auto" width="640" height="360">
		  <p>Video Playback Not Supported</p>
		</video>
	  
	  <script src="video.js"></script>
	  <script src="vjs.vimeo.js"></script>
	  <script>
	  videojs('vid2', { "techOrder": ["vimeo"], "src": "https://vimeo.com/63186969" }).ready(function() {
	    // You can use the video.js events even though we use the vimeo controls
	    // As you can see here, we change the background to red when the video is paused and set it back when unpaused
	    this.on('pause', function() {
	      document.body.style.backgroundColor = 'red';
	    });
	    
	    this.on('play', function() {
	      document.body.style.backgroundColor = '';
	    });
	    
	    // You can also change the video when you want
	    // Here we cue a second video once the first is done
	    this.one('ended', function() {
	      this.src('http://vimeo.com/79380715');
	      this.play();
	    });
	  });
	  </script>
	</body>
	</html>

## Additional Informations
We cannot hide the Vimeo controls bar, they do not allow it.

## Warning
It will not run properly without a Web server.

##Special Thank You
Thanks to John Hurliman for the original code on the old Video.js