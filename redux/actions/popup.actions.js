import { dispatchAction } from "./helper.actions";
import * as actionTypes from "../action-types/popup.types";
import { generateUniqueKey } from "../../utils";

/**
 *
 * @param {*} message
 * @param {*} title
 * @param {*} type enums.popupType
 */
export const raisePopup = (message, title, type, element, data) => (dispatch) => {
  dispatchAction(
    dispatch,
    actionTypes.POPUP_RAISE,
    {
      indexKey: generateUniqueKey("pop"),
      message,
      title,
      type,
      element,
      data,
    },
    undefined,
    undefined,
    0
  );
};

/**
 *
 * @param {*} optionClicked enums.popupButton
 */
export const popupClicked = (optionClicked, key) => (dispatch) => {
  dispatchAction(dispatch, actionTypes.POPUP_HIDE, { indexKey: key, optionClicked });
};
