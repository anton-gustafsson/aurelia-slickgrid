import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.grid';
import 'slickgrid/controls/slick.columnpicker';
import 'slickgrid/controls/slick.gridmenu';
import 'slickgrid/controls/slick.pager';
import 'slickgrid/plugins/slick.autotooltips';
import 'slickgrid/plugins/slick.cellcopymanager';
import 'slickgrid/plugins/slick.cellexternalcopymanager';
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import 'slickgrid/plugins/slick.checkboxselectcolumn';
import 'slickgrid/plugins/slick.headerbuttons';
import 'slickgrid/plugins/slick.headermenu';
import 'slickgrid/plugins/slick.rowmovemanager';
import 'slickgrid/plugins/slick.rowselectionmodel';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { I18N } from 'aurelia-i18n';
import { Column, GridOption, Pagination } from './models/index';
import { ControlAndPluginService, ExportService, FilterService, GraphqlService, GridEventService, GridExtraService, GridStateService, ResizerService, SortService } from './services/index';
export declare class AureliaSlickgridCustomElement {
    private controlAndPluginService;
    private exportService;
    private elm;
    private ea;
    private filterService;
    private graphqlService;
    private gridEventService;
    private gridExtraService;
    private gridStateService;
    private i18n;
    private resizer;
    private sortService;
    private _dataset;
    private _eventHandler;
    gridStateSubscriber: Subscription;
    gridHeightString: string;
    gridWidthString: string;
    localeChangedSubscriber: Subscription;
    showPagination: boolean;
    style: any;
    element: Element;
    dataset: any[];
    gridPaginationOptions: GridOption;
    dataview: any;
    grid: any;
    gridId: string;
    columnDefinitions: Column[];
    gridOptions: GridOption;
    gridHeight: number;
    gridWidth: number;
    pickerOptions: any;
    constructor(controlAndPluginService: ControlAndPluginService, exportService: ExportService, elm: Element, ea: EventAggregator, filterService: FilterService, graphqlService: GraphqlService, gridEventService: GridEventService, gridExtraService: GridExtraService, gridStateService: GridStateService, i18n: I18N, resizer: ResizerService, sortService: SortService);
    attached(): void;
    detached(): void;
    /**
     * Keep original value(s) that could be passed by the user ViewModel.
     * If nothing was passed, it will default to first option of select
     */
    bind(binding: any, contexts: any): void;
    datasetChanged(newValue: any[], oldValue: any[]): void;
    /**
     * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service only feautre and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     */
    createBackendApiInternalPostProcessCallback(gridOptions: GridOption): void;
    attachDifferentHooks(grid: any, gridOptions: GridOption, dataView: any): void;
    attachBackendCallbackFunctions(gridOptions: GridOption): void;
    attachResizeHook(grid: any, options: GridOption): void;
    mergeGridOptions(gridOptions: GridOption): GridOption;
    paginationChanged(pagination: Pagination): void;
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param dataset
     */
    refreshGridData(dataset: any[], totalCount?: number): void;
    /**
     * Toggle the filter row displayed on first row
     * @param isShowing
     */
    showHeaderRow(isShowing: boolean): boolean;
    /** Toggle the filter row displayed on first row */
    toggleHeaderRow(): boolean;
}
