import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurant: RestaurantsService) {}

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurant.findAll();
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
    await this.restaurant.findById(id);
    const res = this.restaurant.deleteRestaurant(id);
    if (res)
      return {
        deleted: true,
      };
  }
}
