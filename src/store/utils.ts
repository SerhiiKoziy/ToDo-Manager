
interface IAction {
  type: string;
  payload?: any;
}

export const actionFactory = (actionType: any, value?: any): IAction => {
  const action: IAction = { type: actionType };


  if (typeof value !== 'undefined') {
    action.payload = value;
  }

  return action;
};

const transformReducer = (reducerAsObject: any, getDefaultState: any): any => {
  const actionsHandlers = new Map();

  Object.entries(reducerAsObject).forEach(([type, actionHandler]) => {
    // transform the original reducer's object for future using as trivial action creator
    reducerAsObject[type] = (payload: any) => ({ type, payload });

    actionsHandlers.set(type, actionHandler);
  });

  return function reducer(state = getDefaultState() || {}, action: any) {
    const actionHandler = actionsHandlers.get(action.type);

    let updatedState = null;
    if (typeof actionHandler === 'function') {
      const hasNotPayloadParameter = actionHandler.length === 1;
      updatedState = hasNotPayloadParameter ?
        actionHandler(state) :
        actionHandler(action.payload, state);
    }

    return updatedState || state;
  };
};


export const reducersSet: any = {};

export const registerReducer = (statePartName: string, reducer: any, getDefaultState: any): any => {
  reducersSet[statePartName] = transformReducer(reducer, getDefaultState);
};
