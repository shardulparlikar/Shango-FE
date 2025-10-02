// src/services/api.ts
import axios from 'axios'
import type { Method, AxiosRequestConfig } from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN, // your backend URL
    timeout: 10000,
})


// Return type: Promise generic
export type ApiResponse<T = any> = Promise<T>;

export function commonApiMethod(
    url: string,
    method: Method,
    data?: any,
    config?: AxiosRequestConfig
): ApiResponse {
    return api.request({
        url,
        method,
        data,
        ...config,
    })
}