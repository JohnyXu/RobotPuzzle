import {DIRECTION} from '../config/constant';
import {
  arrayFromInterger,
  isEastDirection,
  isWestDirection,
  isSouthDirection,
  isNorthDirection,
  isInRange,
} from './index';

describe('util function', () => {
  it('array from interger', () => {
    expect(arrayFromInterger(3)).toEqual([0, 1, 2]);
  });

  it('direction function', () => {
    expect(isEastDirection(DIRECTION.EAST)).toBe(true);
    expect(isWestDirection(DIRECTION.WEST)).toBe(true);
    expect(isSouthDirection(DIRECTION.SOUTH)).toBe(true);
    expect(isNorthDirection(DIRECTION.NORTH)).toBe(true);
  });

  it('digit range', () => {
    expect(isInRange(3, 2, 5)).toBeTruthy();
    expect(isInRange(3, 4, 6)).toBeFalsy();
  });
});
