define(["require", "exports", "moment"], function (require, exports, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DATE_FORMAT = 'M/D/YY';
    exports.dateUsShortSorter = function (value1, value2, sortDirection) {
        if (!moment(value1, DATE_FORMAT, true).isValid() || !moment(value2, DATE_FORMAT, true).isValid()) {
            return 0;
        }
        var date1 = moment(value1, DATE_FORMAT, true);
        var date2 = moment(value2, DATE_FORMAT, true);
        var diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
        return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
    };
});
//# sourceMappingURL=dateUsShortSorter.js.map