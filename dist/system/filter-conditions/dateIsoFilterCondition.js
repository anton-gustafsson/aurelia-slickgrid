System.register(["moment", "./filterUtilities"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var moment, filterUtilities_1, DATE_FORMAT, dateIsoFilterCondition;
    return {
        setters: [
            function (moment_1) {
                moment = moment_1;
            },
            function (filterUtilities_1_1) {
                filterUtilities_1 = filterUtilities_1_1;
            }
        ],
        execute: function () {
            DATE_FORMAT = 'YYYY-MM-DD';
            exports_1("dateIsoFilterCondition", dateIsoFilterCondition = function (options) {
                if (!moment(options.cellValue, DATE_FORMAT, true).isValid() || !moment(options.searchTerm, DATE_FORMAT, true).isValid()) {
                    return true;
                }
                var dateCell = moment(options.cellValue, DATE_FORMAT, true);
                var dateSearch = moment(options.searchTerm, DATE_FORMAT, true);
                // run the filter condition with date in Unix Timestamp format
                return filterUtilities_1.testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
            });
        }
    };
});
//# sourceMappingURL=dateIsoFilterCondition.js.map