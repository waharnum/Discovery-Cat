(function($, fluid) {
    "use strict";
    fluid.defaults("demo.prefModel", {
        gradeNames: "fluid.modelComponent",
        model: {
            lang: {
                type: "en-US",
                obj: {}
            },
            count: 0,
            size: 1,
            contrast: false,
            simplify: false,
            sound: false,
            music: true,
            voice: true,
            visited: {
                sound: false,
                size: false,
                color: false,
                simplify: false,
                house: false
            },
            passcodeCollected: {
                sound: false,
                size: false,
                color: false,
                simplify: false
            },
            position: {
                catHousex: 70,
                catHousey: 45,
                catx: 235,
                caty: 500
            }
        }
    });

})(jQuery, fluid);
