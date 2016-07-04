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
                args: "{that}"
            },
            update: {
                funcName: "demo.state.house.update",
                args: "{that}"
            }
        }
    });

    // Phaser functions
    demo.state.house.preload = function() {
    };

    demo.state.house.create = function(that) {
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
        that.safe = that.add.sprite(450, 675, "safeh");
        that.safe.anchor.setTo(0.5, 1);
        that.safe.scale.setTo(0.3, 0.3);
        that.physics.arcade.enable(that.safe);
        that.safe.body.immovable = true;

        // door or the room state, will see them for collision
        // Entry Door
        that.add.sprite(50, 38, "doorh", 0);
        // Size Pref Door
        that.sizeDoor = that.add.sprite(400, 38, "doorh", 1);
        that.physics.arcade.enable(that.sizeDoor);
        that.sizeDoor.body.immovable = true;
        // Color Pref Door
        that.colorDoor = that.add.sprite(770, 38, "doorh", 1);
        that.physics.arcade.enable(that.colorDoor);
        that.colorDoor.body.immovable = true;
        // Simplify Pref Door
        that.simplifyDoor = that.add.sprite(400, 277, "doorh", 1);
        that.physics.arcade.enable(that.simplifyDoor);
        that.simplifyDoor.body.immovable = true;
        // Sounds Pref Door
        that.soundDoor = that.add.sprite(770, 277, "doorh", 1);
        that.physics.arcade.enable(that.soundDoor);
        that.soundDoor.body.immovable = true;
        // Main Exit Door
        that.mainExitDoor = that.add.sprite(970, 513, "doorh", 1);
        that.physics.arcade.enable(that.mainExitDoor);
        that.mainExitDoor.body.immovable = true;

        // Cat
        that.cat = that.add.sprite(70, 65, "catMoveh", 5);
        that.cat.scale.setTo(0.4, 0.4);
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
        that.sizeDoorNotif = that.add.sprite(400, 10, "messageBoxAll", 0);
        that.sizeDoorNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.sizeDoorNotif.alpha = 0;
        // Notif safe
        that.safeNotif = that.add.sprite(400, 480, "messageBoxAll", 0);
        that.safeNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.safeNotif.alpha = 0;
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
        if (that.physics.arcade.overlap(that.sizeDoor, that.cat) &&
                                                    that.sizeDoorNotif.alpha === 0) {
            that.add.tween(that.sizeDoorNotif).to({ alpha: 1 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
        }

        if (!that.physics.arcade.overlap(that.sizeDoor, that.cat) &&
                                                    that.sizeDoorNotif.alpha === 1) {
            that.add.tween(that.sizeDoorNotif).to({ alpha: 0 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
        }

        // Safe Notif
        if (that.physics.arcade.overlap(that.safe, that.cat) &&
                                                    that.safeNotif.alpha === 0) {
            that.add.tween(that.safeNotif).to({ alpha: 1 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
        }

        if (!that.physics.arcade.overlap(that.safe, that.cat) &&
                                                    that.safeNotif.alpha === 1) {
            that.add.tween(that.safeNotif).to({ alpha: 0 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
        }

    };

})(jQuery, fluid);
