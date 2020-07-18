import { CurrentModelWithSelectedTrim, Model } from "../store/sagas";
import { RouterState } from "connected-react-router";

export default interface IState {
  models: Model[];
  user: object;
  data: any[];
  currentModel: CurrentModelWithSelectedTrim;
  isLoading: boolean;
  router: RouterState;
}
