(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.langPref", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.langPref.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.langPref.create",
                args: "{that}"
            },
            update: {
                funcName: "demo.state.langPref.update",
                args: "{that}"
            },
            catMove: {
                funcName: "demo.state.langPref.catMove",
                args: "{that}"
            },
            catAnimationStop: {
                funcName: "demo.state.langPref.catAnimationStop",
                args: "{that}"
            },
            ratsCome: {
                funcName: "demo.state.langPref.ratsCome",
                args: "{that}"
            },
            ratAnimationStop: {
                funcName: "demo.state.langPref.ratAnimationStop",
                args: "{that}"
            },
            messageAppear: {
                funcName: "demo.state.langPref.messageAppear",
                args: "{that}"
            },
            changeSelection: {
                funcName: "demo.state.langPref.changeSelection",
                args: "{that}"
            },
            acceptSelection: {
                funcName: "demo.state.langPref.acceptSelection",
                args: "{that}"
            },
            button1Callback: {
                funcName: "demo.state.langPref.button1Callback",
                args: "{that}"
            },
            button2Callback: {
                funcName: "demo.state.langPref.button2Callback",
                args: "{that}"
            },
            button3Callback: {
                funcName: "demo.state.langPref.button3Callback",
                args: "{that}"
            },
            button4Callback: {
                funcName: "demo.state.langPref.button4Callback",
                args: "{that}"
            }
        }
    });

    // Runs at t = 0ms
    // Cat movement to the first location
    demo.state.langPref.catMove = function(that) {
        that.cat.animations.play("walk");
        that.add.tween(that.cat).to({ x: 500, y:150 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 2000ms
    // Cat animation stop after its entry
    demo.state.langPref.catAnimationStop = function(that) {
        that.cat.animations.paused = true;
    };

    // Runs at t = 2200ms
    // All rats entry into the scene
    demo.state.langPref.ratsCome = function(that) {
        that.rat1.animations.play("walk");
        that.rat2.animations.play("walk");
        that.rat3.animations.play("walk");
        that.rat4.animations.play("walk");
        that.add.tween(that.rat1).to({ x: 1050, y:200 },
                                        4000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.rat2).to({ x: 900, y:400 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.rat4).to({ x: 400, y:500 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.rat3).to({ x: 650, y:500 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 8200ms
    // Pauses all rat animations
    demo.state.langPref.ratAnimationStop = function(that) {
        that.rat1.animations.paused = true;
        that.rat2.animations.paused = true;
        that.rat3.animations.paused = true;
        that.rat4.animations.paused = true;
    };

    // Runs at t = 8500ms
    // Creates messageBoxes(we call them button because we have used buttons to implement them)
    // and adds text as child
    demo.state.langPref.messageAppear = function(that) {
        that.button1 = that.add.button(870, 100, "messageBoxlp",
                                        that.button1Callback, that, 1, 0, 2);
        that.button1.addChild(that.add.text(70, 48, "Hey! I can help you"));
        that.button2 = that.add.button(870, 300, "messageBoxlp",
                                        that.button2Callback, that, 1, 0, 2);
        that.button2.addChild(that.add.text(70, 48, "¡Oye! Puedo ayudarle"));
        that.button3 = that.add.button(500, 400, "messageBoxlp",
                                        that.button3Callback, that, 1, 0, 2);
        that.button3.addChild(that.add.text(60, 48, "Hey! je peux vous aider"));
        that.button4 = that.add.button(100, 400, "messageBoxlp",
                                        that.button4Callback, that, 1, 0, 2);
        that.button4.addChild(that.add.text(25, 48, "Hallo! ich kann Ihnen helfen"));
    };

    // Actions to be performed on pressing TAB
    demo.state.langPref.changeSelection = function(that) {
        if (that.count === 4) {
            that.count = 0;
        }
        that.count++;
        switch (that.count) {
            case 1:
                // Fix last button
                that.button4.setFrames(1, 0, 2);
                // Change this button
                that.button1.setFrames(0, 1, 2);
                break;
            case 2:
                that.button1.setFrames(1, 0, 2);
                that.button2.setFrames(0, 1, 2);
                break;
            case 3:
                that.button2.setFrames(1, 0, 2);
                that.button3.setFrames(0, 1, 2);
                break;
            case 4:
                that.button3.setFrames(1, 0, 2);
                that.button4.setFrames(0, 1, 2);
                break;
            default:
        }
    };

    // Actions to be performed on pressing ENTER
   demo.state.langPref.acceptSelection = function(that) {
          switch (that.count) {
            case 1:
                that.button1Callback();
                break;
            case 2:
                that.button2Callback();
                break;
            case 3:
                that.button3Callback();
                break;
            case 4:
                that.button4Callback();
                break;
            default:
                // Remember for default to put something
        }
    };

    // All four buttons callback, to add web speech and lang selection here
    demo.state.langPref.button1Callback = function(that) {
        that.state.start("houseEntry");
    };

    demo.state.langPref.button2Callback = function(that) {
        that.state.start("houseEntry");
    };

    demo.state.langPref.button3Callback = function(that) {
        that.state.start("houseEntry");
    };

    demo.state.langPref.button4Callback = function(that) {
        that.state.start("houseEntry");
    };

    // Phaser functions
    demo.state.langPref.preload = function(that) {

    };

    demo.state.langPref.create = function(that) {
        // count to be later added to the model, this is responsible for selection using tab
        that.count = 0;

        that.add.sprite(0, 0, "backgroundlp");

        // Cat in the scene
        that.cat = that.add.sprite(170, 90, "catMovelp", 1);
        that.cat.scale.setTo(0.8, 0.8);
        that.cat.animations.add("walk", [0, 1, 2, 3], 5, true);

        // All four rats with accessories as child of them
        that.rat1 = that.add.sprite(1500, 200, "buddiesMovelp", 0);
        that.rat1.addChild(that.add.sprite(55, -10, "ratAccessorieslp", 0));
        that.rat1.scale.setTo(0.5, 0.5);
        that.rat1.animations.add("walk", [0, 1, 2, 3], 5, true);
        that.rat1.animations.play("walk");

        that.rat2 = that.add.sprite(1500, 400, "buddiesMovelp", 0);
        that.rat2.addChild(that.add.sprite(85, -45, "ratAccessorieslp", 1));
        that.rat2.scale.setTo(0.5, 0.5);
        that.rat2.animations.add("walk", [0, 1, 2, 3], 5, true);
        that.rat2.animations.play("walk");

        that.rat3 = that.add.sprite(650, 1000, "buddiesMovelp", 0);
        that.rat3.addChild(that.add.sprite(80, 90, "ratAccessorieslp", 3));
        that.rat3.scale.setTo(0.5, 0.5);
        that.rat3.animations.add("walk", [0, 1, 2, 3], 5, true);
        that.rat3.animations.play("walk");

        that.rat4 = that.add.sprite(400, 1000, "buddiesMovelp", 0);
        that.rat4.addChild(that.add.sprite(60, 70, "ratAccessorieslp", 2));
        that.rat4.scale.setTo(0.5, 0.5);
        that.rat4.animations.add("walk", [0, 1, 2, 3], 5, true);
        that.rat4.animations.play("walk");

        // time events
        that.time.events.add(0, that.catMove, that);
        that.time.events.add(2000, that.catAnimationStop, that);
        that.time.events.add(2200, that.ratsCome, that);
        that.time.events.add(8200, that.ratAnimationStop, that);
        that.time.events.add(8500, that.messageAppear, that);

        // Keyboard controls for changing and accepting selections
        that.key1 = that.input.keyboard.addKey(Phaser.Keyboard.TAB);
        that.key1.onDown.add(that.changeSelection, that);

        that.key2 = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        that.key2.onDown.add(that.acceptSelection, that);

    };

    demo.state.langPref.update = function(that) {

    };

})(jQuery, fluid);
