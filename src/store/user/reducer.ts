import IUserMeta from '../../types/IUserMeta'

export interface IUserState {
  userMeta: IUserMeta | null;
  isLoading: boolean;
}

export const UPDATE_USER_META = "UPDATE_USER_META";

export const userReducer = (state: object = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USER_META:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default userReducer;
