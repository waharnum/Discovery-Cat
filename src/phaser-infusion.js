var fluid_2_0_0 = fluid_2_0_0 || {};
(function($, fluid) {
    "use strict";
    fluid.defaults("fluid.phaser.game",{
        gradeNames: "fluid.viewComponent",
        selectors: {
            gameCanvas: ".gameCanvas"
        },
        gameRendererInfo:{
            dimensions: {
                height: 768,
                width: 1024
            },
            rendererType: "Phaser.AUTO"
        },
        invokers: {
            createGameObject:{
                funcName:"fluid.phaser.game.createGameObject",
                args:"{that}"
            }
        },
        events: {
            onCreate: null
        },
        listeners: {
            onCreate: "fluid.phaser.game.createGameObject"
        }

    });

    fluid.phaser.game.createGameObject = function(that){
        that.game = new Phaser.Game(
            that.options.gameRendererInfo.dimensions.width,
            that.options.gameRendererInfo.dimensions.height,
            that.options.gameRendererInfo.rendererType,
            "#gameCanvas"
        );
        console.log(typeof(gameCanvas));
    };

})(jQuery, fluid_2_0_0);