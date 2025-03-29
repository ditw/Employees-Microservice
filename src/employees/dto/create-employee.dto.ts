import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsPositive,
  IsOptional,
  IsBoolean,
  IsDecimal,
  Max,
} from 'class-validator';

export class CreateEmployeeDto
{
  @ApiProperty({ description: 'Employee Name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Salary' })
  @IsDecimal()
  @IsNotEmpty()
  @IsPositive()
  readonly salary: number;

  @ApiProperty({ description: 'Currency', readOnly: true })
  @IsNotEmpty()
  @IsString()
  @Max(3)
  currency: string = 'USD';
  
  @ApiProperty({ description: 'Department' })
  @IsString()
  @IsNotEmpty()
  readonly department: string;

  @ApiProperty({ description: 'Sub Department' })
  @IsString()
  @IsOptional()
  readonly sub_department: string;

  @ApiProperty({ description: 'On Contract' })
  @IsOptional()
  @IsBoolean()
  on_contract: boolean;
}
