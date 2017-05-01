/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-26 11:15:45
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: webpack.config.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-02 03:02:38
 */



var path = require('path');

module.exports = {
	entry: "./script/app.jsx",
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
