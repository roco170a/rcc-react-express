import { ParamFilterQueryInterface } from './paramFilterQuery.interface';

export interface ParamQueryInterface {
    filter?: ParamFilterQueryInterface[];
    sort?: any[];
    page: number;
    pageSize: number;
}
