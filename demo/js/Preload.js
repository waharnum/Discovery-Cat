(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.Preload", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.Preload.preload",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            create: {
                funcName: "demo.state.Preload.create",
                args: ["{demo.discoveryCat}.game"]
            },
            update: {
                funcName: "demo.state.Preload.update",
                args: []
            }
        }
    });

    demo.state.Preload.preload = function(game, that) {
        // Loading bar to show status of loaded assets
        var loadingBar = that.add.sprite(640, 360, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        that.load.setPreloadSprite(loadingBar);
        // All assets of the game
        game.load.image("firstScreen_oldMap", "assets/firstScreen_oldMap.png");
    };

    demo.state.Preload.create = function(game) {
        game.state.start("firstScreen");
    };

    demo.state.Preload.update = function() {

    };

})(jQuery, fluid);
