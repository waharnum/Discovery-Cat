(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.prelude", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.prelude.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.prelude.create",
                args: "{that}"
            },
            update: {
                funcName: "demo.state.prelude.update",
                args: "{that}"
            },
            fadeInRatHead: {
                funcName: "demo.state.prelude.fadeInRatHead",
                args: "{that}"
            },
            headMovement: {
                funcName: "demo.state.prelude.headMovement",
                args: "{that}"
            },
            ratWalkIn: {
                funcName: "demo.state.prelude.ratWalkIn",
                args: "{that}"
            },
            ratWalkRight: {
                funcName: "demo.state.prelude.ratWalkRight",
                args: "{that}"
            },
            nextScene: {
                funcName: "demo.state.prelude.nextScene",
                args: "{that}"
            },
            fullScreen: {
                funcName: "demo.state.prelude.fullScreen",
                args: "{that}"
            },
            start: {
                funcName: "demo.state.prelude.start",
                args: "{that}"
            },
            skipButtonCallback: {
                funcName: "demo.state.prelude.skipButtonCallback",
                args: "{that}"
            },
            stateEnterAnimation: {
                funcName: "demo.state.prelude.stateEnterAnimation",
                args: ["{that}", 380, 280]
            }
        }
    });

    demo.state.prelude.stateEnterAnimation = function(that, x, y) {
        // A mask is a Graphics object
        that.mask = that.add.graphics(x, y);

        //  Shapes drawn to the Graphics object must be filled.
        that.mask.beginFill(0xffffff);

        //  Here we'll draw a circle
        that.mask.drawCircle(0, 0, 10);

        //  And apply it to the Sprite
        that.world.mask = that.mask;

        that.add.tween(that.mask.scale).to({ x: 350, y: 350 },
                                    1000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    demo.state.prelude.start = function(that) {
        // Play audio G chord
        that.audioG.play("", 0, 0.1, true);
    };

    demo.state.prelude.fullScreen = function(that) {
        if (that.scale.isFullScreen) {
            that.scale.stopFullScreen();
        } else {
            that.scale.startFullScreen(false);
        }
    };

    // Runs at t = 4000ms
    demo.state.prelude.fadeInRatHead = function(that) {
        // Tweening refers to generating intermediate frame from one state to another state
        that.add.tween(that.ratHead).to({ alpha:1 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 4000ms
    // This creates head shaking effect of the head
    demo.state.prelude.headMovement = function(that) {
        if (that.ratHead.angle === -18) {
            that.add.tween(that.ratHead).to({ angle:0 }, 200,
                                        Phaser.Easing.Sinusoidal.InOut, true);
        }else {
            that.add.tween(that.ratHead).to({ angle:-18 }, 200,
                                        Phaser.Easing.Sinusoidal.InOut, true);
        }
    };

    // Runs at t = 8000ms
    demo.state.prelude.ratWalkIn =  function(that) {
        that.ratHead.alpha = 0;
        that.rat = that.add.sprite(300, 310, "ratMoves1", 2);
        that.rat.anchor.setTo(0.5, 0.5);
        that.rat.animations.add("run", [0, 1, 2, 3], 10, true);
        that.rat.play("run");
        that.add.tween(that.rat).to({ x: 420, y: 540 }, 4000,
                                            Phaser.Easing.Sinusoidal.InOut, true);
    };

    demo.state.prelude.ratWalkRight = function(that) {
        that.rat.animations.add("run", [0, 1, 2, 3], 10, true);
        that.rat.play("run");
        that.add.tween(that.rat).to({ x: 850, y: 560 }, 3000,
                                            Phaser.Easing.Sinusoidal.InOut, true);
    };

    demo.state.prelude.skipButtonCallback = function(that) {
        that.audioG.pause();
        that.state.start("langPref");
    };

    // Runs at t = 14000ms
    // To start next scene
    demo.state.prelude.nextScene = function(that) {
        // Pausing audio before going to next level
        that.audioG.pause();
        that.state.start("prelude2");
    };

    // Phaser functions
    demo.state.prelude.preload = function() {

    };

    demo.state.prelude.create = function(that) {
        that.stage.backgroundColor = "#9fcaf6";
        that.add.sprite(0, 0, "backgrounds1");
        that.ratHead = that.add.sprite(380, 280, "ratHeads1");
        that.ratHead.anchor.setTo(0.5, 0.9);
        that.ratHead.angle = -18;
        that.ratHead.alpha = 0;
        // Loop every 500ms
        that.time.events.loop(500, that.headMovement, that);
        // Time events
        that.time.events.add(4000, that.fadeInRatHead, that);
        that.time.events.add(8000, that.ratWalkIn, that);
        that.time.events.add(12000, that.ratWalkRight, that);
        that.time.events.add(15000, that.nextScene, that);

        // Audio
        // Each state will start and pause its music start at any point end while leaving
        // the current state ie going to next state
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");

        //  Being mp3 files these take time to decode, so we can't play them instantly
        //  Using setDecodedCallback we can be notified when they're ALL ready for use.
        //  The audio files could decode in ANY order, we can never be sure which it'll be.
        that.sounds = [that.audioEm, that.audioG, that.audioC];
        that.sound.setDecodedCallback(that.sounds, that.start, that);

        // Keyboard shortcut for fullscreen
        // FullScreen, problem with browser. The hotkey assigned here will be functional
        // throughout the game.
        that.f = that.input.keyboard.addKey(Phaser.Keyboard.F);
        that.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        that.f.onDown.add(that.fullScreen, that);

        // skip button to langPref screen
        that.skipButton = that.add.button(1150, 15, "upDownButtonsp",
                                            that.skipButtonCallback, that, 7, 6, 8);
        that.skipButton.scale.setTo(0.6, 0.6);
        that.skipButton.alpha = 0.7;

        that.enter = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        that.enter.onDown.add(that.skipButtonCallback, that);

        that.stateEnterAnimation();
    };

    demo.state.prelude.update = function() {

    };

})(jQuery, fluid);

