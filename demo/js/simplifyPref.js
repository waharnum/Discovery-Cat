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
                args: ["{that}"]
            },
            newspaperScreenAppear: {
                funcName: "demo.state.simplifyPref.newspaperScreenAppear",
                args: ["{that}"]
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
                args: ["{that}"]
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
            passcodeCallback: {
                funcName: "demo.state.simplifyPref.passcodeCallback",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            stateEnterAnimation: {
                funcName: "demo.state.prelude.stateEnterAnimation",
                args: ["{that}", 1080, 670]
            }
        }
    });

    demo.state.simplifyPref.houseDoorOpen = function(that) {
        that.audioC.pause();
        that.state.start("house");
    };

    demo.state.simplifyPref.scissorButtonCallback = function(that, model) {
        that.scissorCutAnim = that.add.sprite(970, 340, "scissorCutsip", 0);
        that.scissorCutAnim.anchor.setTo(0.5, 1);
        that.scissorCutAnim.scale.setTo(model.size, model.size);
        that.scissorCutAnim.animations.add("cut", [0, 1, 2], 3, true);
        that.scissorCutAnim.play("cut");
        // horizontal cut
        that.t1 = that.add.tween(that.scissorCutAnim).to({ x: 540 },
                                        2200, Phaser.Easing.Sinusoidal.InOut, true);
        // Here we are making animations execute one after the another, we have to do it
        // like this because onComplete itself doesnot have any onComplete property.
        that.onCompleteCallback1 = function() {
            // for vertical cut on newspaper
            that.scissorCutAnim.angle = 270;
            that.t2 = that.add.tween(that.scissorCutAnim).to({ y: 580 },
                                        2200, Phaser.Easing.Sinusoidal.InOut, true);
            // big vertical cut for left chunk
            that.onCompleteCallback2 = function() {
                that.col5.visible = false;
                that.scissorCutAnim.x = 270;
                that.scissorCutAnim.y = 50;
                that.t3 = that.add.tween(that.scissorCutAnim).to({ y: 580 },
                                            4200, Phaser.Easing.Sinusoidal.InOut, true);
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
        // to make simplify true
        model.simplify = true;
    };

    demo.state.simplifyPref.passcodeCallback = function(that, model) {
        that.popup = that.add.sprite(640, 500, "popupAll", 1);
        that.popup.anchor.setTo(0.5, 1);
        that.popup.scale.setTo(model.size, model.size);
        that.letterText = that.add.text(0, -200, "PASSCODE FOUND",
                                                { font: "60px Arial", fill: "#fff" });
        that.letterText.anchor.setTo(0.5, 1);
        that.letterText.scale.setTo(model.size, model.size);
        that.popup.addChild(that.letterText);
        that.add.tween(that.popup).to({ alpha: 0 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    demo.state.simplifyPref.putBackButtonCallback = function(that) {
        that.col1.visible = true;
        that.col5.visible = true;
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
        that.popupScreen.visible = false;
        that.scissorButton.visible = false;
        that.putBackButton.visible = false;
        that.goButton.visible = false;
        that.col.visible = false;
        that.passcodeCol4.visible = false;
        // So that it can again reappear and surely this will create a new instant
        that.newspaperScreenAppearBool = false;
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
        model.visited.size = true;
    };

    demo.state.simplifyPref.smallNewspaperAppear = function(that, model) {
        that.smallNewspaper = that.add.sprite(430, 560, "extraAssetsip", 3);
        that.smallNewspaper.anchor.setTo(0.5, 0.5);
        that.smallNewspaper.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.smallNewspaper);
        that.smallNewspaper.body.enable = false;
        that.smallNewspaper.visible = false;
    };

    demo.state.simplifyPref.newspaperScreenAppear = function(that) {
        if (that.newspaperScreenAppearBool === false) {
            that.popupScreen = that.add.sprite(0, 0, "popupScreensip");
            that.col = that.add.group();
            that.col1 = that.col.create(-70, 115, "cellNewspapersip", 0);
            that.col2 = that.col.create(150, 113, "cellNewspapersip", 1);
            that.col3 = that.col.create(420, 0, "cellNewspapersip", 2);
            that.passcodeCol4 = that.add.button(650, 0, "cellNewspapersip",
                                            that.passcodeCallback, that, 3, 2, 2);
            that.passcodeCol4.addChild(that.add.text(170, 120, "****\nMB",
                                                    { font: "90px Arial" }));
            that.col5 = that.col.create(525, 240, "cellNewspapersip", 4);

            // Buttons
            that.scissorButton = that.add.button(1070, 120, "upDownButtonsp",
                                                that.scissorButtonCallback, that, 12, 9, 9);
            that.putBackButton = that.add.button(1070, 450, "upDownButtonsp",
                                                that.putBackButtonCallback, that, 11, 10, 10);
            that.goButton = that.add.button(1090, 332, "goButtonsp",
                                                that.goButtonCallback, that, 1, 0, 2);
            that.newspaperScreenAppearBool = true;
        }
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
        that.stage.backgroundColor = "#fed600";
        that.stageAssets = that.add.sprite(0, 0, "assetsip");

        that.scissor = that.add.sprite(1080, 670, "extraAssetsip", 1);
        that.scissor.anchor.setTo(0.5, 1);
        that.scissor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.scissor);
        that.scissor.body.immovable = true;

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

        that.stateEnterAnimation();
    };

    demo.state.simplifyPref.update = function(that) {
        // Create seperation between ground and cat
        that.physics.arcade.collide(that.cat, that.ground);

        that.scissorNotifFunc();

        that.houseDoorNotifFunc();

        that.smallNewspaperNotifFunc();

        // Exit from room
        if (that.physics.arcade.overlap(that.houseDoor, that.cat) && that.enter.isDown) {
            that.houseDoorOpen();
        }

        if (that.physics.arcade.overlap(that.scissor, that.cat) && that.enter.isDown) {
            that.takeScissor();
        }

        if (that.physics.arcade.overlap(that.smallNewspaper, that.cat) && that.enter.isDown) {
            that.newspaperScreenAppear();
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
