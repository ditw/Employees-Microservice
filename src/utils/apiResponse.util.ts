import { ApiProperty } from '@nestjs/swagger';

export abstract class ApiResponse<T> {
  @ApiProperty({ description: 'http status code' })
  statusCode: number;

  @ApiProperty({ description: 'API response message' })
  message: string;

  @ApiProperty({ description: 'API payload' })
  data: T;
}
