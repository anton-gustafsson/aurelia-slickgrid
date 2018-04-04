"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("./../services/utilities");
exports.sumTotalsDollarColoredBoldFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.sum && totals.sum[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (isNaN(+val)) {
        return '';
    }
    else if (val >= 0) {
        return "<span style=\"color:green; font-weight: bold;\">" + (prefix + '$' + utilities_1.decimalFormatted(val, 2, 2) + suffix) + "</span>";
    }
    else {
        return "<span style=\"color:red; font-weight: bold;\">" + (prefix + '$' + utilities_1.decimalFormatted(val, 2, 2) + suffix) + "</span>";
    }
};
//# sourceMappingURL=sumTotalsDollarColoredBoldFormatter.js.map