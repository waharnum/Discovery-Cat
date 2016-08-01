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
            visited: {
                sound: false,
                size: false,
                color: false,
                simplify: false
            }
        }
    });

})(jQuery, fluid);
