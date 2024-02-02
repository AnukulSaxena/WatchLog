import axios from 'axios';
import conf from '../conf/conf.js';

class AuthService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.expressUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Set credentials here
        });
    }

    async createAccount(data) {
        try {
            const response = await this.axiosInstance.post('/users/register', data);

            return response.data;
        } catch (error) {
            console.log('Express service :: createAccount :: error', error);
            throw error?.response?.data;
        }
    }

    async loginAccount(data) {
        try {
            const response = await this.axiosInstance.post('/users/login', data);

            return response.data;
        } catch (error) {
            console.log('Appwrite service :: login :: error', error);
            throw error?.response?.data;

        }
    }

    async getCurrentUser() {
        try {
            return await this.axiosInstance.get('/users/current-user')
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
            return null
        }
    }

    async logoutAccount() {
        try {
            console.log("Logout clicked");
            return await this.axiosInstance.post('/users/logout')

        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            throw error
        }
    }
}

const authService = new AuthService();
export default authService;

// async getCurrentUser() {
//
// }

// async logoutAccount() {
//     try {
//         console.log("Logout clicked");
//         return await this.account.deleteSessions();

//     } catch (error) {
//         console.log("Appwrite serive :: logout :: error", error);
//         throw error
//     }
// }
