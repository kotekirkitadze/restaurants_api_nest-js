import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kotekirkitadze:omediakote@restaurantsapi.m5klyei.mongodb.net/?retryWrites=true&w=majority',
    ),
    RestaurantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
