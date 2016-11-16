var outputDir = 'C:/dmsg/Public/fruit/pc/dist';
var entryPath = 'C:/dmsg/Public/fruit/pc/project/src/view';
var outputDir2 = 'C:/dmsg/Public/fruit/pc/otherDist';
var entryPath2 = 'C:/dmsg/Public/fruit/pc/project/src/otherView';
var chunkPath = '/Public/fruit/pc/dist/';
var dev = false;
var publicPath;

if (dev) {
	publicPath = 'webpack.config.js';
} else {
	publicPath = 'C:/Users/Administrator/Desktop/test/1/webpack.config.js';
}


var fs = require("fs");
var buf = new Buffer(10240);
fs.open('test.js', 'rs', function(err, fd) {
	if (err) {
		return console.error(err);
	}

	fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
		if (err) {
			console.log(err);
		}
		var all = buf.slice(0, bytes).toString();
		all = all.trim();
		all = all.replace("outputDirFlag", outputDir);
		all = all.replace('entryPathFlag', entryPath);
		all = all.replace('outputDir2Flag', outputDir2);
		all = all.replace('entryPath2Flag', entryPath2);
		all = all.replace('chunkPathFlag', chunkPath);

		fs.writeFile(publicPath, all, function(err) {
			if (err) {
				return console.error(err);
			}


		})
		fs.close(fd, function(err) {
			if (err) {
				console.log(err);
			}

		});
	})

});