"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import 3rd party vendor libs
require("slickgrid/lib/jquery-ui-1.11.3");
require("slickgrid/lib/jquery.event.drag-2.3.0");
require("slickgrid/slick.core");
require("slickgrid/slick.dataview");
require("slickgrid/slick.grid");
require("slickgrid/controls/slick.columnpicker");
require("slickgrid/controls/slick.pager");
require("slickgrid/plugins/slick.autotooltips");
require("slickgrid/plugins/slick.cellcopymanager");
require("slickgrid/plugins/slick.cellexternalcopymanager");
require("slickgrid/plugins/slick.cellrangedecorator");
require("slickgrid/plugins/slick.cellrangeselector");
require("slickgrid/plugins/slick.cellselectionmodel");
require("slickgrid/plugins/slick.checkboxselectcolumn");
require("slickgrid/plugins/slick.headerbuttons");
require("slickgrid/plugins/slick.headermenu");
require("slickgrid/plugins/slick.rowmovemanager");
require("slickgrid/plugins/slick.rowselectionmodel");
var aurelia_framework_1 = require("aurelia-framework");
var global_grid_options_1 = require("./global-grid-options");
var filter_service_1 = require("./services/filter.service");
var mouse_service_1 = require("./services/mouse.service");
var resizer_service_1 = require("./services/resizer.service");
var sort_service_1 = require("./services/sort.service");
var AureliaSlickgridCustomElement = /** @class */ (function () {
    function AureliaSlickgridCustomElement(elm, resizer, mouseService, filterService, sortService) {
        this.elm = elm;
        this.resizer = resizer;
        this.mouseService = mouseService;
        this.filterService = filterService;
        this.sortService = sortService;
        this._columnFilters = {};
        this.showPagination = false;
        this.onFilter = new Slick.Event();
        this.gridHeight = 100;
        this.gridWidth = 600;
        this.elm = elm;
        this.resizer = resizer;
        this.mouseService = mouseService;
        this.filterService = filterService;
        this.sortService = sortService;
    }
    AureliaSlickgridCustomElement.prototype.attached = function () {
        // reference to the DOM element
        this._domElm = $(this.elm);
        // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
        this._dataset = this._dataset || [];
        this._gridOptions = this.mergeGridOptions();
        this._dataView = new Slick.Data.DataView();
        this.grid = new Slick.Grid("#" + this.gridId, this._dataView, this.columnDefinitions, this._gridOptions);
        this.grid.setSelectionModel(new Slick.RowSelectionModel());
        if (this._gridOptions.enableColumnPicker) {
            var columnpicker = new Slick.Controls.ColumnPicker(this.columnDefinitions, this.grid, this._gridOptions);
        }
        this.grid.init();
        this._dataView.beginUpdate();
        this.attachDifferentHooks(this.grid, this._gridOptions, this._dataView);
        this._dataView.setItems(this._dataset);
        this._dataView.endUpdate();
        // attach resize ONLY after the dataView is ready
        this.attachResizeHook(this.grid, this._gridOptions);
    };
    /**
     * Keep original value(s) that could be passed by the user ViewModel.
     * If nothing was passed, it will default to first option of select
     */
    AureliaSlickgridCustomElement.prototype.bind = function (binding, contexts) {
        // get the grid options (priority is Global Options first, then user option which could overwrite the Global options)
        this.gridOptions = __assign({}, global_grid_options_1.GlobalGridOptions, binding.gridOptions);
        this.style = {
            height: binding.gridHeight + "px",
            width: binding.gridWidth + "px"
        };
    };
    AureliaSlickgridCustomElement.prototype.unbind = function (binding, scope) {
        this.resizer.destroy();
    };
    AureliaSlickgridCustomElement.prototype.datasetChanged = function (newValue, oldValue) {
        this._dataset = newValue;
        this.refreshGridData(newValue);
        // expand/autofit columns on first page load
        // we can assume that if the oldValue was empty then we are on first load
        if (!oldValue || oldValue.length < 1) {
            if (this._gridOptions.autoFitColumnsOnFirstLoad) {
                this.grid.autosizeColumns();
            }
        }
    };
    AureliaSlickgridCustomElement.prototype.attachDifferentHooks = function (grid, options, dataView) {
        // attach external sorting (backend) when available or default onSort (dataView)
        if (options.enableSorting) {
            (typeof options.onSortChanged === 'function') ? this.sortService.attachBackendOnSort(grid, options) : this.sortService.attachLocalOnSort(grid, this._dataView);
        }
        // attach external filter (backend) when available or default onSort (dataView)
        if (options.enableFiltering) {
            this.filterService.init(grid, options, this.columnDefinitions, this._columnFilters);
            (typeof options.onFilterChanged === 'function') ? this.filterService.attachBackendOnFilter() : this.filterService.attachLocalOnFilter(this._dataView);
        }
        // if enable, change background color on mouse over
        if (options.enableMouseOverRow) {
            this.mouseService.attachOnMouseHover(grid);
        }
        dataView.onRowCountChanged.subscribe(function (e, args) {
            grid.updateRowCount();
            grid.render();
        });
        dataView.onRowsChanged.subscribe(function (e, args) {
            grid.invalidateRows(args.rows);
            grid.render();
        });
    };
    AureliaSlickgridCustomElement.prototype.attachResizeHook = function (grid, options) {
        // expand/autofit columns on first page load
        if (this._gridOptions.autoFitColumnsOnFirstLoad) {
            this.grid.autosizeColumns();
        }
        // auto-resize grid on browser resize
        if (options.enableAutoResize) {
            this.resizer.attachAutoResizeDataGrid(grid, options);
            if (options.autoFitColumnsOnFirstLoad) {
                grid.autosizeColumns();
            }
        }
        else {
            this.resizer.resizeGrid(grid, options, { height: this.gridHeight, width: this.gridWidth });
        }
    };
    AureliaSlickgridCustomElement.prototype.mergeGridOptions = function () {
        this.gridOptions.gridId = this.gridId;
        this.gridOptions.gridContainerId = "slickGridContainer-" + this.gridId;
        if (this.gridOptions.enableFiltering) {
            this.gridOptions.showHeaderRow = true;
        }
        var options = __assign({}, global_grid_options_1.GlobalGridOptions, this.gridOptions);
        return options;
    };
    /** Toggle the filter row displayed on first row */
    AureliaSlickgridCustomElement.prototype.showHeaderRow = function (isShowing) {
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    };
    /** Toggle the filter row displayed on first row */
    AureliaSlickgridCustomElement.prototype.toggleHeaderRow = function () {
        var isShowing = !this.grid.getOptions().showHeaderRow;
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    };
    AureliaSlickgridCustomElement.prototype.refreshGridData = function (dataset) {
        var _this = this;
        if (dataset && this.grid) {
            this._dataView.setItems(dataset);
            // this.grid.setData(dataset);
            this.grid.invalidate();
            this.grid.render();
            if (this._gridOptions.enablePagination) {
                this.showPagination = true;
                this.gridPaginationOptions = this.mergeGridOptions();
            }
            if (this._gridOptions.enableAutoResize) {
                // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
                setTimeout(function () {
                    _this.resizer.resizeGrid(_this.grid, _this._gridOptions);
                    _this.grid.autosizeColumns();
                });
            }
        }
    };
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
    ], AureliaSlickgridCustomElement.prototype, "element", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
    ], AureliaSlickgridCustomElement.prototype, "dataset", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
    ], AureliaSlickgridCustomElement.prototype, "paginationOptions", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
    ], AureliaSlickgridCustomElement.prototype, "gridPaginationOptions", void 0);
    __decorate([
        aurelia_framework_1.bindable()
    ], AureliaSlickgridCustomElement.prototype, "gridId", void 0);
    __decorate([
        aurelia_framework_1.bindable()
    ], AureliaSlickgridCustomElement.prototype, "columnDefinitions", void 0);
    __decorate([
        aurelia_framework_1.bindable()
    ], AureliaSlickgridCustomElement.prototype, "gridOptions", void 0);
    __decorate([
        aurelia_framework_1.bindable()
    ], AureliaSlickgridCustomElement.prototype, "gridHeight", void 0);
    __decorate([
        aurelia_framework_1.bindable()
    ], AureliaSlickgridCustomElement.prototype, "gridWidth", void 0);
    __decorate([
        aurelia_framework_1.bindable()
    ], AureliaSlickgridCustomElement.prototype, "pickerOptions", void 0);
    AureliaSlickgridCustomElement = __decorate([
        aurelia_framework_1.inject(Element, resizer_service_1.ResizerService, mouse_service_1.MouseService, filter_service_1.FilterService, sort_service_1.SortService)
    ], AureliaSlickgridCustomElement);
    return AureliaSlickgridCustomElement;
}());
exports.AureliaSlickgridCustomElement = AureliaSlickgridCustomElement;
//# sourceMappingURL=aurelia-slickgrid.js.map