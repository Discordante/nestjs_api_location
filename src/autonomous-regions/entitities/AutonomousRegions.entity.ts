import { Municipalities } from 'src/municipalities/entitities/provinces.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comunidades' })
export class AutonomousRegions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  literal: string;

  @Column()
  ISO_3166_2: string;

  @Column()
  area: number;

  @OneToOne(() => Municipalities, (capital) => capital.id)
  @JoinColumn()
  capital: Municipalities;

  @Column()
  url: string;
}
