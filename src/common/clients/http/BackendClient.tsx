import axios from "axios";
import {BACKEND_BASE_URL} from '../../../constants';

class BackendClient {
    async get<T>(request: string, queryParams: any, additionalHeaders: any): Promise<T> {
        return await axios.get(`${BACKEND_BASE_URL}/v1/playlists/tracks`,
            {headers: {'Authorization': `Bearer ${BackendClient.getJwtToken()}`, ...additionalHeaders}, params: queryParams})
    }

    async post<T, R>(request: string, queryParams: any, body: R, additionalHeaders: any): Promise<T> {
        return await axios.post(`${BACKEND_BASE_URL}/v1/playlists/tracks`,
            body,
            {headers: {'Authorization': `Bearer ${BackendClient.getJwtToken()}`, ...additionalHeaders}, params: queryParams})
    }

    static setJwtToken(token: string) {
        localStorage.setItem("dionysus_jwt_token", token)
    }

    private static getJwtToken(): string | null {
        return localStorage.getItem("dionysus_jwt_token")
    }
}