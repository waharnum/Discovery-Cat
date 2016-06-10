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
            prelude: {
                type: "demo.state.prelude"
            },
            prelude2: {
                type: "demo.state.prelude2"
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
        that.game.state.add("prelude", that.prelude);
        that.game.state.add("prelude2", that.prelude2);
        // Start the initial state
        that.game.state.start("boot");
    };

})(jQuery, fluid);
