import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log(userAccount);
            if (userAccount) {
                return this.loginAccount({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite serive :: createAccount :: error", error)
            throw error
        }
    }

    async loginAccount({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite serive :: login :: error", error)
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
            throw error
        }
    }

    async logoutAccount() {
        try {
            console.log("Logout clicked");
            return await this.account.deleteSessions();

        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            throw error
        }
    }

}

const authService = new AuthService();

export default authService;