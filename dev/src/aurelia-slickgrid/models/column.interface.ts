import { HeaderMenu } from './headerMenu.interface';
import { Editor } from './editor.interface';
import { FieldType } from './fieldType';
import { Formatter } from './formatter.interface';
import { HeaderButton } from './headerButton.interface';
import { OnEventArgs } from './OnEventArgs.interface';
import { Sorter } from './sorter.interface';

export interface Column {
  asyncPostRender?: any;
  cannotTriggerInsert?: boolean;
  cssClass?: string;
  colspan?: number | '*';
  defaultSortAsc?: boolean;
  editor?: any;
  field: string;
  filter?: any;
  filterable?: boolean;
  filterSearchType?: FieldType;
  filterTemplate?: any;
  focusable?: boolean;
  formatter?: Formatter;
  header?: {
    buttons?: HeaderButton[];
    menu?: {
      items: HeaderMenu[];
    };
  };
  headerCssClass?: string;
  id: number | string;
  isEditable?: boolean;
  isHidden?: boolean;
  json?: any; // catchall for meta info - TODO: rm
  key?: string;
  manuallySized?: boolean;
  maxWidth?: number;
  minWidth?: number;
  name?: string;
  onCellChange?: (args: OnEventArgs) => void;
  onCellClick?: (args: OnEventArgs) => void;
  previousWidth?: number;
  resizable?: boolean;
  rerenderOnResize?: boolean;
  showHidden?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  sorter?: Sorter;
  toolTip?: string;
  type?: FieldType;
  // validator?: Validator;
  validator?: any;
  width?: number;
  // groupTotalsFormatter?(item: GroupTotals, columnDef: Column): string;
}
