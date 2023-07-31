import { ApiProperty } from '@nestjs/swagger';

export class approveBidDto {
  @ApiProperty({ example: '1', description: 'Unique id' })
  id: number;

  @ApiProperty({ example: '1', description: 'id of job' })
  jobId: number;
}