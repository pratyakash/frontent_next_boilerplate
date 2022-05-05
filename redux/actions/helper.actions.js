import * as errorTypes from "../action-types/error.types";
import * as loaderTypes from "../action-types/loader.types";
import * as service from "../../utils/data.service";

/**
 *
 * @param {*} dispatch
 * @param {*} type
 * @param {*} data
 * @param {*} error
 * @param {*} message
 * @param {*} recordsCount
 */

export const dispatchAction = (dispatch, type, data, error, message, recordsCount) => {
  dispatch({
    type,
    message,
    data,
    error,
    recordsCount,
  });
};

export const simpleDispatch_get = async (dispatch, url, successType, showLoader, guarded = false) => {
  showLoader && dispatchAction(dispatch, loaderTypes.LOADER_SHOW, undefined, undefined, undefined, 0);

  try {
    const data = await getDataFromURL(dispatch, url, guarded);
    processPostRequest(dispatch, data, successType);
  } catch (error) {
    showError(dispatch, error);
    showLoader && dispatchAction(dispatch, loaderTypes.LOADER_HIDE, undefined, undefined, undefined, 0);
  }
};

export const simpleDispatch_post = async (dispatch, url, body, successType, showLoader) => {
  showLoader && dispatchAction(dispatch, loaderTypes.LOADER_SHOW, undefined, undefined, undefined, 0);

  try {
    const data = await postData(dispatch, url, body, notContentType);
    processPostRequest(dispatch, data, successType, notContentType);

    return data;
  } catch (error) {
    showError(dispatch, error);
    showLoader && dispatchAction(dispatch, loaderTypes.LOADER_HIDE, undefined, undefined, undefined, 0);
  }
};

export const simpleDispatch_put = async (dispatch, url, body, successType, showLoader) => {
  showLoader && dispatchAction(dispatch, loaderTypes.LOADER_SHOW, undefined, undefined, undefined, 0);

  try {
    const data = await putData(dispatch, url, body);
    processPutRequest(dispatch, data, successType);
  } catch (error) {
    showError(dispatch, error);
    showLoader && dispatchAction(dispatch, loaderTypes.LOADER_HIDE, undefined, undefined, undefined, 0);
  }
};

export const simpleDispatch_delete = async (dispatch, url, successType, showLoader) => {
  showLoader && dispatchAction(dispatch, loaderTypes.LOADER_SHOW, undefined, undefined, undefined, 0);

  try {
    const data = await deleteData(dispatch, url);
    processDeleteRequest(dispatch, data, successType);
  } catch (error) {
    showError(dispatch, error);
    showLoader && dispatchAction(dispatch, loaderTypes.LOADER_HIDE, undefined, undefined, undefined, 0);
  }
};

export const processPostRequest = (dispatch, data, successType) => {
  if (data && !data.errorMessage) {
    dispatchAction(dispatch, successType, data, undefined, data.message, data.recordsCount);
  } else {
    showError(dispatch, new Error(data.errorMessage));
  }

  dispatchAction(dispatch, loaderTypes.LOADER_HIDE, undefined, undefined, undefined, 0);
};

export const processPutRequest = (dispatch, data, successType) => {
  if (data && !data.errorMessage) {
    dispatchAction(dispatch, successType, data, undefined, data.message, data.recordsCount);
  } else {
    showError(dispatch, new Error(data.errorMessage));
  }

  dispatchAction(dispatch, loaderTypes.LOADER_HIDE, undefined, undefined, undefined, 0);
};

export const processDeleteRequest = (dispatch, data, successType) => {
  if (data && !data.errorMessage) {
    dispatchAction(dispatch, successType, data.data, undefined, data.message, data.recordsCount);
  } else {
    showError(dispatch, new Error(data.errorMessage));
  }

  dispatchAction(dispatch, loaderTypes.LOADER_HIDE, undefined, undefined, undefined, 0);
};

export const getDataFromURL = async (dispatch, url, guarded = false) => {
  let tempData = await service.get(url, guarded);
  return tempData;
};

export const postData = async (dispatch, url, body, notContentType) => {
  return await service.post(url, body, false, notContentType);
};

export const putData = async (dispatch, url, body) => {
  return await service.put(url, body, true);
};

export const deleteData = async (dispatch, url) => {
  return await service._delete(url, true);
};

export const showError = (dispatch, error) => {
  const uniqueKey = generateUniqueKey("err");

  dispatchAction(dispatch, errorTypes.ERROR_RAISE, { indexKey: uniqueKey }, error, undefined, 0);
};
