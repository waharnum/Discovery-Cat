(function($, fluid) {
    "use strict";
    fluid.defaults("demo.prefModel", {
        gradeNames: "fluid.modelComponent",
        model: {
            lang: {
                type: "en",
                obj: {}
            },
            count: 0
        }
    });

})(jQuery, fluid);
