(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.prelude", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.prelude.preload",
                args: []
            },
            create: {
                funcName: "demo.state.prelude.create",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            update: {
                funcName: "demo.state.prelude.update",
                args: []
            }
        }
    });

    var ratHead;

    demo.state.prelude.preload = function(game) {

    };

    demo.state.prelude.create = function(game, that) {
        // functions
        var fadeInRatHead = function() {
            game.add.tween(ratHead).to({ alpha:1 }, 500, Phaser.Easing.Linear.None, true);
        };
        var headMovement = function() {
            if (ratHead.angle === -18) {
                game.add.tween(ratHead).to({ angle:0 }, 200,
                                            Phaser.Easing.Sinusoidal.InOut, true);
            }else {
                game.add.tween(ratHead).to({ angle:-18 }, 200,
                                            Phaser.Easing.Sinusoidal.InOut, true);
            }
        };
        var ratWalkIn = function() {
            ratHead.alpha = 0;
            var rat = game.add.sprite(300, 310, "ratMoves1", 2);
            rat.anchor.setTo(0.5, 0.5);
            rat.animations.add("run", [0, 1, 2, 3], 10, true);
            rat.play("run");
            game.add.tween(rat).to({ x: 420, y: 540 }, 4000,
                                            Phaser.Easing.Sinusoidal.InOut, true);
        };
        var nextScene = function() {
            game.state.start("prelude2");
        };

        // code
        that.add.sprite(0, 0, "backgrounds1");
        ratHead = game.add.sprite(380, 280, "ratHeads1");
        ratHead.anchor.setTo(0.5, 0.9);
        ratHead.angle = -18;
        ratHead.alpha = 0;
        game.time.events.add(4000, fadeInRatHead, game);
        game.time.events.loop(500, headMovement, game);
        game.time.events.add(8000, ratWalkIn, game);
        game.time.events.add(14000, nextScene, game);
    };

    demo.state.prelude.update = function() {

    };

})(jQuery, fluid);
