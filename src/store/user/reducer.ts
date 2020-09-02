import IUserMeta from '../../types/IUserMeta'

export interface IUserState {
  userMeta: IUserMeta | null;
  isLoading: boolean;
}

export const UPDATE_USER_META = "UPDATE_USER_META";
export const DELETE_USER = "DELETE_USER";

export const userReducer = (state: object = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USER_META:
      return {
        ...state,
        ...payload,
      };

    case DELETE_USER:
      return {
        ...state,
        userMeta: {},
      };

    default:
      return state;
  }
};
