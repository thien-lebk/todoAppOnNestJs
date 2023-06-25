import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({
    required: false,
  })
  fullName: string;

  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    required: false,
  })
  photo: string;

  @ApiProperty({
    required: false,
  })
  modifiedPhoto: string;

  @ApiProperty({
    required: false,
  })
  address: string;
}
