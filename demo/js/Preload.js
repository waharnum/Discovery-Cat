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
        var loadingBar = that.add.sprite(620, 360, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        that.load.setPreloadSprite(loadingBar);
        // Load all assets of the game
        // prelude assets
        game.load.image("firstScreen_oldMap", "assets/firstScreen_oldMap.png");
        game.load.image("backgrounds1", "assets/background-scene-1.png");
        game.load.image("ratHeads1", "assets/ratHead-scene-1.png");
        game.load.spritesheet("greenButton", "assets/gb.png", 200, 49);
        game.load.spritesheet("ratMoves1", "assets/ratMove-scene-1.png", 300, 202);
        // prelude2 assets
        game.load.image("yarnBalls2", "assets/yarnBall-scene-2.png");
        game.load.image("backgrounds2", "assets/background-scene-2.png");
        game.load.spritesheet("ratMoves2", "assets/ratMove-scene-2.png", 300, 202);
        game.load.spritesheet("catMoves2", "assets/catMove-scene-2.png", 400, 299);
        game.load.spritesheet("catReactions2", "assets/catReaction-scene-2.png", 400, 299);
    };

    demo.state.Preload.create = function(game) {
        game.state.start("prelude");
    };

    demo.state.Preload.update = function() {

    };

})(jQuery, fluid);
