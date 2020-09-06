import IWeatherTemp from './IWeatherTemp';

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
  weather: IWeatherTemp[];
}
