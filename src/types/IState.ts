import { RouterState } from "connected-react-router";

export default interface IState {
  user: object;
  data: any[];
  isLoading: boolean;
  router: RouterState;
}
