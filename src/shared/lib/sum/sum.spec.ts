import { sum } from './sum';

describe('sum function', () => {
  it('should return sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(2, 4)).toBe(6);
    expect(sum(0, 0)).toBe(0);
  });
});
