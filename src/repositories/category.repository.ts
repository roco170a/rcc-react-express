import { AppDataSource } from '@/database';
import { CategoryEntity } from '@/entities/category-data.entity';
import { ParamQueryInterface } from '@/interfaces/paramQuery.interface';

export const CategoryRepository = AppDataSource.getRepository(CategoryEntity).extend({
    getCategoryAll() {
        return this.createQueryBuilder('category').getMany();
    },

    getCategoryById(id: number) {
        return this.findOneBy({ id: id });
    },

    getCategoryByParam(params: ParamQueryInterface) {
        const query = this.createQueryBuilder('category');
        query.orderBy('category.parentId', 'ASC');

        query.where(' 1 = 1');

        params.filter.forEach((param, i, arr) => {
            if (params.filter[i].fieldListValues) {
                query.andWhere('category.' + params.filter[i].fieldName + ' ' + params.filter[i].operator + ' (:...param' + i.toString() + ')');
                query.setParameter('param' + i.toString(), params.filter[i].fieldListValues);
            } else {
                query.andWhere('category.' + params.filter[i].fieldName + ' ' + params.filter[i].operator + ' :param' + i.toString());
                query.setParameter('param' + i.toString(), params.filter[i].fieldValue);
            }
        });

        if (params.sort) {
            params.sort.forEach((p_sort, i, arr) => {
                query.orderBy(p_sort);
            });
        }

        return query.getMany();
    },
});
