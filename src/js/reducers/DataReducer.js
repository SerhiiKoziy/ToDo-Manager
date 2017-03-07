import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function DataReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  const data = state.elements;
  switch (type) {

    case types.ADD_ELEMENT:
      let newElements = [payload, ...data];
      localStorage.setItem("LocalStorageTaskList", JSON.stringify(newElements));
      return {
        ...state,
        elements:newElements,
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

    case types.UPDATE_ELEMENT:
      const filteredElements = state.elements.filter( element => {
        return element.id !== payload.id
      });

      localStorage.setItem("LocalStorageTaskList", JSON.stringify([...filteredElements, payload]));
      return {
        ...state,
        elements: [...filteredElements, payload],
      };

    case types.SET_DATA:
      return {
        ...state,
        elements: payload,
      };
    default:
      return state;
  }
}
