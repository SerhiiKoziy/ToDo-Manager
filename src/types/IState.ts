import { RouterState } from 'connected-react-router';
import { IUserState } from '../store/user/reducer';
import { IEventsState } from '../store/events/reducer';

export default interface IState {
  user: IUserState;
  data: any[];
  events: IEventsState;
  isLoading: boolean;
  router: RouterState;
}
