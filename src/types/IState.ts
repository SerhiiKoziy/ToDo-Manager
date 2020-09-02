import { RouterState } from "connected-react-router";
import { IUserState } from "../store/user/reducer";

export default interface IState {
  user: IUserState;
  data: any[];
  isLoading: boolean;
  router: RouterState;
}
