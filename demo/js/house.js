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
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            sizeDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.sizeDoor", "{that}.sizeDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.enterRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            colorDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.colorDoor", "{that}.colorDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.enterRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            simplifyDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.simplifyDoor", "{that}.simplifyDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.enterRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            soundDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.soundDoor", "{that}.soundDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.enterRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            safeNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.safe", "{that}.safeNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.safeNotif",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            backpack: {
                funcName: "demo.state.house.backpack",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                                                    "{demo.discoveryCat}.prefModel.model"]
            },
            backpackIconSimplifyCallback: {
                funcName: "demo.state.house.backpackIconSimplifyCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            backpackIconSizeCallback: {
                funcName: "demo.state.house.backpackIconSizeCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            colorPrefFilter: {
                funcName: "demo.state.colorPref.contrastFilter",
                args: "{that}"
            },
            messageBarMovement: {
                funcName: "demo.state.house.messageBar",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                        "{demo.discoveryCat}.prefModel.model",
                            "{demo.discoveryCat}.prefModel.model.lang.obj.controlInstruction"]
            }
        }
    });

    demo.state.house.backpackIconSimplifyCallback = function(that, model) {
        // SOLUTION TAKE CAT POSITION AND RERENDER WHOLE SCENE
    };

    demo.state.house.backpackIconSizeCallback = function(that, model) {
        // SOLUTION TAKE CAT POSITION AND RERENDER WHOLE SCENE
    };

    demo.state.house.backpack = function(that, speechComp, model) {
        // BackPack is made of 3 things this main backpack functions and 2 other
        // backpackIconSizeCallback and backpackIconSimplifyCallback functions
        // which could not be incorporated in this function unlike other because
        // these two were not general like others and required state specific details
        // of what all assets to render.

        // All sub backpack buttons
        // callbacks
        that.backpackIconAudioCallback = function() {
            if (that.sound.mute) {
                that.sound.mute = false;
                that.backpackIconAudio.setFrames(3, 2, 2);
            } else {
                that.sound.mute = true;
                that.backpackIconAudio.setFrames(3, 4, 4);
            }
        };
        that.backpackIconVoiceCallback = function() {
            // volume is not taken as an option but a model thus we have used
            // change applier here for our work which involved changed changing
            // the utterance option of volume to volume.
            // Initially the utteranceOpts.volume has value undefined and then
            // we give it value 0 or 1 thus we have included both conditions in the "if".
            if (speechComp.model.utteranceOpts.volume === 0 ||
                                     typeof(speechComp.model.utteranceOpts.volume) === undefined) {
                speechComp.applier.change("utteranceOpts.volume", 1);
                that.backpackIconVoice.setFrames(3, 2, 2);
            } else {
                speechComp.applier.change("utteranceOpts.volume", 0);
                that.backpackIconVoice.setFrames(3, 4, 4);
            }
        };
        that.backpackIconColorCallback = function() {
            if (model.contrast === false) {
                that.colorPrefFilter();
                that.backpackIconColorChild = that.add.sprite(-50, -25, "backpackIconAll", 0);
                model.contrast = true;
            } else {
                that.world.filters = null;
                that.backpackIconColorChild = that.add.sprite(-50, -25, "backpackIconAll", 8);
                model.contrast = false;
            }
        };
        // These 2 will be specified outside of the backpack function
        // STATE SPECIFIC BOTH REQUIRE RERENDERING CANVAS
        // that.backpackIconSimplifyCallback = function() {};
        // STATE SPECIFIC
        // that.backpackIconSizeCallback = function() {};
        // STATE SPECIFIC
        that.backpackIconSoundCallback = function() {};

        // FIX Justin_o help, declared var name b4 calling in the function still varr not taking
        // value from inside the function
        // that.backpackIconCreate = function(backpackIconNo, backpackIconNoCallback, x, y) {
        //     backpackIconNo = that.add.button(175, 784, "backpackButtonAll",
        //                                     backpackIconNoCallback, that, 3, 2, 2);
        //     backpackIconNo.anchor.setTo(0.5, 0.5);
        //     backpackIconNo.scale.setTo(0.8, 0.8);
        //     backpackIconNo.addChild(that.add.sprite(-45, -25, "backpackIconAll", 2));
        // };
        // that.backpackIcon1, that.backpackIcon2, that.backpackIcon3;
        // that.backpackIcon4, that.backpackIcon5, that.backpackIcon6;
        // that.backpackIconCreate(that.backpackIcon1, that.backpackIcon1Callback, 175, 784);
        // that.backpackIconCreate(that.backpackIcon2, that.backpackIcon2Callback, 175, 784);
        // that.backpackIconCreate(that.backpackIcon3, that.backpackIcon3Callback, 175, 784);
        // that.backpackIconCreate(that.backpackIcon4, that.backpackIcon4Callback, 175, 784);
        // that.backpackIconCreate(that.backpackIcon5, that.backpackIcon5Callback, 175, 784);
        // that.backpackIconCreate(that.backpackIcon6, that.backpackIcon6Callback, 175, 784);

        // Decalaring all sub buttons
        // Not scaling these
        // General
        that.backpackIconAudio = that.add.button(175, 784, "backpackButtonAll",
                                        that.backpackIconAudioCallback, that, 3, 2, 2);
        that.backpackIconAudio.anchor.setTo(0.5, 0.5);
        that.backpackIconAudio.scale.setTo(0.8, 0.8);
        that.backpackIconAudio.addChild(that.add.sprite(-45, -25, "backpackIconAll", 2));

        that.backpackIconVoice = that.add.button(275, 784, "backpackButtonAll",
                                        that.backpackIconVoiceCallback, that, 3, 2, 2);
        that.backpackIconVoice.anchor.setTo(0.5, 0.5);
        that.backpackIconVoice.scale.setTo(0.8, 0.8);
        that.backpackIconVoice.addChild(that.add.sprite(-50, -25, "backpackIconAll", 3));

        // Preferences



        that.count = 0;
        // Intially maxcount is 2 for audio and voice are already present
        that.maxcount = 2;



        // that.pointer is to ensure that all the backpack icons are in position and appear
        // only when the room has been visited. It is to maintain order of icons in the prefBar
        that.pointer = 375;

        if (model.visited.color) {
            that.backpackIconColor = that.add.button(that.pointer, 784, "backpackButtonAll",
                                            that.backpackIconColorCallback, that, 3, 2, 2);
            that.backpackIconColor.anchor.setTo(0.5, 0.5);
            that.backpackIconColor.scale.setTo(0.8, 0.8);
            if (model.contrast) {
                that.backpackIconColorChild = that.add.sprite(-50, -25, "backpackIconAll", 0);
            } else {
                that.backpackIconColorChild = that.add.sprite(-50, -25, "backpackIconAll", 8);
            }
            that.backpackIconColor.addChild(that.backpackIconColorChild);
            that.pointer = that.pointer + 100;
        }

        if (model.visited.simplify) {
            that.backpackIconSimplify = that.add.button(that.pointer, 784, "backpackButtonAll",
                                            that.backpackIconSimplifyCallback, that, 3, 2, 2);
            that.backpackIconSimplify.anchor.setTo(0.5, 0.5);
            that.backpackIconSimplify.scale.setTo(0.8, 0.8);
            that.backpackIconSimplify.addChild(that.add.sprite(-50, -22, "backpackIconAll", 1));
            if (model.simplify) {
                that.backpackIconSimplify.setFrames(3, 2, 2);
            } else {
                that.backpackIconSimplify.setFrames(3, 4, 4);
            }
            that.pointer = that.pointer + 100;
        }
        if (model.visited.sound) {
            that.backpackIconSound = that.add.button(that.pointer, 784, "backpackButtonAll",
                                            that.backpackIconSoundCallback, that, 3, 2, 2);
            that.backpackIconSound.scale.setTo(0.8, 0.8);
            that.backpackIconSound.anchor.setTo(0.5, 0.5);
            that.backpackIconSound.addChild(that.add.sprite(-50, -25, "backpackIconAll", 7));
            if (model.sound) {
                that.backpackIconSound.setFrames(3, 2, 2);
            } else {
                that.backpackIconSound.setFrames(3, 4, 4);
            }
            that.pointer = that.pointer + 100;
        }
        if (model.visited.size) {
            that.backpackIconSize = that.add.button(that.pointer, 784, "backpackButtonAll",
                                            that.backpackIconSizeCallback, that, 3, 2, 2);
            that.backpackIconSize.anchor.setTo(0.5, 0.5);
            that.backpackIconSize.scale.setTo(0.8, 0.8);
            if (model.size === 1) {
                that.backpackIconSizeChild = that.add.sprite(-50, -25, "backpackIconAll", 4);
            } else if (model.size === 1.1) {
                that.backpackIconSizeChild = that.add.sprite(-50, -25, "backpackIconAll", 5);
            } else {
                that.backpackIconSizeChild = that.add.sprite(-50, -25, "backpackIconAll", 6);
            }
            that.backpackIconSize.addChild(that.backpackIconSizeChild);
            that.pointer = that.pointer + 100;
        }

        // Just the big backpack Icon that is present leftmost.
        that.backpackButton = that.add.sprite(70, 784, "backpackButtonAll", 0);
        that.backpackButton.anchor.setTo(0.5, 0.5);
        that.backpackButton.scale.setTo(0.8, 0.8);

        // <-- INCOMPLETE KEYBOARD IMPLEMENTATION -->
        //  // Actions to be performed on pressing TAB
        //  that.changeSelection = function(that) {
        //      // For tab to work
        //      // For shift+tab to work
        //      // that.count starts as 0
        //      if (that.key1.shiftKey) {
        //          // for backward movement
        //          // This will make 0 to become -1
        //          that.count--;
        //      } else {
        //          // for forward movement
        //          // This will make 0 to become 1
        //          that.count++;
        //      }
        //      // After passing this that.count will be either 1 or -1 in the first pass
        //      // On tabing that.count++ makes count 5, that is next to last button
        //      // we redirect it to the first button ie that.count = 1
        //      if (that.count === 5) {
        //          that.count = 1;
        //      }
        //      // On shift+tabing that.count-- makes count 0, at that time to jump to the
        //      // last selection that.count is made 4.
        //      if (that.count === 0) {
        //          that.count = 4;
        //      }
        //      switch (that.count) {
        //          case 1:
        //              // Fix the over, out, in states of last button
        //              that.button4.setFrames(3, 0, 2);
        //              // Change the over, out, in states of this button
        //              that.button1.setFrames(0, 1, 2);
        //              // For Speech
        //              that.button2.setFrames(3, 0, 2);
        //              that.messageSpeechEn();
        //              break;
        //          case 2:
        //              that.button1.setFrames(3, 0, 2);
        //              that.button2.setFrames(0, 1, 2);
        //              that.button3.setFrames(3, 0, 2);
        //              that.messageSpeechEs();
        //              break;
        //          case 3:
        //              that.button2.setFrames(3, 0, 2);
        //              that.button3.setFrames(0, 1, 2);
        //              that.button4.setFrames(3, 0, 2);
        //              that.messageSpeechFr();
        //              break;
        //          case 4:
        //              that.button3.setFrames(3, 0, 2);
        //              that.button4.setFrames(0, 1, 2);
        //              that.button1.setFrames(3, 0, 2);
        //              that.messageSpeechDe();
        //              break;
        //          default:
        //      }
        //  };
        //  // Actions to be performed on pressing ENTER
        // that.acceptSelection = function(that) {
        //        switch (that.count) {
        //          case 1:
        //              that.button1Callback();
        //              break;
        //          case 2:
        //              that.button2Callback();
        //              break;
        //          case 3:
        //              that.button3Callback();
        //              break;
        //          case 4:
        //              that.button4Callback();
        //              break;
        //          default:
        //              // Remember for default to put something
        //      }
        //  };
        //  // Tab support
        //  // Keyboard controls for changing and accepting selections
        //  that.key1 = that.input.keyboard.addKey(Phaser.Keyboard.TAB);
        //  that.key1.onDown.add(that.changeSelection, that);
        //  that.key2 = that.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //  that.key2.onDown.add(that.acceptSelection, that);
    };

    demo.state.house.messageBar = function(that, speechComp, model, message) {
        that.messageBar = that.add.sprite(0, 595, "messageBarAll");
        that.messageBar.scale.setTo(1.001, 1);
        that.messageBarText = that.add.text(50, 50, message);
        that.messageBarText.scale.setTo(model.size, model.size);
        that.messageBar.addChild(that.messageBarText);
        speechComp.queueSpeech(message, true, { lang: model.lang.type });
        that.time.events.add(15000, that.messageBar.destroy, that.messageBar);
    };

    // Message Option added Fix
    demo.state.house.notifs = function(that, element, elementNotif, speechComp, message, model) {
        if (that.physics.arcade.overlap(element, that.cat) &&
                                                    elementNotif.alpha === 0) {
            that.add.tween(elementNotif).to({ alpha: 1 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
            speechComp.queueSpeech(message, true, { lang: model.lang.type });
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

        if (model.simplify) {
            that.stage.backgroundColor = "#f36f46";
        } else {
            that.background = that.add.sprite(0, 0, "backgroundh");
        }

        // Filters
        if (model.contrast) {
            that.colorPrefFilter();
        }

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
        that.simplifyDoor = that.add.sprite(460, 440, "doorh", 1);
        that.simplifyDoor.anchor.setTo(0.5, 1);
        that.simplifyDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.simplifyDoor);
        that.simplifyDoor.body.immovable = true;
        // Sounds Pref Door
        that.soundDoor = that.add.sprite(830, 440, "doorh", 1);
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
        that.cat = that.add.sprite(model.position.catHousex,
                                        model.position.catHousey, "catMoveh", 5);
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
        that.sizeDoorNotif.addChild(that.add.text(-50, -100, model.lang.obj.enterRoom));
        that.sizeDoorNotif.anchor.setTo(0.5, 1);
        that.sizeDoorNotif.scale.setTo(model.size, model.size);
        that.sizeDoorNotif.alpha = 0;
        // Notif color pref door
        that.colorDoorNotif = that.add.sprite(800, 110, "messageBoxAll", 0);
        that.colorDoorNotif.addChild(that.add.text(-50, -100, model.lang.obj.enterRoom));
        that.colorDoorNotif.anchor.setTo(0.5, 1);
        that.colorDoorNotif.scale.setTo(model.size, model.size);
        that.colorDoorNotif.alpha = 0;
        // Notif simplify pref door
        that.simplifyDoorNotif = that.add.sprite(430, 339, "messageBoxAll", 0);
        that.simplifyDoorNotif.addChild(that.add.text(-50, -100, model.lang.obj.enterRoom));
        that.simplifyDoorNotif.anchor.setTo(0.5, 1);
        that.simplifyDoorNotif.scale.setTo(model.size, model.size);
        that.simplifyDoorNotif.alpha = 0;
        // Notif sound pref door
        that.soundDoorNotif = that.add.sprite(800, 339, "messageBoxAll", 0);
        that.soundDoorNotif.addChild(that.add.text(-50, -100, model.lang.obj.enterRoom));
        that.soundDoorNotif.anchor.setTo(0.5, 1);
        that.soundDoorNotif.scale.setTo(model.size, model.size);
        that.soundDoorNotif.alpha = 0;
        // Notif safe
        that.safeNotif = that.add.sprite(450, 570, "messageBoxAll", 0);
        that.safeNotif.addChild(that.add.text(-75, -100, model.lang.obj.safeNotif));
        that.safeNotif.anchor.setTo(0.5, 1);
        that.safeNotif.scale.setTo(model.size, model.size);
        that.safeNotif.alpha = 0;

        // This is for the backpack menu
        that.backpack();

        // To display movement controls to the user at the start of the game
        if (!model.visited.house) {
            that.messageBarMovement();
        }
    };

    demo.state.house.update = function(that, model) {
        // this keeps seperation between platforms and cat or else the cat would
        // pass the ground and stop at the bounds
        that.physics.arcade.collide(that.cat, that.platforms);

        // overlap checks if the sizeDoor and the cat are overlapping each other
        // and at the same time the pressing ENTER makes cat move into room
        if (that.physics.arcade.overlap(that.sizeDoor, that.cat) && that.enter.isDown) {
            that.audioG.pause();
            model.position.catHousex = that.cat.x;
            model.position.catHousey = that.cat.y;
            that.state.start("sizePref");
        }

        if (that.physics.arcade.overlap(that.colorDoor, that.cat) && that.enter.isDown) {
            that.audioG.pause();
            model.position.catHousex = that.cat.x;
            model.position.catHousey = that.cat.y;
            that.state.start("colorPref");
        }

        if (that.physics.arcade.overlap(that.simplifyDoor, that.cat) && that.enter.isDown) {
            that.audioG.pause();
            model.position.catHousex = that.cat.x;
            model.position.catHousey = that.cat.y;
            that.state.start("simplifyPref");
        }

        if (that.physics.arcade.overlap(that.soundDoor, that.cat) && that.enter.isDown) {
            that.audioG.pause();
            model.position.catHousex = that.cat.x;
            model.position.catHousey = that.cat.y;
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
