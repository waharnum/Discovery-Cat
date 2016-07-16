(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.simplifyPref", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.simplifyPref.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.simplifyPref.create",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            update: {
                funcName: "demo.state.simplifyPref.update",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech"]
            },
            houseDoor: {
                funcName: "demo.state.simplifyPref.houseDoor",
                args: "{that}"
            },
            bucketDrop: {
                funcName: "demo.state.simplifyPref.bucketDrop",
                args: "{that}"
            },
            colorBucketCallback: {
                funcName: "demo.state.simplifyPref.colorBucketCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            contrastBucketCallback: {
                funcName: "demo.state.simplifyPref.contrastBucketCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            clockCallback: {
                funcName: "demo.state.simplifyPref.clockCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            fanCallback: {
                funcName: "demo.state.simplifyPref.fanCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            telephoneCallback: {
                funcName: "demo.state.simplifyPref.telephoneCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            passcodeCallback: {
                funcName: "demo.state.simplifyPref.passcodeCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            contrastFilter: {
                funcName: "demo.state.simplifyPref.contrastFilter",
                args: "{that}"
            },
            itemsAppear: {
                funcName: "demo.state.simplifyPref.itemsAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            }
        }
    });

    demo.state.simplifyPref.passcodeCallback = function(that, model) {
        that.popup = that.add.sprite(640, 500, "popupAll", 1);
        that.popup.anchor.setTo(0.5, 1);
        that.popup.scale.setTo(model.size, model.size);
        that.letterText = that.add.text(0, -120, "****\nCE",
                                                { font: "100px Arial", fill: "#fff" });
        that.letterText.anchor.setTo(0.5, 1);
        that.letterText.scale.setTo(model.size, model.size);
        that.popup.addChild(that.letterText);
        that.add.tween(that.popup).to({ alpha: 0 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    demo.state.simplifyPref.telephoneCallback = function(that, model) {
        that.popup = that.add.sprite(640, 500, "popupAll", 1);
        that.popup.anchor.setTo(0.5, 1);
        that.popup.scale.setTo(model.size, model.size);
        that.letterText = that.add.text(0, -200, "Try another...This is phone",
                                                { font: "40px Arial", fill: "#fff" });
        that.letterText.anchor.setTo(0.5, 1);
        that.letterText.scale.setTo(model.size, model.size);
        that.popup.addChild(that.letterText);
        that.add.tween(that.popup).to({ alpha: 0 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    demo.state.simplifyPref.fanCallback = function(that, model) {
        that.popup = that.add.sprite(640, 500, "popupAll", 1);
        that.popup.anchor.setTo(0.5, 1);
        that.popup.scale.setTo(model.size, model.size);
        that.letterText = that.add.text(0, -200, "Try another...This is fan",
                                                { font: "40px Arial", fill: "#fff" });
        that.letterText.anchor.setTo(0.5, 1);
        that.letterText.scale.setTo(model.size, model.size);
        that.popup.addChild(that.letterText);
        that.add.tween(that.popup).to({ alpha: 0 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    demo.state.simplifyPref.clockCallback = function(that, model) {
        that.popup = that.add.sprite(640, 500, "popupAll", 1);
        that.popup.anchor.setTo(0.5, 1);
        that.popup.scale.setTo(model.size, model.size);
        that.letterText = that.add.text(0, -200, "Try another...This is clock",
                                                { font: "40px Arial", fill: "#fff" });
        that.letterText.anchor.setTo(0.5, 1);
        that.letterText.scale.setTo(model.size, model.size);
        that.popup.addChild(that.letterText);
        that.add.tween(that.popup).to({ alpha: 0 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    demo.state.simplifyPref.contrastBucketCallback = function(that, model) {
        that.itemsAppear();
        // This saves the filter from being applied again and again on multiple clicks
        if (!model.contrast) {
            that.contrastFilter();
        }
        model.contrast = true;
        model.visited.color = true;
    };

    demo.state.simplifyPref.colorBucketCallback = function(that, model) {
        model.contrast = false;
        model.visited.color = true;
        that.itemsAppear();
        // To remove filters from the game world
        if (!(that.world.filters === undefined)) {
            that.world.filters = null;
        }
    };

    demo.state.simplifyPref.houseDoor = function(that) {
        that.audioC.pause();
        that.state.start("house");
    };

    demo.state.simplifyPref.bucketDrop = function(that) {
        // Pick up paint brush
        that.paintBrush.visible = false;
        that.paintBrush.body.enable = false;
        that.bucketTween = that.add.tween(that.bucketColorDecoy).to({ x: 300, y: 675 },
                                                2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.bucketContrastDecoy).to({ x: 450, y: 675 },
                                                2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.bucketButtonAppear = function() {
            that.bucketColor.visible = true;
            that.bucketContrast.visible = true;
            that.bucketContrastDecoy.visible = false;
            that.bucketColorDecoy.visible = false;
        };
        // Problem
        that.bucketTween.onComplete.add(that.bucketButtonAppear, that);
    };

    demo.state.simplifyPref.itemsAppear = function(that, model) {
        that.box1.visible = false;
        that.box2.visible = false;
        that.box3.visible = false;
        that.box4.visible = false;
        that.clock = that.add.button(508, 206, "extraAssetcp2", that.clockCallback, that, 1, 0, 0);
        that.clock.anchor.setTo(0.5, 1);
        that.clock.scale.setTo(model.size, model.size);
        that.telephone = that.add.button(767, 205, "extraAssetcp2",
                                                            that.telephoneCallback, that, 3, 2, 2);
        that.telephone.anchor.setTo(0.5, 1);
        that.telephone.scale.setTo(model.size, model.size);
        that.passcode = that.add.button(510, 412, "extraAssetcp2",
                                                            that.passcodeCallback, that, 5, 4, 4);
        that.passcode.anchor.setTo(0.5, 1);
        that.passcode.scale.setTo(model.size, model.size);
        that.fan = that.add.button(785, 412, "extraAssetcp2", that.fanCallback, that, 7, 6, 6);
        that.fan.anchor.setTo(0.5, 1);
        that.fan.scale.setTo(model.size, model.size);
    };

    demo.state.simplifyPref.contrastFilter = function(that) {
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
        // To apply filter everywhere in the game screen apply it to game.world
        that.world.filters = [that.gray, that.invert, that.contrast];
    };

    // Phaser functions
    demo.state.simplifyPref.preload = function() {

    };

    demo.state.simplifyPref.create = function(that, model) {

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
        that.boxes = that.add.group();
        that.box1 = that.boxes.create(508, 244, "extraAssetcp", 0);
        that.box1.anchor.setTo(0.5, 1);
        that.box1.scale.setTo(model.size, model.size);
        that.box2 = that.boxes.create(800, 244, "extraAssetcp", 0);
        that.box2.anchor.setTo(0.5, 1);
        that.box2.scale.setTo(model.size, model.size);
        that.box3 = that.boxes.create(508, 451, "extraAssetcp", 0);
        that.box3.anchor.setTo(0.5, 1);
        that.box3.scale.setTo(model.size, model.size);
        that.box4 = that.boxes.create(800, 451, "extraAssetcp", 0);
        that.box4.anchor.setTo(0.5, 1);
        that.box4.scale.setTo(model.size, model.size);

        // Adding door to house and physics
        that.houseDoor = that.add.sprite(40, 520, "doorh", 1);
        that.physics.arcade.enable(that.houseDoor);
        that.houseDoor.body.immovable = true;

        // Using ground sprite from house level
        that.ground = that.add.sprite(0, 675, "platformh");
        that.physics.arcade.enable(that.ground);
        that.ground.body.immovable = true;

        // bucket
        that.bucketColorDecoy = that.add.sprite(300, -300, "extraAssetcp", 2);
        that.bucketColorDecoy.anchor.setTo(0.5, 1);
        that.bucketColorDecoy.scale.setTo(model.size, model.size);

        that.bucketContrastDecoy = that.add.sprite(450, -300, "extraAssetcp", 3);
        that.bucketContrastDecoy.anchor.setTo(0.5, 1);
        that.bucketContrastDecoy.scale.setTo(model.size, model.size);

        // Initially invisible
        that.bucketColor = that.add.button(300, 675, "extraAssetcp",
                                                that.colorBucketCallback, that, 4, 2, 2);
        that.bucketColor.anchor.setTo(0.5, 1);
        that.bucketColor.scale.setTo(model.size, model.size);
        that.bucketColor.visible = false;

        that.bucketContrast = that.add.button(450, 675, "extraAssetcp",
                                                that.contrastBucketCallback, that, 5, 3, 3);
        that.bucketContrast.anchor.setTo(0.5, 1);
        that.bucketContrast.scale.setTo(model.size, model.size);
        that.bucketContrast.visible = false;

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

        // Check for room setting on revisitin the room
        if (model.visited.color && model.contrast) {
            that.paintBrush.visible = false;
            that.paintBrush.body.enable = false;
            that.contrastBucketCallback();
        }
        if (model.visited.color && !model.contrast) {
            that.paintBrush.visible = false;
            that.paintBrush.body.enable = false;
            that.colorBucketCallback();
        }

    };

    demo.state.simplifyPref.update = function(that, speechComp) {

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
            that.bucketDrop();
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
