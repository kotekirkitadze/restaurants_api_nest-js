import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { Query } from 'express-serve-static-core';
// import { CreateCatDto } from './dto/create-cat.dto';
@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async findAll(query: Query): Promise<Restaurant[]> {
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const restaurants = await this.restaurantModel.find({ ...keyword });
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

  async updateRestaurant(id: string, restaurant: Restaurant) {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  async deleteRestaurant(id: string) {
    return await this.restaurantModel.findByIdAndDelete(id);
  }
}
