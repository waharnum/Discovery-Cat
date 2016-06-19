(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.langPref", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.langPref.preload",
                args: []
            },
            create: {
                funcName: "demo.state.langPref.create",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            update: {
                funcName: "demo.state.langPref.update",
                args: []
            }
        }
    });

// for tab navigation
var count = 0;
// declared publicly for tab navigation
var button1, button2, button3, button4;

    demo.state.langPref.preload = function(game) {

    };

    demo.state.langPref.create = function(game, that) {
        // Tip: Arrange functions in the order they will play write time also
        // functions
        var catMove = function() {
            cat.animations.play("walk");
            game.add.tween(cat).to({ x: 500, y:150 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
        };
        var catAnimationStop = function() {
            cat.animations.paused = true;
        };
        var ratsCome = function() {
            rat1.animations.play("walk");
            rat2.animations.play("walk");
            rat4.animations.play("walk");
            rat3.animations.play("walk");
            game.add.tween(rat1).to({ x: 1050, y:200 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
            game.add.tween(rat2).to({ x: 900, y:400 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
            game.add.tween(rat4).to({ x: 400, y:500 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
            game.add.tween(rat3).to({ x: 650, y:500 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
        };

        var ratAnimationStop = function() {
            rat1.animations.paused = true;
            rat2.animations.paused = true;
            rat3.animations.paused = true;
            rat4.animations.paused = true;
        };

        var messageAppear = function() {
            button1 = game.add.button(870, 100, "messageBoxlp", button1Callback, that, 1, 0, 2);
            button1.addChild(game.add.text(70, 48, "Hey! I can help you"));
            button2 = game.add.button(870, 300, "messageBoxlp", button2Callback, that, 1, 0, 2);
            button2.addChild(game.add.text(70, 48, "¡Oye! Puedo ayudarle"));
            button3 = game.add.button(500, 400, "messageBoxlp", button3Callback, that, 1, 0, 2);
            button3.addChild(game.add.text(60, 48, "Hey! je peux vous aider"));
            button4 = game.add.button(100, 400, "messageBoxlp", button4Callback, that, 1, 0, 2);
            button4.addChild(game.add.text(25, 48, "Hallo! ich kann Ihnen helfen"));
        };

        var changeSelection = function() {
            if (count === 4) {
                count = 0;
            }
            count++;
            console.log("works");
            switch (count) {
                case 1:
                    // Fix last button
                    button4.setFrames(1, 0, 2);
                    // Change this button
                    button1.setFrames(0, 1, 2);
                    break;
                case 2:
                    button1.setFrames(1, 0, 2);
                    button2.setFrames(0, 1, 2);
                    break;
                case 3:
                    button2.setFrames(1, 0, 2);
                    button3.setFrames(0, 1, 2);
                    break;
                case 4:
                    button3.setFrames(1, 0, 2);
                    button4.setFrames(0, 1, 2);
                    break;
                default:
            }
        };

        var acceptSelection = function() {
              switch (count) {
                case 1:
                    button1Callback();
                    break;
                case 2:
                    button2Callback();
                    break;
                case 3:
                    button3Callback();
                    break;
                case 4:
                    button4Callback();
                    break;
                default:
                    // Remember for defualt to put something
            }
        };

        var button1Callback = function() {
            console.log("1 ho gaya");
            game.state.start("houseEntry");
        };
        var button2Callback = function() {
            console.log("2 ho gaya");
            game.state.start("houseEntry");
        };
        var button3Callback = function() {
            console.log("3 ho gaya");
            game.state.start("houseEntry");
        };
        var button4Callback = function() {
            console.log("4 ho gaya");
            game.state.start("houseEntry");
        };

        // Tip: Put all var together anchor together animation together
        // code
        game.add.sprite(0, 0, "backgroundlp");
        var cat = that.add.sprite(170, 90, "catMovelp", 1);
        cat.scale.setTo(0.8, 0.8);
        cat.animations.add("walk", [0, 1, 2, 3], 5, true);
        game.time.events.add(0, catMove, game);
        game.time.events.add(2000, catAnimationStop, game);
        game.time.events.add(2200, ratsCome, game);
        game.time.events.add(8200, ratAnimationStop, game);

        // rat1
        var rat1 = game.add.sprite(1500, 200, "buddiesMovelp", 0);
        rat1.addChild(game.add.sprite(55, -10, "ratAccessorieslp", 0));
        rat1.scale.setTo(0.5, 0.5);
        rat1.animations.add("walk", [0, 1, 2, 3], 5, true);
        rat1.animations.play("walk");

        var rat2 = game.add.sprite(1500, 400, "buddiesMovelp", 0);
        rat2.addChild(game.add.sprite(85, -45, "ratAccessorieslp", 1));
        rat2.scale.setTo(0.5, 0.5);
        rat2.animations.add("walk", [0, 1, 2, 3], 5, true);
        rat2.animations.play("walk");

        var rat4 = game.add.sprite(400, 1000, "buddiesMovelp", 0);
        rat4.addChild(game.add.sprite(60, 70, "ratAccessorieslp", 2));
        rat4.scale.setTo(0.5, 0.5);
        rat4.animations.add("walk", [0, 1, 2, 3], 5, true);
        rat4.animations.play("walk");

        var rat3 = game.add.sprite(650, 1000, "buddiesMovelp", 0);
        rat3.addChild(game.add.sprite(80, 90, "ratAccessorieslp", 3));
        rat3.scale.setTo(0.5, 0.5);
        rat3.animations.add("walk", [0, 1, 2, 3], 5, true);
        rat3.animations.play("walk");

        game.time.events.add(8500, messageAppear, game);

        var key1 = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
        key1.onDown.add(changeSelection, that);

        var key2 = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        key2.onDown.add(acceptSelection, that);

    };

    demo.state.langPref.update = function() {

    };

})(jQuery, fluid);
