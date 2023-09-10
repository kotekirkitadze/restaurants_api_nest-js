import { Body, Controller, Get, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurant: RestaurantsService) {}

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurant.findAll();
  }

  @Post()
  async createRestaurant(@Body() restaurant): Promise<Restaurant> {
    return this.restaurant.createRestaurant(restaurant);
  }
}
