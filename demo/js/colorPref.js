(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.colorPref", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.colorPref.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.colorPref.create",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            update: {
                funcName: "demo.state.colorPref.update",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech"]
            },
            houseDoor: {
                funcName: "demo.state.colorPref.houseDoor",
                args: "{that}"
            }
        }
    });

    demo.state.colorPref.houseDoor = function(that) {
        that.audioC.pause();
        that.state.start("house");
    };

    // Phaser functions
    demo.state.colorPref.preload = function() {

    };

    demo.state.colorPref.create = function(that, model) {

        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");

        // Audio play
        that.audioC.play("", 0, 0.1, true);
        // Environment
        that.add.sprite(0, 0, "backgroundcp");

        that.paintBrush = that.add.sprite(970, 570, "extraAssetcp", 1);
        that.paintBrush.anchor.setTo(0.5, 0.5);
        that.physics.arcade.enable(that.paintBrush);
        that.paintBrush.body.immovable = true;

        // Adding boxes to the scene
        that.box1 = that.add.sprite(408, 42, "extraAssetcp", 0);
        that.box2 = that.add.sprite(700, 42, "extraAssetcp", 0);
        that.box3 = that.add.sprite(408, 203, "extraAssetcp", 0);
        that.box4 = that.add.sprite(700, 203, "extraAssetcp", 0);

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

        // paintBrush notif test
        that.paintBrushNotif = that.add.sprite(890, 400, "messageBoxAll", 0);
        that.paintBrushNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.paintBrushNotif.alpha = 0;
        // door notif test
        that.doorNotif = that.add.sprite(40, 480, "messageBoxAll", 0);
        that.doorNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.doorNotif.alpha = 0;
    };

    demo.state.colorPref.update = function(that, speechComp) {
        // Create seperation between ground and cat
        that.physics.arcade.collide(that.cat, that.ground);

        if (that.physics.arcade.overlap(that.paintBrush, that.cat) &&
                                                     that.paintBrushNotif.alpha === 0) {
            that.add.tween(that.paintBrushNotif).to({ alpha: 1 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
            speechComp.queueSpeech("ENTER", true);
        }
        if (!that.physics.arcade.overlap(that.paintBrush, that.cat) &&
                                                     that.paintBrushNotif.alpha === 1) {
            that.add.tween(that.paintBrushNotif).to({ alpha: 0 },
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

        // Exit from room
        if (that.physics.arcade.overlap(that.houseDoor, that.cat) && that.enter.isDown) {
            that.state.start("house");
        }

        if (that.physics.arcade.overlap(that.paintBrush, that.cat) && that.enter.isDown) {
            // Pick up paint brush
            that.paintBrush.visible = false;
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
