var path = require('path');

module.exports = {
	entry: "./build.js",
	output: {
		path: "/lib",
		filename: "main.js"
	},
	resolve:{
		alias:{
			'common':path.resolve(__dirname,'./script/public')
		}
	},
	module: {
		loaders: [
            {test: /\.css$/, loader:'style-loader!css-loader'},
            {test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=30000&name=resource/[name].[ext]'},
            {test: /\.string$/, loader: 'html-loader' },
			{
				test: /\.js|\.jsx$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015','react']
				}
			}
		]
	}
};