import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  users: 'users',
  rokoks: 'rokoks',
  myRokok: 'myRokok'
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

export const login = (data) => callAPI(`${urls.users}/login`, 'post', {}, {}, data)

export const register = (data) => callAPI(`${urls.users}/registerUser`, 'post', {}, {}, data)

export const getAllRokok = () => callAPI(urls.rokoks, 'get')

export const getRokokById = (id) => callAPI(`${urls.rokoks}/detail/${id}`, 'get')

export const getUserById = (id) => callAPI(`${urls.users}/detail/${id}`, 'get')

export const getMyRokok = () => callAPI(urls.myRokok, 'get')

export const addMyRokok = (id) => callAPI(`${urls.myRokok}/add/${id}`, 'post')

export const deleteMyRokok = (id) => callAPI(`${urls.myRokok}/delete/${id}`, 'delete')

export const editProfile = (id, data) => callAPI(`${urls.users}/edit/${id}`, 'put', {}, {}, data)

export const deleteRokok = (id) => callAPI(`${urls.rokoks}/deleteRokok/${id}`, 'delete')

export const addStock = (id, data) => callAPI(`${urls.rokoks}/addStock/${id}`, 'patch', {}, {}, data)

export const midtransPayment = (id) => callAPI(`${urls.myRokok}/midtransToken/${id}`, 'post')

export const editStatus = (id) => callAPI(`${urls.myRokok}/status/${id}`, 'patch')

export const reduceStock = (id) => callAPI(`${urls.rokoks}/reduceStock/${id}`, 'patch')

export const addRokok = (data) => callAPI(`${urls.rokoks}/addRokok`, 'post', {}, {}, data)