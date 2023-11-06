import { EntradaDataInterface } from '@/interfaces/entrada.interface';
import { ParamQueryInterface } from '@/interfaces/paramQuery.interface';
import EntradaDataService from '@/services/entrada.service';
import { NextFunction, Request, Response } from 'express';

class EntradaController {
    public _entradaDataService = new EntradaDataService();

    public getentradaAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const rowsResult: EntradaDataInterface[] = await this._entradaDataService.getentradaAll();

            res.status(200).json({ data: rowsResult, message: 'getAll' });
        } catch (error) {
            next(error);
        }
    };

    public getentradaById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const paramId = Number(req.params.id);
            const rowFound: EntradaDataInterface = await this._entradaDataService.getentradaById(paramId);

            res.status(200).json({ data: rowFound, message: 'getById' });
        } catch (error) {
            next(error);
        }
    };
    /*
    public getentradaByFilter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const entradaFilter: entradaFilterInterface = req.body;
            const resentradaFiltered: EntradaDataInterface[] = await this._entradaDataService.findentradaByFilter(entradaFilter);
            res.status(201).json({ data: resentradaFiltered, message: 'findByFilter' });
        } catch (error) {
            next(error);
        }
    };
*/
    public getentradaByParam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Enter Controller');
            const entradaParams: ParamQueryInterface = req.body;
            const resentradaFiltered: EntradaDataInterface[] = await this._entradaDataService.getentradaByParam(entradaParams);
            res.status(201).json({ data: resentradaFiltered, message: 'getentradaByParam' });
        } catch (error) {
            next(error);
        }
    };

    public createentrada = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const entradaData: EntradaDataInterface = req.body;
            const createentradaData: EntradaDataInterface = await this._entradaDataService.createentrada(entradaData);
            res.status(201).json({ data: createentradaData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateentrada = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const entradaId = Number(req.params.id);
            const entradaData: EntradaDataInterface = req.body;
            const updateentradaData: EntradaDataInterface = await this._entradaDataService.updateentrada(entradaId, entradaData);
            res.status(200).json({ data: updateentradaData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteentrada = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const entradaId = Number(req.params.id);
            const deleteentradaData: EntradaDataInterface = await this._entradaDataService.deleteentrada(entradaId);
            res.status(200).json({ data: deleteentradaData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default EntradaController;
