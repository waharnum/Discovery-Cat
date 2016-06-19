(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.prelude2", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.prelude2.preload",
                args: []
            },
            create: {
                funcName: "demo.state.prelude2.create",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            update: {
                funcName: "demo.state.prelude2.update",
                args: []
            }
        }
    });



    demo.state.prelude2.preload = function(game) {

    };

    demo.state.prelude2.create = function(game, that) {
        // Tip: Arrange functions in the order they will play write time also
        // functions
        var ratWalkOut = function() {
            game.add.tween(yarn).to({ y: 592 }, 1, Phaser.Easing.Sinusoidal.InOut, true);
            game.add.tween(yarn).to({ x: 291, y: 227 }, 5000, Phaser.Easing.Sinusoidal.InOut, true);
            game.add.tween(rat).to({ x: 559, y: 328 }, 5000, Phaser.Easing.Sinusoidal.InOut, true);
        };
        var ratAndBallFadeOut = function() {
            game.add.tween(yarn).to({ alpha: 0 }, 10, Phaser.Easing.Sinusoidal.InOut, true);
            game.add.tween(rat).to({ alpha: 0 }, 10, Phaser.Easing.Sinusoidal.InOut, true);
        };
        var catReaction = function() {
            catReac.play("react");
        };
        var catComes = function() {
            game.add.tween(catReac).to({ x: 1100 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
        };
        var catWalk = function() {
            catReac.alpha = 0;
            cat.scale.setTo(0.8, 0.8);
            cat.anchor.setTo(0.5, 0.5);
            cat.animations.add("run", [0, 1, 2, 3], 4, true);
            cat.play("run");
            game.add.tween(cat).to({ x: 509, y:328 }, 3000, Phaser.Easing.Sinusoidal.InOut, true);
        };
        var catFade = function() {
            game.add.tween(cat).to({ alpha: 0 }, 10, Phaser.Easing.Sinusoidal.InOut, true);
        };
        var nextScreen = function() {
            game.state.start("langPref");
        };

        // Tip: Put all var together anchor together animation together
        // code
        game.add.sprite(0, 0, "backgrounds2");
        var yarn = game.add.sprite(582, 419, "yarnBalls2");
        var rat = game.add.sprite(850, 520, "ratMoves2", 2);
        rat.anchor.setTo(0.5, 0.5);
        rat.animations.add("run", [0, 1, 2, 3], 10, true);
        rat.play("run");
        game.time.events.add(2000, ratWalkOut, game);
        game.time.events.add(7000, ratAndBallFadeOut, game);
        var catReac = game.add.sprite(1800, 650, "catReactions2", 0);
        catReac.scale.setTo(0.8, 0.8);
        catReac.animations.add("react", [0, 1], 2, false);
        catReac.anchor.setTo(0.5, 0.5);
        game.time.events.add(0, catComes, game);
        game.time.events.add(5000, catReaction, game);
        game.time.events.add(6000, catWalk, game);
        game.time.events.add(9000, catFade, game);
        var cat = game.add.sprite(1100, 650, "catMoves2", 0);
        game.time.events.add(10000, nextScreen, game);
    };

    demo.state.prelude2.update = function() {

    };

})(jQuery, fluid);
