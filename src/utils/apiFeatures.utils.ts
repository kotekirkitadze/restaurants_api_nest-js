// eslint-disable-next-line @typescript-eslint/no-var-requires
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
    return new Promise((resolve) => {
      const s3 = new S3({
        accessKeyId: 'AKIA55YSQK4EGGVSIAXL',

        secretAccessKey: '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',
      });

      const images = [];

      files.forEach(async (file) => {
        const splitFile = file.originalname.split('.');
        const random = Date.now();

        const fileName = `${splitFile[0]}_${random}.${splitFile[1]}`;

        const params = {
          Bucket: 'restaurants-api/restaurants',
          Key: fileName,
          Body: file.buffer,
        };

        const uploadResponse = await s3.upload(params).promise();

        images.push(uploadResponse);

        if (images.length === files.length) {
          resolve(images);
        }
      });
    });
  }

  static async deleteImages(images) {
    const s3 = new S3({
      accessKeyId: 'AKIA55YSQK4EGGVSIAXL',

      secretAccessKey: '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',
    });

    const imagesKey = images.map((image) => ({ Key: image.key }));
    console.log(imagesKey);
    const params = {
      Bucket: 'restaurants-api',
      Delete: {
        Objects: imagesKey,
        Quiet: false,
      },
    };

    return new Promise((resolve, reject) => {
      s3.deleteObjects(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(false);
        } else {
          resolve(data);
        }
      });
    });
  }
}
