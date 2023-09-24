const NodeGeocoder = require('node-geocoder');
import {Location} from '../restaurants/schemas/restaurant.schema'
export default class ApiFeatures{
   static async getRestaurantLocations (address:string){
        try {
            const options = {
                provider: 'mapquest', 
                httpAdapter:'https',
                apiKey: '3Q0qNlhdd592VecrO6TvKjkJKZnVCVOV', // for Mapquest, OpenCage, Google Premier
                formatter: null  
              };

              const geocoder = NodeGeocoder(options);

              // Using callback
              const loc = await geocoder.geocode(address);
              const location:Location = {
                    type: 'Point',
                    coordinates: [loc[0].longitude, loc[0].latitude],
                    address: loc[0].formattedAddress,
                    city: loc[0].city,
                    state: loc[0].state,
                    zipcode: loc[0].zipcode,
                    country: loc[0].countryCode
              }
              return location
             
        } catch (error) {
            console.log(error)   
        }
    }
}