System.register(["slickgrid/controls/slick.columnpicker", "slickgrid/controls/slick.pager", "slickgrid/lib/jquery-ui-1.11.3", "slickgrid/lib/jquery.event.drag-2.3.0", "slickgrid/plugins/slick.rowselectionmodel", "slickgrid/slick.core", "slickgrid/slick.dataview", "slickgrid/slick.grid", "aurelia-framework", "./global-grid-options"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, global_grid_options_1, AuSlickgridCustomElement;
    return {
        setters: [
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            },
            function (_6) {
            },
            function (_7) {
            },
            function (_8) {
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (global_grid_options_1_1) {
                global_grid_options_1 = global_grid_options_1_1;
            }
        ],
        execute: function () {
            AuSlickgridCustomElement = /** @class */ (function () {
                function AuSlickgridCustomElement(elm, resizer, mouseService, filterService, sortService) {
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
                }
                Object.defineProperty(AuSlickgridCustomElement.prototype, "dataset", {
                    get: function () {
                        return this._dataView.getItems();
                    },
                    set: function (dataset) {
                        this._dataset = dataset;
                        this.refreshGridData(dataset);
                    },
                    enumerable: true,
                    configurable: true
                });
                AuSlickgridCustomElement.prototype.attached = function () {
                    // reference to the DOM element
                    this._domElm = $(this.elm);
                    // finally create the bootstrap-select with all options
                    // let pickerOptions = Object.assign({}, GlobalGridOptions, this.pickerOptions || {});
                    // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
                    this._dataset = this._dataset || [];
                    this._gridOptions = this.mergeGridOptions();
                    this._dataView = new Slick.Data.DataView();
                    this.grid = new Slick.Grid("#" + this.gridId, this._dataView, this.columnDefinitions, this._gridOptions);
                    this.grid.setSelectionModel(new Slick.RowSelectionModel());
                    // const columnpicker = new Slick.Controls.ColumnPicker(this.columnDefinitions, this.grid, this._gridOptions);
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
                AuSlickgridCustomElement.prototype.bind = function () {
                    this.style = {
                        height: this.gridHeight + "px",
                        width: this.gridWidth + "px"
                    };
                };
                /*
                unbind(binding, scope) {
                }
                */
                AuSlickgridCustomElement.prototype.attachDifferentHooks = function (grid, options, dataView) {
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
                AuSlickgridCustomElement.prototype.attachResizeHook = function (grid, options) {
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
                AuSlickgridCustomElement.prototype.mergeGridOptions = function () {
                    this.gridOptions.gridId = this.gridId;
                    this.gridOptions.gridContainerId = "slickGridContainer-" + this.gridId;
                    if (this.gridOptions.enableFiltering) {
                        this.gridOptions.showHeaderRow = true;
                    }
                    var options = __assign({}, global_grid_options_1.GlobalGridOptions, this.gridOptions);
                    return options;
                };
                /** Toggle the filter row displayed on first row */
                AuSlickgridCustomElement.prototype.showHeaderRow = function (isShowing) {
                    this.grid.setHeaderRowVisibility(isShowing);
                    return isShowing;
                };
                /** Toggle the filter row displayed on first row */
                AuSlickgridCustomElement.prototype.toggleHeaderRow = function () {
                    var isShowing = !this.grid.getOptions().showHeaderRow;
                    this.grid.setHeaderRowVisibility(isShowing);
                    return isShowing;
                };
                AuSlickgridCustomElement.prototype.refreshGridData = function (dataset) {
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
                ], AuSlickgridCustomElement.prototype, "element", void 0);
                __decorate([
                    aurelia_framework_1.bindable()
                ], AuSlickgridCustomElement.prototype, "gridId", void 0);
                __decorate([
                    aurelia_framework_1.bindable()
                ], AuSlickgridCustomElement.prototype, "columnDefinitions", void 0);
                __decorate([
                    aurelia_framework_1.bindable()
                ], AuSlickgridCustomElement.prototype, "gridOptions", void 0);
                __decorate([
                    aurelia_framework_1.bindable()
                ], AuSlickgridCustomElement.prototype, "gridHeight", void 0);
                __decorate([
                    aurelia_framework_1.bindable()
                ], AuSlickgridCustomElement.prototype, "gridWidth", void 0);
                __decorate([
                    aurelia_framework_1.bindable()
                ], AuSlickgridCustomElement.prototype, "pickerOptions", void 0);
                __decorate([
                    aurelia_framework_1.bindable()
                ], AuSlickgridCustomElement.prototype, "dataset", null);
                AuSlickgridCustomElement = __decorate([
                    aurelia_framework_1.inject(Element)
                ], AuSlickgridCustomElement);
                return AuSlickgridCustomElement;
            }());
            exports_1("AuSlickgridCustomElement", AuSlickgridCustomElement);
        }
    };
});
