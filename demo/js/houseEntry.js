(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.houseEntry", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.houseEntry.preload",
                args: []
            },
            create: {
                funcName: "demo.state.houseEntry.create",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            update: {
                funcName: "demo.state.houseEntry.update",
                args: []
            }
        }
    });

// declared publicly for tab navigation
var messageBox, messageText;

    demo.state.houseEntry.preload = function(game) {

    };

    demo.state.houseEntry.create = function(game, that) {
        // Tip: Arrange functions in the order they will play write time also
        // functions

        var catAndRatWalk = function() {
            cat.animations.play("walk");
            rat.animations.play("walk");
            game.add.tween(cat).to({ x: 1300, y:150 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
            game.add.tween(rat).to({ x: 1300, y:400 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
            messageText.alpha = 0;
            messageBox.alpha = 0;
        };

        var ratMessage = function() {
            messageBox = game.add.sprite(810, 250, "messageBoxlp", 0);
            messageBox.scale.setTo(1.2, 1.3);
            messageText = game.add.text(840, 300,
                "  Come with me to the rat house\nhe has taken your yarn ball there");
            messageBox.alpha = 0;
            messageText.alpha = 0;
            game.add.tween(messageBox).to({ alpha: 1 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
            game.add.tween(messageText).to({ alpha: 1 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
        };

        var nextScreen = function() {
            game.state.start("house");
        };

        // Tip: Put all var together anchor together animation together
        // code
        game.add.sprite(0, 0, "backgroundlp");
        var cat = that.add.sprite(500, 150, "catMovelp", 1);
        cat.scale.setTo(0.8, 0.8);
        cat.animations.add("walk", [0, 1, 2, 3], 5, true);

        var rat = game.add.sprite(1050, 400, "buddiesMovelp", 0);
        // instead of fucking 0 I will put count so he will become required rat...hell yeah
        rat.addChild(game.add.sprite(55, -10, "ratAccessorieslp", 0));
        rat.scale.setTo(0.5, 0.5);
        rat.animations.add("walk", [0, 1, 2, 3], 5, true);

        game.time.events.add(0, ratMessage, game);
        game.time.events.add(10000, catAndRatWalk, game);
        game.time.events.add(16000, nextScreen, game);

    };

    demo.state.houseEntry.update = function() {

    };

})(jQuery, fluid);
