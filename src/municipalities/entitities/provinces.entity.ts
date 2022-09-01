import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'municipios' })
export class Municipalities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idProvincia: number;

  @Column()
  DC: number;

  @Column()
  literal: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  height: number;
}
