import { AppDataSource } from '@/database';
import { EntradaEntity } from '@/entities/entrada.entity';
import { ParamQueryInterface } from '@/interfaces/paramQuery.interface';

export const EntradaRepository = AppDataSource.getRepository(EntradaEntity).extend({
    getentradaAll() {
        return this.createQueryBuilder('entrada').getMany();
    },

    getentradaById(id: number) {
        return this.findOneBy({ id: id });
    },

    getentradaByParam(params: ParamQueryInterface) {
        const query = this.createQueryBuilder('entrada');
        query.orderBy('entrada.id', 'ASC');

        query.where(' 1 = 1');

        console.log('FILTRO');
        console.log(params.filter);

        params.filter.forEach((param, i, arr) => {
            if (params.filter[i].fieldListValues) {
                query.andWhere('entrada.' + params.filter[i].fieldName + ' ' + params.filter[i].operator + ' (:...param' + i.toString() + ')');
                query.setParameter('param' + i.toString(), params.filter[i].fieldListValues);
            } else {
                query.andWhere('entrada.' + params.filter[i].fieldName + ' ' + params.filter[i].operator + ' :param' + i.toString());
                query.setParameter('param' + i.toString(), params.filter[i].fieldValue);
            }
        });

        console.log('SORT');

        if (params.sort) {
            params.sort.forEach((p_sort, i, arr) => {
                query.orderBy(p_sort);
            });
        }

        return query.getMany();
    },
});
