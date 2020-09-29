import store from '../../store';
import { getCookie } from "../../utils/cookie";

export const formItems = async (formItems) => {
    let res = await store.getInterns(getCookie('user_id'));

    let interns = [];

    if (res.data && res.data.length > 0) {
        interns = res.data.map((v) => {
            let is_selected = [];
            if (formItems && formItems.Members) {
                is_selected = formItems.Members.filter((q) => q.id === v.id);
            }
            return {
                key: v.id,
                value: v.name,
                selected: is_selected.length > 0
            };
        });
    }

    /* let interns = res.data.map(intern => {
        return {
            key: intern.id,
            value: intern.name + ' ' + intern.surname,
            selected
        }
    }); */

    return [
        {
            key: 'title',
            label: 'Title',
            labelDescription: 'Name the task',
            placeholder: 'title',
            type: 'text',
            size: 'full',
            defaultValue: formItems ? formItems.title : '',
            validations: {
                lengthValidator: {
                    start: 0, stop: 40
                }
            },
        },
        {
            key: 'label',
            label: 'Label',
            labelDescription: 'Label the task',
            placeholder: 'label',
            type: 'select',
            size: 'full',
            defaultValue: {
                key: formItems ? formItems.label.toLowerCase() : '',
                value: formItems ? formItems.label : '',
                selected: true,
            },
            externalSource: [
                {
                    key: 'research',
                    value: 'Research',
                    selected: false,
                },
                {
                    key: 'evaluation',
                    value: 'Evaluation',
                    selected: false,
                },
                {
                    key: 'reorganization',
                    value: 'Reorganization',
                    selected: false,
                },
                {
                    key: 'design',
                    value: 'Design',
                    selected: false,
                },
                {
                    key: 'application',
                    value: 'Application',
                    selected: false,
                },
                {
                    key: 'reporting',
                    value: 'Reporting',
                    selected: false,
                },
            ],
            validations: {
                lengthValidator: {
                    start: 0, stop: 40
                }
            },
        },
        {
            key: 'description',
            label: 'Description',
            labelDescription: 'Write details of the task',
            placeholder: 'description',
            type: 'textarea',
            size: 'full',
            defaultValue: formItems ? formItems.description : '',
            validations: {
                lengthValidator: {
                    start: 0, stop: 255
                }
            },
        },
        {
            key: 'deadline',
            label: 'Deadline',
            labelDescription: 'Select deadline of the task',
            placeholder: 'description',
            type: 'date',
            size: 'half',
            defaultValue: formItems ? formItems.deadline : '',
            validations: {
            },
        },
        {
            key: 'Members',
            label: 'Assignee',
            labelDescription: 'Select an assignee',
            placeholder: 'assignee',
            type: 'select',
            size: 'half',
            externalSource: interns,
            multiple: true,
            defaultValue: Array.isArray(interns.filter(e => e.selected)) ? interns.filter(e => e.selected) : [interns.filter(e => e.selected)],
            validations: {
            },
        },
    ]
};

export const formButtons = (isEdit) => {
    return [
        {
            key: 'cancel',
            type: 'ghost',
            text: 'Cancel',
            sizeName: 'small',
            width: '50px'
        },
        {
            key: 'create',
            type: 'primary',
            text: isEdit ? 'Update' : 'Create',
            sizeName: 'small',
            width: '50px'
        }
    ];
};
