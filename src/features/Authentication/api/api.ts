import axios from 'axios';
import { Profile } from 'store';

export class AuthService {
    static ITEM = 'accessToken';
    private accessToken: string | null = null;
    error: string | null = null;

    constructor() {
        const tokenFromStorage = localStorage.getItem(AuthService.ITEM);
        if (tokenFromStorage) {
            this.accessToken = JSON.parse(tokenFromStorage);
        }
    }

    setToken(token?: string) {
        if (token) {
            this.accessToken = token;
            localStorage.setItem(AuthService.ITEM, JSON.stringify(token));
        } else {
            localStorage.removeItem(AuthService.ITEM);
            this.accessToken = null;
        }
    }

    async authenticate({
        username,
        password,
    }: {
        username: string;
        password: string;
    }): Promise<Profile | void> {
        this.setToken();
        return axios
            .post<
                unknown,
                {
                    data: Profile;
                }
            >('https://dummyjson.com/auth/login', {
                username,
                password,
            })
            .then(({ data }) => {
                this.setToken(data.token);
                return data;
            });
    }
}
