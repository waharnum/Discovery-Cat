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
            size: 1
        }
    });

})(jQuery, fluid);
