import * as actions from "../action-types/user.actions.type";

/**
 *
 */
const initialState = {
  type: actions.USER_INIT,
  user: undefined,
  users: undefined,
  recordsCount: 0,
};

/**
 *
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 *
 * @returns the new state.
 */
const userReducer = (state, action) => {
  if (!state || typeof action.type === "undefined") {
    return initialState;
  }

  if (action.data && typeof action.data === "object") {
    action.data.key = new Date();
  }

  switch (action.type) {
    case actions.USER_LIST_SUCCESS:
      return {
        user: state.user,
        users: action.data,
        type: action.type,
        recordsCount: action.recordsCount,
      };

    case actions.USER_GET_BY_ID_SUCCESS:
      return {
        user: state.user,
        users: action.data,
        type: action.type,
        recordsCount: state.recordsCount,
      };

    case actions.USER_SAVE_SUCCESS:
      return {
        user: action.data,
        users: state.users,
        type: action.type,
        recordsCount: state.recordsCount,
      };

    case actions.USER_UPDATE_PASSWORD_SUCCESS:
      return {
        user: action.data,
        users: state.users,
        type: action.type,
        recordsCount: state.recordsCount,
      };

    case actions.USER_DELETE_SUCCESS:
      return {
        user: state.data,
        users: state.users,
        type: action.type,
        recordsCount: state.recordsCount,
      };

    case actions.USER_INIT:
      return {
        user: state.user,
        users: state.users,
        type: action.type,
        recordsCount: state.recordsCount,
      };

    // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
    default:
      return {
        type: state.type,
        user: state.user,
        users: state.users,
        recordsCount: state.recordsCount,
      };
  }
};

export default userReducer;
