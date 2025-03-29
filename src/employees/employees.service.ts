import { Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.currency = 'USD';
    return await this.employeeRepository.save(createEmployeeDto);
  }

  async findAll() {
    return await this.employeeRepository.find({
      where: { isActive: true, isDeleted: false, isArchived: false },
    });    
  }

  async findOne(id: number) {
    return await this.employeeRepository.findOne({
      where: { id, isActive: true, isDeleted: false, isArchived: false },
    });
  }

  async getAgregationForAll() { 
    const result = await this.employeeRepository
    .createQueryBuilder('employees')
    .select('MIN(employees.salary)', 'minSalary')
    .addSelect('AVG(employees.salary)', 'meanSalary')
    .addSelect('MAX(employees.salary)', 'maxSalary')
    .addSelect('COUNT(*)', 'total')
    .where(`employees.isActive = :active AND employees.isDeleted = :deleted AND employees.isArchived = :archived`, 
    { active: true, deleted: false, archived: false })
    .andWhere(`DATE_PART('year', employees.createDateTime) = :year`, { year:  (new Date()).getFullYear() })
    .getRawOne();  

    return result; 
  }  

  async getAgregationForOnContractEmpoyees() { 
    const result = await this.employeeRepository
    .createQueryBuilder('employees')
    .select('MIN(employees.salary)', 'minSalary')
    .addSelect('AVG(employees.salary)', 'meanSalary')
    .addSelect('MAX(employees.salary)', 'maxSalary')
    .addSelect('COUNT(*)', 'total')
    .where(`employees.isActive = :active AND employees.isDeleted = :deleted AND 
    employees.isArchived = :archived AND employees.on_contract = :onContract`, 
    { active: true, deleted: false, archived: false, onContract: true })
    .andWhere(`DATE_PART('year', employees.createDateTime) = :year`, { year:  (new Date()).getFullYear() })
    .getRawOne();  

    return result; 
  } 

  async getAgregationByDepartmentForAllEmpoyees() { 
    const result = await this.employeeRepository
    .createQueryBuilder('employees')
    .select('TRIM(employees.department)', 'departmentName')
    .addSelect('MIN(employees.salary)', 'minSalary')
    .addSelect('AVG(employees.salary)', 'meanSalary')
    .addSelect('MAX(employees.salary)', 'maxSalary')
    .addSelect('COUNT(*)', 'total')
    .where(`employees.isActive = :active AND employees.isDeleted = :deleted AND 
    employees.isArchived = :archived`, 
    { active: true, deleted: false, archived: false })
    .andWhere(`DATE_PART('year', employees.createDateTime) = :year`, { year:  (new Date()).getFullYear() })
    .groupBy("TRIM(employees.department)")
    .getRawMany();  

    return result; 
  } 
  
  async getAgregationByMixingAllDepartmentAndSubDepartmentComboForAllEmpoyees() { 
    const result = await this.employeeRepository
    .createQueryBuilder('employees')
    .select('TRIM(employees.department)', 'departmentName')
    .addSelect('TRIM(employees.sub_department)', 'subDepartmentName')
    .addSelect('MIN(employees.salary)', 'minSalary')
    .addSelect('AVG(employees.salary)', 'meanSalary')
    .addSelect('MAX(employees.salary)', 'maxSalary')
    .addSelect('COUNT(*)', 'total')
    .where(`employees.isActive = :active AND employees.isDeleted = :deleted AND 
    employees.isArchived = :archived`, 
    { active: true, deleted: false, archived: false })
    .andWhere(`DATE_PART('year', employees.createDateTime) = :year`, { year:  (new Date()).getFullYear() })
    .groupBy("TRIM(employees.department), TRIM(employees.sub_department)")
    .getRawMany();  

    return result; 
  } 
  
  /**
   * Another option is to use EntityManager and one global union query to get all results rather than using 2 await requests
   * Repository is used here to keep the endpoints consolidated
   * @returns APIResponse
   */
  async getAgregationByDepartmentAndSubDepartmentComboForAllEmpoyees() { 
    const departments = await this.employeeRepository
    .createQueryBuilder('employees')
    .select('TRIM(employees.department)', 'departmentsubDepartmetName')
    .addSelect('MIN(employees.salary)', 'minSalary')
    .addSelect('AVG(employees.salary)', 'meanSalary')
    .addSelect('MAX(employees.salary)', 'maxSalary')
    .addSelect('COUNT(*)', 'total')
    .where(`employees.isActive = :active AND employees.isDeleted = :deleted AND 
    employees.isArchived = :archived`, 
    { active: true, deleted: false, archived: false })
    .andWhere(`DATE_PART('year', employees.createDateTime) = :year`, { year:  (new Date()).getFullYear() })
    .groupBy("TRIM(employees.department)")
    .getRawMany();  

    const sub_departments = await this.employeeRepository
    .createQueryBuilder('employees')
    .select('TRIM(employees.sub_department)', 'departmentsubDepartmetName')
    .addSelect('MIN(employees.salary)', 'minSalary')
    .addSelect('AVG(employees.salary)', 'meanSalary')
    .addSelect('MAX(employees.salary)', 'maxSalary')
    .addSelect('COUNT(*)', 'total')
    .where(`employees.isActive = :active AND employees.isDeleted = :deleted AND 
    employees.isArchived = :archived`, 
    { active: true, deleted: false, archived: false })
    .andWhere(`DATE_PART('year', employees.createDateTime) = :year`, { year:  (new Date()).getFullYear() })
    .groupBy("TRIM(employees.sub_department)")
    .getRawMany(); 

    return Promise.all([...departments, ...sub_departments]); 
  } 

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeeRepository.update(id, updateEmployeeDto);
  }

  async delete(id: number) {
    return await this.employeeRepository.delete(id);
  }
}
