System.register(["aurelia-framework", "../models/index", "../slickgrid-config"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, index_1, slickgrid_config_1, PLUGIN_NAME, FilterFactory;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (slickgrid_config_1_1) {
                slickgrid_config_1 = slickgrid_config_1_1;
            }
        ],
        execute: function () {
            /** The name of the plugins the factory will initialize */
            exports_1("PLUGIN_NAME", PLUGIN_NAME = 'GRID_FILTERS');
            FilterFactory = /** @class */ (function () {
                /**
                 * Creates an instance of the FilterFactory class
                 * @param {Container} container the Aurelia container
                 * @param {SlickgridConfig} config the slickgrid configuration settings
                 */
                function FilterFactory(container, config) {
                    this.container = container;
                    this.config = config;
                    this._options = config.options;
                }
                /**
                 * Creates a new Filter from the provided filterType
                 * @param {FilterType | FormElementType | string} [filterType] the type of filter to create
                 * as an enum or custom string. The default filter type will be used if no value is passed
                 * @return {Filter} the new Filter
                 */
                FilterFactory.prototype.createFilter = function (filterType) {
                    var _this = this;
                    var filters = this.container.getAll(PLUGIN_NAME);
                    var filter = filters.find(function (f) {
                        return f.filterType === filterType;
                    });
                    // default to the input filter type when none is found
                    if (!filter) {
                        filter = filters.find(function (f) { return f.filterType === _this._options.defaultFilterType; });
                        if (!filter) {
                            var enumOrCustom = index_1.FilterType[this._options.defaultFilterType] ? 'FilterType.enum' : 'custom';
                            throw new Error("Default filter of type " + enumOrCustom + "=" + this._options.defaultFilterType + " was not found");
                        }
                    }
                    return filter;
                };
                FilterFactory = __decorate([
                    aurelia_framework_1.inject(aurelia_framework_1.Container, slickgrid_config_1.SlickgridConfig)
                ], FilterFactory);
                return FilterFactory;
            }());
            exports_1("FilterFactory", FilterFactory);
        }
    };
});
//# sourceMappingURL=filterFactory.js.map