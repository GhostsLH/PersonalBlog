//vue.config.js
const TransformPages = require('uni-read-pages')
const {
	webpack
} = new TransformPages()
module.exports = {
	runtimeCompiler: true,
	
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath', 'meta']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		]
	}
}