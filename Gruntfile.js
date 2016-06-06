module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: {
                src: ["demo/js/*.js", "src/js/*.js"],
                buildScripts: ["Gruntfile.js"],
                options: {
                    jshintrc: true,
                    force: "true"
                }
            }
        },
        jscs: {
            all: {
                src: ["Gruntfile.js", "src/js/*js", "demo/js/*js"],
                options: {
                    config: ".jscsrc",
                    force: "true"
                }
            }
        },
        watch: {
            all: {
                files: ["demo/**", "src/**"],
                tasks: ["jshint", "jscs"],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    base: "./",
                    port: 8000,
                    hostname: "localhost",
                    livereload: "true",
                    middleware: function(connect, options, middlewares) {
                        middlewares.unshift(function(req, res, next) {
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                res.setHeader('Access-Control-Allow-Methods', '*');
                                return next();
                            });
                        return middlewares;
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    //webserver created using grunt-contrib-connect runs as long as grunt is alive. And to
    //overcome this problem we can use keepalive. But instead what we do is register it as a
    //registerTask along side watch. Watch keeps alive so will grunt-contrib-connect and this
    //also helps us to use livereload feature.
    //livereload in grunt-contrib-connect does not perform live reloading. It is intended to
    //be used in tandem with grunt-contrib-watch or another task that will trigger a live reload
    //server upon files changing.
    //livereload in grunt-contrib-watch injects scripts at the bottom on pages and does its work
    //of looking for changes and as soon as change comes, runs its tasks and livereload scripts.
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-jscs");

    grunt.registerTask("lint", ["jshint", "jscs"]);
    grunt.registerTask("dev", ["connect", "watch"]);

};
