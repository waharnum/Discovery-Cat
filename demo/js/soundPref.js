(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.soundPref", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.soundPref.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.soundPref.create",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                        "{demo.discoveryCat}.textToSpeech"]
            },
            update: {
                funcName: "demo.state.soundPref.update",
                args: ["{that}"]
            },
            houseDoorFunc: {
                funcName: "demo.state.soundPref.houseDoorFunc",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            standAppear: {
                funcName: "demo.state.soundPref.standAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            standScreenAppear: {
                funcName: "demo.state.soundPref.standScreenAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            soundAppearButtonCallback: {
                funcName: "demo.state.soundPref.soundAppearButtonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            noSoundAppearButtonCallback: {
                funcName: "demo.state.soundPref.noSoundAppearButtonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            goButtonCallback: {
                funcName: "demo.state.soundPref.goButtonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            wiggleDrum: {
                funcName: "demo.state.soundPref.wiggleDrum",
                args: ["{that}"]
            },
            wiggleTrumpet: {
                funcName: "demo.state.soundPref.wiggleTrumpet",
                args: ["{that}"]
            },
            houseDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.houseDoor", "{that}.houseDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.exitRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            stickNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.stick", "{that}.stickNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.pickItem",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            standNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.stand", "{that}.standNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.useItem",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            stateEnterAnimation: {
                funcName: "demo.state.prelude.stateEnterAnimation",
                args: ["{that}", 1070, 570]
            },
            colorPrefFilter: {
                funcName: "demo.state.colorPref.contrastFilter",
                args: "{that}"
            },
            backpack: {
                funcName: "demo.state.house.backpack",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model", "soundPref"]
            },
            showSoundZigPasscode: {
                funcName: "demo.state.soundPref.showSoundZig",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model", "**GH**", 440, 200]
            },
            inactionFeedback: {
                funcName: "demo.state.soundPref.inactionFeedback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            passcodeFound: {
                funcName: "demo.state.sizePref.passcodeFound",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                        "{demo.discoveryCat}.textToSpeech",
                            "{demo.discoveryCat}.prefModel.model.lang.obj.passcodeFound"]
            },
            messageBarInstruction: {
                funcName: "demo.state.house.messageBar",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                    "{demo.discoveryCat}.prefModel.model",
                    "{demo.discoveryCat}.prefModel.model.lang.obj.soundPrefInstruction",
                                                    8000, 615]
            },
            changeSelectionUp: {
                funcName: "demo.state.soundPref.changeSelection",
                args: ["{that}", "{that}.soundAppearButton"]
            },
            changeSelectionDown: {
                funcName: "demo.state.soundPref.changeSelection",
                args: ["{that}", "{that}.noSoundAppearButton"]
            },
            catMovementUpdate: {
                funcName: "demo.state.sizePref.catMovementUpdate",
                args: ["{that}"]
            }
        }
    });


    demo.state.soundPref.changeSelection = function(that, button) {
        if (button === that.soundAppearButton) {
            that.count--;
        }

        if (button === that.noSoundAppearButton) {
            that.count++;
        }

        if (that.count === 3) {
            that.count = 2;
        }

        if (that.count === 0) {
            that.count = 1;
        }

        if (that.count === 1) {
            // Fix the over, out, in states of last button
            that.noSoundAppearButton.setFrames(16, 14, 14);
            // Change the over, out, in states of this button
            that.soundAppearButton.setFrames(13, 15, 15);
            that.oldCount = 1;
            that.soundAppearButtonCallback();
        }
        if (that.count === 2) {
            // Change the over, out, in states of this button
            that.soundAppearButton.setFrames(15, 13, 13);
            // Fix the over, out, in states of last button
            that.noSoundAppearButton.setFrames(14, 16, 16);
            that.oldCount = 2;
            that.noSoundAppearButtonCallback();
        }

    };

    demo.state.soundPref.inactionFeedback = function(that, model) {
        var obj;
        if (model.sound) {
            obj = that.soundAppearButton;
        } else {
            obj = that.noSoundAppearButton;
        }
        that.t1 = that.add.tween(obj).to({ x: 986, y: obj.y }, 100,
            Phaser.Easing.Sinusoidal.InOut, false, 0).to({ x: 974, y: obj.y }, 200,
            Phaser.Easing.Sinusoidal.InOut, false, 0).to({ x: 980, y: obj.y }, 100,
            Phaser.Easing.Sinusoidal.InOut, false, 0);
        that.t1.start();
    };

    demo.state.soundPref.showSoundZig = function(that, model, message, x, y) {
        that.soundZig = that.add.sprite(x, y, "assetsop", 2);
        that.soundZig.addChild(that.add.text(80, 100, message,
                                            { font: "40px Arial", fill: "#fff" }));
        that.soundZig.scale.setTo(model.size, model.size);
        that.time.events.add(3000, function() {
            that.soundZig.visible = false;
        }, that);
    };

    demo.state.soundPref.wiggleTrumpet = function(that) {
        that.tTrumpet = that.add.tween(that.trumpet).to({ x: 380, y: 450 }, 200,
            Phaser.Easing.Sinusoidal.InOut, false).to({ x: 420, y: 450 }, 400,
                Phaser.Easing.Sinusoidal.InOut, false).to({ x: 400, y: 450 }, 200,
                    Phaser.Easing.Sinusoidal.InOut, false);
        that.tTrumpet.start();
    };

    demo.state.soundPref.wiggleDrum = function(that) {
        that.tDrum = that.add.tween(that.drum).to({ x: 730, y: 450 }, 200,
            Phaser.Easing.Sinusoidal.InOut, false).to({ x: 770, y: 450 }, 400,
                Phaser.Easing.Sinusoidal.InOut, false).to({ x: 750, y: 450 }, 200,
                    Phaser.Easing.Sinusoidal.InOut, false);
        that.tDrum.start();
    };

    demo.state.soundPref.noSoundAppearButtonCallback = function(that, model) {
        if (model.sound) {

            // This is to ensure these tweens dont keep on running when noSound starts,
            // also zigs disappear
            that.drumSound.stop();
            that.trumpetSound.stop();
            if (!(typeof(that.tDrum) === "undefined")) {
                that.tDrum.stop();
            }
            if (!(typeof(that.tTrumpet) === "undefined")) {
                that.tTrumpet.stop();
            }
            if (!(typeof(that.drumSoundZig) === "undefined")) {
                that.drumSoundZig.visible = false;
            }
            if (!(typeof(that.trumpetSoundZig) === "undefined")) {
                that.trumpetSoundZig.visible = false;
            }

            that.time.events.add(0, function() {
                that.wiggleTrumpet();
                that.drumSound.pause();
                that.trumpetSound.play();
            }, that);

            that.time.events.add(1000, function() {
                that.trumpetSound.pause();
                that.wiggleDrum();
                that.drumSound.play();
            }, that);
            model.sound = false;
        } else {
            that.inactionFeedback();
        }
    };

    demo.state.soundPref.soundAppearButtonCallback = function(that, model) {
        if (!model.sound) {

            // All things inside this are for making sure user does not
            // mess up.

            // This is to make sure wiggle from drum and trumpet of no sound does not
            // disturb use here
            that.drumSound.stop();
            that.trumpetSound.stop();
            if (!(typeof(that.tDrum) === "undefined")) {
                that.tDrum.stop();
            }
            if (!(typeof(that.tTrumpet) === "undefined")) {
                that.tTrumpet.stop();
            }

            if (typeof(that.drumSoundZig) === "undefined") {
                that.drumSoundZig = that.add.sprite(570, 10, "assetsop", 2);
                that.drumSoundZig.addChild(that.add.text(80, 100, "DHUPP",
                                                    { font: "40px Arial", fill: "#fff" }));
                that.drumSoundZig.scale.setTo(model.size, model.size);
                that.drumSoundZig.visible = false;
            } else {
                that.drumSoundZig.visible = false;
            }

            if (typeof(that.trumpetSoundZig) === "undefined") {
                that.trumpetSoundZig = that.add.sprite(240, 10, "assetsop", 2);
                that.trumpetSoundZig.addChild(that.add.text(80, 100, "PEE..EN",
                                                    { font: "40px Arial", fill: "#fff" }));
                that.trumpetSoundZig.scale.setTo(model.size, model.size);
                that.trumpetSoundZig.visible = false;
            } else {
                that.trumpetSoundZig.visible = false;
            }


            that.time.events.add(0, function() {
                that.trumpetSoundZig.visible = true;
                that.wiggleTrumpet();
                that.drumSound.pause();
                that.trumpetSound.play();
                that.time.events.add(800, function() {
                    that.trumpetSoundZig.visible = false;
                }, that);
            }, that);
            that.time.events.add(800, function() {
                that.drumSoundZig.visible = true;
                that.trumpetSound.pause();
                that.wiggleDrum();
                that.drumSound.play();
                that.time.events.add(800, function() {
                    that.drumSoundZig.visible = false;
                }, that);
            }, that);
            model.sound = true;
        } else {
            that.inactionFeedback();
        }
    };

    demo.state.soundPref.goButtonCallback = function(that, model) {
        // Group these together
        that.popupScreen.visible = false;
        that.soundAppearButton.visible = false;
        that.noSoundAppearButton.visible = false;
        that.drum.visible = false;
        that.trumpet.visible = false;
        that.goButton.visible = false;
        that.drumSoundZig.visible = false;
        that.trumpetSoundZig.visible = false;

        if (!model.passcodeCollected.sound) {
            that.time.events.add(0, that.showSoundZigPasscode, that);
            that.time.events.add(3500, that.passcodeFound, that);
            that.time.events.add(9000, function() {
                    that.standScreenAppearBool = false;
            }, that);
            model.passcodeCollected.sound = true;
        } else {
            that.standScreenAppearBool = false;
        }

        // Removes all the key Captures till now.
        that.input.keyboard.removeKey(Phaser.Keyboard.UP);
        that.input.keyboard.removeKey(Phaser.Keyboard.DOWN);
        that.input.keyboard.removeKey(Phaser.Keyboard.ENTER);

        that.cursors = that.input.keyboard.createCursorKeys();
        that.enter = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    };

    demo.state.soundPref.houseDoorFunc = function(that) {
        that.audioC.pause();
        that.state.start("house");
    };

    demo.state.soundPref.standScreenAppear = function(that, model) {
        if (that.standScreenAppearBool === false) {
            that.popupScreen = that.add.sprite(0, 0, "popupScreensop");

            that.trumpet = that.add.sprite(400, 450, "assetsop", 1);
            that.trumpet.anchor.setTo(0.5, 1);
            that.trumpet.scale.setTo(model.size, model.size);

            that.drum = that.add.sprite(750, 450, "assetsop", 0);
            that.drum.anchor.setTo(0.5, 1);
            that.drum.scale.setTo(model.size, model.size);

            that.soundAppearButton = that.add.button(980, 170, "upDownButtonsp",
                                                that.soundAppearButtonCallback, that, 15, 13, 13);
            that.noSoundAppearButton = that.add.button(980, 400, "upDownButtonsp",
                                                that.noSoundAppearButtonCallback, that, 16, 14, 14);
            that.goButton = that.add.button(1120, 332, "goButtonsp",
                                                that.goButtonCallback, that, 1, 0, 2);
            that.standScreenAppearBool = true;
            if (!model.passcodeCollected.sound) {
                that.messageBarInstruction();
            }

            that.upKey = that.input.keyboard.addKey(Phaser.Keyboard.UP);
            that.downKey = that.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            that.upKey.onDown.add(that.changeSelectionUp, that);
            that.downKey.onDown.add(that.changeSelectionDown, that);
            that.enter.onDown.add(that.goButtonCallback, that);
        }
    };

