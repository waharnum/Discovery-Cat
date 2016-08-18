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
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                        "{demo.discoveryCat}.textToSpeech"]
            },
            update: {
                funcName: "demo.state.simplifyPref.update",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            newspaperScreenAppear: {
                funcName: "demo.state.simplifyPref.newspaperScreenAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            houseDoorOpen: {
                funcName: "demo.state.simplifyPref.houseDoorOpen",
                args: "{that}"
            },
            smallNewspaperAppear: {
                funcName: "demo.state.simplifyPref.smallNewspaperAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            takeScissor: {
                funcName: "demo.state.simplifyPref.takeScissor",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            scissorButtonCallback: {
                funcName: "demo.state.simplifyPref.scissorButtonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            putBackButtonCallback: {
                funcName: "demo.state.simplifyPref.putBackButtonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            goButtonCallback: {
                funcName: "demo.state.simplifyPref.goButtonCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            scissorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.scissor", "{that}.scissorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.pickItem",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            houseDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.houseDoor", "{that}.houseDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.exitRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            smallNewspaperNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.smallNewspaper", "{that}.newspaperNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.useItem",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            stateEnterAnimation: {
                funcName: "demo.state.prelude.stateEnterAnimation",
                args: ["{that}", 1080, 670]
            },
            colorPrefFilter: {
                funcName: "demo.state.colorPref.contrastFilter",
                args: "{that}"
            },
            passcodeFound: {
                funcName: "demo.state.sizePref.passcodeFound",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                        "{demo.discoveryCat}.textToSpeech",
                            "{demo.discoveryCat}.prefModel.model.lang.obj.passcodeFound"]
            },
            backpack: {
                funcName: "demo.state.house.backpack",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model", "simplifyPref"]
            },
            inactionFeedback: {
                funcName: "demo.state.simplifyPref.inactionFeedback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            gainFocusAnimation: {
                funcName: "demo.state.colorPref.gainFocusAnimation",
                args: ["{that}", 888, 220]
            },
            messageBarInstruction: {
                funcName: "demo.state.house.messageBar",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                    "{demo.discoveryCat}.prefModel.model",
                    "{demo.discoveryCat}.prefModel.model.lang.obj.simplifyPrefInstruction",
                                                    8000, 615]
            },
            changeSelectionUp: {
                funcName: "demo.state.simplifyPref.changeSelection",
                args: ["{that}", "{that}.scissorButton"]
            },
            changeSelectionDown: {
                funcName: "demo.state.simplifyPref.changeSelection",
                args: ["{that}", "{that}.putBackButton"]
            },
            catMovementUpdate: {
                funcName: "demo.state.sizePref.catMovementUpdate",
                args: ["{that}"]
            }
        }
    });


    demo.state.simplifyPref.changeSelection = function(that, button) {
        if (button === that.scissorButton) {
            that.count--;
        }

        if (button === that.putBackButton) {
            that.count++;
        }

        if (that.count === 3) {
            that.count = 2;
        }

        if (that.count === 0) {
            that.count = 1;
        }

        if (that.count === 1) {
            that.putBackButton.setFrames(11, 10, 10);
            that.scissorButton.setFrames(9, 12, 12);
            that.oldCount = 1;
            that.scissorButtonCallback();
        }
        if (that.count === 2) {
            that.putBackButton.setFrames(10, 11, 11);
            that.scissorButton.setFrames(12, 9, 9);
            that.oldCount = 2;
            that.putBackButtonCallback();
        }

    };

    demo.state.simplifyPref.inactionFeedback = function(that, model) {
        var obj;
        if (model.simplify) {
            obj = that.scissorButton;
        } else {
            obj = that.putBackButton;
        }

        that.t1 = that.add.tween(obj).to({ x: 1009, y: obj.y }, 100,
            Phaser.Easing.Sinusoidal.InOut, false, 0).to({ x: 1021, y: obj.y }, 200,
            Phaser.Easing.Sinusoidal.InOut, false, 0).to({ x: 1015, y: obj.y }, 100,
            Phaser.Easing.Sinusoidal.InOut, false, 0);
        that.t1.start();
    };

    demo.state.simplifyPref.houseDoorOpen = function(that) {
        that.audioC.pause();
        that.state.start("house");
    };

    demo.state.simplifyPref.scissorButtonCallback = function(that, model) {
        if (!model.simplify) {
            that.scissorCutAnim = that.add.sprite(970, 340, "scissorCutsip", 0);
            that.scissorCutAnim.anchor.setTo(0.5, 1);
            that.scissorCutAnim.scale.setTo(model.size, model.size);
            that.scissorCutAnim.animations.add("cut", [0, 1, 2], 3, true);
            that.scissorCutAnim.play("cut");
            // horizontal cut
            that.t1 = that.add.tween(that.scissorCutAnim).to({ x: 540 },
                                            800, Phaser.Easing.Sinusoidal.InOut, true);
            // Here we are making animations execute one after the another, we have to do it
            // like this because onComplete itself doesnot have any onComplete property.
            that.onCompleteCallback1 = function() {
                // for vertical cut on newspaper
                that.scissorCutAnim.angle = 270;
                that.t2 = that.add.tween(that.scissorCutAnim).to({ y: 580 },
                                            800, Phaser.Easing.Sinusoidal.InOut, true);
                // big vertical cut for left chunk
                that.onCompleteCallback2 = function() {
                    that.col5.visible = false;
                    that.scissorCutAnim.x = 270;
                    that.scissorCutAnim.y = 50;
                    that.t3 = that.add.tween(that.scissorCutAnim).to({ y: 580 },
                                                1600, Phaser.Easing.Sinusoidal.InOut, true);
                    that.onCompleteCallback3 = function() {
                        that.col1.visible = false;
                        that.scissorCutAnim.visible = false;
                    };
                    that.t3.onComplete.add(that.onCompleteCallback3, that);
                };
                // Callback after vertical cut
                that.t2.onComplete.add(that.onCompleteCallback2, that);
            };
            // vertical cut callback after that.t1
            that.t1.onComplete.add(that.onCompleteCallback1, that);
        } else {
            that.inactionFeedback();
        }
        // to make simplify true
        model.simplify = true;
    };

    demo.state.simplifyPref.putBackButtonCallback = function(that, model) {
        if (model.simplify) {
            that.col1.visible = true;
            that.col5.visible = true;
        } else {
            that.inactionFeedback();
        }

        // to make simplify false
        model.simplify = false;
    };

    demo.state.simplifyPref.goButtonCallback = function(that, model) {
        // Show simplify effect on stage
        if (model.simplify) {
            that.stageAssets.visible = false;
        } else {
            that.stageAssets.visible = true;
        }
        // Group these together
        // scissor buttton may or may not be pressed by user
        that.scissorButton.visible = false;
        that.putBackButton.visible = false;
        that.goButton.visible = false;


        if (!model.passcodeCollected.simplify) {
            that.gainFocusAnimation();
            that.time.events.add(4000, function() {
                that.popupScreen.visible = false;
                that.col.visible = false;
                that.passcodeCol4.visible = false;
                that.circle.visible = false;
                that.passcodeFound();
            }, that);
            model.passcodeCollected.color = true;
        } else {
                that.popupScreen.visible = false;
                that.col.visible = false;
                that.passcodeCol4.visible = false;
        }

        // So that it can again reappear and surely this will create a new instant
        model.passcodeCollected.simplify = true;


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
                that.newspaperScreenAppearBool = false;
        }, that);
    };

    demo.state.simplifyPref.takeScissor = function(that, model) {
        // So that notif appear when the preview has come.
        that.smallNewspaper.visible = true;
        that.smallNewspaper.body.enable = true;
        // Pick up envelope and spects will disappear
        that.scissor.visible = false;
        that.scissor.body.enable = false;
        // cat has visited the room and taken the spects then only
        // it means he has visited it or else things would remain
        // the same as the envelope will always be there.
        model.visited.simplify = true;
    };

    demo.state.simplifyPref.smallNewspaperAppear = function(that, model) {
        that.smallNewspaper = that.add.sprite(430, 660, "extraAssetsip", 3);
        that.smallNewspaper.anchor.setTo(0.5, 1);
        that.smallNewspaper.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.smallNewspaper);
        that.smallNewspaper.body.enable = false;
        that.smallNewspaper.visible = false;
    };

    demo.state.simplifyPref.newspaperScreenAppear = function(that, model) {
        if (that.newspaperScreenAppearBool === false) {
            that.popupScreen = that.add.sprite(0, 0, "popupScreensip");
            that.col = that.add.group();
            that.col1 = that.col.create(-70, 115, "cellNewspapersip", 0);
            that.col1.addChild(that.add.text(132, 120, model.lang.obj.simplifyPrefCol1,
                                                    { font: "30px Arial" }));
            that.col2 = that.col.create(150, 113, "cellNewspapersip", 1);
            that.col2.addChild(that.add.text(135, 20, model.lang.obj.simplifyPrefCol2,
                                                    { font: "26px Arial" }));
            that.col3 = that.col.create(420, 0, "cellNewspapersip", 2);
            that.col3.addChild(that.add.text(134, 125, model.lang.obj.simplifyPrefCol3,
                                                    { font: "26px Arial" }));
            that.passcodeCol4 = that.add.sprite(650, 0, "cellNewspapersip", 2);
            that.passcodeCol4.addChild(that.add.text(170, 120, "****\nMB",
                                                    { font: "90px Arial" }));
            that.col5 = that.col.create(525, 240, "cellNewspapersip", 4);
            that.col5.addChild(that.add.text(274, 265, model.lang.obj.shop,
                                                    { font: "32px Arial", fill: "#fff" }));

            // Buttons
            that.scissorButton = that.add.button(1015, 150, "upDownButtonsp",
                                                that.scissorButtonCallback, that, 12, 9, 9);
            that.putBackButton = that.add.button(1015, 420, "upDownButtonsp",
                                                that.putBackButtonCallback, that, 11, 10, 10);
            that.goButton = that.add.button(1140, 332, "goButtonsp",
                                                that.goButtonCallback, that, 1, 0, 2);
            if (model.passcodeCollected.simplify === false) {
                that.messageBarInstruction();
            }
            that.newspaperScreenAppearBool = true;

            that.upKey = that.input.keyboard.addKey(Phaser.Keyboard.UP);
            that.downKey = that.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            that.upKey.onDown.add(that.changeSelectionUp, that);
            that.downKey.onDown.add(that.changeSelectionDown, that);
            that.enter.onDown.add(that.goButtonCallback, that);
        }
    };

    // Phaser functions
    demo.state.simplifyPref.preload = function() {

    };

    demo.state.simplifyPref.create = function(that, model, speechComp) {

        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");

        // Audio play
        that.audioC.play("", 0, 0.1, true);
        // Environment
        that.stage.backgroundColor = "#fed600";

        if (!model.simplify) {
            that.stageAssets = that.add.sprite(0, 0, "assetsip");
        }

        if (model.simplify && model.contrast) {
            that.stage.backgroundColor = "#a8a8a8";
        }


        if (!model.music) {
            that.sound.mute = true;
        }

        if (!model.voice) {
            speechComp.applier.change("utteranceOpts.volume", 0);
        }

        // Ensuring color Pref
        if (model.contrast) {
            that.colorPrefFilter();
            that.stage.backgroundColor = "#a8a8a8";
        }

        that.scissor = that.add.sprite(1080, 670, "extraAssetsip", 1);
        that.scissor.anchor.setTo(0.5, 1);
        that.scissor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.scissor);
        that.scissor.body.immovable = true;

        // Used for Cutting animation


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
        that.smallNewspaperAppear();

        if (model.visited.simplify === true) {
            that.takeScissor();
        }

        // This newspaperScreenAppearBool is present to ensure that envelopeappear callback
        // from update is called only once.
        that.newspaperScreenAppearBool = false;
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
        that.scissorNotif = that.add.sprite(990, 350, "messageBoxAll", 0);
        that.scissorNotif.addChild(that.add.text(10, 25, model.lang.obj.pickItem));
        that.scissorNotif.scale.setTo(model.size, model.size);
        that.scissorNotif.alpha = 0;
        // door notif
        that.houseDoorNotif = that.add.sprite(35, 400, "messageBoxAll", 0);
        that.houseDoorNotif.addChild(that.add.text(10, 25, model.lang.obj.exitRoom));
        that.houseDoorNotif.scale.setTo(model.size, model.size);
        that.houseDoorNotif.alpha = 0;
        // envelope notif
        that.newspaperNotif = that.add.sprite(360, 340, "messageBoxAll", 0);
        that.newspaperNotif.addChild(that.add.text(10, 25, model.lang.obj.useItem));
        that.newspaperNotif.scale.setTo(model.size, model.size);
        that.newspaperNotif.alpha = 0;

        that.backpack();

        that.stateEnterAnimation();

        that.count = 1;
    };

    demo.state.simplifyPref.update = function(that) {
        // Create seperation between ground and cat
        that.physics.arcade.collide(that.cat, that.ground);

        that.scissorNotifFunc();

        that.houseDoorNotifFunc();

        that.smallNewspaperNotifFunc();

        // Exit from room
        if (that.physics.arcade.overlap(that.houseDoor, that.cat) && that.enter.isDown &&
                                                                            !that.expandBool) {
            that.houseDoorOpen();
        }

        if (that.physics.arcade.overlap(that.scissor, that.cat) && that.enter.isDown &&
                                                                            !that.expandBool) {
            that.takeScissor();
        }

        if (that.physics.arcade.overlap(that.smallNewspaper, that.cat) && that.enter.isDown &&
                                                                            !that.expandBool) {
            that.newspaperScreenAppear();
        }

        // Character movement and envelope screen up down key movement
        if (!that.newspaperScreenAppearBool) {
            that.catMovementUpdate();
        }

    };

})(jQuery, fluid);
