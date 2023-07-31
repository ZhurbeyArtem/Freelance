import { ApiProperty } from "@nestjs/swagger";

export class NotificationDto {
  @ApiProperty({ example: 'Bob', description: 'First name' })
  message: string;

  @ApiProperty({ example: '1', description: 'job id' })
  jobId: number;
}

