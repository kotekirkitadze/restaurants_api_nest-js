import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiParam } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/schema/user.schema';
@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurant: RestaurantsService) {}

  @Get()
  @ApiParam({
    name: 'keyword',
    required: false,
    description: 'Search restaurant by this keyword',
    type: String,
  })
  @ApiParam({
    name: 'page',
    required: false,
    description: 'page number',
    type: Number,
  })
  @UseGuards(AuthGuard())
  async getAllRestaurants(@Query() query: ExpressQuery): Promise<Restaurant[]> {
    return this.restaurant.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createRestaurant(
    @Body() restaurant: CreateRestaurantDto,
    @CurrentUser() user: User,
  ): Promise<Restaurant> {
    return this.restaurant.createRestaurant(restaurant, user);
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: string) {
    return this.restaurant.findById(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body() restaurant: UpdateRestaurantDto,
  ) {
    await this.restaurant.findById(id);
    return this.restaurant.updateRestaurant(id, restaurant);
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: string) {
    const res = await this.restaurant.findById(id);
    const isDeleted = await this.restaurant.deleteImages(res.images);

    if (isDeleted) {
      this.restaurant.deleteRestaurant(id);
      return {
        deleted: true,
      };
    } else {
      return {
        deleted: false,
      };
    }
  }

  @Put('upload/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    await this.restaurant.findById(id);
    const res = this.restaurant.uploadImages(id, files);
    return res;
  }

  @Post('alternativeCreation')
  @UseInterceptors(FilesInterceptor('images'))
  @UseGuards(AuthGuard())
  async alternativeCreation(
    @Body() restaurant: CreateRestaurantDto,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() user: User,
  ): Promise<Restaurant> {
    const createdImage = (await this.restaurant.createRestaurant(
      restaurant,
      user,
    )) as any;
    console.log(createdImage._id.toString());
    // return createdImage
    return this.restaurant.uploadImages(createdImage._id.toString(), files);
  }
}
