define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.yesNoFormatter = function (row, cell, value, columnDef, dataContext) {
        return value ? 'Yes' : 'No';
    };
});
