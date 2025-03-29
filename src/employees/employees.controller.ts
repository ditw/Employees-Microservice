import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse, EResponseTypes, ApiSwaggerDocResponse} from 'src/utils';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiExtraModels(ApiResponse)
@ApiTags('Employees')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  
  @Post('createEmployee')
  @ApiOperation({
    description: 'Create a new employee. Assuming that the currency is USD (read-only)',
  })
  @ApiSwaggerDocResponse(
    CreateEmployeeDto,
    EResponseTypes.OBJECT,
  )
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try{
      const data = await this.employeesService.create(createEmployeeDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'success',
        data,
      };
    }catch(err){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Request error ${err}`,
      }, HttpStatus.BAD_REQUEST, {
        cause: err
      });       
    }
  }

  @ApiOperation({
    description: 'Get all employees list.',
  })
  @Get()
  @ApiSwaggerDocResponse(
    CreateEmployeeDto,
    EResponseTypes.ARRAY,
  )
  async findAll() {
    try{
      const data = await this.employeesService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data,
      };   
    }catch(err){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Server error`,
      }, HttpStatus.BAD_REQUEST, {
        cause: err
      });
    }
  }

  @ApiOperation({
    description: 'Get employee by reference id.',
  })
  @Get(':id')
  @ApiSwaggerDocResponse(
    CreateEmployeeDto,
    EResponseTypes.OBJECT,
  )
  async findOne(@Param('id') id: number) {
    try{
      const data = await this.employeesService.findOne(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data,
      };
    }catch(err){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Server error for employee id ${id}`,
      }, HttpStatus.BAD_REQUEST, {
        cause: err
      });
    }
  }

  @ApiOperation({
    description: 'Get agregations for all.',
  })
  @Get('getAgregations/all')
  async getAgregationForAll() {
    try{
      const data = await this.employeesService.getAgregationForAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data,
      };
    }catch(err){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Request error ${err}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: err
      });       
    }   
  }

  @ApiOperation({
    description: 'Get agregations for eployees that are on contract.',
  })
  @Get('getAgregations/onContract')
  async getAgregationForOnContractEmpoyees() {
    try{
      const data = await this.employeesService.getAgregationForOnContractEmpoyees();
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data,
      };
    }catch(err){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Request error ${err}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: err
      });       
    }   
  }

  @ApiOperation({
    description: 'Get aggregations for employees by department.',
  })
  @Get('getAgregations/byDepartment')
  async getAgregationByDepartmentForAllEmpoyees() {
    try{
      const data = await this.employeesService.getAgregationByDepartmentForAllEmpoyees();
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data,
      };
    }catch(err){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Request error ${err}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: err
      });       
    }   
  }

  /**
   * 
   * @returns APIResponse
   * Extra endpoint (based on the understanding of the question) to get all potential values by mizing the department 
   * and sub departments together, some sub-departments are common in terms of name for multiple department
   */
  @ApiOperation({
    description: 'Get aggregations for employees by mixing department and sub department.',
  })
  @Get('getAgregations/byMixAllDepartmentAndSubDepartment')
  async getAgregationByMixingAllDepartmentAndSubDepartmentComboForAllEmpoyees() {
    try{
      const data = await this.employeesService.getAgregationByMixingAllDepartmentAndSubDepartmentComboForAllEmpoyees();
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data,
      };
    }catch(err){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Request error ${err}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: err
      });       
    }   
  }

  @ApiOperation({
    description: 'Get aggregations for employees by department and sub department.',
  })
  @Get('getAgregations/byDepartmentAndSubDepartment')
  async getAgregationByDepartmentAndSubDepartmentComboForAllEmpoyees() {
    try{
      const data = await this.employeesService.getAgregationByDepartmentAndSubDepartmentComboForAllEmpoyees();
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data,
      };
    }catch(err){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Request error ${err}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: err
      });       
    }   
  }

  /**
   * Not required for the solution
   * @param updateEmployeeDto
   * @returns APIResponse
   */
  @ApiExcludeEndpoint()
  @ApiOperation({
    description: 'Update an existing employee. Assuming that the currency is USD (read-only)',
  })
  @Patch(':id')
  async update(
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try{
    const data = await this.employeesService.update(
      +updateEmployeeDto.id,
      updateEmployeeDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data,
    };
  }catch(err){
    throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: `Request error for data ${updateEmployeeDto}`,
    }, HttpStatus.BAD_REQUEST, {
      cause: err
    });    
  }
  }

  @ApiOperation({
    description: 'Delete employee by id',
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try{
      const employee = await this.employeesService.findOne(+id);
      if(!employee || ! (employee).id){
        throw new HttpException(
          `Request not found for employee id ${id}`,
          HttpStatus.NOT_FOUND
        );       
      }
      const data = await this.employeesService.delete(+id);
      return {
        statusCode: HttpStatus.OK,
        message:'success',
        data,
      };
    }catch(err){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Request error for employee id ${id}`,
      }, HttpStatus.BAD_REQUEST, {
        cause: err
      });
    }
  }
}
