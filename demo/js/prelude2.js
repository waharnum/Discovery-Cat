(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.prelude2", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.prelude2.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.prelude2.create",
                args: "{that}"
            },
            update: {
                funcName: "demo.state.prelude2.update",
                args: "{that}"
            },
            ratWalkOut: {
                funcName: "demo.state.prelude2.ratWalkOut",
                args: "{that}"
            },
            ratAndBallFadeOut: {
                funcName: "demo.state.prelude2.ratAndBallFadeOut",
                args: "{that}"
            },
            catReaction: {
                funcName: "demo.state.prelude2.catReaction",
                args: "{that}"
            },
            catComes: {
                funcName: "demo.state.prelude2.catComes",
                args: "{that}"
            },
            catWalk: {
                funcName: "demo.state.prelude2.catWalk",
                args: "{that}"
            },
            catFade: {
                funcName: "demo.state.prelude2.catFade",
                args: "{that}"
            },
            nextScreen: {
                funcName: "demo.state.prelude2.nextScreen",
                args: "{that}"
            }
        }
    });

    // Runs at t = 0000ms
    // Cat comes this is the reaction cat with the face towards rathole (shadow on the neck)
    // and O reaction sprite
    demo.state.prelude2.catComes = function(that) {
        that.audioEm.play("", 0, 0.1, true);
        that.add.tween(that.catReac).to({ x: 1100 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 2000ms
    // Rat walks out with the yarn ball both are different entities both shown tweening here
    demo.state.prelude2.ratWalkOut = function(that) {
        that.add.tween(that.yarn).to({ y: 592 }, 1, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.yarn).to({ x: 291, y: 227 },
                                        5000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.rat).to({ x: 559, y: 328 }, 5000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 5000ms
    // Cat reaction of O played here
    demo.state.prelude2.catReaction = function(that) {
        that.catReac.play("react");
    };

    // Runs at t = 6000ms
    // catReac sprite made invisible and the cat sprite with movement made visible it was here only
    // exactly at 1100, 650 but alpha was 0, now alpha is made 1
    demo.state.prelude2.catWalk = function(that) {
        that.catReac.alpha = 0;
        that.cat.alpha = 1;
        that.cat.scale.setTo(0.8, 0.8);
        that.cat.anchor.setTo(0.5, 0.5);
        that.cat.animations.add("run", [0, 1, 2, 3], 4, true);
        that.cat.play("run");
        that.add.tween(that.cat).to({ x: 509, y:328 }, 3000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 7000ms
    // Rat reaches rathole and both rat and ball fade out
    demo.state.prelude2.ratAndBallFadeOut = function(that) {
        that.add.tween(that.yarn).to({ alpha: 0 }, 10, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.rat).to({ alpha: 0 }, 10, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 9000ms
    // cat Fades away
    demo.state.prelude2.catFade = function(that) {
        that.add.tween(that.cat).to({ alpha: 0 }, 10, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 10000ms
    demo.state.prelude2.nextScreen = function(that) {
        that.audioEm.pause();
        that.state.start("langPref");
    };

    // Phaser functions
    demo.state.prelude2.preload = function() {

    };

    demo.state.prelude2.create = function(that) {
        that.stage.backgroundColor = "#9fcaf6";
        // Tip: Put all var together anchor together animation together
        // code
        that.add.sprite(0, 0, "backgrounds2");

        // yarn ball sprite
        that.yarn = that.add.sprite(582, 419, "yarnBalls2");

        // rat here has turned the direction now its looking towards left a new sprite
        that.rat = that.add.sprite(850, 560, "ratMoves2", 2);
        that.rat.anchor.setTo(0.5, 0.5);
        that.rat.animations.add("run", [0, 1, 2, 3], 10, true);
        that.rat.play("run");

        // the O reaction from the cat, shown with a different sprite
        that.catReac = that.add.sprite(1800, 650, "catReactions2", 0);
        that.catReac.scale.setTo(0.8, 0.8);
        that.catReac.animations.add("react", [0, 1], 2, false);
        that.catReac.anchor.setTo(0.5, 0.5);

        // Normal cat sprite
        that.cat = that.add.sprite(1100, 650, "catMoves2", 0);
        that.cat.alpha = 0;

        // time events
        that.time.events.add(0, that.catComes, that);
        that.time.events.add(2000, that.ratWalkOut, that);
        that.time.events.add(5000, that.catReaction, that);
        that.time.events.add(6000, that.catWalk, that);
        that.time.events.add(7000, that.ratAndBallFadeOut, that);
        that.time.events.add(9000, that.catFade, that);
        that.time.events.add(10000, that.nextScreen, that);

        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");
    };

    demo.state.prelude2.update = function() {

    };

})(jQuery, fluid);
