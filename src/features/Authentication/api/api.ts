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
                .get('https://dummyjson.com/auth', {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                })
                .then((response) => response.status === 200)
                .catch((err) => {
                    console.error(err);
                    return false;
                });
        } else return false;
    }

    async authenticate({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) {
        this.setToken();
        return axios
            .post<
                unknown,
                {
                    data: {
                        token: string;
                    };
                }
            >('https://dummyjson.com/auth/login', {
                username,
                password,
            })
            .then(({ data: { token } }) => {
                this.setToken(token);
            });
    }
}
