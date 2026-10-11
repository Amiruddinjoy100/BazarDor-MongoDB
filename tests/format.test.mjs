import test from 'node:test';
import assert from 'node:assert/strict';
import { banglaNumber, toNumber, sortedProducts, changeInfo, marketSummary, productPath } from '../lib/format.js';

test('converts Bengali numerals into numbers for price comparison', () => {
  assert.equal(toNumber('১,৮৫০'), 1850);
  assert.equal(toNumber('১৪৮ টাকা'), NaN); // Labels are intentionally not silently parsed.
  assert.equal(toNumber('১,৮৫০৳'), 1850);
  assert.equal(banglaNumber(1850), '১,৮৫০');
});
test('sorts numerically rather than alphabetically', () => {
  const products = [{today:'৯৯',id:1},{today:'১,৮৫০',id:2},{today:'১২',id:3}];
  assert.deepEqual(sortedProducts(products,'asc').map(p=>p.id),[3,1,2]);
  assert.deepEqual(sortedProducts(products,'desc').map(p=>p.id),[2,1,3]);
  assert.deepEqual(sortedProducts(products,'default').map(p=>p.id),[1,2,3]);
});
test('computes market summary based on real market ranges', () => {
  assert.deepEqual(marketSummary({today:95,markets:[{min:60,max:80},{min:100,max:120}]}),{min:60,max:120,average:90});
});
test('respects supplied percent and direction and protected slug link', () => {
  assert.deepEqual(changeInfo({change:{dir:'up',pct:2.1}}),{dir:'up',pct:2.1});
  assert.equal(productPath({slug:'alu'}),'/product/alu');
});
