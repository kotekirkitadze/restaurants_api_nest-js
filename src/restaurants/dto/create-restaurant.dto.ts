import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schemas/restaurant.schema';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'The name of the restaurant',
    example: 'Test Restaurant',
  })
  readonly name: string;
  @ApiProperty({
    description: 'The description of the restaurant',
    example: 'Test description',
  })
  readonly description: string;
  @ApiProperty({
    description: 'The email of the restaurant',
    example: 'test@gmail.com',
  })
  readonly email: string;
  @ApiProperty({
    description: 'The phone number of the restaurant',
    example: '555555555',
  })
  readonly phoneNo: number;
  @ApiProperty({
    description: 'The address of the restaurant',
    example: 'Tbilisi, Georgia',
  })
  readonly address: string;
  @ApiProperty({
    enum: ['Fast Food', 'Cafe', 'Fine Dinning'],
    enumName: 'Category',
    description: 'The category of the restaurant',
    example: 'Cafe',
  })
  readonly category: Category;
}
