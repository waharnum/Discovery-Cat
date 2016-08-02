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
                args: "{that}"
            },
            standAppear: {
                funcName: "demo.state.soundPref.standAppear",
                args: "{that}"
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
            passcodeCallback: {
                funcName: "demo.state.soundPref.passcodeCallback",
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
            }
        }
    });

    demo.state.soundPref.passcodeCallback = function(that, model) {
        that.popup = that.add.sprite(640, 500, "popupAll", 1);
        that.popup.anchor.setTo(0.5, 1);
        that.popup.scale.setTo(model.size, model.size);
        that.passcodeText = that.add.text(0, -120, "****\nDH",
                                                { font: "100px Arial", fill: "#fff" });
        that.passcodeText.anchor.setTo(0.5, 1);
        that.passcodeText.scale.setTo(model.size, model.size);
        that.popup.addChild(that.passcodeText);
        that.add.tween(that.popup).to({ alpha: 0 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    demo.state.soundPref.wiggle = function(that, object) {
        that.onCompleteCallback = function() {
            that.add.tween(object).to({ x: object.x - 20, y: object.y }, 300,
                                                            Phaser.Easing.Sinusoidal.InOut, true);
        };
        that.t1 = that.add.tween(object).to({ x: object.x + 20, y: object.y }, 100,
                                                        Phaser.Easing.Sinusoidal.InOut, true);
        that.t1.onComplete.add(that.onCompleteCallback, that);
    };


    // FIX
    demo.state.soundPref.noSoundAppearButtonCallback = function(that, model) {
        that.wiggleDrum();
    };

    // FIX
    demo.state.soundPref.soundAppearButtonCallback = function(that, model) {
        that.wiggleTrumpet();
    };

    demo.state.soundPref.goButtonCallback = function(that) {
        // Group these together
        that.popupScreen.visible = false;
        that.soundAppearButton.visible = false;
        that.noSoundAppearButton.visible = false;
        that.drum.visible = false;
        that.trumpet.visible = false;
        that.goButton.visible = false;
        // So that it can again reappear and surely this will create a new instant
        that.standScreenAppearBool = false;
    };

    demo.state.soundPref.houseDoorFunc = function(that) {
        that.audioC.pause();
        that.state.start("house");
    };

    demo.state.soundPref.standScreenAppear = function(that, model) {
        if (that.standScreenAppearBool === false) {
            that.popupScreen = that.add.sprite(0, 0, "popupScreensop");

            that.drum = that.add.sprite(250, 200, "assetsop", 0);
            that.trumpet = that.add.sprite(580, 200, "assetsop", 1);

            that.soundAppearButton = that.add.button(1100, 250, "upDownButtonsp",
                                                that.soundAppearButtonCallback, that, 15, 13, 13);
            that.soundAppearButton.anchor.setTo(0.5, 1);
            that.soundAppearButton.scale.setTo(model.size, model.size);

            that.noSoundAppearButton = that.add.button(1100, 450, "upDownButtonsp",
                                                that.noSoundAppearButtonCallback, that, 16, 14, 14);
            that.noSoundAppearButton.anchor.setTo(0.5, 1);
            that.noSoundAppearButton.scale.setTo(model.size, model.size);

            that.goButton = that.add.button(1030, 500, "goButtonsp",
                                                that.goButtonCallback, that, 1, 0, 2);
            that.standScreenAppearBool = true;
        }
    };

// WORKS
    demo.state.soundPref.standAppear = function(that) {
        // Pick up paint brush
        that.stick.visible = false;
        that.stick.body.enable = false;
        that.stand.body.enable = true;
        that.stand.visible = true;
    };

    // Phaser functions
    demo.state.soundPref.preload = function() {

    };

    demo.state.soundPref.create = function(that, model) {

        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");

        // Audio play
        that.audioC.play("", 0, 0.1, true);

        // Environment
        that.add.sprite(0, 0, "backgroundsop");

        that.stick = that.add.sprite(1070, 570, "assetsop", 4);
        that.stick.anchor.setTo(0.5, 0.5);
        that.physics.arcade.enable(that.stick);
        that.stick.body.immovable = true;

        // Adding door to house and physics
        that.houseDoor = that.add.sprite(40, 520, "doorh", 1);
        that.physics.arcade.enable(that.houseDoor);
        that.houseDoor.body.immovable = true;

        // Using ground sprite from house level
        that.ground = that.add.sprite(0, 675, "platformh");
        that.physics.arcade.enable(that.ground);
        that.ground.body.immovable = true;

        // stand
        that.stand = that.add.sprite(430, 556, "assetsop", 3);
        that.stand.anchor.setTo(0.5, 0.5);
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
            // FILL
        }
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
