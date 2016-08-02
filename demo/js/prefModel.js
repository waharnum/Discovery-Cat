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
            visited: {
                sound: true,
                size: true,
                color: true,
                simplify: true,
                house: true
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
