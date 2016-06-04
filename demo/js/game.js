(function($, fluid) {
    "use strict";

    fluid.defaults("demo.discoveryCat", {
        gradeNames: "fluid.phaser.game",
        components: {
            boot: {
                type: "demo.state.boot"
            },
            Preload: {
                type: "demo.state.Preload"
            },
            firstScreen: {
                type: "demo.state.firstScreen"
            }
        },
        listeners: {
            "onCreate.addStates": "demo.discoveryCat.addStates"
        }
    });

    demo.discoveryCat.addStates = function(that) {
        // Add states of the game
        that.game.state.add("boot", that.boot);
        that.game.state.add("Preload", that.Preload);
        that.game.state.add("firstScreen", that.firstScreen);
        // Start the initial state
        that.game.state.start("boot");
    };

})(jQuery, fluid);
