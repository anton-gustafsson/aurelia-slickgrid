System.register(["moment"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var moment, dateTimeIsoFormatter;
    return {
        setters: [
            function (moment_1) {
                moment = moment_1;
            }
        ],
        execute: function () {
            exports_1("dateTimeIsoFormatter", dateTimeIsoFormatter = function (row, cell, value, columnDef, dataContext) {
                return value ? moment(value).format('YYYY-MM-DD hh:mm:ss') : '';
            });
        }
    };
});
//# sourceMappingURL=dateTimeIsoFormatter.js.map