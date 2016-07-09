(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.cutScene", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.cutScene.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.cutScene.create",
                args: "{that}"
            },
            update: {
                funcName: "demo.state.cutScene.update",
                args: "{that}"
            },
            nextScreen: {
                funcName: "demo.state.cutScene.nextScreen",
                args: "{that}"
            },
            safeMoves: {
                funcName: "demo.state.cutScene.safeMoves",
                args: "{that}"
            },
            textAppear1: {
                funcName: "demo.state.cutScene.textAppear1",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                                    "{demo.discoveryCat}.textToSpeech"]
            },
            passcodeAppear: {
                funcName: "demo.state.cutScene.passcodeAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                                    "{demo.discoveryCat}.textToSpeech"]
            },
            doorsAppear: {
                funcName: "demo.state.cutScene.doorsAppear",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                                    "{demo.discoveryCat}.textToSpeech"]
            },
            passcodeDistribute: {
                funcName: "demo.state.cutScene.passcodeDistribute",
                args: ["{that}"]
            },
            passcodeWhite: {
                funcName: "demo.state.cutScene.passcodeWhite",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                                    "{demo.discoveryCat}.textToSpeech"]
            },
            yarnBall: {
                funcName: "demo.state.cutScene.yarnBall",
                args: "{that}"
            },
            turnWhite: {
                funcName: "demo.state.cutScene.turnWhite",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                                    "{demo.discoveryCat}.textToSpeech"]
            },
            skipButtonCallback: {
                funcName: "demo.state.cutScene.skipButtonCallback",
                args: "{that}"
            }
        }
    });


    // Runs at t = 1000ms
    demo.state.cutScene.textAppear1 = function(that, model, speechComp) {
        that.text1 = that.add.text(640, 650, model.lang.obj.onecs);
        that.text1.anchor.setTo(0.5, 0.5);
        speechComp.queueSpeech(model.lang.obj.onecs, false, { model: model.lang.type });
    };

    // Runs at t = 2000ms
    demo.state.cutScene.safeMoves = function(that) {
        that.add.tween(that.safe).to({ x: 640, y:500 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.safe.scale).to({ x: 0.8, y: 0.8 },
                                        2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.background).to({ alpha: 0 },
                                        2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.platforms).to({ alpha: 0 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.doors).to({ alpha: 0 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 6000ms
    demo.state.cutScene.passcodeAppear = function(that, model, speechComp) {
        that.add.tween(that.passcode).to({ alpha: 1 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.text1.visible = false;
        that.text2 = that.add.text(640, 650, model.lang.obj.twocs);
        that.text2.anchor.setTo(0.5, 0.5);
        speechComp.queueSpeech(model.lang.obj.twocs, false, { model: model.lang.type });
    };

    // Runs at t = 9000ms
    demo.state.cutScene.doorsAppear = function(that, model, speechComp) {
        that.door1.x = 180;
        that.door1.y = 100;
        that.door2.x = 940;
        that.door2.y = 100;
        that.door3.x = 180;
        that.door3.y = 500;
        that.door4.x = 940;
        that.door4.y = 500;
        that.door5.visible = false;
        that.door0.visible = false;
        that.text2.visible = false;
        that.text3 = that.add.text(640, 650, model.lang.obj.threecs);
        that.text3.anchor.setTo(0.5, 0.5);
        speechComp.queueSpeech(model.lang.obj.threecs, false, { model: model.lang.type });
        that.add.tween(that.doors).to({ alpha: 1 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 12000ms
    demo.state.cutScene.passcodeDistribute = function(that) {
        that.add.tween(that.textPa).to({ x: 210, y: 130 },
                                                2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.textSs).to({ x: 970, y: 130 },
                                                2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.textCo).to({ x: 210, y: 530 },
                                                2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.textDe).to({ x: 970, y: 530 },
                                                2000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 13500ms
    demo.state.cutScene.passcodeWhite = function(that, model, speechComp) {
        that.text3.visible = false;
        that.text4 = that.add.text(640, 650, model.lang.obj.fourcs);
        that.text4.anchor.setTo(0.5, 0.5);
        speechComp.queueSpeech(model.lang.obj.fourcs, false, { model: model.lang.type });
        that.textPa.fill = "#fff";
        that.textSs.fill = "#fff";
        that.textCo.fill = "#fff";
        that.textDe.fill = "#fff";
    };

    // Runs at t = 18000ms
    demo.state.cutScene.yarnBall = function(that) {
        that.textPa.visible = false;
        that.textSs.visible = false;
        that.textCo.visible = false;
        that.textDe.visible = false;
        that.yarn = that.add.sprite(640, 360, "yarnBalls2");
        that.yarn.anchor.setTo(0.5, 0.5);
        that.add.tween(that.doors).to({ alpha: 0 }, 0, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.safe).to({ alpha: 0 }, 0, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.yarn.scale).to({ x: 10, y:10 },
                                            1000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 19000ms
    demo.state.cutScene.turnWhite = function(that, model, speechComp) {
        that.text4.visible = false;
        that.text5 = that.add.text(640, 360, model.lang.obj.fivecs,
                                                        { font: "40px Arial", fill: "#fff" });
        that.text5.anchor.setTo(0.5, 0.5);
        speechComp.queueSpeech(model.lang.obj.fivecs, false, { model: model.lang.type });
        that.add.tween(that.yarn).to({ alpha: 0 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.stage.backgroundColor = "#f36f46";
    };

    // Runs at t = 24000ms
    demo.state.cutScene.nextScreen = function(that) {
        that.audioG.pause();
        that.state.start("house");
    };

    demo.state.cutScene.skipButtonCallback = function(that) {
        that.audioG.pause();
        that.state.start("house");
    };

    // Phaser functions
    demo.state.cutScene.preload = function() {

    };

    demo.state.cutScene.create = function(that) {
        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");

        that.audioG.play("", 0, 0.1, true);

        that.stage.backgroundColor = "#fff";

        that.background = that.add.sprite(0, 0, "backgroundh");
        that.platforms = that.add.group();
        that.floor1 = that.platforms.create(0, 200, "platformh");
        that.floor1.scale.setTo(0.8, 1);
        that.floor2 = that.platforms.create(256, 440, "platformh");
        that.floor2.scale.setTo(0.8, 1);
        that.ground = that.platforms.create(0, 675, "platformh");
        that.doors = that.add.group();
        that.door0 = that.doors.create(50, 38, "doorh", 0);
        that.door1 = that.doors.create(400, 38, "doorh", 1);
        that.door2 = that.doors.create(770, 38, "doorh", 1);
        that.door3 = that.doors.create(400, 277, "doorh", 1);
        that.door4 = that.doors.create(770, 277, "doorh", 1);
        that.door5 = that.doors.create(970, 513, "doorh", 1);
        that.safe = that.add.sprite(450, 675, "safeh");
        that.safe.anchor.setTo(0.5, 1);
        that.safe.scale.setTo(0.3, 0.3);

        that.passcode = that.add.group();
        that.textPa = that.add.text(450, 30, "PA", { font:"70px Arial" }, that.passcode);
        that.textSs = that.add.text(545, 30, "SS", { font:"70px Arial" }, that.passcode);
        that.textCo = that.add.text(640, 30, "CO", { font:"70px Arial" }, that.passcode);
        that.textDe = that.add.text(750, 30, "DE", { font:"70px Arial" }, that.passcode);
        that.passcode.alpha = 0;

        // time events
        that.time.events.add(1000, that.textAppear1, that);
        that.time.events.add(2000, that.safeMoves, that);
        that.time.events.add(6000, that.passcodeAppear, that);
        that.time.events.add(9000, that.doorsAppear, that);
        that.time.events.add(12000, that.passcodeDistribute, that);
        that.time.events.add(13500, that.passcodeWhite, that);
        that.time.events.add(18000, that.yarnBall, that);
        that.time.events.add(19000, that.turnWhite, that);
        that.time.events.add(24000, that.nextScreen, that);

        // skip button to langPref screen
        that.skipButton = that.add.button(1150, 15, "upDownButtonsp",
                                            that.skipButtonCallback, that, 7, 6, 8);
        that.skipButton.scale.setTo(0.6, 0.6);
        that.skipButton.alpha = 0.7;
    };

    demo.state.cutScene.update = function() {

    };

})(jQuery, fluid);
