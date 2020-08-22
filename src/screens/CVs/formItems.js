export const formItems = () => {
    let a = [
        {key: "1", value: "1", selected: false},
        {key: "2", value: "2", selected: false},
        {key: "3", value: "3", selected: false},
        {key: "4", value: "4", selected: false},
        {key: "5", value: "5", selected: false},
        {key: "6", value: "6", selected: false},
        {key: "7", value: "7", selected: false},
    ];
    return {
        "Title": {
            key: 'title',
            duplicable: false,
            items: [[
                {
                    key: 'title',
                    type: 'text',
                    size: 'half',
                    label: 'Name your CV',
                    labelDescription: 'The name will be seen only to you',
                    placeholder: 'Enter name',
                }
            ]]
        },
        "University": {
            key: 'universities',
            duplicable: true,
            items: [[
                {
                    key: 'level',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Education Level',
                    placeholder: 'Select Education Level',
                },
                {
                    key: 'institution',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'University',
                    placeholder: 'Select University',
                },
                {
                    key: 'title',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Department',
                    placeholder: 'Select Department',
                },
                {
                    key: 'country',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Country',
                    placeholder: 'Select Country',
                },
                {
                    key: 'city',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
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
            items: [[
                {
                    key: 'institution',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'High School',
                    placeholder: 'High School',
                },
                {
                    key: 'title',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Department',
                    placeholder: 'Select Department',
                },
                {
                    key: 'country',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Country',
                    placeholder: 'Select Country',
                },
                {
                    key: 'city',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
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
            items: [[
                {
                    key: 'title',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Position',
                    placeholder: 'Select Position',
                },
                {
                    key: 'institution',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Company',
                    placeholder: 'Select Company',
                },
                {
                    key: 'country',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Country',
                    placeholder: 'Select Country',
                },
                {
                    key: 'city',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
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
            items: [[
                {
                    key: 'title',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Skill',
                    placeholder: 'Select your skills',
                },
            ]]
        },
        "Languages": {
            key: 'languages',
            duplicable: true,
            items: [[
                {
                    key: 'title',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Language',
                    placeholder: 'Select Language',
                },
                {
                    key: 'level',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Level',
                    placeholder: 'Select Language Level',
                },
            ]]
        },
        "Certificates": {
            key: 'certificates',
            duplicable: true,
            items: [[
                {
                    key: 'title',
                    type: 'text',
                    size: 'half',
                    label: 'Name',
                    placeholder: 'Enter certificate name',
                },
                {
                    key: 'institution',
                    type: 'select',
                    externalSource: a,
                    size: 'half',
                    label: 'Institution',
                    placeholder: 'Enter institution that certifies',
                },
            ]]
        },
        "Hobbies": {
            key: 'hobbies',
            duplicable: true,
            items: [[
                {
                    key: 'title',
                    type: 'text',
                    size: 'half',
                    label: 'Name',
                    placeholder: 'Enter your hobbies',
                }
            ]]
        },
    };
};

export const formButtons = () => {
    return  [
        {
            type:'ghost',
            text: 'Cancel',
            sizeName:'small',
            width:'50px'
        },
        {
            type:'primary',
            text: 'Create',
            sizeName:'small',
            width:'50px'
        }
    ];
};
