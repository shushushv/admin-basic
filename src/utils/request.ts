import axios, { AxiosRequestConfig, Canceler, Method } from 'axios';
import { assign, cloneDeep } from 'lodash';
import { message } from 'antd';
import { CANCEL_REQUEST_MESSAGE } from '../configs/constant';
import nProgress from 'nprogress';
const { parse, compile } = require("path-to-regexp");

declare global {
  interface Window {
    cancelRequest: Map<Symbol, {
      pathname: string;
      cancel: Canceler;
    }>;
  }
}

const { CancelToken } = axios;
window.cancelRequest = new Map();

interface IRequestParams {
  url: string;
  method: Method;
  data: any;
}

export default function request (params: IRequestParams) {
  let { url, data } = params;
  const options: AxiosRequestConfig = assign({}, params);
  const cloneData = cloneDeep(data);

  try {
    let domain = '';
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    const match = parse(url);
    url = compile(url)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domain + url
  } catch (e) {
    message.error(e.message);
  }

  options.params = cloneData;
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    });
  });

  // 顶部进度条
  nProgress.start();

  return axios(options).then(response => {
    const { status, statusText, data } = response;
    
    let result: any = {};
    if (typeof data === 'object') {
      result = data;
      if (Array.isArray(data)) {
        result.list = data;
      }
    } else {
      result.data = data;
    }

    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...result,
    });
  }).catch(error => {
    const { response, message } = error;

    if (String(message) === CANCEL_REQUEST_MESSAGE) {
      return {
        success: false,
      }
    }

    let msg;
    let statusCode;

    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message || 'Network Error';
    }

    return Promise.reject({
      success: false,
      statusCode,
      message: msg,
    });
  }).finally(() => {
    nProgress.done();
  });
}