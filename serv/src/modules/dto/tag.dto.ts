import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
    @ApiProperty({ example: '1', description: 'id' })
    id: number;

    @ApiProperty({ example: 'Seo', description: 'name for tag' })
    name: string;
}
