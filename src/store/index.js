import http from '../utils/httpHelper';
import config from '../../appConfig';

const errorMessageBuilder = (response) => {
    return (response.errorData && response.errorData.code) || '0';
};

let store = {
    async internSignUp({name, surname, email, password}) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern`;
        let payload = {
            "name": name,
            "surname": surname,
            "email": email,
            "password": password,
        };
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async employerSignUp({accountName, legalName, email, password}) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/employer`;
        let payload = {
            "accountName": accountName,
            "legalName": legalName,
            "email": email,
            "password": password,
        };
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async internLogin({email, password}) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/login/intern`;
        let payload = {
            "email": email,
            "password": password,
        };
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async getIntern(id) {
        let baseUrl = config.baseUrl;
        let path = `/intern/${id}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getPosts(offset, limit) {
        let baseUrl = config.baseUrl;
        let path = `/job?offset=${offset}&limit=${limit}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getPost(id) {
        let baseUrl = config.baseUrl;
        let path = `/job/${id}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getCV(id) {
        let baseUrl = config.baseUrl;
        let path = `/cv/${id}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getCVs(id) {
        let baseUrl = config.baseUrl;
        let path = `/intern/${id}/cv`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
};

export default store;
