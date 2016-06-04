(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.boot", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.boot.preload",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            create: {
                funcName: "demo.state.boot.create",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            update: {
                funcName: "demo.state.boot.update",
                args: ["{demo.discoveryCat}.game", "{that}"]
            }
        },
        listeners: {
            "onCreate.bootLogMessage": "demo.state.boot.bootLogMessage"
        }
    });

    demo.state.boot.preload = function(game, that) {
        game.load.image("loading", "assets/loading.png")
    };

    demo.state.boot.create = function(game, that) {
        game.state.start("Preload");
    };

    demo.state.boot.update = function(game, that) {

    };

    demo.state.boot.bootLogMessage = function(){
        console.log("%cStarting..", "color: white; color: #fb8c00");
        console.log("%c  " + "%c  " +
            "%c D I S C O V E R Y  C A T " +
            "%c  " + "%c  ",
         "color: white; background-color: #ffe0b2",
          "color: white; background-color: #ffb74d",
           "color: white; background-color: #fb8c00",
            "color: white; background-color: #ffb74d",
             "color: white; background-color: #ffe0b2");
    };

})(jQuery, fluid);
