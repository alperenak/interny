import {getCookie} from "./cookie";

export const formCVData = () => {
    return {
        "intern": getCookie('user_id'),
        "title": "",
        "phone": "",
        "birthDate": "",
        "location": {},
        "gradStatus": {},
        "experiences": [
        ],
        "universities": [
        ],
        "highSchools": [
        ],
        "skills": [
        ],
        "languages": [
        ],
        "certificates": [
        ],
        "hobbies": [
        ],
        "photo": "http://imgur.com/myPhoto.png"
    };
};
