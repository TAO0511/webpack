var webpack =require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin'); //生成html文件
var extractTextPlugin = require('extract-text-webpack-plugin');//分离css文件
module.exports = {
	// devtool:'eval-source-map', //配置生成Source Maps，选择合适的选项
	entry:__dirname +"/app/main.js", //源文件即被打包的文件
	output:{
		path:__dirname,
		filename:"public/[name]-[hash].js" //打包后的输出文件
	},
	module:{
		loaders:[
			{
				test:/\.json$/,
				loader:'json-loader'
			},
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader'
			},
			{
				test:/\.css$/,
				loader:extractTextPlugin.extract('style', 'css')
			}
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			filename:"index.html",
			template:'app/index.tmpl.html',
			inject:false
		}),//生成html文件
		new webpack.optimize.UglifyJsPlugin(),//压缩js脚本
		new extractTextPlugin("public/[name]-[hash].css"),
	]
}