import store from '../../store';
import { getCookie } from '../../utils/cookie';

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
        selected: is_selected.length > 0,
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
          start: 0,
          stop: 40,
        },
      },
    },
    {
      key: 'label',
      label: 'Label',
      labelDescription: 'Name the internship type',
      placeholder: 'Type',
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
          start: 0,
          stop: 40,
        },
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
          start: 0,
          stop: 255,
        },
      },
    },
    {
      key: 'startDay',
      label: 'Start Day',
      labelDescription: 'Select Start Day',
      placeholder: 'start day',
      type: 'select',
      size: 'half',
      defaultValue: {
        key: formItems ? formItems.startDay.toLowerCase() : '',
        value: formItems ? formItems.startDay : '',
        selected: true,
      },
      externalSource: [
        {
          key: 'today',
          value: 'Today',
          selected: false,
        },
        {
          key: 'tomorrow',
          value: 'Tomorrow',
          selected: false,
        },
        {
          key: 'afterTheOngoingTask',
          value: 'After The Ongoing Task',
          selected: false,
        },
      ],
      validations: {},
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
      defaultValue: Array.isArray(interns.filter((e) => e.selected))
        ? interns.filter((e) => e.selected)
        : [interns.filter((e) => e.selected)],
      validations: {},
    },
    {
      key: 'taskLength',
      label: 'Task Length',
      labelDescription: 'Select Task Length',
      placeholder: 'task length',
      type: 'select',
      size: 'full',
      defaultValue: {
        key: formItems ? formItems.taskLength.toLowerCase() : '',
        value: formItems ? formItems.taskLength : '',
        selected: true,
      },
      externalSource: [
        {
          key: '1',
          value: '1 Day',
          selected: false,
        },
        {
          key: '2',
          value: '2 Days',
          selected: false,
        },
        {
          key: '3',
          value: '3 Days',
          selected: false,
        },
        {
          key: '4',
          value: '4 Days',
          selected: false,
        },
        {
          key: '5',
          value: '5 Days',
          selected: false,
        },
      ],
      validations: {},
    },
  ];
};

export const formButtons = (isEdit) => {
  return [
    {
      key: 'cancel',
      type: 'ghost',
      text: 'Cancel',
      sizeName: 'small',
      width: '50px',
    },
    {
      key: 'create',
      type: 'primary',
      text: isEdit ? 'Update' : 'Create',
      sizeName: 'small',
      width: '50px',
    },
  ];
};
