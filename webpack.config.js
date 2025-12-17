const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = (env, argv) => {
	const isDevelopment = argv.mode === "development";
	// Add a live reload option, defaulting to true if not specified
	const enableLiveReload = true;

	// Define plugins array
	const plugins = [
		new MiniCssExtractPlugin({
			filename: "css/theme.css",
		}),
		new CopyPlugin({
			patterns: [
				{ from: "css/login-styles.css", to: "css", noErrorOnMissing: true },
				{ from: "css/remixicon.css", to: "css", noErrorOnMissing: true },

				// Copy static JS files
				{ from: "js/document-handler.js", to: "js", noErrorOnMissing: true },
				{
					from: "js/custom-user-activity-api.js",
					to: "js",
					noErrorOnMissing: true,
				},

				// Copy vendor files with their source maps
				{
					from: "js/bootstrap.bundle.min.js*",
					to: "js/[name][ext]",
					noErrorOnMissing: true,
				},
				{
					from: "js/bootstrap.min.js*",
					to: "js/[name][ext]",
					noErrorOnMissing: true,
				},
				{
					from: "js/owl.carousel.min.js*",
					to: "js/[name][ext]",
					noErrorOnMissing: true,
				},
				{
					from: "js/slick.min.js*",
					to: "js/[name][ext]",
					noErrorOnMissing: true,
				},
				{ from: "js/aos.js*", to: "js/[name][ext]", noErrorOnMissing: true },
			],
		}),
	];

	// Conditionally add BrowserSync plugin if live reload is enabled
	if (enableLiveReload) {
		plugins.push(
			new BrowserSyncPlugin({
				// Browse to http://localhost:3000/ during development
				host: "localhost",
				port: 3000,
				// Proxy to your MAMP URL
				proxy: "http://localhost/soulresort/",
				// Watch these files for changes
				files: ["./**/*.php", "./css/**/*.css", "./js/**/*.js"],
				// Prevent BrowserSync from reloading the page when webpack rebuilds
				injectChanges: true,
				notify: true,
			})
		);
	}

	return {
		mode: isDevelopment ? "development" : "production",
		entry: {
			theme: "./src/js/theme.js",
			styles: "./src/sass/theme.scss",
		},
		output: {
			filename: "js/[name].js",
			path: path.resolve(__dirname),
		},
		devtool: isDevelopment ? "source-map" : false,
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: "babel-loader",
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								sourceMap: isDevelopment,
							},
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: isDevelopment,
							},
						},
						{
							loader: "sass-loader",
							options: {
								implementation: require("sass"),
								sourceMap: isDevelopment,
							},
						},
					],
				},
				// Handle images
				{
					test: /\.(png|jpg|jpeg|gif|svg)$/i,
					type: "asset/resource",
					generator: {
						filename: "assets/images/[name][ext]",
					},
				},
				// Handle fonts
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: "asset/resource",
					generator: {
						filename: "assets/fonts/[name][ext]",
					},
				},
			],
		},
		plugins: plugins,
		resolve: {
			modules: [path.resolve(__dirname, "node_modules")],
		},
		watchOptions: {
			ignored: /node_modules/,
			aggregateTimeout: 300,
			poll: 1000,
		},
	};
};
