const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const { NODE_ENV = 'development', PORT = 8080 } = process.env;

const config = {

	entry: {
		client: [
			'./src/client/boot'
		]
	},

	output: {
		path: path.join(__dirname, 'lib', 'static'),
		filename: 'assets/entry.[name].[hash].js',
		chunkFilename: 'assets/dependancy.[id].[chunkhash].js',
		publicPath: '/'
	},

	module: {
		rules: [
			{ test: /\.jsx?$/, exclude: [ /node_modules/ ], use: [ 'babel-loader' ] },
			{ test: /\.scss$/, use: [
				{ loader: 'style-loader', options: { singleton: true } },
				{ loader: 'css-loader', options: { minimize: false, modules: true } },
				{ loader: 'sass-loader' }
			] },
			{ test: /\.png$/, use: [ { loader: 'file-loader', options: { name: 'assets/[hash].[ext]' } } ] }
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({ // so react will build in 'production mode'
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		}),
		new HtmlWebpackPlugin({
			chunks: ['client'],
			title: 'App',
			filename: 'index.html',
			template: 'src/client/index.ejs'
		})
	],

	resolve: {
		extensions: [ '.js', '.json', '.scss', '.jsx' ]
	},

	devServer: {
		historyApiFallback: true
	}

};

if( NODE_ENV === 'production' ) {
	configs.plugins.push(new webpack.optimize.UglifyJsPlugin({
		sourceMap: true
	}));
	configs.plugins.push(new CompressionPlugin({
		asset: '[path].gz[query]',
		algorithm: 'gzip',
		test: /\.js$|\.html$/,
		threshold: 10240,
		minRatio: 0.8
	}));
}

module.exports = config;