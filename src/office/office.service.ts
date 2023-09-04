import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from '../typeorm/office.entity';
import { HttpStatus, HttpException } from '@nestjs/common';
import { CreateOfficeDto } from './dto/Create.User.dto';
import { UpdateOfficeDto } from './dto/Update.User.dto';
import { Employees } from 'src/typeorm/employees.entity';
import { createPool, Pool } from 'mysql2/promise';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OfficeService {
  private readonly connection: Pool;
  constructor(
    @InjectRepository(Office)
    private officeRepository: Repository<Office>,

    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,

    private sequelize: Sequelize
  ) {
    this.connection = createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'classicmodels',
    });
  }

  async getAllOffices(): Promise<any[]> {

    const [results, metadata] = await this.sequelize.query("SELECT * FROM offices");
    console.log("ssssssssssssssss", metadata);
    return results;
    // const [rows] = await this.connection.execute('SELECT * FROM offices');
    // return rows as any[];
    // const query = 'SELECT * FROM offices'
    // return this.officeRepository.query(query);
    //get all off;ice & return it.
    // return this.officeRepository.find();
  }

  async deleteOffice(officeCode: number): Promise<any> {
    //officeId not provided to delete office.
    if (!officeCode) {
      throw new HttpException("Please Provide id", HttpStatus.BAD_REQUEST)
    }
    //try to find office for delete if not then threw exception.
    const Office = await this.officeRepository.findOne({ where: { officeCode } });
    if (!Office) {
      throw new HttpException("Not found any Office", HttpStatus.NOT_FOUND);
    }
    //if present then successfully delete.
    await this.officeRepository.delete(officeCode);
    return {
      message: "Office Successfully deleted",
    }
  }

  async findOfficeById(officeCode: number) {
    const query = `SELECT * FROM  offices AS o RIGHT JOIN  employees AS e ON o.officeCode = e.officeCode WHERE o.officeCode = ? `;
    if (officeCode) {
      // return this.employeeRepository.query(query, [officeCode]);
      const [results, metadata] = await this.sequelize.query({ query: query, values: [officeCode] });
      // const [rows] = await this.connection.execute(query, [officeCode]);
      return results as any[];

    }
    // office Found failure.
    else throw new HttpException("Not found any officeCode, Please Enter Office Code", HttpStatus.NOT_FOUND);

  }

  async registerOffice(newOfficeData: CreateOfficeDto, officeCode: number | any): Promise<any> {
    const { addressLine1, addressLine2, city, country, phone, postalCode, state, territory } = newOfficeData;
    // find office already exist or not??
    // const Office = await this.officeRepository.findOne({ where: { officeCode } });
    // if (Office) {
    //   throw new HttpException("Office already exists", HttpStatus.CONFLICT)
    // }

    const query = ` SELECT *  FROM offices WHERE officeCode = ?`;

    const result = await this.officeRepository.query(query, [officeCode]);

    console.log("ssssssssssssssssssss");
    if (result.length > 0) {
      console.log("ssssssssssssssssssss");
      throw new ConflictException('Office already exists');
    }

    const que = `INSERT INTO offices (officeCode, addressLine1, addressLine2, city, country, phone, postalCode, state, territory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    // // createInstance & save at table.
    const result1 = this.officeRepository.query(que, [officeCode, addressLine1, addressLine2, city, country, phone, postalCode, state, territory])
    // const newOffice = this.officeRepository.create(newOfficeData);
    // this.officeRepository.save(newOffice);
    return {
      message: `Office Successfully Created & office code is ${officeCode}`,
    }

  }


  async updateUser(officeCode: number, updateOffice: UpdateOfficeDto) {
    if (!officeCode) {
      throw new HttpException("Please Provide officeCode", HttpStatus.BAD_REQUEST)
    }
    const Office = await this.officeRepository.findOne({ where: { officeCode } });
    // console.log(Office);
    if (!Office) {
      throw new HttpException("Not found any user", HttpStatus.NOT_FOUND);
    }
    await this.officeRepository.update(officeCode, updateOffice);
    const updatedUser = await this.officeRepository.findOne({ where: { officeCode } });

    return {
      message: "successfully updated user",
      updatedUser: updatedUser
    }
  }

}
