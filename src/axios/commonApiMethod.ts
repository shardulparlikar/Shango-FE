// src/services/api.ts
import axios from 'axios'
import type { Method, AxiosRequestConfig } from 'axios'

const api = axios.create({
    baseURL: 'https://api.develop.shangomyworld.com', // your backend URL
    timeout: 10000,
})

export function commonApiMethod(
    url: string,
    method: Method,
    data?: any,
    config?: AxiosRequestConfig
) {
    return api.request({
        url,
        method,
        data,
        ...config,
    })
}