var fluid = fluid || {};

(function($, fluid) {
    "use strict";

    fluid.defaults("fluid.phaser.game", {
        gradeNames: "fluid.viewComponent",
        gameRendererInfo:{
            dimensions: {
                height: 840,
                width: 1280
            },
            rendererType: "Phaser.AUTO"
        },
        invokers: {
            createGameObject:{
                funcName:"fluid.phaser.game.createGameObject",
                args:"{that}"
            }
        },
        listeners: {
            "onCreate.createGameObject": "fluid.phaser.game.createGameObject"
        }
    });

    fluid.phaser.game.createGameObject = function(that) {
        that.game = new Phaser.Game(
            that.options.gameRendererInfo.dimensions.width,
            that.options.gameRendererInfo.dimensions.height,
            that.options.gameRendererInfo.rendererType,
            that.container[0]
        );
    };

})(jQuery, fluid);
