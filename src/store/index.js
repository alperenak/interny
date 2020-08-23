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
        return await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);
    },
    async getLandingPosts(keyword, location, offset, limit) {
        let baseUrl = config.baseUrl;
        let path = `/jobs?keyword=${keyword}&location=${location}&offset=${offset}&limit=${limit}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getPosts(keyword, location, offset, limit) {
        let baseUrl = config.baseUrl;
        let path = `/job?keyword=${keyword}&location=${location}&offset=${offset}&limit=${limit}`;
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
    async getSavedPost(id) {
        let baseUrl = config.baseUrl;
        let path = `/intern/${id}/save`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async savePost(id, job_id) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern/${id}/save`;
        let payload = {
            "id": job_id
        };
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async removePost(id, job_id) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern/${id}/save`;
        let payload = {
            "id": job_id
        };
        return await http.makeDeleteRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async getAppliedPost(id) {
        let baseUrl = config.baseUrl;
        let path = `/intern/${id}/apply`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async applyPost(id, job_id, CV_id, CL) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern/${id}/apply`;
        let payload = {
            "id": job_id,
            "cv_id": CV_id,
            "coverletter": CL,
        };
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
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
    async createCV(payload) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/cv`;
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async deleteCV(id) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/cv`;
        let payload = {
            "id": id,
        };
        return await http.makeDeleteRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async updateCV(payload) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/cv`;
        return await http.makePutRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async getCoverLetters(id) {
        let baseUrl = config.baseUrl;
        let path = `/intern/${id}/coverletter`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async createCoverLetter(id, payload) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern/${id}/coverletter`;
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async updateCoverLetter(id, payload) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern/${id}/coverletter`;
        return await http.makePutRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async deleteCoverLetter(id, payload) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern/${id}/coverletter`;
        return await http.makeDeleteRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
};

export default store;
