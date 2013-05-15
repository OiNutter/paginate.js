// paginate.js build tasks

var fs = require('fs'),
	sys = require('util'),
	uglifyjs = require("uglify-js"),
	path = require('path'),
	exec = require('child_process').exec;

namespace('paginate', function(){

	desc('Default build task. Minifies library and creates dist folder.')
	task('build',[],function(){

		if(!fs.existsSync('dist'))
			fs.mkdir('dist')

		var ast = uglifyjs.minify('src/paginate.js'), // parse code and get the initial AST
			output = fs.openSync('dist/paginate.min.js','w+')

		fs.writeSync(output,ast.code)
	})

	desc('Runs PhantomJS tests')
	task('test',[],function(){
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		exec('phantomjs test/runner.coffee',puts)
	})
})
