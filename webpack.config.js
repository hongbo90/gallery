var webpack = require('webpack');

module.exports = {
	entry:'./index.jsx',
	output:{
		path:__dirname,
		filename:'bundle.js'
	},
	devServer:{
		historyApiFallback:true,
		hot:true,
		inline:true
	},
	module:{
		loaders:[
			{
				test:/\.jsx$/,
				loader:'babel-loader',
				exclude:/node_modules/,
				query:{
					presets:['es2015','react']
				}
			},
			{
				test:/\.scss$/,
				loaders:['style-loader','css-loader','sass-loader']
			},
			{
				test:/\.json$/,
				loader:'json-loader'
			},
			{
				test:/\.(png|jpg|woff|woff2|svg|eot|ttf)$/,
				loader:'url-loader?limit=8192'
			}
		]
	},
	resolve:{
		extensions:['.js','.jsx']
	}
}