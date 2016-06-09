var request = require('request');
var fs = require('fs');


/**
 * Constructor
 *
 * @param {string} key The ShrinkTheWeb api access key
 * @param {string} secret The ShrinkTheWeb api secret key
 */
var Screenshot = function(key, secret) {
   this.key = key;
   this.secret = secret;
}

/**
 * Take a screenshot of a URL using ShrinkTheWeb's API
 *
 * You can pass a list of options to this method to customize the API
 * call to ShrinkTheWeb. Here is a list of them:
 *
 * - **screen**:   the screen size (viewport): custom screen sizes require "Custom Browser Resolution" upgrade (default: 1024x768)
 * - **size**:     the size of the screenshot: 320x200, 200x150, 120x90, 100x75, 90x68, 75x57 (default: 120x90)
 * - **cache**:    How old in seconds the screenshot could be. 0 means indefinetly old (default: 0)
 * 
 * Custom screen sizes require "Custom Browser Resolution" upgrade.
 * Custom screenshot image sizes require "Full-Length" upgrade.
 * The cache option is not yet supported.
 * 
 * @param  {string}   url      The url to take the screenshot of
 * @param  {string}   file     The file to write the screenshot to
 * @param  {object}   options  The options for the screenshot, see the desciptions
 * @param  {Function} callback The callback to call when the screenshot is done
 */
Screenshot.prototype.screenshot = function(url, file, options, callback) {

	var params = {};

	// defaut options
	var scr = options.screen ? options.screen : '1024x768';
	var type = options.type ? options.type : 'jpg';
	var size = options.size ? options.size : '120x90';
	
	if (options.scr) {
		var scrPcs = options.scr.split("x");
		params.nrx = scrPcs[0];
		params.nry = scrPcs[1];
	}

	if (options.size) {
		var szPcs = options.size.split("x");
		params.xmax = szPcs[0];
		params.ymaz = szPcs[1];
	}

	params.url = encodeURIComponent(url);
   
   	// get website info
   	var options = "http://images.shrinktheweb.com/xino.php?stwu="+this.secret+"&stwaccesskeyid="+this.key;
   	var params_string = [];
   	
   	for (k in params){
   		params_string.push(k + '=' + params[k]);
   	};
   	params_string = params_string.join('&');

   	options += params_string;

	// NOTE: Need to modify this to parse XML and only save if ready
   	// Send request
   	var fileStream = fs.createWriteStream(file);
   	request(options).pipe(fileStream);
   	return fileStream
};

module.exports = Screenshot;