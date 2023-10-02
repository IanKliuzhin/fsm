import axios from 'axios';

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

    async checkAuth(): Promise<boolean> {
        if (this.accessToken) {
            console.log('this.accessToken', this.accessToken);
            return axios
                .get('https://api.escuelajs.co/api/v1/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                })
                .then((response) => {
                    console.log('checkAuth response', response);
                    return true;
                })
                .catch((err) => {
                    console.error(err);
                    return false;
                });
        } else return false;
    }

    async authenticate({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        this.setToken();
        return axios
            .post<
                unknown,
                {
                    data: {
                        access_token: string;
                    };
                }
            >('https://api.escuelajs.co/api/v1/auth/login', {
                email,
                password,
            })
            .then(({ data: { access_token } }) => {
                this.setToken(access_token);
            });
    }
}
