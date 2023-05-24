import Axios from "@/utils/request";
import type {AxiosResponse} from "axios";

export const reviewerInfo = (response: (res: AxiosResponse) => any,
                             error: ((err: any) => any) | null = null,
                             final: (() => any) | null = null) => Axios.get('/reviewer/info')
    .then(res => response(res)).catch(err => error?.(err)).finally(final?.())

export const reviewerSwitch = (response: (res: AxiosResponse) => any,
                               error: ((err: any) => any) | null = null,
                               final: (() => any) | null = null) => Axios.get('/reviewer/switch')
    .then(res => response(res)).catch(err => error?.(err)).finally(final?.())

export const handlerInfo = (response: (res: AxiosResponse) => any,
                            error: ((err: any) => any) | null = null,
                            final: (() => any) | null = null) => Axios.get('/handler/info')
    .then(res => response(res)).catch(err => error?.(err)).finally(final?.())

export const handlerSwitch = (response: (res: AxiosResponse) => any,
                              error: ((err: any) => any) | null = null,
                              final: (() => any) | null = null) => Axios.get('/handler/switch')
    .then(res => response(res)).catch(err => error?.(err)).finally(final?.())

export const getKeywords = (response: (res: AxiosResponse) => any,
                            error: ((err: any) => any) | null = null,
                            final: (() => any) | null = null) => Axios.get('/reviewer/keyword')
    .then(res => response(res)).catch(err => error?.(err)).finally(final?.())

export const updateKeywords = (keywords: string,
                               response: (res: AxiosResponse) => any,
                               error: ((err: any) => any) | null = null,
                               final: (() => any) | null = null) =>
    Axios.get('/reviewer/keyword/update', {params: {keywords: keywords}})
        .then(res => response(res)).catch(err => error?.(err)).finally(final?.())

