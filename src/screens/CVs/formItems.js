export const formItems = (formInputs) => {
    let a = [
        {key: "1", value: "1", selected: false},
        {key: "2", value: "2", selected: false},
        {key: "3", value: "3", selected: false},
        {key: "4", value: "4", selected: false},
        {key: "5", value: "5", selected: false},
        {key: "6", value: "6", selected: false},
        {key: "7", value: "7", selected: false},
    ];
    let keys = {
        'universities': {
            key: "University",
            level: 'Education Level',
            institution: 'University',
            title: 'Department',
            country: 'Country',
            city: 'City',
            startDate: 'Start Date',
            endDate: 'End Date'
        },
        'highSchools': {
            key: "High School",
            level: 'Education Level',
            institution: 'High School',
            title: 'Department',
            country: 'Country',
            city: 'City',
            startDate: 'Start Date',
            endDate: 'End Date'
        },
        'experiences': {
            key: "Experience",
            level: 'Education Level',
            institution: 'Company',
            title: 'Position',
            country: 'Country',
            city: 'City',
            startDate: 'Start Date',
            endDate: 'End Date'
        },
        'skills': {key: "Skills", title: 'Skill'},
        'languages': {key: "Languages", title: 'Language'},
        'certificates': {key: "Certificates", title: 'Name', institution: 'Institution'},
        'hobbies': {key: "Hobbies", title: 'Name'},
    };

    if (formInputs) {
        let editItems = {"Title": {
                key: 'title',
                duplicable: false,
                items: [[
                    {
                        key: 'title',
                        type: 'text',
                        size: 'full',
                        label: 'Name your CV',
                        defaultValue: formInputs.header,
                        labelDescription: 'The name will be seen only to you',
                        placeholder: 'Enter name',
                    }
                ]]
            }};
        Object.keys(keys).map(key => {
            let item = formInputs.items.find(item => item.title.toLowerCase() === key.toLowerCase());

            editItems[keys[key].key] = {
                key: key,
                duplicable: true,
                count: item.items.length * Object.keys(item.items[0]).length,
                items: item.items.map(it => {
                    return Object.keys(it).map(itKey => {
                        return {
                            key: itKey,
                            type: 'select',
                            externalSource: a,
                            size: 'full',
                            defaultValue: it[itKey],
                            label: keys[key][itKey],
                            placeholder: 'Select ' + keys[key][itKey],
                        }
                    });
                }),
            };
        });
        return editItems;
    }

    return {
        "Title": {
            key: 'title',
            duplicable: false,
            items: [[
                {
                    key: 'title',
                    type: 'text',
                    size: 'full',
                    label: 'Name your CV',
                    labelDescription: 'The name will be seen only to you',
                    placeholder: 'Enter name',
                }
            ]]
        },
        "University": {
            key: 'universities',
            duplicable: true,
            count: 6,
            items: [[
                {
                    key: 'level',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Education Level',
                    placeholder: 'Select Education Level',
                },
                {
                    key: 'institution',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'University',
                    placeholder: 'Select University',
                },
                {
                    key: 'title',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Department',
                    placeholder: 'Select Department',
                },
                {
                    key: 'country',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Country',
                    placeholder: 'Select Country',
                },
                {
                    key: 'city',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'City',
                    placeholder: 'Select City',
                },
                {
                    key: 'startDate',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Start Date',
                    placeholder: 'Select Date',
                },
                {
                    key: 'endDate',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'End Date',
                    placeholder: 'Select Date',
                },
            ]]
        },
        "High School": {
            key: 'highSchools',
            duplicable: true,
            count: 5,
            items: [[
                {
                    key: 'institution',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'High School',
                    placeholder: 'High School',
                },
                {
                    key: 'title',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Department',
                    placeholder: 'Select Department',
                },
                {
                    key: 'country',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Country',
                    placeholder: 'Select Country',
                },
                {
                    key: 'city',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'City',
                    placeholder: 'Select City',
                },
                {
                    key: 'startDate',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Start Date',
                    placeholder: 'Select Date',
                },
                {
                    key: 'endDate',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'End Date',
                    placeholder: 'Select Date',
                },
            ]]
        },
        "Experience": {
            key: 'experiences',
            duplicable: true,
            count: 5,
            items: [[
                {
                    key: 'title',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Position',
                    placeholder: 'Select Position',
                },
                {
                    key: 'institution',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Company',
                    placeholder: 'Select Company',
                },
                {
                    key: 'country',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Country',
                    placeholder: 'Select Country',
                },
                {
                    key: 'city',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'City',
                    placeholder: 'Select City',
                },
                {
                    key: 'startDate',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Start Date',
                    placeholder: 'Select Date',
                },
                {
                    key: 'endDate',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'End Date',
                    placeholder: 'Select Date',
                },
            ]]
        },
        "Skills": {
            key: 'skills',
            duplicable: true,
            count: 1,
            items: [[
                {
                    key: 'title',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Skill',
                    placeholder: 'Select your skills',
                },
            ]]
        },
        "Languages": {
            key: 'languages',
            duplicable: true,
            count: 2,
            items: [[
                {
                    key: 'title',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Language',
                    placeholder: 'Select Language',
                },
                {
                    key: 'level',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Level',
                    placeholder: 'Select Language Level',
                },
            ]]
        },
        "Certificates": {
            key: 'certificates',
            duplicable: true,
            count: 2,
            items: [[
                {
                    key: 'title',
                    type: 'text',
                    size: 'full',
                    label: 'Name',
                    placeholder: 'Enter certificate name',
                },
                {
                    key: 'institution',
                    type: 'select',
                    externalSource: a,
                    size: 'full',
                    label: 'Institution',
                    placeholder: 'Enter institution that certifies',
                },
            ]]
        },
        "Hobbies": {
            key: 'hobbies',
            duplicable: true,
            count: 1,
            items: [[
                {
                    key: 'title',
                    type: 'text',
                    size: 'full',
                    label: 'Name',
                    placeholder: 'Enter your hobbies',
                }
            ]]
        },
    };
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
