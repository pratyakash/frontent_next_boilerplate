import * as util from "../src/utils";

const validateResponse = async (response) => {
  const promise = new Promise((resolve, reject) => {
    response.text().then((responseText) => {
      let responseData = undefined;
      try {
        responseData = JSON.parse(responseText);
      } catch {}

      if (!responseData) {
        return reject(new Error(responseText));
      }

      resolve(responseData);
    });
  });
  return await promise;
};

/**
 * This function will be used for retrieving the collection of objects. In real world, we show lot of data, for example, list of users, list of
 * payments etc etc, or, may be data for dropdowns
 *
 * @param {*} url
 * @param {*} postData
 * @param {*} isDropdownRequest
 * @param {*} dropdownSortFieldName
 */
export const getList = async (url, postData, isDropdownRequest, dropdownSortFieldName = "Name") => {
  const headers = util.getMandatoryRequestHeaders(true);

  // we are cloning the object
  let body = {};

  if (!postData || postData === {}) {
    // let's initialize with default values
    body = {
      where: [],
      order: [],
      pageIndex: 0,
    };
  } else {
    body = JSON.parse(JSON.stringify(postData));
  }

  // if 'where' is not defined, then let's add a default where with Active = 1
  if (!(body.where && Array.isArray(body.where) && body.where.length > 0)) {
    body.where = [
      {
        Active: 1,
      },
    ];
  }

  // if 'order' is not defined, let's send a blank one
  if (!(body.order && Array.isArray(body.order) && body.order.length > 0)) {
    body.order = [];
  }

  // if 'page index' is not definied, let's show the first page
  if (!(body.pageIndex && body.pageIndex > 0)) body.pageIndex = 0;

  // for dropdown data, we will be sending a specific format so the server can identify that we are requesting
  // a dropdown data. Obviously, we don't
  if (isDropdownRequest) {
    body.rowsToReturn = 10000;
    body.NameField = dropdownSortFieldName;
    body.order = [dropdownSortFieldName];
  }

  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(url, requestOptions);

  const data = await validateResponse(response);

  // check if the request was successfull from it
  if (data.success === true) {
    // the response was successfull

    // we should return the json back to the action.
    return data;
  } else {
    console.warn(`faulty data received from the server: `, data, url);
    throw util.generateError(data.message, data.code, "Invalid request");
  }
};

const post_override = async (url, requestOptions) => {
  const response = await fetch(url, requestOptions);
  const data = await validateResponse(response);

  // check if the request was successfull from it
  if (data.success === true) {
    // the response was successfull
    // we should return the json back to the action.
    return data;
  } else {
    console.warn(`faulty data received from the server: `, data, url);
    throw util.generateError(data.message, data.code, "Invalid request");
  }
};

/**
 * @param {String} url url to save the data to
 * @param {String} body the data to be saved
 * @param {Boolean} guarded mostly true, it will mean that we will need to include the auth token from session manager. If false, means it's a request where we don't need auth, for example, forgot password or register
 */
export const post = async (url, body, guarded) => {
  const requestOptions = {
    method: "POST",
    headers: await util.getMandatoryRequestHeaders(guarded),
    body: JSON.stringify(body),
  };

  return await post_override(url, requestOptions);
};

export const _delete = async (url, guarded) => {
  const requestOptions = {
    method: "DELETE",
    headers: await util.getMandatoryRequestHeaders(guarded),
  };

  const response = await fetch(url, requestOptions);
  const data = await validateResponse(response);

  // check if the request was successfull from it
  if (data.success === true) {
    // the response was successfull
    // we should return the json back to the action.
    return data;
  } else {
    console.warn(`faulty data received from the server: `, data);
    throw util.generateError(data.message, data.code, "Invalid request");
  }
};

/**
 * @param {String} url url to save the data to
 * @param {String} body the data to be saved
 * @param {Boolean} guarded mostly true, it will mean that we will need to include the auth token from session manager. If false, means it's a request where we don't need auth, for example, forgot password or register
 */
export const put = async (url, body, guarded) => {
  const requestOptions = {
    method: "PUT",
    headers: await util.getMandatoryRequestHeaders(guarded),
    body: JSON.stringify(body),
  };

  return await post_override(url, requestOptions);
};

export const get = async (url, guarded) => {
  const requestOptions = {
    method: "GET",
    headers: await util.getMandatoryRequestHeaders(true),
  };

  const response = await fetch(url, requestOptions);
  const data = await validateResponse(response);

  if (data) {
    return data;
  } else {
    console.warn(`faulty data received from the server: `, data, url, requestOptions);
    throw util.generateError(data.message, data.code, "Invalid request");
  }
};
