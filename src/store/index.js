import http from '../utils/httpHelper';
import config from '../../appConfig';
import {getCookie} from "../utils/cookie";

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
    async employerLogin({email, password}) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/login/employer`;
        let payload = {
            "email": email,
            "password": password,
        };
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async getInterns(id) {
        let baseUrl = config.baseUrl;
        let path = `/employer/${id}/interns`;
        let tokenCookieName = "token";
        return await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);
    },
    async getIntern(id) {
        let baseUrl = config.baseUrl;
        let path = `/intern/${id}`;
        let tokenCookieName = "token";
        return await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);
    },
    async editIntern(id, {field, value}) {
        let baseUrl = config.baseUrl;
        let path = `/intern/${id}/${field}`;
        let tokenCookieName = "token";
        let payload = {
            [field]: value
        };
        return await http.makePutRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async getEmployer(id) {
        let baseUrl = config.baseUrl;
        let path = `/employer/${id}`;
        let tokenCookieName = "token";
        return await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);
    },
    async editEmployer(id, {field, value}) {
        let baseUrl = config.baseUrl;
        let path = `/employer/${id}/${field}`;
        let tokenCookieName = "token";
        let payload = {
            [field]: value
        };
        return await http.makePutRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async getLandingPosts({keyword, location, offset=0, limit=5}) {
        let baseUrl = config.baseUrl;
        let keywordPath = keyword && keyword !== 'null' ? `keyword=${keyword}` : '';
        let locationPath = location && location !== 'null' ? `&location=${location}&` : '';
        let path = `/jobs?${keywordPath}${locationPath}offset=${offset}&limit=${limit}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getPosts({keyword, location, offset=0, limit=5}) {
        let baseUrl = config.baseUrl;
        let keywordPath = keyword && keyword !== 'null' ? `keyword=${keyword}` : '';
        let locationPath = location && location !== 'null' ? `&location=${location}&` : '';
        let path = `/job?${keywordPath}${locationPath}offset=${offset}&limit=${limit}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getEmployerPosts(id) {
        let baseUrl = config.baseUrl;
        let path = `/employer/${id}/job`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getActivePosts(id) {
        let baseUrl = config.baseUrl;
        let path = `/employer/${id}/job?status=active`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getPassivePosts(id) {
        let baseUrl = config.baseUrl;
        let path = `/employer/${id}/job?status=passive`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async activatePost(id) {
        let baseUrl = config.baseUrl;
        let path = `/job/${id}`;
        let tokenCookieName = "token";
        let payload = {
          passive: false
        };
        let res = await http.makePutRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);

        return res.data;
    },
    async suspendPost(id) {
        let baseUrl = config.baseUrl;
        let path = `/job/${id}`;
        let tokenCookieName = "token";
        let payload = {
            passive: true
        };
        let res = await http.makePutRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);

        return res.data;
    },
    async getPost(id) {
        let baseUrl = config.baseUrl;
        let path = `/job/${id}`;
        if (getCookie('user') === 'employer') {
            path = `/employer/${getCookie('user_id')}/job/${id}`
        }
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
    async createPost(payload) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/job`;
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async editPost(payload) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/job`;
        return await http.makePutRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async getPostApplications(jobId) {
        let baseUrl = config.baseUrl;
        let path = `/job/${jobId}/application`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getPostApplication(jobId, applicationId) {
        let baseUrl = config.baseUrl;
        let path = `/job/${jobId}/application/${applicationId}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async acceptApplication(jobId, applicationId) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/job/${jobId}/application/${applicationId}/accept`;
        return await http.makePutRequest(path, baseUrl, tokenCookieName, {}, errorMessageBuilder);
    },
    async rejectApplication(jobId, applicationId) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/job/${jobId}/application/${applicationId}/reject`;
        return await http.makePutRequest(path, baseUrl, tokenCookieName, {}, errorMessageBuilder);
    },
    async startInternship(id, jobId) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern/${id}/approve`;
        let payload = {
            id: jobId
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
    async deleteCoverLetter(internId, id) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern/${internId}/coverletter`;
        let payload = {
            id: id
        };
        return await http.makeDeleteRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async getTasks(id) {
        let baseUrl = config.baseUrl;
        let path = `/employer/${id}/board`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async getInternTasks(id) {
        let baseUrl = config.baseUrl;
        let path = `/intern/${id}/task`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async createTask(payload) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/task`;
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async updateTask(payload) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/task/${payload.id}`;
        return await http.makePutRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async deleteTask(internId, id) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern/${internId}/coverletter`;
        let payload = {
            id: id
        };
        return await http.makeDeleteRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async moveInternTask(id, {taskId, status}) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/intern/${id}/task/${taskId}/status`;
        let payload = {
          status: status
        };
        return await http.makePutRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async moveEmployerTask({taskId, internId, status}) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/task/${taskId}/status`;
        let payload = {
            status: status,
            Intern: internId
        };
        return await http.makePutRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async getMessage(contact) {
        let baseUrl = config.baseUrl;
        let path = `/message?contact=${contact}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async createMessage(receiver, data) {
        let baseUrl = config.baseUrl;
        let tokenCookieName = "token";
        let path = `/message`;
        let payload = {
            Receiver: receiver,
            data
        };
        return await http.makePostRequest(path, baseUrl, tokenCookieName, payload, errorMessageBuilder);
    },
    async getContacts() {
        let baseUrl = config.baseUrl;
        let path = `/message/contact`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async uploadImageType(type) {
        let baseUrl = config.baseUrl;
        let path = `/upload/pp?fileType=${type}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
    async uploadImage(url, file) {
        let baseUrl = url;
        let path = ``;
        let tokenCookieName = "token";
        let additionHeaders = {
            'Content-Type': file.type,
        };

        return await http.makePutRequest(path, baseUrl, tokenCookieName, file, errorMessageBuilder, additionHeaders);
    },
    async uploadImageKey(key) {
        let baseUrl = config.baseUrl;
        let path = `/upload/pp?key=${key}`;
        let tokenCookieName = "token";
        let res = await http.makeGetRequest(path, baseUrl, tokenCookieName, errorMessageBuilder);

        return res.data;
    },
};

export default store;
