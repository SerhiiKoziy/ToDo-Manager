import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';

export const bindActions = <A, M extends ActionCreatorsMapObject<A>>(actionCreators: M) => (dispatch: Dispatch) => (
  bindActionCreators(actionCreators, dispatch)
);
