(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.firstScreen", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.firstScreen.preload",
                args: []
            },
            create: {
                funcName: "demo.state.firstScreen.create",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            update: {
                funcName: "demo.state.firstScreen.update",
                args: []
            }
        }
    });

    demo.state.firstScreen.preload = function() {

    };

    demo.state.firstScreen.create = function(game, that) {
        // Map and text inside it.
        that.add.sprite(20, -20, "firstScreen_oldMap");
        var tAwaits = that.add.text(290, 150, "TREASURE\n" + "   " + "AWAITS",
            { font: "30px Arial", fill: "black" });
        var cPrepared = that.add.text(850, 140, "   " + "COME\nPREPARED",
            { font: "30px Arial", fill: "black" });
        // oldMap.scale.setTo(0.9, 0.9);
        tAwaits.anchor.setTo(0.5, 0.5);
        cPrepared.anchor.setTo(0.5, 0.5);
        tAwaits.angle = 15;
        cPrepared.angle = -18;
        // Buttons for language selection
        that.add.button(28, 640, "greenButton",
            function() {console.log("english");}, that, 1, 0, 2);
        that.add.text(73, 645, "English", { font: "30px Arial", fill: "black" });

        that.add.button(284, 640, "greenButton",
            function() {console.log("french");}, that, 1, 0, 2);
        that.add.text(329, 645, "Francais", { font: "30px Arial", fill: "black" });

        that.add.button(540, 640, "greenButton",
            function() {console.log("espanol");}, that, 1, 0, 2);
        that.add.text(585, 645, "Espanol", { font: "30px Arial", fill: "black" });

        that.add.button(796, 640, "greenButton",
            function() {console.log("deutsch");}, that, 1, 0, 2);
        that.add.text(835, 645, "Deutsch", { font: "30px Arial", fill: "black" });

        that.add.button(1052, 640, "greenButton",
            function() {console.log("svenska");}, that, 1, 0, 2);
        that.add.text(1097, 645, "Svenska", { font: "30px Arial", fill: "black" });


    };

    demo.state.firstScreen.update = function() {

    };

})(jQuery, fluid);
