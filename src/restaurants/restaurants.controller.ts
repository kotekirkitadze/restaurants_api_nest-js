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
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiParam } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
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
  async getAllRestaurants(@Query() query: ExpressQuery): Promise<Restaurant[]> {
    return this.restaurant.findAll(query);
  }

  @Post()
  async createRestaurant(
    @Body() restaurant: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurant.createRestaurant(restaurant);
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
  async alternativeCreation(
    @Body() restaurant: CreateRestaurantDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Restaurant> {
    const createdImage = (await this.restaurant.createRestaurant(
      restaurant,
    )) as any;
    console.log(createdImage._id.toString());
    // return createdImage
    return this.restaurant.uploadImages(createdImage._id.toString(), files);
  }
}
