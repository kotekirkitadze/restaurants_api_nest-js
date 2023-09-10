import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
// import { CreateCatDto } from './dto/create-cat.dto';
@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel.find();
    return restaurants;
  }

  async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    return this.restaurantModel.create(restaurant);
  }

  async findById(id: string): Promise<Restaurant> {
    const restaurant = this.restaurantModel.findById(id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  async deleteRest(payload: { _id: string }) {
    return this.restaurantModel.deleteOne(payload);
  }
}
