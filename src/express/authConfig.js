import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";
import axios from 'axios'
class AuthService {

    async createAccount(data) {
        try {
            return await axios.post(`${conf.expressUrl}/users/register`,
                data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // if (userAccount) {
            //     return this.loginAccount({ email, password });
            // } else {
            //     return userAccount;
            // }
        } catch (error) {
            console.log("Express serive :: createAccount :: error", error)

            throw error.response.data
        }
    }

    async loginAccount(data) {
        try {
            return await axios.post(`${conf.expressUrl}/users/login`,
                data, {

                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.log("Appwrite serive :: login :: error", error)
            throw error.response.data
        }
    }

    // async getCurrentUser() {
    //     try {
    //         return await this.account.get();
    //     } catch (error) {
    //         console.log("Appwrite serive :: getCurrentUser :: error", error);
    //         throw error
    //     }
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

}

const authService = new AuthService();

export default authService;