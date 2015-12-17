/* global process */
/*
 * Split video based on an start time and duration
 * 
 * See http://pythonhackers.com/p/fluent-ffmpeg/node-fluent-ffmpeg
 */

(function () {
	
	var ffmpeg = require('fluent-ffmpeg');
	var moment = require('moment');
	require("moment-duration-format");
	
	function baseName(str) {
		var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    	if(base.lastIndexOf(".") != -1) {
			base = base.substring(0, base.lastIndexOf("."));
		}     
   		return base;
	}
	
	var args = process.argv.slice(2);
	
	if (args.length !== 4) {
		console.error('Expected three arguments: infile start duration outfile');
		return;
	}
	
	var inputFilename = args[0];
	var start = args[1];
	var duration = args[2];
	var outputFilename = args[3];
	
  	console.log('Input ... ' + inputFilename + ' : ' + start + '-->' + duration);
	console.log('Output ... ' + outputFilename);
	
	var t0 = Date.now();    
	ffmpeg(inputFilename)

		// Split Video
		.seekInput(start)
		.output(outputFilename)
		.videoCodec('copy')
  		.duration(duration)
		  
		.on('error', function(err) {
    		console.log('An error occurred: ' + err.message);
		})	
		.on('progress', function(progress) { 
			//console.log('... frames: ' + progress.frames);
	 	})
		.on('end', function() { 
			var t1 = Date.now();
			var delta = moment.duration(t1-t0, "hours").format("hh:mm:ss");
    		console.info('--> FFMPEG completed: ' + delta);
		})
		.run();

})();