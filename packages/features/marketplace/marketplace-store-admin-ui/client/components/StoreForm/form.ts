/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const form = {
  fields: [
    {
      type: 'group',
      label: 'Store Name',
      presentation: { view: 'group' },
      fields: [
        {
          type: 'input',
          id: 'name',
          label: 'Store Name',
          validations: [{ type: 'required', message: 'This field is required' }]
        },
        {
          type: 'input',
          id: 'announcement',
          label: 'Store Announcement',
          validations: [{ type: 'required', message: 'This field is required' }]
        }
      ]
    },

    {
      type: 'group',
      label: 'Store Details',
      presentation: { view: 'group' },
      fields: [
        {
          type: 'input',
          id: 'address1',
          label: 'Address Line 1',
          validations: [{ type: 'required', message: 'This field is required' }]
        },
        {
          type: 'input',
          id: 'address2',
          label: 'Address Line 2',
          validations: [{ type: 'required', message: 'This field is required' }]
        },
        {
          type: 'input',
          id: 'city',
          label: 'City',
          validations: [{ type: 'required', message: 'This field is required' }]
        },
        {
          type: 'input',
          id: 'county',
          label: 'County',
          validations: [{ type: 'required', message: 'This field is required' }]
        },
        {
          type: 'input',
          id: 'zip',
          label: 'Postcode',
          validations: [{ type: 'required', message: 'This field is required' }]
        },
        {
          type: 'select',
          id: 'country',
          label: 'Country',
          options: [
            { label: 'UK', value: 'UK' },
            { label: 'EU', value: 'EU' },
            { label: 'USA', value: 'USA' }
          ],
          presentation: { view: 'dropdown' }
        },
        {
          type: 'input',
          id: 'phone',
          label: 'Telephone',
          validations: [{ type: 'required', message: 'This field is required' }]
        },
        {
          type: 'input',
          id: 'vatNo',
          label: 'VAT Number',
          validations: [{ type: 'required', message: 'This field is required' }]
        }
      ]
    },

    {
      type: 'group',
      label: 'Store Theme',
      presentation: { view: 'group' },
      fields: [
        {
          type: 'select',
          id: 'theme',
          label: 'Please chose your theme',
          options: [
            { label: 'One', value: 'One' },
            { label: 'Two', value: 'Two' },
            { label: 'Three', value: 'Three' }
          ],
          presentation: { view: 'dropdown' }
        },
        {
          type: 'input',
          id: 'logo',
          label: 'Store Logo',
          validations: [{ type: 'required', message: 'This field is required' }]
        },
        {
          type: 'input',
          id: 'image',
          label: 'Store Image',
          validations: [{ type: 'required', message: 'This field is required' }]
        }
      ]
    }
  ]
};
