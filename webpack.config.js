var webpack = require("webpack");
module.exports = {
    context: __dirname + "/client",
    entry: {
        chatroom: "./chatroom.jsx",
        // home: "./home.jsx",
    },
    output: {
        path: __dirname + "/public/js",
        filename: "[name].js",
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx*$/,
                exclude: [/node_modules/, /.+\.config.js/],
                loader: 'babel',
            },
        ]
    }
};
