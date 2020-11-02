import languages from '../../utils/languages';

export const formItems = (formItems) => {
  let internLevel = [
    { key: 'newlyGraduated', value: 'Newly Graduated', selected: false },
    { key: 'universityStudent', value: 'University Student', selected: false },
  ];

  let internshipLength = [
    { key: '4', value: '4 weeks', selected: false },
    { key: '8', value: '8 weeks', selected: false },
    { key: '12', value: '12 weeks', selected: false },
  ];

  let applicationsTypes = [
    { key: 'local', value: 'Local', selected: false },
    { key: 'global', value: 'Global', selected: false },
  ];

  let quotas = [
    { key: '1', value: '1', selected: false },
    { key: '2', value: '2', selected: false },
    { key: '3', value: '3', selected: false },
    { key: '4', value: '4', selected: false },
    { key: '5', value: '5', selected: false },
    { key: '6', value: '6', selected: false },
    { key: '7', value: '7', selected: false },
    { key: '8', value: '8', selected: false },
    { key: '9', value: '9', selected: false },
    { key: '10', value: '10', selected: false },
  ];

  let keys = {
    internshipLength: {
      item: {
        title: 'Internship Length',
        type: 'select',
        externalSource: internshipLength,
      },
    },
    position: {
      item: {
        title: 'Position',
      },
    },
    description: {
      item: {
        title: 'Description',
        type: 'textarea',
        validations: { lengthValidator: { start: 1, stop: 255 } },
      },
    },
    qualifications: {
      item: {
        title: 'Qualifications',
        type: 'textarea',
        validations: { lengthValidator: { start: 1, stop: 255 } },
      },
    },
    internLevel: {
      item: {
        title: 'Intern Level',
        type: 'select',
        externalSource: internLevel,
        multiple: true,
      },
    },
    languages: {
      item: {
        title: 'Preferred Languages',
        type: 'select',
        externalSource: languages,
        multiple: true,
      },
    },
    applicationType: {
      item: {
        title: 'Application Type',
        type: 'select',
        externalSource: applicationsTypes,
        multiple: true,
      },
    },
    gpa: {
      item: {
        title: 'Preferred GPA',
        validations: { isNumeric: {} },
      },
    },
    startDate: {
      item: {
        title: 'Start Date',
        type: 'date',
        validations: { lengthValidator: { start: 1, stop: 40 } },
      },
    },
    internQuota: {
      item: {
        title: 'Job Quota',
        type: 'select',
        externalSource: quotas,
        multiple: false,
      },
    },
  };

  return Object.keys(keys).map((key) => {
    return {
      key: key,
      duplicable: false,
      count: 0,
      items: [
        Object.keys(keys[key]).map((itKey) => {
          let defaultTextValue = formItems && formItems[key];
          let defaultValue =
            keys[key].item.type === 'select'
              ? keys[key].item.multiple
                ? keys[key].item.externalSource.filter((e) =>
                    defaultTextValue?.includes(e.value)
                  )
                : keys[key].item.externalSource.find((e) => {
                    if (e.value === defaultTextValue) {
                      e.selected = true;
                      return e;
                    }
                  })
              : defaultTextValue?.toString();
          return {
            key: keys[key].item.title,
            type: keys[key].item.type,
            size: 'full',
            validations: keys[key].item.validations,
            multiple: keys[key].item.multiple,
            externalSource: keys[key].item.externalSource,
            label: keys[key].item.title,
            defaultValue:
              defaultValue?.length > 0
                ? defaultValue
                : defaultValue?.hasOwnProperty('value')
                ? defaultValue
                : undefined,
            placeholder:
              (keys[key].item.type === 'select' ? 'Select ' : 'Enter ') +
              keys[key].item.title,
          };
        }),
      ],
    };
  });
};

export const formButtons = (isEdit) => {
  return [
    {
      type: 'ghost',
      text: 'Cancel',
      sizeName: 'small',
      width: '50px',
    },
    {
      type: 'primary',
      text: isEdit ? 'Update' : 'Create',
      sizeName: 'small',
      width: '50px',
    },
  ];
};
