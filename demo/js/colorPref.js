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
                args: ["{that}"]
            },
            houseDoorFunc: {
                funcName: "demo.state.colorPref.houseDoorFunc",
                args: "{that}"
            },
            aisleAppear: {
                funcName: "demo.state.colorPref.aisleAppear",
                args: "{that}"
            },
            aisleScreenAppear: {
                funcName: "demo.state.colorPref.aisleScreenAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            colorBucketCallback: {
                funcName: "demo.state.colorPref.colorBucketCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            contrastBucketCallback: {
                funcName: "demo.state.colorPref.contrastBucketCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            goButtonCallback: {
                funcName: "demo.state.colorPref.goButtonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            passcodeCallback: {
                funcName: "demo.state.colorPref.passcodeCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            contrastFilter: {
                funcName: "demo.state.colorPref.contrastFilter",
                args: "{that}"
            },
            houseDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.houseDoor", "{that}.houseDoorNotif",
                                                            "{demo.discoveryCat}.textToSpeech"]
            },
            paintBrushNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.paintBrush", "{that}.paintBrushNotif",
                                                            "{demo.discoveryCat}.textToSpeech"]
            },
            aisleNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.aisle", "{that}.aisleNotif",
                                                            "{demo.discoveryCat}.textToSpeech"]
            }
        }
    });

    demo.state.colorPref.passcodeCallback = function(that, model) {
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

    demo.state.colorPref.contrastBucketCallback = function(that, model) {
        that.itemsAppear();
        // This saves the filter from being applied again and again on multiple clicks
        if (!model.contrast) {
            that.contrastFilter();
        }
        model.contrast = true;
        model.visited.color = true;
    };

    demo.state.colorPref.colorBucketCallback = function(that, model) {
        model.contrast = false;
        model.visited.color = true;
        that.itemsAppear();
        // To remove filters from the game world
        if (!(that.world.filters === undefined)) {
            that.world.filters = null;
        }
    };

    demo.state.colorPref.goButtonCallback = function(that) {
        // Group these together
        that.popupScreen.visible = false;
        that.bucketContrast.visible = false;
        that.bucketColor.visible = false;
        that.goButton.visible = false;
        // So that it can again reappear and surely this will create a new instant
        that.aisleScreenAppearBool = false;
    };

    demo.state.colorPref.houseDoorFunc = function(that) {
        that.audioC.pause();
        that.state.start("house");
    };

    demo.state.colorPref.aisleScreenAppear = function(that, model) {
        if (that.aisleScreenAppearBool === false) {
            that.popupScreen = that.add.sprite(0, 0, "popupScreencp");
            that.bucketColor = that.add.button(1100, 250, "upDownButtonsp",
                                                    that.colorBucketCallback, that, 19, 17, 17);
            that.bucketColor.anchor.setTo(0.5, 1);
            that.bucketColor.scale.setTo(model.size, model.size);

            that.bucketContrast = that.add.button(1100, 450, "upDownButtonsp",
                                                    that.contrastBucketCallback, that, 20, 18, 18);
            that.bucketContrast.anchor.setTo(0.5, 1);
            that.bucketContrast.scale.setTo(model.size, model.size);
            that.goButton = that.add.button(1030, 500, "goButtonsp",
                                                that.goButtonCallback, that, 1, 0, 2);
            that.aisleScreenAppearBool = true;
        }
    };

    demo.state.colorPref.aisleAppear = function(that) {
        // Pick up paint brush
        that.paintBrush.visible = false;
        that.paintBrush.body.enable = false;
        that.aisle.body.enable = true;
        that.aisle.visible = true;
    };

    demo.state.colorPref.contrastFilter = function(that) {
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

        that.paintBrush = that.add.sprite(1070, 570, "extraAssetcp", 1);
        that.paintBrush.anchor.setTo(0.5, 0.5);
        that.physics.arcade.enable(that.paintBrush);
        that.paintBrush.body.immovable = true;

        that.add.sprite(360, 37, "extraAssetcp2", 0);
        that.add.sprite(620, 36, "extraAssetcp2", 2);
        that.add.sprite(370, 243, "extraAssetcp2", 4);
        that.add.sprite(635, 245, "extraAssetcp2", 6);

        // Adding door to house and physics
        that.houseDoor = that.add.sprite(40, 520, "doorh", 1);
        that.physics.arcade.enable(that.houseDoor);
        that.houseDoor.body.immovable = true;

        // Using ground sprite from house level
        that.ground = that.add.sprite(0, 675, "platformh");
        that.physics.arcade.enable(that.ground);
        that.ground.body.immovable = true;

        // Aisle
        that.aisle = that.add.sprite(430, 560, "extraAssetcp", 6);
        that.aisle.anchor.setTo(0.5, 0.5);
        that.aisle.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.aisle);
        that.aisle.body.enable = false;
        that.aisle.visible = false;

        that.aisleScreenAppearBool = false;

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

        // paintBrush notif test
        that.paintBrushNotif = that.add.sprite(990, 400, "messageBoxAll", 0);
        that.paintBrushNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.paintBrushNotif.alpha = 0;
        // door notif test
        that.houseDoorNotif = that.add.sprite(40, 480, "messageBoxAll", 0);
        that.houseDoorNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.houseDoorNotif.alpha = 0;
        // aisle notif test
        that.aisleNotif = that.add.sprite(360, 360, "messageBoxAll", 0);
        that.aisleNotif.addChild(that.add.text(35, 20, "ENTER"));
        that.aisleNotif.alpha = 0;

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

    demo.state.colorPref.update = function(that) {

        that.physics.arcade.collide(that.cat, that.ground);

        that.houseDoorNotifFunc();

        that.paintBrushNotifFunc();

        that.aisleNotifFunc();

        // Exit from room
        if (that.physics.arcade.overlap(that.houseDoor, that.cat) && that.enter.isDown) {
            that.houseDoorFunc();
        }

        if (that.physics.arcade.overlap(that.paintBrush, that.cat) && that.enter.isDown) {
            that.aisleAppear();
        }

        if (that.physics.arcade.overlap(that.aisle, that.cat) && that.enter.isDown) {
            that.aisleScreenAppear();
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
