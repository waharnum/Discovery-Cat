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
            nextScene: {
                funcName: "demo.state.prelude.nextScene",
                args: "{that}"
            }
        }
    });

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

    // Runs at t = 14000ms
    // To start next scene
    demo.state.prelude.nextScene = function(that) {
            that.state.start("prelude2");
    };

    // Phaser functions
    demo.state.prelude.preload = function(that) {

    };

    demo.state.prelude.create = function(that) {
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
        that.time.events.add(14000, that.nextScene, that);
    };

    demo.state.prelude.update = function() {

    };

})(jQuery, fluid);
