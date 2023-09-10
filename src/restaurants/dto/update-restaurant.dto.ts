import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schemas/restaurant.schema';

export class UpdateRestaurantDto {
  @ApiProperty({
    description: 'The name of the restaurant',
    example: 'Restaurant 1',
  })
  readonly name: string;

  @ApiProperty({
    description: 'The description of the restaurant',
    example: 'description 1',
  })
  readonly description: string;
  readonly email: string;
  readonly phoneNo: number;
  readonly address: string;
  readonly category: Category;
}
