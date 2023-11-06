//$ npm install --save @nestjs/typeorm typeorm mysql2
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class EntradaEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id?: number | undefined;

    @Column({ name: 'title', nullable: false })
    titulo: string;

    @Column({ name: 'author', nullable: false })
    autor: string;

    @Column({ name: 'post_date', nullable: false })
    fecha: Date;

    @Column({ name: 'content', nullable: false, length: 6000 })
    contenido: string;

    @Column()
    @CreateDateColumn({ name: 'entrada_create_at' })
    creado: Date;

    @Column()
    @UpdateDateColumn({ name: 'entrada_update_at' })
    actualizado: Date;
}
