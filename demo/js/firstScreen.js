(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.firstScreen", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.firstScreen.preload",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            create: {
                funcName: "demo.state.firstScreen.create",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            update: {
                funcName: "demo.state.firstScreen.update",
                args: ["{demo.discoveryCat}.game", "{that}"]
            }
        }
    });

    demo.state.firstScreen.preload = function(game, that) {
    };

    demo.state.firstScreen.create = function(game, that) {
        that.add.text(10, 10, 'Wrappers are working', {font: '50px Arial', fill: '#fff'});
    };

    demo.state.firstScreen.update = function(game, that) {

    };

})(jQuery, fluid);
