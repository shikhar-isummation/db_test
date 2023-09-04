import { Controller, Get, Delete, Param, HttpStatus, HttpException, Post, Body, Patch, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OfficeService } from './office.service';
import { Office } from '../typeorm/office.entity';
import { CreateOfficeDto } from './dto/Create.User.dto';
import { UpdateOfficeDto } from './dto/Update.User.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/role.guard';
import { CONSTANTS } from 'src/constants';

@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) { }

  @UseGuards(JwtAuthGuard, new RoleGuard([CONSTANTS.ROLES.CEO]))
  @Get()
  async findAll(): Promise<Office[]> {
    return this.officeService.getAllOffices();
  }

  @UseGuards(JwtAuthGuard, new RoleGuard([CONSTANTS.ROLES.CEO]))
  @Delete(':officeCode')
  async deleteOffice(@Param('officeCode') officeCode: number | any): Promise<{ message: string }> {
    await this.officeService.deleteOffice(officeCode);

    return { message: 'Office deleted successfully' };
  }

  @UseGuards(JwtAuthGuard, new RoleGuard([CONSTANTS.ROLES.MANAGER, CONSTANTS.ROLES.CEO]))
  @Get(':officeCode')
  async searchUserById(@Param('officeCode') officeCode: number): Promise<Office | any> {
    return this.officeService.findOfficeById(officeCode);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard([CONSTANTS.ROLES.CEO]))
  @Post()
  registerOffice(@Body() createOffice: CreateOfficeDto): Promise<any> {
    return this.officeService.registerOffice(createOffice, createOffice.officeCode);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard([CONSTANTS.ROLES.CEO, CONSTANTS.ROLES.MANAGER]))
  @Patch(":officeCode")
  updateOffice(@Body() updateoffice: UpdateOfficeDto, @Param('officeCode') officeCode: number | any): Promise<any> {
    return this.officeService.updateUser(officeCode, updateoffice);
  }

}
