// import common 3rd party SlickGrid plugins/libs
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';

import { singleton, inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import {
  Column,
  ExtensionModel,
  ExtensionName,
  GridOption,
} from '../models/index';
import {
  AutoTooltipExtension,
  CellExternalCopyManagerExtension,
  CheckboxSelectorExtension,
  ColumnPickerExtension,
  DraggableGroupingExtension,
  GridMenuExtension,
  GroupItemMetaProviderExtension,
  HeaderButtonExtension,
  HeaderMenuExtension,
  RowDetailViewExtension,
  RowMoveManagerExtension,
  RowSelectionExtension,
} from '../extensions/index';
import { SharedService } from './shared.service';

@singleton(true)
@inject(
  AutoTooltipExtension,
  CellExternalCopyManagerExtension,
  CheckboxSelectorExtension,
  ColumnPickerExtension,
  DraggableGroupingExtension,
  GridMenuExtension,
  GroupItemMetaProviderExtension,
  I18N,
  HeaderButtonExtension,
  HeaderMenuExtension,
  RowDetailViewExtension,
  RowMoveManagerExtension,
  RowSelectionExtension,
  SharedService,
)
export class ExtensionService {
  private _extensionList: ExtensionModel[] = [];

  constructor(
    private autoTooltipExtension: AutoTooltipExtension,
    private cellExternalCopyExtension: CellExternalCopyManagerExtension,
    private checkboxSelectorExtension: CheckboxSelectorExtension,
    private columnPickerExtension: ColumnPickerExtension,
    private draggableGroupingExtension: DraggableGroupingExtension,
    private gridMenuExtension: GridMenuExtension,
    private groupItemMetaExtension: GroupItemMetaProviderExtension,
    private i18n: I18N,
    private headerButtonExtension: HeaderButtonExtension,
    private headerMenuExtension: HeaderMenuExtension,
    private rowDetailViewExtension: RowDetailViewExtension,
    private rowMoveManagerExtension: RowMoveManagerExtension,
    private rowSelectionExtension: RowSelectionExtension,
    private sharedService: SharedService,
  ) { }

  /** Dispose of all the controls & plugins */
  dispose() {
    this.sharedService.grid = null;
    this.sharedService.visibleColumns = [];

    // dispose of each control/plugin & reset the list
    this._extensionList.forEach((item) => {
      if (item && item.class && item.class.dispose) {
        item.class.dispose();
      }
    });
    this._extensionList = [];
  }

  /** Get all columns (includes visible and non-visible) */
  getAllColumns(): Column[] {
    return this.sharedService.allColumns || [];
  }

  /** Get only visible columns */
  getVisibleColumns(): Column[] {
    return this.sharedService.visibleColumns || [];
  }

  /** Get all Extensions */
  getAllExtensions(): ExtensionModel[] {
    return this._extensionList;
  }

  /**
   * Get an Extension by it's name
   *  @param name
   */
  getExtensionByName(name: ExtensionName): ExtensionModel | undefined {
    return this._extensionList.find((p) => p.name === name);
  }

  /**
   * Get the instance of the SlickGrid addon (control or plugin).
   * This is the raw addon coming directly from SlickGrid itself, not to confuse with Aurelia-Slickgrid extension
   *  @param name
   */
  getSlickgridAddonInstance(name: ExtensionName): any {
    const extension = this.getExtensionByName(name);
    if (extension && extension.addon) {
      return extension.addon;
    }
    return null;
  }

  /** Auto-resize all the column in the grid to fit the grid width */
  autoResizeColumns() {
    this.sharedService.grid.autosizeColumns();
  }

  /** Bind/Create different 3rd party Controls/Plugins to the core lib right after the Grid is created */
  bindDifferentExtensions() {
    if (this.sharedService && this.sharedService.gridOptions) {
      // make sure all columns are translated before creating ColumnPicker/GridMenu Controls
      // this is to avoid having hidden columns not being translated on first load
      if (this.sharedService.gridOptions.enableTranslate) {
        this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
      }

      // Auto Tooltip Plugin
      if (this.sharedService.gridOptions.enableAutoTooltip) {
        if (this.autoTooltipExtension && this.autoTooltipExtension.register) {
          this._extensionList.push({ name: ExtensionName.autoTooltip, class: this.autoTooltipExtension, addon: this.autoTooltipExtension.register() });
        }
      }

      // Cell External Copy Manager Plugin (Excel Like)
      if (this.sharedService.gridOptions.enableExcelCopyBuffer) {
        if (this.cellExternalCopyExtension && this.cellExternalCopyExtension.register) {
          this._extensionList.push({ name: ExtensionName.cellExternalCopyManager, class: this.cellExternalCopyExtension, addon: this.cellExternalCopyExtension.register() });
        }
      }

      // Checkbox Selector Plugin
      if (this.sharedService.gridOptions.enableCheckboxSelector) {
        if (this.checkboxSelectorExtension && this.checkboxSelectorExtension.register) {
          const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
          this._extensionList.push({ name: ExtensionName.checkboxSelector, class: this.checkboxSelectorExtension, addon: this.checkboxSelectorExtension.register(rowSelectionExtension) });
        }
      }

      // Column Picker Control
      if (this.sharedService.gridOptions.enableColumnPicker) {
        if (this.columnPickerExtension && this.columnPickerExtension.register) {
          this._extensionList.push({ name: ExtensionName.columnPicker, class: this.columnPickerExtension, addon: this.columnPickerExtension.register() });
        }
      }

      // Draggable Grouping Plugin
      if (this.sharedService.gridOptions.enableDraggableGrouping) {
        if (this.draggableGroupingExtension && this.draggableGroupingExtension.register) {
          this._extensionList.push({ name: ExtensionName.draggableGrouping, class: this.draggableGroupingExtension, addon: this.draggableGroupingExtension.register() });
        }
      }

      // Grid Menu Control
      if (this.sharedService.gridOptions.enableGridMenu) {
        if (this.gridMenuExtension && this.gridMenuExtension.register) {
          this._extensionList.push({ name: ExtensionName.gridMenu, class: this.gridMenuExtension, addon: this.gridMenuExtension.register() });
        }
      }

      // Grouping Plugin
      // register the group item metadata provider to add expand/collapse group handlers
      if (this.sharedService.gridOptions.enableDraggableGrouping || this.sharedService.gridOptions.enableGrouping) {
        if (this.groupItemMetaExtension && this.groupItemMetaExtension.register) {
          this._extensionList.push({ name: ExtensionName.groupItemMetaProvider, class: this.groupItemMetaExtension, addon: this.groupItemMetaExtension.register() });
        }
      }

      // Header Button Plugin
      if (this.sharedService.gridOptions.enableHeaderButton) {
        if (this.headerButtonExtension && this.headerButtonExtension.register) {
          this._extensionList.push({ name: ExtensionName.headerButton, class: this.headerButtonExtension, addon: this.headerButtonExtension.register() });
        }
      }

      // Header Menu Plugin
      if (this.sharedService.gridOptions.enableHeaderMenu) {
        if (this.headerMenuExtension && this.headerMenuExtension.register) {
          this._extensionList.push({ name: ExtensionName.headerMenu, class: this.headerMenuExtension, addon: this.headerMenuExtension.register() });
        }
      }

      // Row Detail View Plugin
      if (this.sharedService.gridOptions.enableRowDetailView) {
        if (this.rowDetailViewExtension && this.rowDetailViewExtension.register) {
          const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
          this._extensionList.push({ name: ExtensionName.rowDetailView, class: this.rowDetailViewExtension, addon: this.rowDetailViewExtension.register(rowSelectionExtension) });
        }
      }

      // Row Move Manager Plugin
      if (this.sharedService.gridOptions.enableRowMoveManager) {
        if (this.rowMoveManagerExtension && this.rowMoveManagerExtension.register) {
          this._extensionList.push({ name: ExtensionName.rowMoveManager, class: this.rowMoveManagerExtension, addon: this.rowMoveManagerExtension.register() });
        }
      }

      // Row Selection Plugin
      if (!this.sharedService.gridOptions.enableCheckboxSelector && this.sharedService.gridOptions.enableRowSelection) {
        if (this.rowSelectionExtension && this.rowSelectionExtension.register) {
          this._extensionList.push({ name: ExtensionName.rowSelection, class: this.rowSelectionExtension, addon: this.rowSelectionExtension.register() });
        }
      }

      // manually register other plugins
      if (this.sharedService.gridOptions.registerPlugins !== undefined) {
        if (Array.isArray(this.sharedService.gridOptions.registerPlugins)) {
          this.sharedService.gridOptions.registerPlugins.forEach((plugin) => {
            this.sharedService.grid.registerPlugin(plugin);
            this._extensionList.push({ name: ExtensionName.noname, class: null, addon: plugin });
          });
        } else {
          this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
          this._extensionList.push({ name: ExtensionName.noname, class: null, addon: this.sharedService.gridOptions.registerPlugins });
        }
      }
    }
  }

  /**
   * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
   * Mostly because the column definitions might change after the grid creation
   * @param columnDefinitions
   * @param options
   */
  createExtensionsBeforeGridCreation(columnDefinitions: Column[], options: GridOption) {
    if (options.enableCheckboxSelector) {
      this.checkboxSelectorExtension.create(columnDefinitions, options);
    }
    if (options.enableRowDetailView) {
      this.rowDetailViewExtension.create(columnDefinitions, options);
    }
    if (options.enableDraggableGrouping) {
      const plugin = this.draggableGroupingExtension.create(options);
      options.enableColumnReorder = plugin.getSetupColumnReorder;
    }
  }

  /** Hide a column from the grid */
  hideColumn(column: Column) {
    if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
      const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
      this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
      this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
    }
  }

  /** Refresh the dataset through the Backend Service */
  refreshBackendDataset(gridOptions?: GridOption) {
    this.gridMenuExtension.refreshBackendDataset(gridOptions);
  }

  /**
   * Remove a column from the grid by it's index in the grid
   * @param columns input
   * @param index
   */
  removeColumnByIndex(columns: Column[], index: number): Column[] {
    if (Array.isArray(columns)) {
      return columns.filter((el: Column, i: number) => index !== i);
    }
    return columns;
  }

  /** Translate the Column Picker and it's last 2 checkboxes */
  translateColumnPicker() {
    if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
      this.columnPickerExtension.translateColumnPicker();
    }
  }

  /** Translate the Header Menu titles, we need to loop through all column definition to re-translate them */
  translateGridMenu() {
    if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
      this.gridMenuExtension.translateGridMenu();
    }
  }

  /** Translate the Header Menu titles, we need to loop through all column definition to re-translate them */
  translateHeaderMenu() {
    if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
      this.headerMenuExtension.translateHeaderMenu();
    }
  }

  /**
   * Translate manually the header titles.
   * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
   * @param locale to use
   * @param new column definitions (optional)
   */
  translateColumnHeaders(locale?: boolean | string, newColumnDefinitions?: Column[]) {
    if (locale) {
      this.i18n.setLocale(locale as string);
    }

    let columnDefinitions = newColumnDefinitions;
    if (!columnDefinitions) {
      columnDefinitions = this.sharedService.columnDefinitions;
    }

    this.translateItems(columnDefinitions, 'headerKey', 'name');
    this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');

    // re-render the column headers
    this.renderColumnHeaders(columnDefinitions);
  }

  /**
   * Render (or re-render) the column headers from column definitions.
   * calling setColumns() will trigger a grid re-render
   */
  renderColumnHeaders(newColumnDefinitions?: Column[]) {
    let collection = newColumnDefinitions;
    if (!collection) {
      collection = this.sharedService.columnDefinitions;
    }
    if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
      this.sharedService.grid.setColumns(collection);
    }
  }

  /** Translate an array of items from an input key and assign translated value to the output key */
  private translateItems(items: any[], inputKey: string, outputKey: string) {
    if (Array.isArray(items)) {
      for (const item of items) {
        if (item[inputKey]) {
          item[outputKey] = this.i18n.tr(item[inputKey]);
        }
      }
    }
  }
}
