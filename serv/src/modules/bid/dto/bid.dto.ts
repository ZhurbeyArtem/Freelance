import { ApiProperty } from '@nestjs/swagger';

export class BidDto {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  id: number;

  @ApiProperty({
    example: 'createJob unique design. with adaptive',
    description: 'description',
  })
  description: string;

  @ApiProperty({ example: '10$', description: 'Price' })
  price: string;

  @ApiProperty({ example: 'isApproved', description: 'true' })
  isApproved: boolean;

  @ApiProperty({ example: '1', description: 'job id' })
  jobId: number;
}
