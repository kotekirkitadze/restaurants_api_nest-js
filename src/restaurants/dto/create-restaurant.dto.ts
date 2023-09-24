import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schemas/restaurant.schema';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';

export class CreateRestaurantDto {
  // @ApiProperty({
  //   description: 'The name of the restaurant',
  //   example: 'Test Restaurant',
  // })

  @IsNotEmpty()
  @IsString()
  readonly name: string;
  // @ApiProperty({
  //   description: 'The description of the restaurant',
  //   example: 'Test description',
  // })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  // @ApiProperty({
  //   description: 'The email of the restaurant',
  //   example: 'test@gmail.com',
  // })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email' })
  readonly email: string;
  // @ApiProperty({
  //   description: 'The phone number of the restaurant',
  //   example: '555555555',
  // })
  @IsNotEmpty()
  @IsPhoneNumber('GE')
  readonly phoneNo: number;
  // @ApiProperty({
  //   description: 'The address of the restaurant',
  //   example: 'Tbilisi, Georgia',
  // })

  @IsNotEmpty()
  @IsString()
  readonly address: string;
  // @ApiProperty({
  //   enum: ['Fast Food', 'Cafe', 'Fine Dinning'],
  //   enumName: 'Category',
  //   description: 'The category of the restaurant',
  //   example: 'Cafe',
  // })
  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;
}
