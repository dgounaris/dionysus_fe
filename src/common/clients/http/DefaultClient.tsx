import axios from "axios";
import {BACKEND_BASE_URL} from '../../constants';

class DefaultClient {
    async get<T>(request: string, queryParams: any = null, additionalHeaders: any = null): Promise<T> {
        const { status, data } = await axios.get(`${BACKEND_BASE_URL}${request}`,
            {headers: {...additionalHeaders}, params: queryParams})
        if (status >= 400) {
            throw Error(`response ${status}, ${data}`)
        }
        return data
    }

    async post<T, R>(request: string, queryParams: any = null, body: R | null = null, additionalHeaders: any = null): Promise<T> {
        const { status, data } = await axios.post(`${BACKEND_BASE_URL}${request}`,
            body,
            {headers: {...additionalHeaders}, params: queryParams})
        if (status >= 400) {
            throw Error(`response ${status}, ${data}`)
        }
        return data
    }
}

export const defaultClient = new DefaultClient()