import axios from "axios";
import {BACKEND_BASE_URL} from '../../constants';

class BackendClient {
    async get<T>(request: string, queryParams: any = null, additionalHeaders: any = null): Promise<T> {
        const { status, data } = await axios.get(`${BACKEND_BASE_URL}${request}`,
            {headers: {'Authorization': `Bearer ${BackendClient.getJwtToken()}`, ...additionalHeaders}, params: queryParams})
        if (status >= 400) {
            throw Error(`response ${status}, ${data}`)
        }
        return data
    }

    async post<T, R>(request: string, queryParams: any = null, body: R | null = null, additionalHeaders: any = null): Promise<T> {
        const { status, data } = await axios.post(`${BACKEND_BASE_URL}${request}`,
            body,
            {headers: {'Authorization': `Bearer ${BackendClient.getJwtToken()}`, ...additionalHeaders}, params: queryParams})
        if (status >= 400) {
            throw Error(`response ${status}, ${data}`)
        }
        return data
    }

    setJwtToken(token: string) {
        localStorage.setItem("dionysus_jwt_token", token)
    }

    private static getJwtToken(): string | null {
        return localStorage.getItem("dionysus_jwt_token")
    }
}

export const backendClient = new BackendClient()