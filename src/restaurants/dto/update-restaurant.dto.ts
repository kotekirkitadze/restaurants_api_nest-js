import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schemas/restaurant.schema';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class UpdateRestaurantDto {
  @ApiProperty({
    description: 'The name of the restaurant',
    example: 'Test Restaurant',
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    description: 'The description of the restaurant',
    example: 'Test description',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'The email of the restaurant',
    example: 'test@gmail.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email' })
  readonly email?: string;

  @ApiProperty({
    description: 'The phone number of the restaurant',
    example: '555555555',
  })
  @IsOptional()
  @IsPhoneNumber('GE')
  readonly phoneNo?: number;

  @ApiProperty({
    description: 'The address of the restaurant',
    example: 'Tbilisi, Georgia',
  })
  @IsOptional()
  @IsString()
  readonly address?: string;

  @ApiProperty({
    enum: ['Fast Food', 'Cafe', 'Fine Dinning'],
    enumName: 'Category',
    description: 'The category of the restaurant',
    example: 'Cafe',
  })
  @IsOptional()
  @IsEnum(Category)
  readonly category?: Category;
}
