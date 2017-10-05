System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GlobalGridOptions;
    return {
        setters: [],
        execute: function () {
            /**
             * Options that can be passed to the Aurelia-Slickgrid
             */
            exports_1("GlobalGridOptions", GlobalGridOptions = {
                autoEdit: false,
                asyncEditorLoading: false,
                autoFitColumnsOnFirstLoad: true,
                autoResize: {
                    bottomPadding: 20,
                    minHeight: 180,
                    minWidth: 300,
                    sidePadding: 0
                },
                enableAutoResize: true,
                cellHighlightCssClass: 'slick-cell-modified',
                editable: false,
                enableCellNavigation: false,
                enableColumnReorder: true,
                enableMouseOverRow: true,
                enablePagination: false,
                enableSorting: true,
                enableTextSelectionOnCells: true,
                explicitInitialization: false,
                forceFitColumns: false,
                headerRowHeight: 35,
                multiColumnSort: true,
                pagination: {
                    pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
                    pageSize: 25,
                    totalItems: 0
                },
                rowHeight: 35,
                showHeaderRow: false,
                topPanelHeight: 25
            });
        }
    };
});
