/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { IntlProvider } from 'react-intl';
import * as yup from 'yup';
import { DynamicForm } from './DynamicForm';
import { fieldBuilder } from './defaultSchema';
import { DefaultSchema } from './defaultSchema/types';

export default {
  title: 'Components/Forms/Forms/DynamicForm',
  component: DynamicForm,
  parameters: { actions: { argTypesRegex: '^on.*' } }
};

export const Default = args => <DynamicForm {...args} />;
Default.storyName = 'Basic Example';
Default.args = {
  data: {
    name: 'John Ericson',
    billing: {
      zip: '19138'
    }
  },
  form: {
    fields: [
      {
        type: 'input',
        id: 'name',
        label: 'Name',
        presentation: {
          view: 'text',
          placeholder: 'Name'
        },
        validations: [{ type: 'required', message: 'Name is required' }]
      },

      {
        type: 'input',
        id: 'email',
        label: 'Email',
        presentation: {
          view: 'email',
          placeholder: 'Email'
        }
      },

      {
        type: 'group',
        label: 'Passwords',
        presentation: {
          view: 'group'
        },
        fields: [
          {
            type: 'input',
            id: 'password',
            label: 'Password',
            presentation: {
              view: 'password'
            }
          },

          {
            type: 'input',
            id: 'password-repeat',
            label: 'Password (repeat)',
            presentation: {
              view: 'password'
            },
            validations: [
              {
                type: 'same-as',
                ref: '../password',
                message: 'Passwords dont match'
              }
            ]
          }
        ]
      },

      {
        type: 'textarea',
        id: 'description',
        label: 'Description'
      },

      {
        type: 'panel-group',
        presentation: {
          view: 'tab'
        },
        fields: [
          {
            type: 'group',
            id: 'billing',
            label: 'Billing Adress',
            fields: [
              {
                type: 'input',
                id: 'billing.zip',
                label: 'Zip Code',
                presentation: {
                  view: 'text',
                  placeholder: 'Zip Code'
                }
              }
            ]
          },
          {
            type: 'group',
            id: 'shipping',
            label: 'Shipping Adress',
            fields: [
              {
                type: 'input',
                id: 'shipping.city',
                label: 'City',
                presentation: {
                  view: 'text',
                  placeholder: 'City'
                }
              }
            ]
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

const messagesInSwedish = {
  'testForm.cancel.label': 'Avbryt',
  'testForm.save.label': 'Spara',
  'testForm.NAME_CODE': 'Namn',
  'testForm.FIRST_NAME_CODE': 'Förnamn',
  'testForm.LAST_NAME_CODE': 'Efternamn',
  'testForm.NAME_REQUIRED_CODE': 'Namn får inte vara tomt',
  'testForm.EMAIL_CODE': 'Epost',
  'testForm.add.label': 'Lägg till',
  'testForm.remove.label': 'Radera',
  'testForm.required_suffix': ' ',
  'testForm.optional_suffix': ' (valfritt)'
};

export const WithIntl = args => (
  <IntlProvider messages={messagesInSwedish} locale="sv" defaultLocale="en">
    <DynamicForm {...args} intlPrefix="testForm" />
  </IntlProvider>
);
WithIntl.storyName = 'Basic Example - With Intl';

WithIntl.args = {
  ...Default.args,
  form: {
    fields: [
      {
        type: 'input',
        id: 'email',
        label: 'Email',
        label_code: 'EMAIL_CODE',
        presentation: {
          view: 'email',
          placeholder: 'Email'
        }
      },

      {
        type: 'array',
        id: 'names',
        label: 'Names',
        presentation: {
          view: 'list',
          numberOfItems: 3
        },
        fields: [
          {
            type: 'group',
            label: 'Name',
            label_code: 'NAME_CODE',
            id: 'names[]._row',
            presentation: {
              view: 'side-by-side'
            },
            fields: [
              {
                type: 'input',
                id: 'names[].firstName',
                label: 'First name',
                label_code: 'FIRST_NAME_CODE',
                presentation: { width: 2 },
                validations: [
                  {
                    type: 'required',
                    message: 'Required',
                    message_code: 'NAME_REQUIRED_CODE'
                  }
                ]
              },
              {
                type: 'input',
                id: 'names[].lastName',
                label: 'Last Name',
                label_code: 'LAST_NAME_CODE',
                presentation: { width: 8 }
              }
            ]
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const Validations = args => <DynamicForm {...args} />;

Validations.storyName = 'Validations: Overview';
Validations.args = {
  ...Default.args,
  form: {
    fields: [
      {
        type: 'group',
        label: 'Required',
        helpText: 'Example: Field is required',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_required',
            label: 'Test',
            validations: [{ type: 'required' }]
          }
        ]
      },
      {
        type: 'group',
        label: 'Number: Min',
        helpText: 'Example: Must be greater than 10',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_min',
            label: 'Test',
            validations: [{ type: 'min', value: 10 }]
          }
        ]
      },

      {
        type: 'group',
        label: 'Number: Max',
        helpText: 'Example: Must be less than 10',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_max',
            label: 'Test',
            validations: [{ type: 'max', value: 10 }]
          }
        ]
      },

      {
        type: 'group',
        label: 'String: Min Length',
        helpText: 'Example: Must be longer than 10 chars',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_minLength',
            label: 'Test',
            validations: [{ type: 'minLength', value: 10 }]
          }
        ]
      },

      {
        type: 'group',
        label: 'String: Max Length',
        helpText: 'Example: Must be less than 10 characters',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_maxLength',
            label: 'Test',
            validations: [{ type: 'maxLength', value: 10 }]
          }
        ]
      },

      {
        type: 'group',
        label: 'String: URL',
        helpText: 'Example: Must be valid url',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_url',
            label: 'Test',
            validations: [{ type: 'url', value: 10 }]
          }
        ]
      },

      {
        type: 'group',
        label: 'String: Email',
        helpText: 'Example: Must be valid email',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_email',
            label: 'Test',
            validations: [{ type: 'email', value: 10 }]
          }
        ]
      },

      {
        type: 'group',
        label: 'String: Email',
        helpText: 'Example: Must be valid email',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_email',
            label: 'Test',
            validations: [{ type: 'email', value: 10 }]
          }
        ]
      },

      {
        type: 'group',
        label: 'String: Matches',
        helpText: 'Example: Must match regexp \'^(abc)+$\'',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_macthes',
            label: 'Test',
            validations: [{ type: 'matches', value: '^(abc)+$' }]
          }
        ]
      },

      {
        type: 'group',
        label: 'String: Same-As',
        helpText: 'Example: Both fields must have the same value',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_same-as',
            label: 'Test'
          },
          {
            type: 'input',
            id: 'text_same-as2',
            label: 'Test',
            validations: [{ type: 'same-as', ref: '../text_same-as' }]
          }
        ]
      },

      {
        type: 'group',
        label: 'Example: Combinations',
        helpText: 'Required, URL, minLength=20, maxLength=40',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_combo',
            label: 'Test',
            validations: [
              { type: 'required' },
              { type: 'url' },
              { type: 'minLength', value: 20 },
              { type: 'maxLength', value: 40 }
            ]
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const Rules = args => <DynamicForm {...args} />;

Rules.storyName = 'Rules: Actions';
Rules.args = {
  ...Default.args,
  form: {
    fields: [
      {
        type: 'group',
        label: 'Hide/show',
        helpText: 'Example: Show field when Text 1 is valid',
        id: '__group1',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text1',
            label: 'Text 1',
            validations: [{ type: 'required', message: 'Required' }]
          },
          {
            type: 'input',
            id: 'text2',
            label: 'Text 2',
            presentation: {
              visible: {
                ref: '../text1',
                property: 'valid',
                operator: 'eq',
                operand: true
              }
            }
          }
        ]
      },

      {
        type: 'group',
        label: 'Enable/Disable',
        helpText: 'Example: Enable field when Text 3 is greater than 4',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text3',
            label: 'Text 3',
            validations: [{ type: 'required', message: 'Required' }]
          },
          {
            type: 'input',
            id: 'text4',
            label: 'Text 4',
            presentation: {
              enabled: {
                ref: '../text3',
                property: 'value',
                operator: 'gt',
                operand: 4
              }
            }
          }
        ]
      },

      {
        type: 'group',
        label: 'Enable/disable validation rule',
        helpText: 'Example: Text 6 is required if and only if Text 5 is greater than 4',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text5',
            label: 'Text 5',
            validations: [{ type: 'required', message: 'Required' }]
          },
          {
            type: 'input',
            id: 'text6',
            label: 'Text 6',
            validations: [
              {
                type: 'required',
                message: 'Required',
                id: 'required-rule',
                enabled: {
                  ref: '../text5',
                  property: 'value',
                  operator: 'gt',
                  operand: 4
                }
              }
            ]
          }
        ]
      },

      {
        type: 'group',
        label: 'Enable/disable select options',
        helpText: 'Example: Radiobuttons contains items based on number entered in text 7',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text7',
            label: 'Text 7',
            validations: [{ type: 'required', message: 'Required' }]
          },
          {
            type: 'select',
            id: 'select8',
            label: 'Radiobuttons 8',
            presentation: {
              view: 'radiobuttons'
            },
            options: [
              {
                value: 'less_than_10',
                label: 'Less than 10',
                enabled: {
                  ref: '../text7',
                  property: 'value',
                  operator: 'lt',
                  operand: 10
                }
              },
              {
                value: '10',
                label: 'Equal to 10',
                enabled: {
                  ref: '../text7',
                  property: 'value',
                  operator: 'eq',
                  operand: 10
                }
              },
              {
                value: 'more_than_10',
                label: 'More than 10',
                enabled: {
                  ref: '../text7',
                  property: 'value',
                  operator: 'gt',
                  operand: 10
                }
              }
            ]
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const RulesConditions = args => <DynamicForm {...args} />;

RulesConditions.storyName = 'Rules: Conditions';
RulesConditions.args = {
  ...Default.args,
  form: {
    fields: [
      {
        type: 'group',
        label: 'Is Valid',
        helpText: 'Example: Rules based on validity of TextInput',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text1',
            label: 'TextInput',
            validations: [{ type: 'required', message: 'Required' }]
          },
          {
            type: 'select',
            id: 'select1',
            label: 'Result',
            presentation: {
              view: 'radiobuttons'
            },
            options: [
              {
                value: 'match',
                label: 'Valid',
                enabled: {
                  ref: '../text1',
                  property: 'valid',
                  operator: 'eq',
                  operand: true
                }
              },
              {
                value: 'not_match',
                label: 'Invalid',
                enabled: {
                  ref: '../text1',
                  property: 'valid',
                  operator: 'eq',
                  operand: false
                }
              }
            ]
          }
        ]
      },

      {
        type: 'group',
        label: 'Based on value',
        helpText: 'Example: Rules based on value of TextInput',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text2',
            label: 'TextInput'
          },
          {
            type: 'select',
            id: 'select2',
            label: 'Result',
            presentation: {
              view: 'radiobuttons'
            },
            options: [
              {
                value: 'lt',
                label: 'operator=lt, operand=10',
                enabled: {
                  ref: '../text2',
                  property: 'value',
                  operator: 'lt',
                  operand: 10
                }
              },
              {
                value: 'lte',
                label: 'operator=lte, operand=10',
                enabled: {
                  ref: '../text2',
                  property: 'value',
                  operator: 'lte',
                  operand: 10
                }
              },
              {
                value: 'eq',
                label: 'operator=eq, operand=10',
                enabled: {
                  ref: '../text2',
                  property: 'value',
                  operator: 'eq',
                  operand: 10
                }
              },
              {
                value: 'neq',
                label: 'operator=neq, operand=10',
                enabled: {
                  ref: '../text2',
                  property: 'value',
                  operator: 'neq',
                  operand: 10
                }
              },
              {
                value: 'gte',
                label: 'operator=gte, operand=10',
                enabled: {
                  ref: '../text2',
                  property: 'value',
                  operator: 'gte',
                  operand: 10
                }
              },
              {
                value: 'gt',
                label: 'operator=gt, operand=10',
                enabled: {
                  ref: '../text2',
                  property: 'value',
                  operator: 'gt',
                  operand: 10
                }
              }
            ]
          }
        ]
      },

      {
        type: 'group',
        label: 'Based on value in list',
        helpText: 'Example: Rules based on value of TextInput',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text3',
            label: 'TextInput'
          },
          {
            type: 'select',
            id: 'select4',
            label: 'Result',
            presentation: {
              view: 'radiobuttons'
            },
            options: [
              {
                value: 'valid_country',
                label: 'Valid Country',
                enabled: {
                  ref: '../text3',
                  property: 'value',
                  operator: 'in',
                  operand: ['Sweden', 'United Kingdom', 'US', 'Canada']
                }
              },
              {
                value: 'invalid_country',
                label: 'Invalid Country',
                enabled: {
                  ref: '../text3',
                  property: 'value',
                  operator: 'not_in',
                  operand: ['Sweden', 'United Kingdom', 'US', 'Canada']
                }
              }
            ]
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const Panel = args => <DynamicForm {...args} />;

Panel.storyName = 'Structure: Panel';
Panel.args = {
  ...Default.args,
  form: {
    fields: [
      {
        type: 'group',
        label: 'Sample panel',
        helpText: 'Fields can be placed in panels',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text1',
            label: 'Text 1',
            validations: [{ type: 'required', message: 'Required' }]
          },
          {
            type: 'input',
            id: 'text2',
            label: 'Text 2'
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const PanelGroupWizard = args => <DynamicForm {...args} />;
PanelGroupWizard.storyName = 'Structure: PanelGroup/Wizard';
PanelGroupWizard.args = {
  ...Default.args,
  form: {
    fields: [
      {
        id: 'pg',
        type: 'panel-group',
        presentation: {
          view: 'wizard'
        },
        fields: [
          {
            type: 'group',
            id: 'billing',
            label: 'Name',
            fields: [
              {
                type: 'input',
                id: 'name',
                label: 'Name',
                presentation: {
                  view: 'text',
                  placeholder: 'Name'
                },
                validations: [{ type: 'required', message: 'Name is required' }]
              },

              {
                type: 'input',
                id: 'email',
                label: 'Email',
                presentation: {
                  view: 'email',
                  placeholder: 'Email'
                }
              }
            ]
          },
          {
            type: 'group',
            id: 'shipping',
            label: 'Adress',
            fields: [
              {
                type: 'input',
                id: 'shipping.zip',
                label: 'Zip Code',
                presentation: {
                  view: 'text',
                  placeholder: 'Zip Code'
                }
              }
            ]
          }
        ]
      }
    ],
    footer: [
      {
        type: 'button',
        presentation: { view: 'secondary' },
        label: 'Cancel',
        action: 'cancel'
      },
      {
        type: 'button',
        presentation: { view: 'secondary' },
        label: 'Previous',
        action: 'previous'
      },
      { type: 'button', label: 'Next', action: 'next' },
      { type: 'button', label: 'Save', action: 'submit' }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const PanelGroupTab = args => <DynamicForm {...args} />;
PanelGroupTab.storyName = 'Structure: PanelGroup/Tab';
PanelGroupTab.args = {
  ...Default.args,
  form: {
    fields: [
      {
        id: 'pg',
        type: 'panel-group',
        presentation: {
          view: 'tab'
        },
        fields: [
          {
            type: 'group',
            id: 'billing',
            label: 'Name',
            fields: [
              {
                type: 'input',
                id: 'name',
                label: 'Name',
                presentation: {
                  view: 'text',
                  placeholder: 'Name'
                },
                validations: [{ type: 'required', message: 'Name is required' }]
              },

              {
                type: 'input',
                id: 'email',
                label: 'Email',
                presentation: {
                  view: 'email',
                  placeholder: 'Email'
                }
              }
            ]
          },
          {
            type: 'group',
            id: 'shipping',
            label: 'Adress',
            fields: [
              {
                type: 'input',
                id: 'shipping.zip',
                label: 'Zip Code',
                presentation: {
                  view: 'text',
                  placeholder: 'Zip Code'
                }
              }
            ]
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const Array = args => <DynamicForm {...args} />;

Array.storyName = 'Structure: Array - Emtpy';
Array.args = {
  ...Default.args,
  data: {},
  form: {
    fields: [
      {
        type: 'input',
        id: 'email',
        label: 'Email',
        validations: [{ type: 'required', message: 'Required' }]
      },
      {
        type: 'array',
        id: 'names',
        label: 'Names',
        presentation: {
          view: 'list',
          numberOfItems: 3
        },
        fields: [
          {
            type: 'group',
            label: 'Name',
            id: 'names[]._row',
            presentation: {
              view: 'side-by-side'
            },
            fields: [
              {
                type: 'input',
                id: 'names[].firstName',
                label: 'First name',
                presentation: { width: 2 },
                validations: [{ type: 'required', message: 'Required' }]
              },
              {
                type: 'input',
                id: 'names[].lastName',
                label: 'Last Name',
                presentation: { width: 8 }
              }
            ]
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const ArrayWithData = args => <DynamicForm {...args} />;

ArrayWithData.storyName = 'Structure: Array - With Data';
ArrayWithData.args = {
  ...Array.args,
  data: {
    names: [
      { firstName: 'Elissa', lastName: 'Zulauf' },
      { firstName: 'Doyle', lastName: 'Becker' },
      { firstName: 'Hallie', lastName: 'Hahn' },
      { firstName: 'Theodora', lastName: 'Walter' }
    ]
  }
};

// ---------------------------------------------------------------------------------------------------

export const ArrayNested = args => <DynamicForm {...args} />;
ArrayNested.storyName = 'Structure: Array - Nested';
ArrayNested.args = {
  ...Default.args,
  form: {
    fields: [
      {
        type: 'input',
        id: 'email',
        label: 'Email',
        validations: [{ type: 'required', message: 'Required' }]
      },
      {
        type: 'array',
        id: 'names',
        label: 'Names',
        presentation: {
          view: 'list',
          numberOfItems: 1
        },
        fields: [
          {
            id: 'names[].group',
            type: 'group',
            label: 'Person',
            fields: [
              {
                id: 'names[].group_2',
                type: 'group',
                presentation: {
                  view: 'side-by-side'
                },
                fields: [
                  {
                    type: 'input',
                    id: 'names[].firstName',
                    label: 'First name',
                    presentation: { width: 2 },
                    validations: [{ type: 'required', message: 'Required' }]
                  },
                  {
                    type: 'input',
                    id: 'names[].lastName',
                    label: 'Last Name',
                    presentation: { width: 8 }
                  }
                ]
              },
              {
                type: 'array',
                id: 'names[].addresses',
                label: 'Addresses',
                presentation: {
                  view: 'list',
                  numberOfItems: 2
                },
                fields: [
                  {
                    type: 'group',
                    id: 'names[].addresses[].group',
                    label: 'Address',
                    presentation: {
                      view: 'side-by-side'
                    },
                    fields: [
                      {
                        type: 'input',
                        id: 'names[].addresses[].zip',
                        label: 'Zip',
                        presentation: {
                          width: 2
                        },
                        validations: [
                          {
                            type: 'required',
                            message: 'Required'
                          }
                        ]
                      },
                      {
                        type: 'input',
                        id: 'names[].addresses[].city',
                        label: 'City',
                        presentation: {
                          width: 8
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const List = args => <DynamicForm {...args} />;

List.storyName = 'Structure: List';
List.args = {
  ...Default.args,
  data: {
    'contact-methods': [
      { contactMethodType: 'email', email: 'john@ibm.com' },
      { contactMethodType: 'phone', prefix: '+46', phone: '123456' },
      { contactMethodType: 'phone', prefix: '+41', phone: '738238' },
      { contactMethodType: 'email', email: 'test@test.com' }
    ]
  },
  form: {
    fields: [
      {
        type: 'list',
        id: 'contact-methods',
        label: 'Contact methods',
        discriminatorId: 'contact-methods[].contactMethodType',
        fields: [
          {
            type: 'group',
            id: 'phone',
            label: 'Phone',
            fields: [
              {
                id: 'contact-methods[].prefix',
                type: 'input',
                label: 'Prefix',
                presentation: {
                  view: 'text'
                }
              },
              {
                id: 'contact-methods[].phone',
                type: 'input',
                label: 'Phone',
                presentation: {
                  view: 'text'
                }
              }
            ]
          },
          {
            type: 'group',
            id: 'email',
            label: 'Email',
            fields: [
              {
                id: 'contact-methods[].email',
                type: 'input',
                label: 'Email',
                presentation: {
                  view: 'text'
                }
              }
            ]
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const Select = args => <DynamicForm {...args} />;

Select.storyName = 'Fields: Select/Dropdown';
Select.args = {
  ...Default.args,
  data: {
    prefix: 'mr'
  },
  form: {
    fields: [
      {
        type: 'select',
        id: 'prefix',
        label: 'Prefix',
        options: [
          { label: 'Dr.', label_code: 'prefix.dr', value: 'dr' },
          { label: 'Mr.', label_code: 'prefix.mr', value: 'mr' }
        ],
        presentation: {
          view: 'dropdown',
          placeholder: 'Please select'
        }
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const SelectWithComboBox = args => <DynamicForm {...args} />;

SelectWithComboBox.storyName = 'Fields: Select/ComboBox';
SelectWithComboBox.args = {
  ...Default.args,
  data: {
    color: 'pink'
  },
  form: {
    fields: [
      {
        type: 'select',
        id: 'color',
        label: 'Color',
        options: [
          { value: 'red', label: 'Red' },
          { value: 'green', label: 'Green' },
          { value: 'blue', label: 'Blue' },
          { value: 'pink', label: 'Pink' },
          { value: 'violet', label: 'Violet' },
          { value: 'brown', label: 'Brown' },
          { value: 'orange', label: 'Orange' },
          { value: 'gray', label: 'Gray' }
        ],
        presentation: {
          view: 'combobox',
          placeholder: 'Please select'
        }
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const SelectWithRadioButtons = args => <DynamicForm {...args} />;

SelectWithRadioButtons.storyName = 'Fields: Select/RadioButtons';
SelectWithRadioButtons.args = {
  ...Default.args,
  data: {
    color: 'pink'
  },
  form: {
    fields: [
      {
        type: 'select',
        id: 'color',
        label: 'Color',
        options: [
          { value: 'red', label: 'Red' },
          { value: 'green', label: 'Green' },
          { value: 'blue', label: 'Blue' },
          { value: 'pink', label: 'Pink' },
          { value: 'violet', label: 'Violet' },
          { value: 'brown', label: 'Brown' },
          { value: 'orange', label: 'Orange' },
          { value: 'gray', label: 'Gray' }
        ],
        presentation: {
          view: 'radiobuttons',
          placeholder: 'Please select'
        }
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

const dynamicListSource = [
  'Liam',
  'Olivia',
  'Noah',
  'Emma',
  'Oliver',
  'Ava',
  'William',
  'Sophia',
  'Elijah',
  'Isabella',
  'James',
  'Charlotte',
  'Benjamin',
  'Amelia',
  'Lucas',
  'Mia',
  'Mason',
  'Harper',
  'Ethan',
  'Evelyn'
].map(name => ({ value: name.toLowerCase(), name }));

const isMatch = (input, item) =>
  item.toLowerCase().match(new RegExp(`^.*${input?.split('').join('.*')}.*$`)) !== null;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const SelectWithDynamicLoading = args => <DynamicForm {...args} />;

SelectWithDynamicLoading.storyName = 'Fields: Select/ComboBox - Dynamic Loading';
SelectWithDynamicLoading.args = {
  ...Default.args,
  data: {
    color: 'pink'
  },
  form: {
    fields: [
      {
        type: 'select',
        id: 'combobox',
        label: 'Get data for Combobox input',
        options: [{ label: 'Loading...', value: undefined }],
        presentation: {
          view: 'combobox',
          placeholder: 'Please select',
          reactProps: {
            loadItems: async input => {
              await delay(500);
              return dynamicListSource.filter(i => isMatch(input, i.name));
            }
          }
        }
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const CustomField = args => <DynamicForm {...args} />;

CustomField.storyName = 'Extension: Custom Fields';
CustomField.args = {
  ...Default.args,
  customFieldDefinitions: {
    widgets: [
      {
        match: 'input.large',
        element: fieldBuilder((_f, opts, commonProps) => (
          <input
            type="text"
            key={commonProps.id}
            id={commonProps.id}
            {...opts.register(commonProps.name)}
            style={{
              fontSize: '200%',
              fontWeight: 'bold',
              backgroundColor: '#ffffcc'
            }}
          />
        ))
      }
    ]
  },
  form: {
    fields: [
      {
        type: 'group',
        label: 'Custom Field',
        helpText: 'Example: Custom text input field',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_required',
            label: 'Test',
            presentation: { view: 'large' }
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const CustomValidations = args => <DynamicForm {...args} />;

CustomValidations.storyName = 'Extension: Custom Validations';
CustomValidations.args = {
  ...Default.args,
  customValidationRules: {
    palindrome: (y, opts, _base, o) =>
      (y ?? yup.string()).test(
        'is-palindrom',
        // eslint-disable-next-line no-template-curly-in-string
        opts.intl.msg(o.message_code, '${path} is not a palindrom'),
        async value =>
          value ===
          value
            .split('')
            .reverse()
            .join('')
      )
  },
  form: {
    fields: [
      {
        type: 'group',
        label: 'Palindrome',
        helpText: 'Example: Field is palindrome',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'input',
            id: 'text_required',
            label: 'Test',
            validations: [{ type: 'palindrome' }]
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

const countries = [
  { name: 'United Kingdom', value: 'UK', states: undefined },
  {
    name: 'United States',
    value: 'US',
    states: [
      { name: 'Alabama', value: 'AL' },
      { name: 'Alaska', value: 'AK' },
      { name: 'Arizona', value: 'AZ' },
      { name: 'Arkansas', value: 'AR' },
      { name: 'California', value: 'CA' },
      { name: 'Colorado', value: 'CO' },
      { name: 'Connecticut', value: 'CT' },
      { name: 'Delaware', value: 'DE' },
      { name: 'District of Columbia', value: 'DC' }
    ]
  },
  {
    name: 'Canada',
    value: 'CA',
    states: [
      { value: 'AB', name: 'Alberta' },
      { value: 'BC', name: 'British Columbia' },
      { value: 'MB', name: 'Manitoba' },
      { value: 'NB', name: 'New Brunswick' },
      { value: 'NF', name: 'Newfoundland' },
      { value: 'NT', name: 'Northwest Territories' }
    ]
  }
];

export const ExampleCountryState = args => <DynamicForm {...args} />;

ExampleCountryState.storyName = 'Examples: Country and State';
ExampleCountryState.args = {
  ...Default.args,
  form: {
    fields: [
      {
        type: 'group',
        id: 'select',
        label: 'Select',
        presentation: { view: 'group' },
        fields: [
          {
            type: 'select',
            id: 'country',
            label: 'Country',
            options: countries.map(c => ({ label: c.name, value: c.value })),
            presentation: { view: 'dropdown' }
          },
          {
            type: 'select',
            id: 'state',
            label: 'State',
            options: countries
              .filter(c => c.states)
              .flatMap(c => c.states?.map(s => ({ ...s, country: c.value })))
              .map(s => ({
                label: s?.name,
                value: s?.value,
                enabled: {
                  ref: '../country',
                  property: 'value',
                  operator: 'eq',
                  operand: s?.country
                }
              })),
            presentation: { view: 'dropdown' }
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const ExamplePaymentForm = args => <DynamicForm {...args} />;

ExamplePaymentForm.storyName = 'Examples: Payment Form';
ExamplePaymentForm.args = {
  ...Default,
  data: {},
  form: {
    fields: [
      {
        id: 'type',
        label: 'Payment Method',
        type: 'select',
        options: [
          { value: 'credit-card', label: 'Credit Card' },
          { value: 'invoice', label: 'Invoice' }
        ]
      },

      {
        id: 'credit-card',
        type: 'group',
        presentation: {
          visible: {
            ref: '../type',
            property: 'value',
            operator: 'eq',
            operand: 'credit-card'
          }
        },
        fields: [
          {
            type: 'group',
            presentation: {
              view: 'side-by-side'
            },
            fields: [
              {
                id: 'creditCard.number',
                type: 'input',
                label: 'Card Number',
                validations: [{ type: 'required', message: 'Required' }],
                presentation: {
                  view: 'text',
                  placeholder: 'Card Number',
                  width: 80
                }
              },

              {
                id: 'creditCard.cvv',
                type: 'input',
                label: 'CVV',
                validations: [{ type: 'required', message: 'Required' }],
                presentation: {
                  view: 'text',
                  placeholder: 'CVV',
                  width: 20
                }
              }
            ]
          },

          {
            id: 'creditCard.name',
            type: 'input',
            label: 'Name on Card',
            validations: [{ type: 'required', message: 'Required' }],
            presentation: {
              view: 'text',
              placeholder: 'Name on Card'
            }
          },

          {
            type: 'group',
            presentation: {
              view: 'side-by-side'
            },
            fields: [
              {
                id: 'creditCard.expiration.year',
                type: 'select',
                label: 'Expiration',
                validations: [{ type: 'required', message: 'Required' }],
                presentation: {
                  placeholder: 'Year',
                  width: 50
                },
                options: [
                  { label: '2020', value: '2020' },
                  { label: '2021', value: '2021' },
                  { label: '2022', value: '2022' },
                  { label: '2023', value: '2023' },
                  { label: '2024', value: '2024' },
                  { label: '2025', value: '2025' }
                ]
              },

              {
                id: 'creditCard.expiration.month',
                type: 'select',
                label: '-',
                validations: [{ type: 'required', message: 'Required' }],
                presentation: {
                  placeholder: 'Month',
                  width: 50
                },
                options: [
                  { label: 'January', value: '1' },
                  { label: 'February', value: '2' },
                  { label: 'March', value: '3' },
                  { label: 'April', value: '4' },
                  { label: 'May', value: '5' },
                  { label: 'June', value: '6' },
                  { label: 'July', value: '7' },
                  { label: 'August', value: '8' },
                  { label: 'September', value: '9' },
                  { label: 'October', value: '10' },
                  { label: 'November', value: '11' },
                  { label: 'December', value: '12' }
                ]
              }
            ]
          }
        ]
      },

      {
        id: 'invoice',
        type: 'group',
        presentation: {
          visible: {
            ref: '../type',
            property: 'value',
            operator: 'eq',
            operand: 'invoice'
          }
        },
        fields: [
          {
            id: 'invoice.name',
            type: 'input',
            label: 'Name',
            validations: [{ type: 'required', message: 'Required' }],
            presentation: {
              view: 'text',
              placeholder: 'Name'
            }
          },

          {
            id: 'invoice.address',
            type: 'input',
            label: 'Address',
            validations: [{ type: 'required', message: 'Required' }],
            presentation: {
              view: 'text',
              placeholder: 'Address'
            }
          },

          {
            id: 'invoice.city',
            type: 'input',
            label: 'City',
            validations: [{ type: 'required', message: 'Required' }],
            presentation: {
              view: 'text',
              placeholder: 'City'
            }
          },

          {
            id: 'invoice.zip',
            type: 'input',
            label: 'Zip',
            validations: [{ type: 'required', message: 'Required' }],
            presentation: {
              view: 'text',
              placeholder: 'Zip'
            }
          }
        ]
      }
    ]
  } as DefaultSchema
};

// ---------------------------------------------------------------------------------------------------

export const LegacyForm = args => <DynamicForm {...args} />;

LegacyForm.storyName = 'Legacy Format';
LegacyForm.args = {
  schema: 'legacy',
  data: {},
  form: {
    name: 'Form',
    stages: [
      {
        steps: [
          {
            name: 'Step 1',
            type: 'form',
            title: 'What is your name',
            description: 'This is what your project will be called',
            blocks: [
              {
                name: 'Block 1',
                description: 'These are the simple field types',
                type: 'regular',
                elements: [
                  {
                    type: 'text',
                    id: 'issuer1',
                    label: 'Name my company',
                    placeholder: 'Cheeky Pint Inc',
                    width: 'full',
                    validationType: 'string',
                    validations: [
                      {
                        type: 'required',
                        params: ['This field is required']
                      }
                    ]
                  },
                  {
                    type: 'number',
                    id: 'issuer2',
                    label: 'Pick a number',
                    placeholder: 'second field',
                    width: 'full',
                    validationType: 'number',
                    validations: [
                      {
                        type: 'required',
                        params: ['This field is required']
                      }
                    ]
                  }
                ]
              },
              {
                name: 'Block 2',
                description: 'Second block',
                type: 'regular',
                elements: [
                  {
                    type: 'text',
                    id: 'issuer3',
                    label: 'Name my company',
                    placeholder: 'IBM',
                    width: 'full',
                    validationType: 'string',
                    validations: [
                      {
                        type: 'required',
                        params: ['This field is required']
                      }
                    ]
                  },
                  {
                    type: 'dropdown',
                    id: 'issuerAddressStateOrProvince',
                    label: 'Please enter your State',
                    options: ['Alabama', 'Alaska', 'American Samoa'],
                    width: 'full',
                    validationType: 'string',
                    validations: [
                      {
                        type: 'required',
                        params: ['This field is required']
                      }
                    ]
                  },
                  {
                    type: 'longtext',
                    id: 'issuerDescription',
                    label: 'Issuer Description - describe your holding company',
                    placeholder: 'What are you going to do to help your community?',
                    width: 'full',
                    validationType: 'string',
                    validations: [
                      {
                        type: 'required',
                        params: ['This field is required']
                      }
                    ]
                  }
                ]
              },
              {
                name: 'Block 3',
                description: 'Third block',
                type: 'regular',
                elements: [
                  {
                    type: 'date',
                    id: 'datePickerFirst',
                    label: 'Pick a date',
                    width: 'full',
                    validationType: 'string',
                    validations: [
                      {
                        type: 'required',
                        params: ['This field is required']
                      }
                    ]
                  },
                  {
                    type: 'checkbox',
                    id: 'firstCheckbox',
                    label: 'Pre-selected checkbox',
                    width: 'full',
                    checked: true
                  },
                  {
                    type: 'checkbox',
                    id: 'secondCheckbox',
                    label: 'Default checkbox',
                    width: 'full'
                  },
                  {
                    type: 'upload',
                    id: 'firstUpload',
                    label: 'Pick a file',
                    width: 'full'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
