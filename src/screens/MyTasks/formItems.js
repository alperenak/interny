import store from '../../store';

export const formItems = (formItems) => {
    // let interns = await store.getInterns();

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
            type: 'text',
            size: 'full',
            defaultValue: formItems ? formItems.label : '',
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
            key: 'Intern',
            label: 'Assignee',
            labelDescription: 'Select an assignee',
            placeholder: 'assignee',
            type: 'select',
            size: 'half',
            defaultValue: formItems ? formItems.Intern[0].name + ' ' + formItems.Intern[0].surname : '',
            validations: {
            },
        },
    ]
};

export const formButtons = (isEdit) => {
    return  [
        {
            key: 'cancel',
            type:'ghost',
            text: 'Cancel',
            sizeName:'small',
            width:'50px'
        },
        {
            key: 'create',
            type:'primary',
            text: isEdit ? 'Update' : 'Create',
            sizeName:'small',
            width:'50px'
        }
    ];
};
