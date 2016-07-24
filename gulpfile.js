"use strict";

const gulp = require("gulp");
const gutil = require("gulp-util");
const log = gutil.log;
const rimraf = require("rimraf");
const webpack = require("webpack");

const CLIENT_SRC = "./src";
const CLIENT_TAR = "./public/assets";


gulp.task("default", [ "dist" ]);

gulp.task("clean", cb => {
    rimraf(CLIENT_TAR, cb);
});

gulp.task("dist", [ "clean" ], cb => {
    const config = require("./webpack.config.js");
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    );
    const compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) throw new gutil.PluginError("webpack", err);
        log("[webpack]", stats.toString());
    });
});

gulp.task("dev", [ "clean" ], cb => {
    const config = require("./webpack.config.js");
    const compiler = webpack(config);

    const app = require("./lib/app");
    const server = require("./lib/server");

    const PORT = 3000;
    app.set("port", PORT);
    server.listen(PORT);

    compiler.watch({
        aggregateTimeout: 300,
        poll: true
    }, (err, stats) => {
        if (err) throw new gutil.PluginError("webpack", err);
        log("[webpack]", stats.toString());
    });
});
