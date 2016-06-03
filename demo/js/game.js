(function($, fluid) {
    "use strict";

    fluid.defaults("demo.discoveryCat", {
        gradeNames: "fluid.phaser.game",
        components: {
            firstScreen: {
                type: "demo.state.firstScreen"
            }
        },
        listeners: {
            "onCreate.addStates": "demo.discoveryCat.addStates"
        }
    });

    demo.discoveryCat.addStates = function(that) {
        console.log(that.firstScreen);
        that.game.state.add("firstScreen", that.firstScreen);
        that.game.state.start("firstScreen");
    };

})(jQuery, fluid);
