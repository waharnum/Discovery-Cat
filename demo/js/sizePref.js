(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.sizePref", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.sizePref.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.sizePref.create",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                        "{demo.discoveryCat}.textToSpeech"]
            },
            update: {
                funcName: "demo.state.sizePref.update",
                args: ["{that}"]
            },
            envelopeScreenAppear: {
                funcName: "demo.state.sizePref.envelopeScreenAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            houseDoorOpen: {
                funcName: "demo.state.sizePref.houseDoorOpen",
                args: "{that}"
            },
            smallEnvelopeAppear: {
                funcName: "demo.state.sizePref.smallEnvelopeAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            takeSpects: {
                funcName: "demo.state.sizePref.takeSpects",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            upButtonCallback: {
                funcName: "demo.state.sizePref.upButtonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            downButtonCallback: {
                funcName: "demo.state.sizePref.downButtonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            goButtonCallback: {
                funcName: "demo.state.sizePref.goButtonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            houseDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.houseDoor", "{that}.houseDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.exitRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            spectsNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.spects", "{that}.spectsNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.pickItem",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            envelopeNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.envelopePreview", "{that}.envelopeNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.useItem",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            stateEnterAnimation: {
                funcName: "demo.state.prelude.stateEnterAnimation",
                args: ["{that}", 950, 550]
            },
            colorPrefFilter: {
                funcName: "demo.state.colorPref.contrastFilter",
                args: "{that}"
            },
            backpack: {
                funcName: "demo.state.house.backpack",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model", "sizePref"]
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
                    "{demo.discoveryCat}.prefModel.model.lang.obj.sizePrefInstruction", 8000, 615]
            },
            changeSelectionUp: {
                funcName: "demo.state.sizePref.changeSelection",
                args: ["{that}", "{that}.upButton"]
            },
            changeSelectionDown: {
                funcName: "demo.state.sizePref.changeSelection",
                args: ["{that}", "{that}.downButton"]
            },
            catMovementUpdate: {
                funcName: "demo.state.sizePref.catMovementUpdate",
                args: ["{that}"]
            }
        }
    });

    demo.state.sizePref.catMovementUpdate = function(that) {
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

        // expandBool makes sure cat does not jump when the backpack is open
        if (that.cursors.up.isDown && that.cat.body.touching.down &&
                                                      !that.expandBool) {
            that.cat.body.velocity.y = -700;
        }
    };

    demo.state.sizePref.changeSelection = function(that, button) {
        if (button === that.upButton) {
            that.count--;
        }

        if (button === that.downButton) {
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
            that.downButton.setFrames(3, 1, 1);
            // Change the over, out, in states of this button
            that.upButton.setFrames(0, 2, 2);
            that.oldCount = 1;
            that.upButtonCallback();
        }
        if (that.count === 2) {
            // Change the over, out, in states of this button
            that.upButton.setFrames(2, 0, 0);
            // Fix the over, out, in states of last button
            that.downButton.setFrames(1, 3, 3);
            that.oldCount = 2;
            that.downButtonCallback();
        }

    };

    demo.state.sizePref.passcodeFound = function(that, model, speechComp, message) {
        // Pattern falling from top
        that.emitter = that.add.emitter(that.world.centerX, -200, 200);
        that.emitter.makeParticles("pattern");
        that.emitter.start(false, 8000, 10);

        that.passcodeFound = that.add.sprite(640, -500, "popupAll", 1);
        that.passcodeFound.anchor.setTo(0.5, 1);
        that.letterText = that.add.text(-280, -250, message,
                                                { font: "60px Arial", fill: "#fff" });
        that.passcodeFound.addChild(that.letterText);
        that.passcodeFound.scale.setTo(model.size, model.size);
        speechComp.queueSpeech(message, true, { lang: model.lang.type });
        that.t = that.add.tween(that.passcodeFound).to({ x: 640, y: 500 }, 1000,
            Phaser.Easing.Sinusoidal.InOut, false, 0).to({ x: 640, y: 1500 }, 1000,
            Phaser.Easing.Sinusoidal.InOut, false, 2500);
        that.t.start();
        that.time.events.add(5000, that.emitter.destroy, that.emitter);
    };

    demo.state.sizePref.houseDoorOpen = function(that) {
        that.audioC.pause();
        that.state.start("house");
    };

    demo.state.sizePref.upButtonCallback = function(that, model) {
        if (model.size < 1.2) {
            model.size = model.size + 0.1;
            that.envelopeStamp.scale.setTo(model.size, model.size);
            that.envelopeAirMail.scale.setTo(model.size, model.size);
            that.envelopeText.scale.setTo(model.size, model.size);
        }
    };

    demo.state.sizePref.downButtonCallback = function(that, model) {
        if (model.size > 1) {
            // size of all the sprites can be changed by passing model.size
            model.size = model.size - 0.1;
            that.envelopeStamp.scale.setTo(model.size, model.size);
            that.envelopeAirMail.scale.setTo(model.size, model.size);
            that.envelopeText.scale.setTo(model.size, model.size);
        }
    };

    demo.state.sizePref.goButtonCallback = function(that, model) {
        // Group these together
        that.envelope.visible = false;
        that.envelopeAirMail.visible = false;
        that.envelopeStamp.visible = false;
        that.envelopeText.visible = false;
        that.upButton.visible = false;
        that.downButton.visible = false;
        that.goButton.visible = false;

        // This is to make sure instructions also get dissappeared, as if
        // user presses GO really quickly and the desired time for the
        // instructions(here 7secs) is not passed then it still is visible on
        // screen.
        that.messageBar.visible = false;

        // This is just black transparent screen for the use of highlighting the
        // passcode stuff happening on the screen with respect to the background.
        that.tempBackground = that.add.sprite(0, 0, "popupScreensop");

        that.houseDoor.scale.setTo(model.size, model.size);
        that.envelopePreview.scale.setTo(model.size, model.size);
        that.cat.scale.setTo(model.size, model.size);
        that.cat.y = 450;
        that.houseDoorNotif.scale.setTo(model.size, model.size);
        that.envelopeNotif.scale.setTo(model.size, model.size);
        // So that again and again passcode screen does not come.
        if (model.passcodeCollected.size === false) {
            that.popup = that.add.sprite(640, 1400, "popupAll", 0);
            that.popup.anchor.setTo(0.5, 1);

            that.letterText = that.add.text(-160, -360, "******\n  AC",
                                                    { font: "125px Arial", fill: "#000" });
            that.letterText.scale.setTo(model.size, model.size);
            that.popup.addChild(that.letterText);

            // that.envelopeForLetter = that.add.sprite(640, 1500, "envelopeForLettersp");
            // that.envelopeForLetter.anchor.setTo(0.5, 1);
            // that.add.tween(that.envelopeForLetter).to({ x: 640, y: 1100 },
            //             1000, Phaser.Easing.Sinusoidal.InOut, true);

            that.add.tween(that.popup).to({ x: 640, y: 600 },
                1500, Phaser.Easing.Sinusoidal.InOut, true).to({ x: 640, y: 600 },
                10000, Phaser.Easing.Sinusoidal.InOut, true).onComplete.add(
                function() {
                    that.time.events.add(4000, function() {
                        that.add.tween(that.popup).to({ x: 640, y: 1400 },
                                    500, Phaser.Easing.Sinusoidal.InOut, true);
                        // that.add.tween(that.envelopeForLetter).to({ x: 640, y: 1500 },
                        //             1500, Phaser.Easing.Sinusoidal.InOut, true);
                        that.tempBackground.visible = false;
                        }, that.popup);
                    that.time.events.add(4000, that.passcodeFound, that);

                }, that);
            model.passcodeCollected.size = true;
        } else {
            that.tempBackground.visible = false;
        }

        // Removes all the key Captures till now.
        that.input.keyboard.removeKey(Phaser.Keyboard.UP);
        that.input.keyboard.removeKey(Phaser.Keyboard.DOWN);
        that.input.keyboard.removeKey(Phaser.Keyboard.ENTER);

        that.cursors = that.input.keyboard.createCursorKeys();
        that.enter = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // So that it can again reappear and surely this will create a new instant
        // The reason for time event is that when the user presses Enter for Go
        // the screenDisappears and the game starts registering isDown for Enter in
        // the update section, so suddenly screen disappears and again appears. So
        // we will introduce some time b4 control moves to isDown.
        that.time.events.add(4000, function() {
                    that.envelopeScreenAppearBool = false;
        }, that);


    };

    demo.state.sizePref.takeSpects = function(that, model) {
        // So that notif appear when the preview has come.
        that.envelopePreview.visible = true;
        that.envelopePreview.body.enable = true;
        // Pick up envelope and spects will disappear
        that.spects.visible = false;
        that.spects.body.enable = false;
        // cat has visited the room and taken the spects then only
        // it means he has visited it or else things would remain
        // the same as the envelope will always be there.
        model.visited.size = true;
    };

    demo.state.sizePref.smallEnvelopeAppear = function(that, model) {
        that.envelopePreview = that.add.sprite(580, 600, "extraAssetsp", 1);
        that.envelopePreview.anchor.setTo(0.5, 0.5);
        that.envelopePreview.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.envelopePreview);
        that.envelopePreview.body.enable = false;
        // that.envelopePreview.body.immovable = true;
        that.envelopePreview.visible = false;
    };

    demo.state.sizePref.envelopeScreenAppear = function(that, model) {
        // envelopeScreenAppearBool is used as flag for making this run only
        // once when key isDown.
        if (that.envelopeScreenAppearBool === false) {
            // Envelope
            that.envelope = that.add.sprite(0, 0, "letterEnvelopesp");

            that.envelopeAirMail = that.add.sprite(240, 260, "letterAssetsp", 1);
            that.envelopeAirMail.anchor.setTo(0.5, 0.5);
            that.envelopeAirMail.scale.setTo(model.size, model.size);

            that.envelopeStamp = that.add.sprite(660, 280, "letterAssetsp", 0);
            that.envelopeStamp.anchor.setTo(0.5, 0.5);
            that.envelopeStamp.scale.setTo(model.size, model.size);

            // Replace text with all options
            that.envelopeText = that.add.text(260, 490, "To\nThe Cat\nChasing the Rat",
                                                     { font: "40px Arial" });
            that.envelopeText.anchor.setTo(0.5, 0.5);
            that.envelopeText.scale.setTo(model.size, model.size);

            // Buttons
            that.upButton = that.add.button(980, 170, "upDownButtonsp",
                                                that.upButtonCallback, that, 2, 0, 4);
            that.downButton = that.add.button(980, 400, "upDownButtonsp",
                                                that.downButtonCallback, that, 3, 1, 5);
            that.goButton = that.add.button(1120, 332, "goButtonsp",
                                                that.goButtonCallback, that, 1, 0, 2);
            that.envelopeScreenAppearBool = true;

            // Instruction messages, these will be shown only the first time user visits room
            if (model.passcodeCollected.size === false) {
                that.messageBarInstruction();
            }

            that.upKey = that.input.keyboard.addKey(Phaser.Keyboard.UP);
            that.downKey = that.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            that.upKey.onDown.add(that.changeSelectionUp, that);
            that.downKey.onDown.add(that.changeSelectionDown, that);
            that.enter.onDown.add(that.goButtonCallback, that);
        }
    };

    // Phaser functions
    demo.state.sizePref.preload = function() {

    };

    demo.state.sizePref.create = function(that, model, speechComp) {
        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");

        // Audio play
        that.audioC.play("", 0, 0.1, true);
        that.stage.backgroundColor = "#b72025";

        // Ensuring simplify Pref
        if (!model.simplify) {
            that.background = that.add.sprite(0, 0, "backgroundsp");
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
        }

        if (!model.voice) {
            speechComp.applier.change("utteranceOpts.volume", 0);
        }

        // Environment
        // Does not require model.size anyways will get disappeared
        that.spects = that.add.sprite(950, 550, "extraAssetsp", 0);
        that.physics.arcade.enable(that.spects);
        that.spects.body.immovable = true;

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

        // For small envelope did this to sole the problem of having the
        // letter above cat.
        that.smallEnvelopeAppear();

        // This envelopeScreenAppearBool is present to ensure that envelopeappear callback
        // from update is called only once.
        that.envelopeScreenAppearBool = false;
        // Cat
        // x distance such that cat does not land on door and ENTER notif plays
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

        // spects notif
        that.spectsNotif = that.add.sprite(950, 450, "messageBoxAll", 0);
        that.spectsNotif.addChild(that.add.text(10, 25, model.lang.obj.pickItem));
        that.spectsNotif.scale.setTo(model.size, model.size);
        that.spectsNotif.alpha = 0;
        // door notif
        that.houseDoorNotif = that.add.sprite(40, 380, "messageBoxAll", 0);
        that.houseDoorNotif.addChild(that.add.text(10, 25, model.lang.obj.exitRoom));
        that.houseDoorNotif.scale.setTo(model.size, model.size);
        that.houseDoorNotif.alpha = 0;
        // envelope notif
        that.envelopeNotif = that.add.sprite(490, 440, "messageBoxAll", 0);
        that.envelopeNotif.addChild(that.add.text(10, 25, model.lang.obj.useItem));
        that.envelopeNotif.scale.setTo(model.size, model.size);
        that.envelopeNotif.alpha = 0;

        // Revisiting room scenerio
        if (model.visited.size) {
            that.takeSpects();
        }

        that.backpack();

        that.stateEnterAnimation();

        that.count = 1;
    };

    demo.state.sizePref.update = function(that) {
        // Create seperation between ground and cat
        that.physics.arcade.collide(that.cat, that.ground);

        that.houseDoorNotifFunc();

        that.spectsNotifFunc();

        that.envelopeNotifFunc();

        // Exit from room
        if (that.physics.arcade.overlap(that.houseDoor, that.cat) && that.enter.isDown &&
                                                                            !that.expandBool) {
            that.houseDoorOpen();
        }

        if (that.physics.arcade.overlap(that.spects, that.cat) && that.enter.isDown &&
                                                                            !that.expandBool) {
            that.takeSpects();
        }

        if (that.physics.arcade.overlap(that.envelopePreview, that.cat) && that.enter.isDown &&
                                                                            !that.expandBool) {
            that.envelopeScreenAppear();
        }

        // Character movement and envelope screen up down key movement
        if (!that.envelopeScreenAppearBool) {
            that.catMovementUpdate();
        }

    };

})(jQuery, fluid);
