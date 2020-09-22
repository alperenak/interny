import store from '../../store';
import { getCookie } from "../../utils/cookie";

export const formItems = async (formItems) => {
    let res = await store.getInterns(getCookie('user_id'));
    let interns = res.data.map(intern => {
        return {
            key: intern.id,
            value: intern.name + ' ' + intern.surname,
            selected: formItems ? formItems.Intern.name === intern.name && formItems.Intern.surname === intern.surname : false
        }
    });

    return [
        {
            key: 'title',
            label: 'Title',
            labelDescription: 'Name the task',
            placeholder: 'title',
            type: 'text',
            size: 'full',
            defaultValue: formItems ? formItems.Task.title : '',
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
            type: 'text',
            size: 'full',
            defaultValue: formItems ? formItems.Task.label : '',
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
            defaultValue: formItems ? formItems.Task.description : '',
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
            defaultValue: formItems ? formItems.Task.deadline : '',
            validations: {
            },
        },
        {
            key: 'Intern',
            label: 'Assignee',
            labelDescription: 'Select an assignee',
            placeholder: 'assignee',
            type: 'select',
            size: 'half',
            externalSource: interns,
            multiple: true,
            defaultValue: interns.find(e => e.selected),
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
