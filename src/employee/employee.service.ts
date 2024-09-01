import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.employeeCreateInput) {
    return this.dataBaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.dataBaseService.employee.findMany({
        where: {
          role,
        },
      });
    }
    return this.dataBaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.dataBaseService.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.employeeUpdateInput) {
    return this.dataBaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.dataBaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
