# Web Page Screenshot module for NodeJS

NOTE: This is NOT a working module yet. It is just a concept placeholder and will be developed as time permits or demand increases. If you are interested in this module, please let us know and we will bump it up in priority. Feel free to contribute to its development! :)

This module lets you easily use the [ShrinkTheWeb](http://www.shrinktheweb.com) APIs in node.js to create screenshots of web pages.
You will need an api and secret key once you register and login: http://www.shrinktheweb.com/user/register

## Installation

Using `npm`:

	npm install web-page-screenshot

You can also clone this repository into your `node_modules` directory.

## Examples

### Take a screenshot

```js
var shrinktheweb = require('web-page-screenshot');
var screenshot = new shrinktheweb('your_access_key', 'your_secret_key');

web-page-screenshot.screenshot('http://www.google.com', 'google.jpg').on('close', function(file){
	if (file) {
		console.log('The file ' + file + ' was written correctly');
	} else {
		console.log('Error');
	}
});
```

## Available methods

### screenshot

Take a screenshot

You can pass a list of options to this method to customize the API
call to Snapito. Here is a list of them:

- **screen**:   the screen size (viewport): 1024x768 (default: 1024x768)
- **size**:     the size of the screenshot: 320x200, 200x150, 120x90, 100x75, 90x68, 75x57 (default: 120x90)
- **cache**:    How old in seconds the screenshot could be. 0 means indefinetly old (default: 0)

Custom screen sizes require "Custom Browser Resolution" upgrade.
Custom screenshot image sizes require "Full-Length" upgrade.
The cache option is not yet supported.