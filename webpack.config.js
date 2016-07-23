"use strict";

const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const CLIENT_SRC = "./src";
const CLIENT_TAR = "./public/assets";

module.exports = {
    context: path.resolve(CLIENT_SRC),

    entry: {
        vendor: [ "jquery" ],
        rpm: [ "./rpm/index.js", "./rpm/resource/index.less" ]
    },

    output: {
        path: path.resolve(CLIENT_TAR),
        publicPath: "/assets",
        filename: "[name]/bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
        }),
        new ExtractTextPlugin("./[name]/resource/bundle.css")
    ],

    devServer:
    {
        proxy: {
            "/api/*": {
                target: "http://localhost:3000/",
                host: "localhost",
                port: "3000",
                secure: false
            }
        }
    }
};
