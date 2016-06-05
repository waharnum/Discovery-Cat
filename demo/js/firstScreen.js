(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.firstScreen", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.firstScreen.preload",
                args: []
            },
            create: {
                funcName: "demo.state.firstScreen.create",
                args: []
            },
            update: {
                funcName: "demo.state.firstScreen.update",
                args: []
            }
        }
    });

    demo.state.firstScreen.preload = function() {

    };

    demo.state.firstScreen.create = function() {

    };

    demo.state.firstScreen.update = function() {

    };

})(jQuery, fluid);
