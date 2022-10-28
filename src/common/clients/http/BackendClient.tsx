import axios, {AxiosError} from "axios";
import {BACKEND_BASE_URL} from '../../constants';
import axiosRetry, {isNetworkError} from "axios-retry";
import {getRefreshToken, getToken, setToken} from "../../../Auth/hooks/AuthHooks";

class BackendClient {
    constructor() {
        axiosRetry(axios, {
                retries: 3,
                retryDelay: axiosRetry.exponentialDelay,
                retryCondition: async (error) => {
                    return isNetworkError(error) || error.response.status >= 500 || error.response.status === 429
                }
            })
    }

    static isNetworkError = (error: AxiosError) =>
        error && // just to make sure
        !error.response && // if there is a response, it reached the server and not a network error
        error.code !== 'ECONNABORTED'; // check that it isn't a timeout

    async get<T>(request: string, queryParams: any = null, additionalHeaders: any = null, useRefreshToken: boolean = false, additionalConfig: any = null): Promise<T> {
        const { status, data } = await axios.get(`${BACKEND_BASE_URL}${request}`,
            {
                ...additionalConfig,
                headers: {'Authorization': `Bearer ${useRefreshToken ? getRefreshToken() : getToken()}`, ...additionalHeaders},
                params: queryParams
            })
        return data
    }

    async post<T, R>(request: string, queryParams: any = null, body: R | null = null, additionalHeaders: any = null, useRefreshToken: boolean = false): Promise<T> {
        const { status, data } = await axios.post(`${BACKEND_BASE_URL}${request}`,
            body,
            {headers: {'Authorization': `Bearer ${useRefreshToken ? getRefreshToken() : getToken()}`, ...additionalHeaders}, params: queryParams})
        return data
    }
}

export type RefreshTokenResponse = {
    token: string
}

export type LoginStatusResponseDto = {
    loggedIn: boolean,
    name: string
}

export const backendClient = new BackendClient()