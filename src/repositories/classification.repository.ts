import { AppDataSource } from '@/database';
import { ClassificationEntity } from '@/entities/classification-data.entity';
import { ParamQueryInterface } from '@/interfaces/paramQuery.interface';

export const ClassificationRepository = AppDataSource.getRepository(ClassificationEntity).extend({
    getClassificationAll() {
        return this.createQueryBuilder('classification').getMany();
    },

    getClassificationById(id: number) {
        return this.findOneBy({ id: id });
    },

    getClassificationByParam(params: ParamQueryInterface) {
        const query = this.createQueryBuilder('classification');
        query.orderBy('classification.id', 'ASC');

        query.where(' 1 = 1');

        console.log('filtros');
        console.log(params);

        params.filter.forEach((param, i, arr) => {
            if (params.filter[i].fieldListValues) {
                query.andWhere('classification.' + params.filter[i].fieldName + ' ' + params.filter[i].operator + ' (:...param' + i.toString() + ')');
                query.setParameter('param' + i.toString(), params.filter[i].fieldListValues);
            } else {
                query.andWhere('classification.' + params.filter[i].fieldName + ' ' + params.filter[i].operator + ' :param' + i.toString());
                query.setParameter('param' + i.toString(), params.filter[i].fieldValue);
            }
        });

        console.log('ordering');

        if (params.sort) {
            params.sort.forEach((p_sort, i, arr) => {
                query.orderBy(p_sort);
            });
        }

        return query.getMany();
    },
});
