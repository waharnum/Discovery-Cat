(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.houseEntry", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.houseEntry.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.houseEntry.create",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                            "{demo.discoveryCat}.textToSpeech"]
            },
            update: {
                funcName: "demo.state.houseEntry.update",
                args: "{that}"
            },
            catAndRatWalk: {
                funcName: "demo.state.houseEntry.catAndRatWalk",
                args: "{that}"
            },
            ratMessage: {
                funcName: "demo.state.houseEntry.ratMessage",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                            "{demo.discoveryCat}.textToSpeech"]
            },
            nextScreen: {
                funcName: "demo.state.houseEntry.nextScreen",
                args: "{that}"
            },
            backpackInstruction: {
                funcName: "demo.state.house.messageBar",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                    "{demo.discoveryCat}.prefModel.model",
                    "{demo.discoveryCat}.prefModel.model.lang.obj.backpackInstruction", 12000, 595]
            },
            backpack: {
                funcName: "demo.state.house.backpack",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                                        "{demo.discoveryCat}.prefModel.model", "house"]
            }
        }
    });

    // Runs at t = 0ms
     demo.state.houseEntry.ratMessage = function(that, model, speechComp) {
        // Playing audio
        that.audioC.play("", 0, 0.1, true);

        // All message things
        that.messageBox = that.add.sprite(810, 250, "messageBoxlp", 0);
        that.messageBox.scale.setTo(1.2, 1.3);
        that.messageText = that.add.text(835, 300,
                            model.lang.obj.ratMessagehe);

        // Speech for message, model objects contains the particular json file we
        // are made to use in the last screen when user selects the right option.
        speechComp.queueSpeech(model.lang.obj.ratMessagehe, false, { lang: model.lang.type });
        that.messageBox.alpha = 0;
        that.messageText.alpha = 0;
        that.add.tween(that.messageBox).to({ alpha: 1 },
                                            2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.messageText).to({ alpha: 1 },
                                            2000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 8000ms
    demo.state.houseEntry.catAndRatWalk = function(that) {
        that.cat.animations.play("walk");
        that.rat.animations.play("walk");
        that.add.tween(that.cat).to({ x: 1300, y:150 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.rat).to({ x: 1300, y:400 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.messageText.alpha = 0;
        that.messageBox.alpha = 0;
    };

    // Runs at t = 14000ms
    demo.state.houseEntry.nextScreen = function(that) {
        that.audioC.pause();
        that.state.start("cutScene");
    };

    // Phaser functions
    demo.state.houseEntry.preload = function() {

    };

    demo.state.houseEntry.create = function(that, model, speechComp) {
        that.add.sprite(0, 0, "backgroundlp");

        if (!model.music) {
            that.sound.mute = true;
        }

        if (!model.voice) {
            speechComp.applier.change("utteranceOpts.volume", 0);
        }

        that.cat = that.add.sprite(500, 150, "catMovelp", 1);
        that.cat.scale.setTo(0.8, 0.8);
        that.cat.animations.add("walk", [0, 1, 2, 3], 5, true);

        that.rat = that.add.sprite(1050, 400, "buddiesMovelp", 0);
        // instead of 0 below we will use the model property of count to use the same cat
        // that was actually selected
        that.rat.addChild(that.add.sprite(55, -10, "ratAccessorieslp", 0));
        that.rat.scale.setTo(0.5, 0.5);
        that.rat.animations.add("walk", [0, 1, 2, 3], 5, true);

        // time events
        that.time.events.add(0, that.backpackInstruction, that);
        that.time.events.add(12000, that.ratMessage, that);
        that.time.events.add(20000, that.catAndRatWalk, that);
        that.time.events.add(26000, that.nextScreen, that);

        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");

        that.backpack();
    };

    demo.state.houseEntry.update = function() {
    };

})(jQuery, fluid);
