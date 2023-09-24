const NodeGeocoder = require('node-geocoder');
import { S3 } from 'aws-sdk';
import { Location } from '../restaurants/schemas/restaurant.schema';
export default class ApiFeatures {
  static async getRestaurantLocations(address: string) {
    try {
      const options = {
        provider: 'mapquest',
        httpAdapter: 'https',
        apiKey: '3Q0qNlhdd592VecrO6TvKjkJKZnVCVOV', // for Mapquest, OpenCage, Google Premier
        formatter: null,
      };

      const geocoder = NodeGeocoder(options);

      // Using callback
      const loc = await geocoder.geocode(address);
      const location: Location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        address: loc[0].formattedAddress,
        city: loc[0].city,
        state: loc[0].state,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
      };
      return location;
    } catch (error) {
      console.log(error);
    }
  }

  static async upload(files) {
    return new Promise((resolve, reject) => {
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: files[0].originalname,
        Body: files[0].buffer,
      };
    });
  }
}
