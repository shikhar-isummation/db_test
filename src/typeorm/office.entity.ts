/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('offices')
export class Office {
  @PrimaryGeneratedColumn('uuid')
  officeCode: number;

  @Column()
  addressLine1: string;

  @Column()
  addressLine2: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column()
  postalCode: string;

  @Column()
  state: string;

  @Column()
  territory: string;
}
