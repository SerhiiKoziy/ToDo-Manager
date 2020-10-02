
export const START_FETCHING = "START_FETCHING";
export const STOP_FETCHING = "STOP_FETCHING";

const loadingReducer = (state: boolean = true, { type }: { type: string }) => {
  switch (type) {
    case START_FETCHING:
      return true;

    case STOP_FETCHING:
      return false;

    default:
      return state;
  }
};

export default loadingReducer;