// WORKS
    demo.state.soundPref.standAppear = function(that, model) {
        // Pick up paint brush
        that.stick.visible = false;
        that.stick.body.enable = false;
        that.stand.body.enable = true;
        that.stand.visible = true;
        model.visited.sound = true;
    };

    // Phaser functions
    demo.state.soundPref.preload = function() {

    };

    demo.state.soundPref.create = function(that, model, speechComp) {

        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");
        that.drumSound = that.add.audio("drum");
        that.trumpetSound = that.add.audio("trumpet");

        // Audio play
        that.audioC.play("", 0, 0.1, true);

        that.stage.backgroundColor = "#44aae0";

        // Ensuring simplify Pref
        if (!model.simplify) {
            that.background = that.add.sprite(0, 0, "backgroundsop");
        }

        if (model.simplify && model.contrast) {
            that.stage.backgroundColor = "#a8a8a8";
        }

        // Ensuring color Pref
        if (model.contrast) {
            that.colorPrefFilter();
        }

        if (!model.music) {
            that.sound.mute = true;
            console.log(that.sound.mute);
        }

        if (!model.voice) {
            speechComp.applier.change("utteranceOpts.volume", 0);
        }

        // Environment
        that.stick = that.add.sprite(1070, 700, "assetsop", 4);
        that.stick.anchor.setTo(0.5, 1);
        that.stick.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.stick);
        that.stick.body.immovable = true;

        // Adding door to house and physics
        that.houseDoor = that.add.sprite(135, 678, "doorh", 1);
        that.houseDoor.anchor.setTo(0.5, 1);
        that.houseDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.houseDoor);
        that.houseDoor.body.immovable = true;

        // Using ground sprite from house level
        that.ground = that.add.sprite(0, 675, "platformh");
        that.physics.arcade.enable(that.ground);
        that.ground.body.immovable = true;

        // stand
        that.stand = that.add.sprite(430, 675, "assetsop", 3);
        that.stand.anchor.setTo(0.5, 1);
        that.stand.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.stand);
        that.stand.body.enable = false;
        that.stand.visible = false;

        that.standScreenAppearBool = false;

        // Cat
        that.cat = that.add.sprite(270, 500, "catMoveh", 5);
        that.cat.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.cat);
        that.cat.body.bounce.y = 0.2;
        that.cat.body.gravity.y = 1000;
        that.cat.body.collideWorldBounds = true;
        that.cat.animations.add("moveLeft",
            [0, 1, 2, 3], 10, true);
        that.cat.animations.add("moveRight",
            [4, 5, 6, 7], 10, true);

        // Automatically populates the cursor key, saves defining each key
        that.cursors = that.input.keyboard.createCursorKeys();
        that.enter = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // stick notif test
        that.stickNotif = that.add.sprite(990, 400, "messageBoxAll", 0);
        that.stickNotif.addChild(that.add.text(10, 25, model.lang.obj.pickItem));
        that.stickNotif.scale.setTo(model.size, model.size);
        that.stickNotif.alpha = 0;
        // door notif test
        that.houseDoorNotif = that.add.sprite(40, 450, "messageBoxAll", 0);
        that.houseDoorNotif.addChild(that.add.text(10, 25, model.lang.obj.exitRoom));
        that.houseDoorNotif.scale.setTo(model.size, model.size);
        that.houseDoorNotif.alpha = 0;
        // stand notif test
        that.standNotif = that.add.sprite(370, 340, "messageBoxAll", 0);
        that.standNotif.addChild(that.add.text(10, 25, model.lang.obj.useItem));
        that.standNotif.scale.setTo(model.size, model.size);
        that.standNotif.alpha = 0;

        // Check for room setting on revisitin the room
        if (model.visited.sound) {
            that.stick.visible = false;
            that.stick.body.enable = false;
            that.standAppear();
        }

        that.backpack();

        that.stateEnterAnimation();

        that.count = 1;
    };

    demo.state.soundPref.update = function(that) {

        that.physics.arcade.collide(that.cat, that.ground);

        that.houseDoorNotifFunc();

        that.stickNotifFunc();

        that.standNotifFunc();

        // Exit from room
        if (that.physics.arcade.overlap(that.houseDoor, that.cat) && that.enter.isDown &&
                                                                        !that.expandBool) {
            that.houseDoorFunc();
        }

        if (that.physics.arcade.overlap(that.stick, that.cat) && that.enter.isDown &&
                                                                        !that.expandBool) {
            that.standAppear();
        }

        if (that.physics.arcade.overlap(that.stand, that.cat) && that.enter.isDown &&
                                                                        !that.expandBool) {
            that.standScreenAppear();
        }

        // Character movement and envelope screen up down key movement
        if (!that.standScreenAppearBool) {
            that.catMovementUpdate();
        }

    };

})(jQuery, fluid);
