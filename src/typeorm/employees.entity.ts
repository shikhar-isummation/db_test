/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('employees')
export class Employees {
  @PrimaryGeneratedColumn('uuid')
  employeeNumber: number;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  extension: string;

  @Column()
  email: string;

  @Column()
  officeCode: number;

  @Column()
  reportsTo: number;

  @Column()
  jobTitle: string;
 
}
