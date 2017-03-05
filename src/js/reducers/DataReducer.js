import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function DataReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  const data = state.elements;
  switch (type) {

    case types.ADD_ELEMENT:

      let newDate = [payload, ...data];
      localStorage.setItem("LocalStorageTaskList", JSON.stringify(newDate));
      return {
        ...state,
        elements:newDate,
      };

    case types.DELETE_ELEMENT:
      let newDataAfterDel = data.map((item)=>{
        if(item.id !== payload){
          return item
        }
      }).filter( item => !!item);

      localStorage.setItem("LocalStorageTaskList", JSON.stringify(newDataAfterDel));
      return {
        ...state,
        elements: newDataAfterDel,
      };

    case types.UPDATE_DATA:

      return {
        ...state,
        elements: payload,
      };
    default:
      return state;
  }
}
