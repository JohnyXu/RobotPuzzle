import {DIRECTION} from '../../config/constant';
import {
  isNextPositionValid,
  getWellBelowStatus,
  convertGridIndex,
  hasWaterInPosition,
} from './util';

describe('simulator util', () => {
  it('test next position valid', () => {
    expect(isNextPositionValid({x: 3, y: 3}, DIRECTION.EAST)).toBe(true);
    expect(isNextPositionValid({x: 0, y: 0}, DIRECTION.WEST)).toBe(false);
  });

  it('get below status', () => {
    expect(getWellBelowStatus({x: 3, y: 3})).toEqual('EMPTY');
    expect(getWellBelowStatus({x: 0, y: 0})).toEqual('FULL');
  });

  it('convert to grid index', () => {
    expect(convertGridIndex(3, 3)).toBe(18);
    expect(convertGridIndex(0, 3)).toBe(3);
  });

  it('has water in grid', () => {
    expect(
      hasWaterInPosition(1, 3, [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]),
    ).toBe(true);
  });
});
