import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Excel')
export class Excel{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    modelType: string;
    @Column()
    description: string;
}