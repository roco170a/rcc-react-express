import { AppDataSource } from '@/database';
import { PriorityEntity } from '@/entities/priority.entity';

export const PriorityRepository = AppDataSource.getRepository(PriorityEntity).extend({
    getPriorityAll() {
        return this.createQueryBuilder('priority').getMany();
    },

    getPriorityById(id: number) {
        return this.findOneBy({ id: id });
    },
});
