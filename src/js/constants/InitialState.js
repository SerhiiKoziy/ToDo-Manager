export const INITIAL_STATE = {
    columns: 2,
    elements: [
        {
            'view': 'text',
            'name': 'firstname',
            'label': 'firstname',
            'labelAlign': '',
            'labelPosition': 'top',
            'placeholder': '',
            'value': '',
            'id': 1
        },
        {
            'view': 'text',
            'name': 'secondname',
            'label': 'sectondname',
            'labelAlign': '',
            'labelPosition': 'top',
            'placeholder': '',
            'value': '',
            'id': 2
        },
        {
            'view': 'radio',
            'name': 'gender',
            'label': 'gender',
            'labelAlign': '',
            'labelPosition': 'left',
            'placeholder': '',
            'value': '',
            'options': [
                'Женщина',
                'Мужчина'
            ],
            'id': 3
        },
        {
            'view': 'text',
            'name': 'mothername',
            'label': 'mothername',
            'labelAlign': 'left',
            'labelPosition': 'top',
            'placeholder': '',
            'value': 'имя тещи',
            'id': 4,
            'activatorName': 'gender',
            'activatorValue': 'Женщина',

        },
        {
            'view': 'text',
            'name': 'fathername',
            'label': 'fathername',
            'labelAlign': '',
            'labelPosition': 'top',
            'placeholder': '',
            'value': 'имя тестя',
            'id': 5,
            'activatorName': 'gender',
            'activatorValue': 'Мужчина',
        }
    ],
};
