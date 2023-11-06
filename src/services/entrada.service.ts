import { HttpException } from '@/exceptions/HttpException';
import { EntradaDataInterface } from '@/interfaces/entrada.interface';
import { ParamQueryInterface } from '@/interfaces/paramQuery.interface';
import { EntradaRepository } from '@/repositories/entrada.repository';

import { isEmpty } from 'class-validator';

export class EntradaDataService {
    _entradaRepository = EntradaRepository;

    public async getentradaAll(): Promise<EntradaDataInterface[]> {
        const rowsResult = await this._entradaRepository.getentradaAll();
        return rowsResult;
    }

    public async getentradaById(id: number): Promise<EntradaDataInterface> {
        const rowFound = await this._entradaRepository.getentradaById(id);
        return rowFound;
    }

    public async createentrada(entradaData: EntradaDataInterface): Promise<EntradaDataInterface> {
        if (isEmpty(entradaData)) throw new HttpException(400, 'Wrong input');
        const rowNew = await this._entradaRepository.create({ ...entradaData, id: null });
        const createentradaData = await this._entradaRepository.save(rowNew);
        return createentradaData;
    }

    public async updateentrada(entradaId: number, entradaData: any): Promise<EntradaDataInterface> {
        if (isEmpty(entradaData)) throw new HttpException(400, 'Wrong input');
        await this._entradaRepository.update(entradaId, { ...entradaData });
        const updateentradaById: EntradaDataInterface = await this._entradaRepository.findOne({ where: { id: entradaId } });
        return updateentradaById;
    }

    public async deleteentrada(entradaId: number): Promise<EntradaDataInterface> {
        const deleteentradaById: EntradaDataInterface = await this._entradaRepository.findOne({ where: { id: entradaId } });
        if (!deleteentradaById) throw new HttpException(409, 'deleteentradaById delete Not work');
        await this._entradaRepository.delete({ id: +entradaId });
        return deleteentradaById;
    }

    public async getentradaByParam(entradaParam: ParamQueryInterface): Promise<EntradaDataInterface[]> {
        console.log('Entro a param1');
        const rowsResult = await this._entradaRepository.getentradaByParam(entradaParam);
        return rowsResult;
    }
}
export default EntradaDataService;
