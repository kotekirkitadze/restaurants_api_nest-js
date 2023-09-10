import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { RestaurantService } from './restaurant/restaurant.service';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/nest'), RestaurantsModule],
  controllers: [AppController],
  providers: [AppService, RestaurantService],
})
export class AppModule {}
