import {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { axios } from './Axios';

export type RequestParamsType = QueryParams | URLSearchParams;
export type RequestPayloadDataType = RequestParamsType | FormData;

export interface QueryParams {
    [param: string]: string | boolean | number | null;
}


export abstract class HttpService {
  protected static async makeGet<T>(
    url: string,
    params: RequestParamsType = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return axios.get<T>(url, {
      ...config,
      params
    });
  }

  protected static async makePost<T, P>(
    url: string,
    data: RequestPayloadDataType | P,
    params: RequestParamsType = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return axios.post<T>(url, data, {
      ...config,
      params
    });
  }
}
