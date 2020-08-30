export const formItems = (formItems) => {
    let keys = {
        'position': {item: {
            title: "Position",
            validations: {
                lengthValidator: {start: 1, stop: 40},
            },
        }},
        'jobRole': {item: {
            title: "Job Role",
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'jobType': {item: {
            title: "Job Type",
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'country': {item: {
            title: "Job Country",
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'city': {item: {
            title: "Job City",
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'description': {item: {
            title: "Description",
            type: "textarea",
            validations: {lengthValidator: {start: 1, stop: 255}},
        }},
        'qualifications': {item: {
            title: "Qualifications",
            validations: {lengthValidator: {start: 1, stop: 255}},
        }},
        'education': {item: {
            title: 'Min. Education Level',
            validations: {lengthValidator: {start: 1, stop: 255}},
        }},
        'experiences': {item: {
            title: 'Min. Year(s) of Experience',
            validations: {lengthValidator: {start: 1, stop: 255}},
        }},
        'employmentType': {item: {
            title: "Employment Type",
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'workingDays': {item: {
            title: "Working Days",
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'salaryInterval': {item: {
            title: "Salary Interval",
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'startDate': {item: {
            title: "Start Date",
            type: 'date',
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'endDate': {item: {
            title: "End Date",
            type: 'date',
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'industry': {item: {
            title: "Industry",
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'internQuota': {item: {
            title: "Job Quota",
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
    };

    return Object.keys(keys).map(key => {
        return {
            key: key,
            duplicable: false,
            count: 0,
            items: [Object.keys(keys[key]).map(itKey => {
                let defaultValue = key === 'city' || key === 'country' ?
                    formItems?.jobLocation[key] :
                    (key === 'education' || key === 'experiences' ?
                    formItems?.requirements[key]:
                    formItems && formItems[key]);
                return {
                    key: keys[key].item.title,
                    type: keys[key].item.type,
                    size: 'full',
                    validations: keys[key].item.validations,
                    label: keys[key].item.title,
                    defaultValue: defaultValue?.toString(),
                    placeholder: 'Enter ' + keys[key].item.title,
                };
            })],
        };
    });
};

export const formButtons = (isEdit) => {
    return  [
        {
            type:'ghost',
            text: 'Cancel',
            sizeName:'small',
            width:'50px'
        },
        {
            type:'primary',
            text: isEdit ? 'Update' : 'Create',
            sizeName:'small',
            width:'50px'
        }
    ];
};
