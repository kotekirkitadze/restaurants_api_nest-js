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

  @Delete()
  async delete(@Body() payload) {
    return this.restaurant.deleteRest(payload);
  }
}
