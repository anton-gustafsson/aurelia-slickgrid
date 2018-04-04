import { Column } from './../models/index';
/** Provides a list of different Formatters that will change the cell value displayed in the UI */
export declare const Formatters: {
    arrayToCsv: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    bold: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    checkbox: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    checkmark: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    complexObject: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    collection: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    dateIso: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    dateTimeIso: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    dateTimeIsoAmPm: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    dateUs: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    dateTimeUs: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    dateTimeUsAmPm: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    deleteIcon: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    dollar: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    dollarColored: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    dollarColoredBold: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    editIcon: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    hyperlink: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    hyperlinkUriPrefix: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    infoIcon: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    lowercase: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    multiple: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    percentComplete: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    percentCompleteBar: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    progressBar: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    translate: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    translateBoolean: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    uppercase: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
    yesNo: (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
};
