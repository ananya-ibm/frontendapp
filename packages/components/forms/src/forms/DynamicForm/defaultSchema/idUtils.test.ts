/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { resolveRef, getData, setData, makeIndexedId } from './idUtils';


describe('idUtils', () => {
  describe('resolveRef', () => {
    test('resolve', () => {
      expect(resolveRef([], 'lorem.ipsum')).toEqual('lorem.ipsum');
      expect(resolveRef([ 'lorem' ], 'lorem.ipsum')).toEqual('lorem.lorem.ipsum');
      expect(resolveRef([ 'lorem' ], '../lorem.ipsum')).toEqual('lorem.ipsum');
      expect(resolveRef([ 'lorem', 'ipsum' ], '../../ipsum')).toEqual('ipsum');
    });
  });

  describe('getData', () => {
    test('get path', () => {
      expect(getData({ lorem: 123 }, 'lorem')).toEqual(123);
      expect(getData({ lorem: 123 }, 'ipsum')).toBeUndefined();
      expect(getData({ lorem: { ipsum: 456 } }, 'lorem.ipsum')).toEqual(456);
    });

    test('get array', () => {
      expect(getData({ lorem: [ { ipsum: 456 }, { ipsum: 789 } ] }, 'lorem[0].ipsum')).toEqual(456);
      expect(getData({ lorem: [ { ipsum: 456 }, { ipsum: 789 } ] }, 'lorem[1].ipsum')).toEqual(789);
    });
  });

  describe('setData', () => {
    test('simple path', () => {
      expect(setData({}, 'lorem.ipsum', 123)).toEqual({ lorem: { ipsum: 123 } });
      expect(setData({ test: 456 }, 'lorem.ipsum', 123)).toEqual({ test: 456, lorem: { ipsum: 123 } });
    });

    test('array with no index', () => {
      expect(setData({}, 'lorem[].ipsum', 123)).toEqual({ lorem: [ { ipsum: 123 } ] });
    });

    test('array with index', () => {
      expect(setData({}, 'lorem[0].ipsum', 123)).toEqual({ lorem: [ { ipsum: 123 } ] });
      expect(setData({}, 'lorem[1].ipsum', 123)).toEqual({ lorem: [ undefined, { ipsum: 123 } ] });
    });
  });

  describe('makeIndexedId', () => {
    test('no change if no array', () => {
      expect(makeIndexedId('lorem.ipsum', [])).toEqual('lorem.ipsum');
      expect(makeIndexedId('lorem.ipsum', [1, 2, 3])).toEqual('lorem.ipsum');
    });

    test('adds ids', () => {
      expect(makeIndexedId('lorem[].ipsum', [1])).toEqual('lorem[1].ipsum');
      expect(makeIndexedId('lorem[].ipsum[]', [1, 2])).toEqual('lorem[1].ipsum[2]');
    });

  });
});
