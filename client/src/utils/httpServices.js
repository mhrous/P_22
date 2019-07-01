import axios from "axios";
import { API_URL } from "../config";

const reduceRequest = config => {
  return axios(config)
    .then(({ data }) => Promise.resolve(data))
    .catch(error => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    });
};

const getJSON = (url, headers = {}) => {
  const config = {
    method: "GET",
    url: `${API_URL}${url}`,
    headers
  };
  return reduceRequest(config);
};

const postJSON = (url, data = {}, headers = {}) => {
  const config = {
    method: "POST",
    url: `${API_URL}${url}`,
    data,
    headers
  };
  return reduceRequest(config);
};

const putJSON = (url, data = {}, headers = {}) => {
  const config = {
    method: "PUT",
    url: `${API_URL}${url}`,
    data,
    headers
  };
  return reduceRequest(config);
};

const deleteJSON = (url, headers = {}) => {
  const config = {
    method: "DELETE",
    url: `${API_URL}${url}`,
    headers
  };
  return reduceRequest(config);
};

export { getJSON, postJSON, putJSON, deleteJSON };
