var webpack = require("webpack");
module.exports = {
    context: __dirname + "/client",
    entry: {
        app: "./app.jsx",
        home: "./home.jsx",
        "request-list": "./request-list.jsx",
    },
    output: {
        path: __dirname + "/public/js",
        filename: "[name].js",
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    // plugins: [
    //     new webpack.optimize.OccurenceOrderPlugin(),
    //     new webpack.HotModuleReplacementPlugin(),
    //     new webpack.NoErrorsPlugin()
    // ],
    module: {
        loaders: [
            {
                test: /\.jsx*$/,
                exclude: [/node_modules/, /.+\.config.js/],
                loader: 'babel',
            },
            // {
            //     include: [
            //         __dirname + "/public/js"
            //     ],
            //     exclude: /node_modules/,
            //     loader: 'babel',
            // },
            // {
            //     test: /\.html$/,
            //     loader: "file?name=[name].[ext]"
            // }
        ]
    }
};
