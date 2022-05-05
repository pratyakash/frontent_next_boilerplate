import { wrapper as store } from "../redux/store";

export const getTokenHeader = () => {
  return {
    "x-access-token": sessionManager.getToken(),
  };
};

/**
 *
 * @param {*} guarded guarded means we need to include the header for the requests that needs authentication. The open requests will need opr header instead
 *
 * @returns the header object with all the mandatory headers like token, json, and user header
 */

export const getMandatoryRequestHeaders = (guarded) => {
  const mandatoryTokenHeader = getTokenHeader();

  return guarded ? Object.assign({}, mandatoryTokenHeader) : Object.assign({}, mandatoryTokenHeader);
};

export const generateUniqueKey = (prefix) => {
  if (prefix) {
    return prefix + "_" + new Date().getTime().toString(36) + (new Date().getTime() + Math.floor(Math.random() * 100000)).toString(36);
  } else {
    return new Date().getTime().toString(36) + (new Date().getTime() + Math.floor(Math.random() * 100000)).toString(36);
  }
};

export const showLoader = () => {
  store.dispatch({
    type: LOADER_SHOW,
  });
};

export const killLoader = () => {
  store.dispatch({
    type: LOADER_HIDE,
  });
};
