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
                args: "{that}"
            },
            update: {
                funcName: "demo.state.sizePref.update",
                args: "{that}"
            },
            envelopeScreenAppear: {
                funcName: "demo.state.sizePref.envelopeScreenAppear",
                args: "{that}"
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
        that.state.start("house");
    };

    demo.state.sizePref.upButtonCallback = function(that, model) {
        if (model.size < 1.4) {
            model.size = model.size + 0.2;
            that.envelopeStamp.scale.setTo(model.size, model.size);
            that.envelopeAirMail.scale.setTo(model.size, model.size);
            that.envelopeText.scale.setTo(model.size, model.size);
            that.envelope.scale.setTo(model.size, model.size);
        }
    };

    demo.state.sizePref.downButtonCallback = function(that, model) {
        if (model.size > 1) {
            // size of all the sprites can be changed by passing model.size
            model.size = model.size - 0.2;
            that.envelopeStamp.scale.setTo(model.size, model.size);
            that.envelopeAirMail.scale.setTo(model.size, model.size);
            that.envelopeText.scale.setTo(model.size, model.size);
            that.envelope.scale.setTo(model.size, model.size);
        }
    };

    demo.state.sizePref.goButtonCallback = function(that) {
        that.envelope.visible = false;
        that.envelopeAirMail.visible = false;
        that.envelopeStamp.visible = false;
        that.envelopeText.visible = false;
        that.upButton.visible = false;
        that.downButton.visible = false;
        that.goButton.visible = false;
    };

    demo.state.sizePref.smallEnvelopeAppear = function(that) {
        that.envelopePreview = that.add.sprite(500, 600, "extraAssetsp", 1);
        that.envelopePreview.scale.setTo(0.5, 0.5);
        that.physics.arcade.enable(that.envelopePreview);
        that.envelopePreview.body.immovable = true;
        that.spects.visible = false;
    };

    demo.state.sizePref.envelopeScreenAppear = function(that) {
        // Envelope
        that.envelope = that.add.sprite(0, 0, "letterEnvelopesp");
        that.envelopeStamp = that.add.sprite(530, 150, "letterAssetsp", 0);
        that.envelopeAirMail = that.add.sprite(0, 140, "letterAssetsp", 1);
        // Replace text with all options
        that.envelopeText = that.add.text(100, 380, "To\nThe Cat\nChasing the Rat",
                                                 { font: "40px Arial" });

        // Buttons
        that.upButton = that.add.button(980, 170, "upDownButtonsp",
                                            that.upButtonCallback, that, 2, 0, 4);
        that.downButton = that.add.button(980, 400, "upDownButtonsp",
                                            that.downButtonCallback, that, 3, 1, 5);
        that.goButton = that.add.button(1120, 332, "goButtonsp",
                                            that.goButtonCallback, that, 1, 0, 2);
    };

    // Phaser functions
    demo.state.sizePref.preload = function() {

    };

    demo.state.sizePref.create = function(that) {
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
        that.houseDoor = that.add.sprite(40, 520, "doorh", 1);
        that.physics.arcade.enable(that.houseDoor);
        that.houseDoor.body.immovable = true;

        // Using ground sprite from house level
        that.ground = that.add.sprite(0, 675, "platformh");
        that.physics.arcade.enable(that.ground);
        that.ground.body.immovable = true;

        // Cat
        that.cat = that.add.sprite(50, 500, "catMoveh", 5);
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



    };

    demo.state.sizePref.update = function(that) {
        // Create seperation between ground and cat
        that.physics.arcade.collide(that.cat, that.ground);

        // Exit from room
        if (that.physics.arcade.overlap(that.houseDoor, that.cat) && that.enter.isDown) {
            that.state.start("house");
        }

        if (that.physics.arcade.overlap(that.spects, that.cat) && that.enter.isDown) {
            that.smallEnvelopeAppear();
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
