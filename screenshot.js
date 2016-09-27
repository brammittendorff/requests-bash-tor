var system = require('system');
var useragent = require('random-useragent');
var page = require('webpage').create();

var args = system.args;

var imageWidthAndHeight = [[1024, 768], [1920, 1440], [2560, 1080], [1600, 1200]];
var imageArrayEnd = imageWidthAndHeight.length - 1;
var randomNumber = Math.floor(Math.random() * imageArrayEnd) + 0;

page.clearCookies();
page.viewportSize = {
	width: imageWidthAndHeight[randomNumber][0],
	height: imageWidthAndHeight[randomNumber][1],
};
page.clipRect = {
	top: 0,
	left: 0,
	width: imageWidthAndHeight[randomNumber][0],
	height: imageWidthAndHeight[randomNumber][1]
};

console.log("Width: " + imageWidthAndHeight[randomNumber][0] + " * Height: " + imageWidthAndHeight[randomNumber][1]);

// user agent tricks
page.settings.userAgent = useragent.getRandom();
function setUserAgent(window, userAgent) {
  if (window.navigator.userAgent != userAgent) {
	  var userAgentProp = { get: function () {
				return userAgent;
			}
		};
    try {
      Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
    } catch (e) {
      window.navigator = Object.create(navigator, {
        userAgent: userAgentProp
      });
    }
  }
}
setUserAgent(window, useragent.getRandom());

if (args.length === 1) {
	console.log('Try to pass some arguments when invoking this script!');
} else {
	var date = new Date().getTime();
	page.open(args[1] , function () {

		console.log(window.navigator.userAgent);

		page.render('images/' + date + '.jpeg', {
			format: 'jpeg',
			quality: '50'
		});
		phantom.exit();
	});
}
