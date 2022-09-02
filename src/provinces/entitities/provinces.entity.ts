import { AutonomousRegions } from 'src/autonomous-regions/entitities/AutonomousRegions.entity';
import { Municipalities } from 'src/municipalities/entitities/provinces.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'provincias' })
export class Provinces {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  literal: string;

  @Column()
  ISO_3166_2: string;

  @Column()
  area: number;

  @Column()
  url: string;

  @ManyToOne(() => AutonomousRegions, (region) => region.id)
  region: AutonomousRegions;

  @OneToOne(() => Municipalities, (capital) => capital.id)
  @JoinColumn()
  capital: Municipalities;
}
