import http from '../../utils/httpHelper';
import config from '../../../appConfig';

const errorMessageBuilder = (response) => {
    return (response.errorData && response.errorData.code) || '0';
};

let authStore = {
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
};

export default authStore;
