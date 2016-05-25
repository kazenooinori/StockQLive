var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    context: __dirname + "/client",
    entry: {
        chatroom: ['./chatroom.jsx'],//, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
        liveroom: ['./liveroom.jsx'],//, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
        timeline: ['./timeline.jsx'],//, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
        'subject-list': ['./subject-list.jsx'],//, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
    },
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: "[name].js",
        // publicPath: __dirname + "/public/",
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx*$/,
                exclude: [/node_modules/, /.+\.config.js/],
                loaders: ['babel'],
                // loader: 'babel',
            },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
            // }
        ]
    },
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
    ],
};
