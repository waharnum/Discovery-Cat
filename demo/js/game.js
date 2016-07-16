(function($, fluid) {
    "use strict";

    fluid.defaults("demo.discoveryCat", {
        gradeNames: "fluid.phaser.game",
        components: {
            prefModel: {
                type: "demo.prefModel"
            },
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
            },
            langPref: {
                type: "demo.state.langPref"
            },
            houseEntry: {
                type: "demo.state.houseEntry"
            },
            cutScene: {
                type: "demo.state.cutScene"
            },
            house: {
                type: "demo.state.house"
            },
            sizePref: {
                type: "demo.state.sizePref"
            },
            colorPref: {
                type: "demo.state.colorPref"
            },
            simplifyPref: {
                type: "demo.state.simplifyPref"
            },
            textToSpeech: {
                type: "fluid.textToSpeech"
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
        that.game.state.add("langPref", that.langPref);
        that.game.state.add("houseEntry", that.houseEntry);
        that.game.state.add("cutScene", that.cutScene);
        that.game.state.add("house", that.house);
        that.game.state.add("sizePref", that.sizePref);
        that.game.state.add("colorPref", that.colorPref);
        that.game.state.add("simplifyPref", that.simplifyPref);
        // Start the initial state
        that.game.state.start("boot");
    };

})(jQuery, fluid);
