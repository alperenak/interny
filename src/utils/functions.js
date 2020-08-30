import store from '../store';
import {getCookie} from "./cookie";

export const formCVData = async (formData) => {
    let res = await store.getIntern(getCookie('user_id'));
    let user = res.data;
    let payload = {
        "intern": user?.id,
        "title": formData ? formData.title : "",
        "phone": user?.phone,
        "birthDate": user?.birthDate,
        "location": user?.location,
        "gradStatus": user?.gradStatus,
        "experiences": formData ? formData.items.find(e => e.title.toLowerCase() === 'experiences').items : [
        ],
        "universities": formData ? formData.items.find(e => e.title.toLowerCase() === 'universities').items : [
        ],
        "highSchools": formData ? formData.items.find(e => e.title.toLowerCase() === 'highschools').items : [
        ],
        "skills": formData ? formData.items.find(e => e.title.toLowerCase() === 'skills').items : [
        ],
        "languages": formData ? formData.items.find(e => e.title.toLowerCase() === 'languages').items : [
        ],
        "certificates": formData ? formData.items.find(e => e.title.toLowerCase() === 'certificates').items : [
        ],
        "hobbies": formData ? formData.items.find(e => e.title.toLowerCase() === 'hobbies').items : [
        ],
        "photo": user?.photo
    };

    if (formData) payload.id = formData.id;

    return payload;
};

export const formJobData = async (formData) => {
    let id = getCookie('user_id');
    let payload = {
        "Employer": id,
        "description": formData ? formData.description :  "",
        "position": formData ? formData.position :  "",
        "requirements": formData ? formData.requirements :  {},
        "qualifications": formData ? formData.qualifications :  [],
        "employmentType": formData ? formData.employmentType :  "",
        "workingDays": formData ? formData.workingDays :  [],
        "salaryInterval": formData ? formData.salaryInterval :  [],
        "startDate": formData ? formData.startDate :  "",
        "endDate": formData ? formData.endDate :  "",
        "industry": formData ? formData.industry :  "",
        "jobRole": formData ? formData.jobRole :  "",
        "jobType": formData ? formData.jobType :  "",
        "jobLocation": formData ? formData.jobLocation :  {},
        "internQuota": formData ? formData.internQuota :  0
    };

    return payload;
};

export const formTaskData = (formData) => {
    let id = getCookie('user_id');
    let payload = {
        "Employer": id,
        "Intern": formData ? [formData.Intern[0]] :  [],
        "title": formData ? formData.title :  "",
        "label": formData ? formData.label :  "",
        "description": formData ? formData.description :  "",
        "deadline": formData ? formData.deadline :  "",
    };

    if (formData) {
        payload.id = formData.id;
    }

    return payload;
};

export const onCVFormChange = (value, formData, sectionKey, itemKey, index) => {
    if (sectionKey === 'title')
        formData[sectionKey] = value;
    else if (formData[sectionKey]?.length > 0) {
        if (value) {
            if (itemKey === 'country' || itemKey === 'city')
                if (formData[sectionKey][index]['location'])
                    formData[sectionKey][index]['location'][itemKey] = value;
                else
                    formData[sectionKey][index]['location'] = {[itemKey]: value};
            else
                formData[sectionKey][index][itemKey] = value;
        } else {
            if (itemKey === 'country' || itemKey === 'city')
                delete formData[sectionKey][index]['location'][itemKey];
            else
                delete formData[sectionKey][index][itemKey];
        }
    } else {
        if (value) {
            if (itemKey === 'country' || itemKey === 'city'){
                formData[sectionKey] = [];
                formData[sectionKey].push({['location']: {[itemKey]: value}});
            } else {
                formData[sectionKey] = [];
                formData[sectionKey].push({[itemKey]: value});
            }
        }
    }

    return formData;
};

export const onJobFormChange = (value, formData, sectionKey) => {
    if (sectionKey === 'country' || sectionKey === 'city') {
        formData['jobLocation'][sectionKey] = value;
    } else if (sectionKey === 'education' || sectionKey === 'experiences') {
        formData['requirements'][sectionKey] = [value];
    } else {
        formData[sectionKey] = value;
    }

    return formData;
};

export const onTaskFormChange = (value, formData, key) => {
    if (key === 'Intern') {
        formData[key] = [value];
    }
    formData[key] = value;
    return formData;
};
