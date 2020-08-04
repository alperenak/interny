const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mainJsOutputName = 'main' + (process.env.NODE_ENV === 'production' ? '?crossCheck=' + new Date().getTime() : '');

let entry = {
    [mainJsOutputName]:
        process.env.NODE_ENV === 'development' ?
            [
                "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
                'src/index.js'
            ] :
            'src/index.js'
};

let webpackConfig = {
    mode: 'production',
    entry: entry,
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        fallback: 'url-loader',
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ]
            },
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    "sass-loader"
                ]
            },
            {parser: {system: false}}
        ],
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: [".js", ".css", ".json"],
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: path.resolve(__dirname, 'dist') + "/index.html"
        }),
        new webpack.EnvironmentPlugin({'NODE_ENV': "production"}),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};

if (process.env.NODE_ENV === 'development') {
    webpackConfig.mode = "development";
    webpackConfig.devtool = "inline-source-map";
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}
else {
    webpackConfig.devtool = false;
}

module.exports = webpackConfig;
