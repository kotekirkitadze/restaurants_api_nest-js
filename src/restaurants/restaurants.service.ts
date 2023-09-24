import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { Query } from 'express-serve-static-core';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import ApiFeatures from '../utils/apiFeatures.utils';
// import { CreateCatDto } from './dto/create-cat.dto';
@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async findAll(query: Query): Promise<Restaurant[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const restaurants = await this.restaurantModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);

    return restaurants;
  }

  async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    const location = await ApiFeatures.getRestaurantLocations(
      restaurant.address,
    );
    return this.restaurantModel.create(Object.assign(restaurant, { location }));
  }

  async findById(id: string): Promise<Restaurant> {
    const restaurant = this.restaurantModel.findById(id);
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException(
        'Wrong Mongose ID, Please provide correct id',
      );
    }
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  async updateRestaurant(id: string, restaurant: UpdateRestaurantDto) {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  async deleteRestaurant(id: string) {
    return await this.restaurantModel.findByIdAndDelete(id);
  }

  async uploadImages(id, files) {
    const images = await ApiFeatures.upload(files);
    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      id,
      {
        images: images,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return restaurant;
  }

  async deleteImages(images) {
    if (!images.length) return true;
    return await ApiFeatures.deleteImages(images);
  }
}
