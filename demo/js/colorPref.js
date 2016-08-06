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
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
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
            contrastFilter: {
                funcName: "demo.state.colorPref.contrastFilter",
                args: "{that}"
            },
            houseDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.houseDoor", "{that}.houseDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.exitRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            paintBrushNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.paintBrush", "{that}.paintBrushNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.pickItem",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            aisleNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.aisle", "{that}.aisleNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.useItem",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            stateEnterAnimation: {
                funcName: "demo.state.prelude.stateEnterAnimation",
                args: ["{that}", 1070, 570]
            },
            backpack: {
                funcName: "demo.state.house.backpack",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model", "colorPref"]
            },
            gainFocusAnimation: {
                funcName: "demo.state.colorPref.gainFocusAnimation",
                args: ["{that}", 535, 190]
            },
            passcodeFound: {
                funcName: "demo.state.sizePref.passcodeFound",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            inactionFeedback: {
                funcName: "demo.state.colorPref.inactionFeedback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            messageBarInstruction: {
                funcName: "demo.state.house.messageBar",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                    "{demo.discoveryCat}.prefModel.model",
                    "{demo.discoveryCat}.prefModel.model.lang.obj.colorPrefInstruction", 8000, 615]
            }
        }
    });

    demo.state.colorPref.inactionFeedback = function(that, model) {
        if (model.contrast) {
            var obj = that.bucketContrast;
        } else {
            var obj = that.bucketColor;
        }

        that.t1 = that.add.tween(obj).to({ x: 986, y: obj.y }, 100,
            Phaser.Easing.Sinusoidal.InOut, false, 0).to({ x: 974, y: obj.y }, 200,
            Phaser.Easing.Sinusoidal.InOut, false, 0).to({ x: 980, y: obj.y }, 100,
            Phaser.Easing.Sinusoidal.InOut, false, 0);
        that.t1.start();
    };

    demo.state.colorPref.gainFocusAnimation = function(that, x, y) {
        that.circle = that.add.graphics(x, y);
        that.circle.lineStyle(10, 0xffd900, 1);
        that.focus = that.circle.drawCircle(0, 0, 200);
        that.focus.scale.setTo(10, 10);
        that.t2 = that.add.tween(that.focus.scale).to({ x: 1, y: 1 }, 1000,
            Phaser.Easing.Sinusoidal.InOut, false, 0).to({ x: 2, y: 2 }, 500,
            Phaser.Easing.Sinusoidal.InOut, false, 0).to({ x: 1, y: 1 }, 500,
            Phaser.Easing.Sinusoidal.InOut, false, 0);
        that.t2.start();
    };


    demo.state.colorPref.contrastBucketCallback = function(that, model) {
        // This saves the filter from being applied again and again on multiple clicks
        if (!model.contrast) {
            that.contrastFilter();
        }
        if (model.contrast) {
            that.inactionFeedback();
        }
        model.contrast = true;
    };

    demo.state.colorPref.colorBucketCallback = function(that, model) {
        // To remove filters from the game world
        if (!(that.world.filters === undefined)) {
            that.world.filters = null;
        }
        if (!model.contrast) {
            that.inactionFeedback();
        }
        model.contrast = false;
    };

    demo.state.colorPref.goButtonCallback = function(that, model) {
        // Group these together
        that.bucketContrast.visible = false;
        that.bucketColor.visible = false;
        that.goButton.visible = false;
        // So that it can again reappear and surely this will create a new instant
        if (!model.passcodeCollected.color) {
            that.gainFocusAnimation();
            that.time.events.add(4000, function() {
                that.popupScreen.visible = false;
                that.aisleScreenAppearBool = false;
                that.circle.visible = false;
                that.passcodeText.visible = false;
                that.passcodeFound();
            }, that);
            model.passcodeCollected.color = true;
        } else {
            that.popupScreen.visible = false;
            that.aisleScreenAppearBool = false;
            that.passcodeText.visible = false;
        }
    };

    demo.state.colorPref.houseDoorFunc = function(that) {
        that.audioC.pause();
        that.state.start("house");
    };

    demo.state.colorPref.aisleScreenAppear = function(that, model) {
        if (that.aisleScreenAppearBool === false) {
            that.popupScreen = that.add.sprite(0, 0, "popupScreencp");
            that.passcodeText = that.add.text(465, 130, "******\n  AC",
                                                    { font: "60px Arial", fill: "#000" });
            that.bucketColor = that.add.button(980, 170, "upDownButtonsp",
                                                    that.colorBucketCallback, that, 19, 17, 17);
            that.bucketContrast = that.add.button(980, 400, "upDownButtonsp",
                                                    that.contrastBucketCallback, that, 20, 18, 18);
            that.goButton = that.add.button(1120, 332, "goButtonsp",
                                                that.goButtonCallback, that, 1, 0, 2);
            that.aisleScreenAppearBool = true;

            if (model.passcodeCollected.color === false) {
                that.messageBarInstruction();
            }
        }
    };

    demo.state.colorPref.aisleAppear = function(that, model) {
        // Pick up paint brush
        that.paintBrush.visible = false;
        that.paintBrush.body.enable = false;
        that.aisle.body.enable = true;
        that.aisle.visible = true;
        // When picked up the brush
        model.visited.color = true;
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

        that.stage.backgroundColor = "#5cbd6c";

        // Ensuring simplify Pref
        if (!model.simplify) {
            that.background = that.add.sprite(0, 0, "backgroundcp");
        }

        // Ensuring color Pref
        if (model.contrast) {
            that.contrastFilter();
        }


        that.paintBrush = that.add.sprite(1070, 670, "extraAssetcp", 1);
        that.paintBrush.anchor.setTo(0.5, 1);
        that.paintBrush.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.paintBrush);
        that.paintBrush.body.immovable = true;

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

        // Aisle
        that.aisle = that.add.sprite(430, 675, "extraAssetcp", 6);
        that.aisle.anchor.setTo(0.5, 1);
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
        that.paintBrushNotif.addChild(that.add.text(10, 25, model.lang.obj.pickItem));
        that.paintBrushNotif.scale.setTo(model.size, model.size);
        that.paintBrushNotif.alpha = 0;
        // door notif test
        that.houseDoorNotif = that.add.sprite(40, 480, "messageBoxAll", 0);
        that.houseDoorNotif.addChild(that.add.text(10, 25, model.lang.obj.exitRoom));
        that.houseDoorNotif.scale.setTo(model.size, model.size);
        that.houseDoorNotif.alpha = 0;
        // aisle notif test
        that.aisleNotif = that.add.sprite(360, 360, "messageBoxAll", 0);
        that.aisleNotif.addChild(that.add.text(10, 25, model.lang.obj.useItem));
        that.aisleNotif.scale.setTo(model.size, model.size);
        that.aisleNotif.alpha = 0;

        if (model.visited.color) {
            that.aisleAppear();
        }

        that.stateEnterAnimation();

        that.backpack();
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
