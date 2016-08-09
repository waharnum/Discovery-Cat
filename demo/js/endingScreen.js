(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.endingScreen", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.endingScreen.preload",
                args: []
            },
            create: {
                funcName: "demo.state.endingScreen.create",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            update: {
                funcName: "demo.state.endingScreen.update",
                args: []
            },
            yesNosimplify: {
                funcName: "demo.state.endingScreen.yesNo",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model", "simplify", 480]
            },
            yesNohighContrast: {
                funcName: "demo.state.endingScreen.yesNo",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model", "size", 360]
            },
            yesNoShowSound: {
                funcName: "demo.state.endingScreen.yesNo",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model", "sound", 540]
            },
            stateEnterAnimation: {
                funcName: "demo.state.prelude.stateEnterAnimation",
                args: ["{that}", 0, 0]
            }
        }
    });

    demo.state.endingScreen.yesNo = function(that, model, prop, propY) {
        if (model.prop) {
            that.add.text(900, propY, "YES", { font: "35px Arial", fill: "#5cbd6c" });
        } else {
            that.add.text(900, propY, "NO", { font: "35px Arial", fill: "#b72025" });
        }
    };

    // Phaser functions
    demo.state.endingScreen.preload = function() {

    };

    demo.state.endingScreen.create = function(that, model) {
        that.stage.backgroundColor = "#000";
        that.heading = that.add.text(640, 80, model.lang.obj.thankyou,
                                            { font: "65px Arial", fill: "#fff" });
        that.heading.anchor.setTo(0.5, 0.5);

        that.add.text(250, 300, "SIZE :", { font: "35px Arial", fill: "#fff" });
        that.add.text(900, 300, model.size, { font: "35px Arial", fill: "#fed600" });

        that.add.text(250, 360, "HIGH CONTRAST :", { font: "35px Arial", fill: "#fff" });
        that.yesNohighContrast();

        that.add.text(250, 420, "LANGUAGE :", { font: "35px Arial", fill: "#fff" });
        that.add.text(900, 420, model.lang, { font: "35px Arial", fill: "#fed600" });

        that.add.text(250, 480, "SIMPLIFY :", { font: "35px Arial", fill: "#fff" });
        that.yesNosimplify();

        that.add.text(250, 540, "SHOW SOUND :", { font: "35px Arial", fill: "#fff" });
        that.yesNoShowSound();

        that.add.text(50, 770, model.lang.obj.cookieNote,
                                            { font: "35px Arial", fill: "#fed600" });
        that.stateEnterAnimation();
    };

    demo.state.endingScreen.update = function() {

    };

})(jQuery, fluid);
