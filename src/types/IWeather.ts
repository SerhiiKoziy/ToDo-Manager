import IWeatherTemp from './IWeatherTemp';
import IPosition from './IPosition';

export default interface IWeather {
  clouds: number;
  deg: number;
  dt: number;
  humidity: number;
  pressure: number;
  speed: number;
  sunrise: number;
  sunset: number;
  temp: any;
  day: number;
  position: IPosition;
  weather: IWeatherTemp[];
}
