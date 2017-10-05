import './global-utilities';
import { OdataOption } from './../models/odataOption.interface';
export declare class OdataService {
    private _columnFilters;
    private _defaultSortBy;
    private _odataOptions;
    constructor();
    buildQuery(): string;
    getFilterByColumn(columnName: string): string;
    getFilterCount(): number;
    readonly columnFilters: any[];
    options: OdataOption;
    removeColumnFilter(fieldName: string): void;
    saveColumnFilter(fieldName: string, value: any, searchTerms?: any[]): void;
    /**
     * Update the filter by a list of terms usually passed manually by the user as default filters
     * @param {} filterOptions
     * @returns {}
     */
    updateFilterFromListTerms(filterOptions: any): void;
    updateFilterFromTerm(filterOptions: any): void;
    /**
     * Change any OData options that will be used to build the query
     * @param object options
     */
    updateOptions(options: OdataOption): void;
}
