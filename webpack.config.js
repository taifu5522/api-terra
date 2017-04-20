module.exports = {
	entry: "./build.js",
	output: {
		path: "/lib",
		filename: "main.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'jsx-loader'
			},
			{
				test: /\.css$/,
				loader: "style!css"
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015','react']
				}
			}
		]
	}
};