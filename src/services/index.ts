import request from '@utils/request';
import api, { IAPIList } from "./api";
import { Method } from 'axios';
import config from '@/configs/index';

const { apiPrefix } = config;

const gen = (params: string) => {
  let url = apiPrefix + params;
  let method: Method = 'GET';
  
  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    method = paramsArray[0] as any;
    url = apiPrefix + paramsArray[1];
  }
  
  return function (data: any) {
    return request({
      url,
      data,
      method
    })
  }
}

const APIFunction: any = {};

for (const key in api) {
  APIFunction[key] = gen(Reflect.get(api, key));
}

export default APIFunction as IAPIList;