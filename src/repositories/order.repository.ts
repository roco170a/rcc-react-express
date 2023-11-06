import { AppDataSource } from '@/database';
import { OrderEntity } from '@/entities/order.entity';
import { ParamQueryInterface } from '@/interfaces/paramQuery.interface';
import { WhereClause } from 'typeorm/query-builder/WhereClause';

export const OrderRepository = AppDataSource.getRepository(OrderEntity).extend({
    getOrderAll() {
        return this.createQueryBuilder('order').orderBy('order.priority_id', 'ASC').getMany();
    },

    getOrderById(id: number) {
        return this.findOneBy({ id: id });
    },

    getOrderByParam(params: ParamQueryInterface) {
        const query = this.createQueryBuilder('order');
        query.orderBy('order.priority_id', 'ASC');

        query.where(' 1 = 1');

        params.filter.forEach((param, i, arr) => {
            if (params.filter[i].fieldListValues) {
                query.andWhere('order.' + params.filter[i].fieldName + ' ' + params.filter[i].operator + ' (:...param' + i.toString() + ')');
                query.setParameter('param' + i.toString(), params.filter[i].fieldListValues);
            } else {
                query.andWhere('order.' + params.filter[i].fieldName + ' ' + params.filter[i].operator + ' :param' + i.toString());
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
