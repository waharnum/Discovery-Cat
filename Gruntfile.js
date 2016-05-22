module.exports = function(grunt){

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            files: ["Gruntfile.js","src/*.js"],
            options: {
                jshintrc: true,
                ignores: ["**/lib/*.js", "node_modules/**"]
            }
        },
        watch: {
            files: ["<%= jshint.files %>"],
            tasks: ["jshint"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTasks("default", ["jshint"]);

};