import IPosition from './IPosition';
import IWeather from './IWeather';

export default interface IEvent {
  title: string;
  uid: string;
  id: number;
  address: string;
  createdAt: number;
  date: string;
  day: number;
  daysToDate: number;
  description: string;
  eventId: string;
  position: IPosition;
  stageProces: string;
  updatedAt: number;
  weather: IWeather;
  taskId?: string;
}
