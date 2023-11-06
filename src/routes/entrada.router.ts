import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import entradaController from '@/controllers/entrada.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { EntradaDto } from '@/dtos/entrada.dto';

class EntradaRoute implements Routes {
    public path = '/entrada';
    public router = Router();
    public _entradaController = new entradaController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this._entradaController.getentradaAll);
        this.router.get(`${this.path}/:id(\\d+)`, this._entradaController.getentradaById);
        this.router.post(`${this.path}/getByParam`, this._entradaController.getentradaByParam);
        this.router.post(`${this.path}`, this._entradaController.createentrada);
        this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(EntradaDto, true), this._entradaController.updateentrada);
        this.router.delete(`${this.path}/:id(\\d+)`, this._entradaController.deleteentrada);
    }
}

export default EntradaRoute;
