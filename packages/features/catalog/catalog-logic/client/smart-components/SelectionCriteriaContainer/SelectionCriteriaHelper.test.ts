/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  evaluateSelectionCriteria,
  undefinedToNull
} from './SelectionCriteriaHelper';

describe('SelectionCriteriaHelper', () => {
  describe('undefinedToNull', () => {
    test('undefined -> null', () => {
      expect(undefinedToNull(undefined)).toBeNull();
    });

    test('non undefined -> non undefined', () => {
      expect(undefinedToNull('some non undefined value')).toBe(
        'some non undefined value'
      );
    });
  });

  describe('evaluateSelectionCriteria', () => {
    const selection = [
      {
        id: '10040',
        criteria: [
          {
            criteriaId: 'swatchSize',
            sequence: '1',
            name: 'Available Sizes',
            value: { id: 'XS', value: 'XS', sequence: '1' }
          },
          {
            criteriaId: 'swatchcolor',
            sequence: '2',
            name: 'Color',
            value: { id: 'Red', value: 'Red', sequence: '1' }
          }
        ]
      },
      {
        id: '10041',
        criteria: [
          {
            criteriaId: 'swatchSize',
            sequence: '1',
            name: 'Available Sizes',
            value: { id: 'M', value: 'M', sequence: '3' }
          },
          {
            criteriaId: 'swatchcolor',
            sequence: '2',
            name: 'Color',
            value: { id: 'Red', value: 'Red', sequence: '1' }
          }
        ]
      },
      {
        id: '10042',
        criteria: [
          {
            criteriaId: 'swatchcolor',
            sequence: '2',
            name: 'Color',
            value: { id: 'Green', value: 'Green', sequence: '2' }
          },
          {
            criteriaId: 'swatchSize',
            sequence: '1',
            name: 'Available Sizes',
            value: { id: 'XS', value: 'XS', sequence: '1' }
          }
        ]
      },
      {
        id: '10043',
        criteria: [
          {
            criteriaId: 'swatchSize',
            sequence: '1',
            name: 'Available Sizes',
            value: { id: 'XL', value: 'XL', sequence: '5' }
          },
          {
            criteriaId: 'swatchcolor',
            sequence: '2',
            name: 'Color',
            value: { id: 'Green', value: 'Green', sequence: '2' }
          }
        ]
      }
    ];

    test('with no state - all options available', () => {
      const activeSelection = {};
      const fallbackActiveSelection = {};
      expect(
        evaluateSelectionCriteria(
          activeSelection,
          selection,
          fallbackActiveSelection
        )
      ).toStrictEqual({
        skus: ['10040', '10041', '10042', '10043'],
        activeSelection: {},
        criteria: [
          {
            id: 'swatchSize',
            name: 'Available Sizes',
            sequence: '1',
            values: [
              { id: 'XS', value: 'XS', sequence: '1', available: true },
              { id: 'M', value: 'M', sequence: '3', available: true },
              { id: 'XL', value: 'XL', sequence: '5', available: true }
            ]
          },
          {
            id: 'swatchcolor',
            name: 'Color',
            sequence: '2',
            values: [
              { id: 'Red', value: 'Red', sequence: '1', available: true },
              { id: 'Green', value: 'Green', sequence: '2', available: true }
            ]
          }
        ]
      });
    });

    test('with state - limit available options accordingly', () => {
      const activeSelection = {
        swatchcolor: 'Red'
      };
      const fallbackActiveSelection = {};
      expect(
        evaluateSelectionCriteria(
          activeSelection,
          selection,
          fallbackActiveSelection
        )
      ).toStrictEqual({
        skus: ['10040', '10041'],
        activeSelection: {
          swatchcolor: 'Red'
        },
        criteria: [
          {
            id: 'swatchSize',
            name: 'Available Sizes',
            sequence: '1',
            values: [
              { id: 'XS', value: 'XS', sequence: '1', available: true },
              { id: 'M', value: 'M', sequence: '3', available: true },
              { id: 'XL', value: 'XL', sequence: '5', available: false }
            ]
          },
          {
            id: 'swatchcolor',
            name: 'Color',
            sequence: '2',
            values: [
              { id: 'Red', value: 'Red', sequence: '1', available: true },
              { id: 'Green', value: 'Green', sequence: '2', available: true }
            ]
          }
        ]
      });
    });

    test('with impossible state - use fallback selection', () => {
      const activeSelection = {
        swatchcolor: 'Red',
        swatchSize: 'XL'
      };
      const fallbackActiveSelection = {
        swatchSize: 'XL'
      };
      expect(
        evaluateSelectionCriteria(
          activeSelection,
          selection,
          fallbackActiveSelection
        )
      ).toStrictEqual({
        skus: ['10043'],
        activeSelection: {
          swatchSize: 'XL'
        },
        criteria: [
          {
            id: 'swatchSize',
            name: 'Available Sizes',
            sequence: '1',
            values: [
              { id: 'XS', value: 'XS', sequence: '1', available: true },
              { id: 'M', value: 'M', sequence: '3', available: true },
              { id: 'XL', value: 'XL', sequence: '5', available: true }
            ]
          },
          {
            id: 'swatchcolor',
            name: 'Color',
            sequence: '2',
            values: [
              { id: 'Red', value: 'Red', sequence: '1', available: false },
              { id: 'Green', value: 'Green', sequence: '2', available: true }
            ]
          }
        ]
      });
    });
  });
});
