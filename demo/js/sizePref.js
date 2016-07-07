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
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            update: {
                funcName: "demo.state.sizePref.update",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech"]
            },
            envelopeScreenAppear: {
                funcName: "demo.state.sizePref.envelopeScreenAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            houseDoor: {
                funcName: "demo.state.sizePref.houseDoor",
                args: "{that}"
            },
            smallEnvelopeAppear: {
                funcName: "demo.state.sizePref.smallEnvelopeAppear",
                args: "{that}"
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
                args: "{that}"
            }
        }
    });

    demo.state.sizePref.houseDoor = function(that) {
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

    demo.state.sizePref.goButtonCallback = function(that) {
        // Group these together
        that.envelope.visible = false;
        that.envelopeAirMail.visible = false;
        that.envelopeStamp.visible = false;
        that.envelopeText.visible = false;
        that.upButton.visible = false;
        that.downButton.visible = false;
        that.goButton.visible = false;
        // So that it can again reappear and surely this will create a new instant
        that.envelopeScreenAppearBool = false;
    };

    demo.state.sizePref.smallEnvelopeAppear = function(that) {
        that.envelopePreview = that.add.sprite(640, 600, "extraAssetsp", 1);
        that.envelopePreview.anchor.setTo(0.5, 0.5);
        that.envelopePreview.scale.setTo(0.8, 0.8);
        that.physics.arcade.enable(that.envelopePreview);
        that.envelopePreview.body.enable = false;
        // that.envelopePreview.body.immovable = true;
        that.envelopePreview.visible = false;
    };

    demo.state.sizePref.envelopeScreenAppear = function(that, model) {
        // count is used as flag for making this run only once when key isDown.
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
        }
    };

    // Phaser functions
    demo.state.sizePref.preload = function() {

    };

    demo.state.sizePref.create = function(that, model) {

        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");

        // Audio play
        that.audioC.play("", 0, 0.1, true);
        // Environment
        that.add.sprite(0, 0, "backgroundsp");

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

        that.envelopeScreenAppearBool = false;
        // Cat
        // x distance such that cat does not land on door and ENTER notif plays
        that.cat = that.add.sprite(235, 500, "catMoveh", 5);
        that.cat.scale.setTo(0.4, 0.4);
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

        // Buttons for evelope
        that.up

        // spects notif
        that.spectsNotif = that.add.sprite(950, 450, "messageBoxAll", 0);
        that.spectsNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.spectsNotif.alpha = 0;
        // door notif
        that.doorNotif = that.add.sprite(40, 480, "messageBoxAll", 0);
        that.doorNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.doorNotif.alpha = 0;
        // envelope notif
        that.envelopeNotif = that.add.sprite(550, 440, "messageBoxAll", 0);
        that.envelopeNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.envelopeNotif.alpha = 0;
    };

    demo.state.sizePref.update = function(that, speechComp) {
        // Create seperation between ground and cat
        that.physics.arcade.collide(that.cat, that.ground);

        if (that.physics.arcade.overlap(that.spects, that.cat) && that.spectsNotif.alpha === 0) {
            that.add.tween(that.spectsNotif).to({ alpha: 1 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
            speechComp.queueSpeech("ENTER", true);
        }
        if (!that.physics.arcade.overlap(that.spects, that.cat) && that.spectsNotif.alpha === 1) {
            that.add.tween(that.spectsNotif).to({ alpha: 0 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
        }
        if (that.physics.arcade.overlap(that.houseDoor, that.cat) && that.doorNotif.alpha === 0) {
            that.add.tween(that.doorNotif).to({ alpha: 1 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
            speechComp.queueSpeech("ENTER", true);
        }
        if (!that.physics.arcade.overlap(that.houseDoor, that.cat) && that.doorNotif.alpha === 1) {
            that.add.tween(that.doorNotif).to({ alpha: 0 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
        }
        if (that.physics.arcade.overlap(that.envelopePreview, that.cat) &&
                                                                that.envelopeNotif.alpha === 0) {
            that.add.tween(that.envelopeNotif).to({ alpha: 1 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
            speechComp.queueSpeech("ENTER", true);
        }
        if (!that.physics.arcade.overlap(that.envelopePreview, that.cat) &&
                                                                 that.envelopeNotif.alpha === 1) {
            that.add.tween(that.envelopeNotif).to({ alpha: 0 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
        }

        // Exit from room
        if (that.physics.arcade.overlap(that.houseDoor, that.cat) && that.enter.isDown) {
            that.state.start("house");
        }

        if (that.physics.arcade.overlap(that.spects, that.cat) && that.enter.isDown) {
            that.envelopePreview.visible = true;
            // Pick up envelope and spects will disappear
            that.spects.visible = false;
            that.spects.body.enable = false;
            // So that notif does not appear when the preview has not come.
            that.envelopePreview.body.enable = true;
        }

        if (that.physics.arcade.overlap(that.envelopePreview, that.cat) && that.enter.isDown) {
            that.envelopeScreenAppear();
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
