(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.house", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.house.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.house.create",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            update: {
                funcName: "demo.state.house.update",
                args: ["{that}"]
            },
            sizeDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.sizeDoor", "{that}.sizeDoorNotif",
                                                            "{demo.discoveryCat}.textToSpeech"]
            },
            colorDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.colorDoor", "{that}.colorDoorNotif",
                                                            "{demo.discoveryCat}.textToSpeech"]
            },
            simplifyDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.simplifyDoor", "{that}.simplifyDoorNotif",
                                                            "{demo.discoveryCat}.textToSpeech"]
            },
            soundDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.soundDoor", "{that}.soundDoorNotif",
                                                            "{demo.discoveryCat}.textToSpeech"]
            },
            safeNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.safe", "{that}.safeNotif",
                                                            "{demo.discoveryCat}.textToSpeech"]
            },
            backpack: {
                funcName: "demo.state.house.backpack",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech"]
            }
        }
    });

    demo.state.house.backpack = function(that, speechComp) {
        // All sub backpack buttons
        // callbacks
        that.backpackIcon1Callback = function() {
            if (that.sound.mute) {
                that.sound.mute = false;
                that.backpackIcon1.setFrames(3, 2, 2);
            } else {
                that.sound.mute = true;
                that.backpackIcon1.setFrames(3, 4, 4);
            }
        };
        that.backpackIcon2Callback = function() {
            // volume is not taken as an option but a model thus we have used
            // change applier here for our work which involved changed changing
            // the utterance option of volume to volume.
            // Initially the utteranceOpts.volume has value undefined and then
            // we give it value 0 or 1 thus we have included both conditions in the "if".
            if (speechComp.model.utteranceOpts.volume === 0 ||
                                     typeof(speechComp.model.utteranceOpts.volume) === undefined) {
                speechComp.applier.change("utteranceOpts.volume", 1);
                that.backpackIcon2.setFrames(3, 2, 2);
            } else {
                speechComp.applier.change("utteranceOpts.volume", 0);
                that.backpackIcon2.setFrames(3, 4, 4);
            }
        };
        that.backpackIcon3Callback = function() {};
        that.backpackIcon4Callback = function() {};
        that.backpackIcon5Callback = function() {};
        that.backpackIcon6Callback = function() {};

        // Decalaring all sub buttons
        that.backpackIcon1 = that.add.button(175, 70, "backpackButtonAll",
                                        that.backpackIcon1Callback, that, 3, 2, 2);
        that.backpackIcon1.anchor.setTo(0.5, 0.5);
        that.backpackIcon1.addChild(that.add.sprite(-45, -25, "backpackIconAll", 2));

        that.backpackIcon2 = that.add.button(275, 70, "backpackButtonAll",
                                        that.backpackIcon2Callback, that, 3, 2, 2);
        that.backpackIcon2Bool = true;
        that.backpackIcon2.anchor.setTo(0.5, 0.5);
        that.backpackIcon2.addChild(that.add.sprite(-50, -25, "backpackIconAll", 3));

        that.backpackIcon3 = that.add.button(70, 70, "backpackButtonAll",
                                        that.backpackIcon3Callback, that, 3, 2, 2);
        that.backpackIcon3.anchor.setTo(0.5, 0.5);
        that.backpackIcon3.addChild(that.add.sprite(-50, -25, "backpackIconAll", 0));

        that.backpackIcon4 = that.add.button(70, 70, "backpackButtonAll",
                                        that.backpackIcon4Callback, that, 3, 2, 2);
        that.backpackIcon4.anchor.setTo(0.5, 0.5);
        that.backpackIcon4.addChild(that.add.sprite(-50, -22, "backpackIconAll", 1));

        that.backpackIcon5 = that.add.button(70, 70, "backpackButtonAll",
                                        that.backpackIcon5Callback, that, 3, 2, 2);
        that.backpackIcon5.anchor.setTo(0.5, 0.5);
        that.backpackIcon5.addChild(that.add.sprite(-50, -25, "backpackIconAll", 4));

        that.backpackIcon6 = that.add.button(70, 70, "backpackButtonAll",
                                        that.backpackIcon6Callback, that, 3, 2, 2);
        that.backpackIcon6.anchor.setTo(0.5, 0.5);
        that.backpackIcon6.addChild(that.add.sprite(-50, -25, "backpackIconAll", 5));

        // Main backpack button
        that.backpackButtonBool = false;
        that.backpackButtonAllCallback = function() {
            if (that.backpackButtonBool) {
                that.backpackIcon3.x = 70;
                that.backpackIcon4.x = 70;
                that.backpackIcon5.x = 70;
                that.backpackIcon6.x = 70;
                that.backpackButtonBool = false;
            } else {
                that.backpackIcon3.x = 375;
                that.backpackIcon4.x = 475;
                that.backpackIcon5.x = 575;
                that.backpackIcon6.x = 675;
                that.backpackButtonBool = true;
            }
        };
        that.backpackButton = that.add.button(70, 70, "backpackButtonAll",
                                        that.backpackButtonAllCallback, that, 1, 0, 0);
        that.backpackButton.anchor.setTo(0.5, 0.5);
    };

    demo.state.house.notifs = function(that, element, elementNotif, speechComp) {
        if (that.physics.arcade.overlap(element, that.cat) &&
                                                    elementNotif.alpha === 0) {
            that.add.tween(elementNotif).to({ alpha: 1 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
            speechComp.queueSpeech("ENTER", true);
        }

        if (!that.physics.arcade.overlap(element, that.cat) &&
                                                    elementNotif.alpha === 1) {
            that.add.tween(elementNotif).to({ alpha: 0 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
        }

    };

    // Phaser functions
    demo.state.house.preload = function() {
    };

    demo.state.house.create = function(that, model) {
        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");

        // Audio to play
        that.audioG.play("", 0, 0.1, true);

        that.add.sprite(0, 0, "backgroundh");

        // Create platforms group and added arcade physics to it
        that.platforms = that.add.group();
        that.platforms.enableBody = true;
        that.platforms.physicsBodyType = Phaser.Physics.ARCADE;

        // Add floor1 to platforms and made it immovable
        that.floor1 = that.platforms.create(0, 200, "platformh");
        that.floor1.scale.setTo(0.8, 1);
        that.floor1.body.immovable = true;

        // Add floor2 to platforms and made it immovable
        that.floor2 = that.platforms.create(256, 440, "platformh");
        that.floor2.scale.setTo(0.8, 1);
        that.floor2.body.immovable = true;

        // Add ground to platforms and made it immovable
        that.ground = that.platforms.create(0, 675, "platformh");
        that.ground.body.immovable = true;

        // Safe with yarn balls
        that.safe = that.add.sprite(450, 675, "doorh", 2);
        that.safe.anchor.setTo(0.5, 1);
        that.safe.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.safe);
        that.safe.body.immovable = true;

        // door or the room state, will see them for collision
        // Entry Door
        that.add.sprite(50, 38, "doorh", 0);
        // Size Pref Door
        that.sizeDoor = that.add.sprite(460, 200, "doorh", 1);
        that.sizeDoor.anchor.setTo(0.5, 1);
        that.sizeDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.sizeDoor);
        that.sizeDoor.body.immovable = true;
        // Color Pref Door
        that.colorDoor = that.add.sprite(830, 200, "doorh", 1);
        that.colorDoor.anchor.setTo(0.5, 1);
        that.colorDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.colorDoor);
        that.colorDoor.body.immovable = true;
        // Simplify Pref Door
        that.simplifyDoor = that.add.sprite(460, 439, "doorh", 1);
        that.simplifyDoor.anchor.setTo(0.5, 1);
        that.simplifyDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.simplifyDoor);
        that.simplifyDoor.body.immovable = true;
        // Sounds Pref Door
        that.soundDoor = that.add.sprite(830, 439, "doorh", 1);
        that.soundDoor.anchor.setTo(0.5, 1);
        that.soundDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.soundDoor);
        that.soundDoor.body.immovable = true;
        // Main Exit Door
        that.mainExitDoor = that.add.sprite(1065, 675, "doorh", 1);
        that.mainExitDoor.anchor.setTo(0.5, 1);
        that.mainExitDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.mainExitDoor);
        that.mainExitDoor.body.immovable = true;

        // Cat
        that.cat = that.add.sprite(70, 45, "catMoveh", 5);
        that.cat.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.cat);
        that.cat.body.bounce.y = 0.2;
        that.cat.body.gravity.y = 1000;
        that.cat.body.collideWorldBounds = true;
        that.cat.animations.add("moveLeft",
            [0, 1, 2, 3], 10, true);
        that.cat.animations.add("moveRight",
            [4, 5, 6, 7], 10, true);

        // automatically populate the cursor key define each key
        that.cursors = that.input.keyboard.createCursorKeys();
        that.enter = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // Notif size pref door
        that.sizeDoorNotif = that.add.sprite(435, 110, "messageBoxAll", 0);
        that.sizeDoorNotif.addChild(that.add.text(-50, -80, "ENTER"));
        that.sizeDoorNotif.anchor.setTo(0.5, 1);
        that.sizeDoorNotif.scale.setTo(model.size, model.size);
        that.sizeDoorNotif.alpha = 0;
        // Notif color pref door
        that.colorDoorNotif = that.add.sprite(800, 110, "messageBoxAll", 0);
        that.colorDoorNotif.addChild(that.add.text(-50, -80, "ENTER"));
        that.colorDoorNotif.anchor.setTo(0.5, 1);
        that.colorDoorNotif.scale.setTo(model.size, model.size);
        that.colorDoorNotif.alpha = 0;
        // Notif simplify pref door
        that.simplifyDoorNotif = that.add.sprite(430, 339, "messageBoxAll", 0);
        that.simplifyDoorNotif.addChild(that.add.text(-50, -80, "ENTER"));
        that.simplifyDoorNotif.anchor.setTo(0.5, 1);
        that.simplifyDoorNotif.scale.setTo(model.size, model.size);
        that.simplifyDoorNotif.alpha = 0;
        // Notif sound pref door
        that.soundDoorNotif = that.add.sprite(800, 339, "messageBoxAll", 0);
        that.soundDoorNotif.addChild(that.add.text(-50, -80, "ENTER"));
        that.soundDoorNotif.anchor.setTo(0.5, 1);
        that.soundDoorNotif.scale.setTo(model.size, model.size);
        that.soundDoorNotif.alpha = 0;
        // Notif safe
        that.safeNotif = that.add.sprite(450, 570, "messageBoxAll", 0);
        that.safeNotif.addChild(that.add.text(-75, -100, "  PROVIDE\nPASSCODE"));
        that.safeNotif.anchor.setTo(0.5, 1);
        that.safeNotif.scale.setTo(model.size, model.size);
        that.safeNotif.alpha = 0;

        that.backpack();

        // Filters
        if (model.contrast) {
            that.gray = new PIXI.GrayFilter();
            that.invert = new PIXI.InvertFilter();
            that.colorMatrix =  [
                1.5, 0, 0, 0,
                0, 1.5, 0, 0,
                0, 0, 1.5, 0,
                0, 0, 0, 1
            ];
            that.contrast = new PIXI.ColorMatrixFilter();
            that.contrast.matrix = that.colorMatrix;

            that.world.filters = [that.gray, that.invert, that.contrast];
        }
    };

    demo.state.house.update = function(that) {
        // this keeps seperation between platforms and cat or else the cat would
        // pass the ground and stop at the bounds
        that.physics.arcade.collide(that.cat, that.platforms);

        // overlap checks if the sizeDoor and the cat are overlapping each other
        // and at the same time the pressing ENTER makes cat move into room
        if (that.physics.arcade.overlap(that.sizeDoor, that.cat) && that.enter.isDown) {
            that.audioG.pause();
            that.state.start("sizePref");
        }

        if (that.physics.arcade.overlap(that.colorDoor, that.cat) && that.enter.isDown) {
            that.audioG.pause();
            that.state.start("colorPref");
        }

        if (that.physics.arcade.overlap(that.simplifyDoor, that.cat) && that.enter.isDown) {
            that.audioG.pause();
            that.state.start("simplifyPref");
        }

        if (that.physics.arcade.overlap(that.soundDoor, that.cat) && that.enter.isDown) {
            that.audioG.pause();
            that.state.start("soundPref");
        }

        // character movement
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
        // jump character
        if (that.cursors.up.isDown && that.cat.body.touching.down) {
            that.cat.body.velocity.y = -700;
        }

        // Size Door Notif
        that.sizeDoorNotifFunc();

        // Color Door Notif
        that.colorDoorNotifFunc();

        // Simplify Door Notif
        that.simplifyDoorNotifFunc();

        // Sound Door Notif
        that.soundDoorNotifFunc();

        // Safe Notif
        that.safeNotifFunc();

    };

})(jQuery, fluid);
