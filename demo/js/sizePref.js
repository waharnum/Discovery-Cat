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
            }
        }
    });

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
        // So that it can again reappear and surely this will create a new instant
        that.envelopeScreenAppearBool = false;
        that.houseDoor.scale.setTo(model.size, model.size);
        that.envelopePreview.scale.setTo(model.size, model.size);
        that.cat.scale.setTo(model.size, model.size);
        that.cat.y = 450;
        that.doorNotif.scale.setTo(model.size, model.size);
        that.envelopeNotif.scale.setTo(model.size, model.size);

        that.popup = that.add.sprite(640, 1400, "popupAll", 0);
        that.popup.anchor.setTo(0.5, 1);
        that.popup.scale.setTo(model.size, model.size);
        that.letterText = that.add.text(0, -160, "****",
                                                { font: "250px Arial", fill: "#808080" });
        that.letterText.anchor.setTo(0.5, 1);
        that.letterText.scale.setTo(model.size, model.size);
        that.letterText2 = that.add.text(0, -20, "AC", { font: "250px Arial" });
        that.letterText2.anchor.setTo(0.5, 1);
        that.letterText2.scale.setTo(model.size, model.size);
        that.popup.addChild(that.letterText);
        that.popup.addChild(that.letterText2);
        that.t1 = that.add.tween(that.popup).to({ x: 640, y: 600 },
                                                1500, Phaser.Easing.Sinusoidal.InOut, true);
        that.t1.onComplete.add(function() {
            that.add.tween(that.popup).to({ alpha: 0 },
                                                5000, Phaser.Easing.Sinusoidal.InOut, true);
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

        if (model.visited.size === true) {
            that.takeSpects();
        }

        // This envelopeScreenAppearBool is present to ensure that envelopeappear callback
        // from update is called only once.
        that.envelopeScreenAppearBool = false;
        // Cat
        // x distance such that cat does not land on door and ENTER notif plays
        that.cat = that.add.sprite(235, 500, "catMoveh", 5);
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
        that.spectsNotif.scale.setTo(model.size, model.size);
        that.spectsNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.spectsNotif.alpha = 0;
        // door notif
        that.doorNotif = that.add.sprite(40, 380, "messageBoxAll", 0);
        that.doorNotif.scale.setTo(model.size, model.size);
        that.doorNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.doorNotif.alpha = 0;
        // envelope notif
        that.envelopeNotif = that.add.sprite(490, 420, "messageBoxAll", 0);
        that.envelopeNotif.scale.setTo(model.size, model.size);
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
            that.houseDoorOpen();
        }

        if (that.physics.arcade.overlap(that.spects, that.cat) && that.enter.isDown) {
            that.takeSpects();
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
