import countries from "../../utils/countries";

export const formItems = (formItems) => {
    let workingDaysArray = [
        {key: 'monday', value: 'Monday', selected: false},
        {key: 'tuesday', value: 'Tuesday', selected: false},
        {key: 'wednesday', value: 'Wednesday', selected: false},
        {key: 'thursday', value: 'Thursday', selected: false},
        {key: 'friday', value: 'Friday', selected: false},
        {key: 'saturday', value: 'Saturday', selected: false},
        {key: 'sunday', value: 'Sunday', selected: false},
    ];

    let JobTypesArray = [
        {key: 'fullTime', value: 'Full Time', selected: false},
        {key: 'projectBased', value: 'Project Based', selected: false},
        {key: 'partTime', value: 'Part Time', selected: false},
        {key: 'freeTime', value: 'Free Time', selected: false},
    ];

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
            type: 'select',
            externalSource: JobTypesArray,
            validations: {lengthValidator: {start: 1, stop: 40}},
        }},
        'country': {item: {
            title: "Job Country",
            type: 'select',
            externalSource: countries,
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
        'workingDays': {item: {
            title: "Working Days",
            type: 'select',
            externalSource: workingDaysArray,
            multiple: true,
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
                let defaultTextValue = key === 'city' || key === 'country' ?
                    formItems?.jobLocation[key] :
                    (key === 'education' || key === 'experiences' ?
                    formItems?.requirements[key]:
                    formItems && formItems[key]);
                let defaultValue = keys[key].item.type === 'select' ?
                    (keys[key].item.multiple ? keys[key].item.externalSource.filter(e => defaultTextValue?.includes(e.value)) :
                        keys[key].item.externalSource.find(e => {if (e.value === defaultTextValue) {e.selected = true; return e;}})) :
                    defaultTextValue?.toString();
                return {
                    key: keys[key].item.title,
                    type: keys[key].item.type,
                    size: 'full',
                    validations: keys[key].item.validations,
                    multiple: keys[key].item.multiple,
                    externalSource: keys[key].item.externalSource,
                    label: keys[key].item.title,
                    defaultValue: defaultValue?.length > 0 ? defaultValue : defaultValue?.hasOwnProperty('value') ? defaultValue : undefined,
                    placeholder: (keys[key].item.type === 'select' ? 'Select ' : 'Enter ') + keys[key].item.title,
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
