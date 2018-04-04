System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var avgTotalsFormatter;
    return {
        setters: [],
        execute: function () {
            exports_1("avgTotalsFormatter", avgTotalsFormatter = function (totals, columnDef, grid) {
                var field = columnDef.field || '';
                var val = totals.avg && totals.avg[field];
                var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
                var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
                if (val != null) {
                    return prefix + Math.round(val) + suffix;
                }
                return '';
            });
        }
    };
});
//# sourceMappingURL=avgTotalsFormatter.js.map