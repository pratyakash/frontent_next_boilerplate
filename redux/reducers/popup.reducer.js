import * as actions from "../action-types/popup.types";

const initialState = {
  type: actions.POPUP_INIT,
  popups: [],
  buttonClicked: undefined,
};

const popupReducer = (state, action) => {
  if (!state || typeof action.type === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case actions.POPUP_RAISE:
      const _popups_ = [...state.popups];

      _popups_.push({
        key: action.data.indexKey,
        type: action.data.popupType,
        message: action.data.message,
        title: action.data.title,
        data: action.data.data,
        element: action.data.element,
      });

      return {
        type: state.type,
        popups: _popups_,
        buttonClicked: undefined,
      };

    case actions.POPUP_HIDE:
      /* hide only the error matched with the key*/
      const _popups = [...state.popups];
      const popupIndex = _popups.findIndex((popup) => popup.key === action.data.indexKey);

      if (popupIndex > -1) {
        _popups.splice(popupIndex, 1);
      }

      return {
        type: state.type,
        popups: _popups,
        buttonClicked: action.data.optionClicked,
      };

    default:
      return { ...state };
  }
};

export default popupReducer;
