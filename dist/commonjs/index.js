"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_slickgrid_1 = require("./aurelia-slickgrid");
exports.AureliaSlickgridCustomElement = aurelia_slickgrid_1.AureliaSlickgridCustomElement;
var slickgrid_config_1 = require("./slickgrid-config");
exports.SlickgridConfig = slickgrid_config_1.SlickgridConfig;
var caseType_1 = require("./models/caseType");
exports.CaseType = caseType_1.CaseType;
var formElementType_1 = require("./models/formElementType");
exports.FormElementType = formElementType_1.FormElementType;
var fieldType_1 = require("./models/fieldType");
exports.FieldType = fieldType_1.FieldType;
var index_1 = require("./filter-conditions/index");
exports.FilterConditions = index_1.FilterConditions;
var index_2 = require("./filter-templates/index");
exports.FilterTemplates = index_2.FilterTemplates;
var index_3 = require("./formatters/index");
exports.Formatters = index_3.Formatters;
var index_4 = require("./sorters/index");
exports.Sorters = index_4.Sorters;
var filter_service_1 = require("./services/filter.service");
exports.FilterService = filter_service_1.FilterService;
var mouse_service_1 = require("./services/mouse.service");
exports.MouseService = mouse_service_1.MouseService;
var resizer_service_1 = require("./services/resizer.service");
exports.ResizerService = resizer_service_1.ResizerService;
var sort_service_1 = require("./services/sort.service");
exports.SortService = sort_service_1.SortService;
var grid_odata_service_1 = require("./services/grid-odata.service");
exports.GridOdataService = grid_odata_service_1.GridOdataService;
function configure(aurelia, callback) {
    aurelia.globalResources(aurelia_pal_1.PLATFORM.moduleName('./aurelia-slickgrid'));
    var config = new slickgrid_config_1.SlickgridConfig();
    if (typeof callback === 'function') {
        callback(config);
    }
}
exports.configure = configure;
