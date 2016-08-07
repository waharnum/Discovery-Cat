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
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
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
                funcName: "demo.state.soundPref.wiggle",
                args: ["{that}", "{that}.drum"]
            },
            wiggleTrumpet: {
                funcName: "demo.state.soundPref.wiggle",
                args: ["{that}", "{that}.trumpet"]
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
            showSoundZigDrum: {
                funcName: "demo.state.soundPref.showSoundZig",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model", "DHUPP", 570, 10]
            },
            showSoundZigTrumpet: {
                funcName: "demo.state.soundPref.showSoundZig",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model", "PEE..EN", 240, 10]
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
            }
        }
    });

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

    demo.state.soundPref.wiggle = function(that, object) {
        that.t1 = that.add.tween(object).to({ x: object.x - 20, y: object.y }, 200,
            Phaser.Easing.Sinusoidal.InOut, false).to({ x: object.x + 40, y: object.y }, 400,
                Phaser.Easing.Sinusoidal.InOut, false).to({ x: object.x - 20, y: object.y }, 200,
                    Phaser.Easing.Sinusoidal.InOut, false);
        that.t1.start();
    };

    demo.state.soundPref.noSoundAppearButtonCallback = function(that, model) {
        if (model.sound) {
            that.time.events.add(0, function() {
                that.wiggleTrumpet();
                that.drumSound.pause();
                that.trumpetSound.play();
            }, that);

            that.time.events.add(3500, function() {
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
            that.time.events.add(0, function() {
                that.showSoundZigTrumpet();
                that.wiggleTrumpet();
                that.drumSound.pause();
                that.trumpetSound.play();
            }, that);

            that.time.events.add(3500, function() {
                that.showSoundZigDrum();
                that.wiggleDrum();
                that.drumSound.play();
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
        // So that it can again reappear and surely this will create a new instant
        that.standScreenAppearBool = false;
        if (!model.passcodeCollected.sound) {
            that.time.events.add(0, that.showSoundZigPasscode, that);
            that.time.events.add(3500, that.passcodeFound, that);
        }
        model.passcodeCollected.sound = true;
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

    demo.state.soundPref.create = function(that, model) {

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
        that.cat = that.add.sprite(250, 500, "catMoveh", 5);
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
    };

    demo.state.soundPref.update = function(that) {

        that.physics.arcade.collide(that.cat, that.ground);

        that.houseDoorNotifFunc();

        that.stickNotifFunc();

        that.standNotifFunc();

        // Exit from room
        if (that.physics.arcade.overlap(that.houseDoor, that.cat) && that.enter.isDown) {
            that.houseDoorFunc();
        }

        if (that.physics.arcade.overlap(that.stick, that.cat) && that.enter.isDown) {
            that.standAppear();
        }

        if (that.physics.arcade.overlap(that.stand, that.cat) && that.enter.isDown) {
            that.standScreenAppear();
        }

        // Character movement
        if (that.cursors.left.isDown) {
            that.cat.body.velocity.x = -150;
            that.cat.animations.play("moveLeft");
        } else if (that.cursors.right.isDown) {
            that.cat.body.velocity.x = 150;
            that.cat.animations.play("moveRight");
        } else {
            that.cat.animations.stop();
            that.cat.body.velocity.x = 0;
        }

        if (that.cursors.up.isDown && that.cat.body.touching.down) {
            that.cat.body.velocity.y = -700;
        }

    };

})(jQuery, fluid);
