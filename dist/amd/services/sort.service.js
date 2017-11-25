var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "aurelia-event-aggregator", "./../models/index", "./../sorters/index"], function (require, exports, aurelia_event_aggregator_1, index_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SortService = /** @class */ (function () {
        function SortService() {
            this.onSortChanged = new aurelia_event_aggregator_1.EventAggregator();
        }
        /**
         * Attach a backend sort (single/multi) hook to the grid
         * @param grid SlickGrid Grid object
         * @param gridOptions Grid Options object
         */
        SortService.prototype.attachBackendOnSort = function (grid, gridOptions) {
            this.subscriber = grid.onSort;
            this.emitSortChangedBy('remote');
            this.subscriber.subscribe(this.attachBackendOnSortSubscribe);
        };
        SortService.prototype.attachBackendOnSortSubscribe = function (event, args) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceOptions, query, responseProcess;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!args || !args.grid) {
                                throw new Error('Something went wrong when trying to attach the "attachBackendOnSortSubscribe(event, args)" function, it seems that "args" is not populated correctly');
                            }
                            serviceOptions = args.grid.getOptions();
                            if (serviceOptions === undefined || serviceOptions.onBackendEventApi === undefined || serviceOptions.onBackendEventApi.process === undefined || !serviceOptions.onBackendEventApi.service === undefined) {
                                throw new Error("onBackendEventApi requires at least a \"process\" function and a \"service\" defined");
                            }
                            if (serviceOptions.onBackendEventApi !== undefined && serviceOptions.onBackendEventApi.preProcess) {
                                serviceOptions.onBackendEventApi.preProcess();
                            }
                            query = serviceOptions.onBackendEventApi.service.onSortChanged(event, args);
                            return [4 /*yield*/, serviceOptions.onBackendEventApi.process(query)];
                        case 1:
                            responseProcess = _a.sent();
                            // send the response process to the postProcess callback
                            if (serviceOptions.onBackendEventApi.postProcess) {
                                serviceOptions.onBackendEventApi.postProcess(responseProcess);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Attach a local sort (single/multi) hook to the grid
         * @param grid SlickGrid Grid object
         * @param gridOptions Grid Options object
         * @param dataView
         */
        SortService.prototype.attachLocalOnSort = function (grid, gridOptions, dataView) {
            this.subscriber = grid.onSort;
            this.emitSortChangedBy('local');
            this.subscriber.subscribe(function (e, args) {
                // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
                // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
                var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
                dataView.sort(function (dataRow1, dataRow2) {
                    for (var i = 0, l = sortColumns.length; i < l; i++) {
                        var sortDirection = sortColumns[i].sortAsc ? 1 : -1;
                        var sortField = sortColumns[i].sortCol.field;
                        var fieldType = sortColumns[i].sortCol.type || 'string';
                        var value1 = dataRow1[sortField];
                        var value2 = dataRow2[sortField];
                        var result = 0;
                        switch (fieldType) {
                            case index_1.FieldType.number:
                                result = index_2.Sorters.numeric(value1, value2, sortDirection);
                                break;
                            case index_1.FieldType.date:
                                result = index_2.Sorters.date(value1, value2, sortDirection);
                                break;
                            case index_1.FieldType.dateIso:
                                result = index_2.Sorters.dateIso(value1, value2, sortDirection);
                                break;
                            case index_1.FieldType.dateUs:
                                result = index_2.Sorters.dateUs(value1, value2, sortDirection);
                                break;
                            case index_1.FieldType.dateUsShort:
                                result = index_2.Sorters.dateUsShort(value1, value2, sortDirection);
                                break;
                            default:
                                result = index_2.Sorters.string(value1, value2, sortDirection);
                                break;
                        }
                        if (result !== 0) {
                            return result;
                        }
                    }
                    return 0;
                });
                grid.invalidate();
                grid.render();
            });
        };
        SortService.prototype.destroy = function () {
            this.subscriber.unsubscribe();
        };
        /**
         * A simple function that is attached to the subscriber and emit a change when the sort is called.
         * Other services, like Pagination, can then subscribe to it.
         * @param {string} sender
         */
        SortService.prototype.emitSortChangedBy = function (sender) {
            var _this = this;
            this.subscriber.subscribe(function () { return _this.onSortChanged.publish('sortService:changed', "onSortChanged by " + sender); });
        };
        return SortService;
    }());
    exports.SortService = SortService;
});
//# sourceMappingURL=sort.service.js.map