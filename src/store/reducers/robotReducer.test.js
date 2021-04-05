import {DIRECTION} from '../../config/constant';
import {DIMENSION_GRID} from '../../pages/Simulator/config';
import {arrayFromInterger} from '../../utils';
import robotReducer, {
  TYPES,
  placeRobotAct,
  moveRobotAct,
  resetRobotAct,
  dropRobotAct,
} from './robotReducer';

describe('robot action', () => {
  it('create place action', () => {
    const position = {x: 2, y: 3};
    expect(placeRobotAct(position)).toEqual({
      type: TYPES.PLACE,
      payload: {position},
    });
  });

  it('create move action', () => {
    const direction = DIRECTION.EAST;
    expect(moveRobotAct(direction)).toEqual({
      type: TYPES.MOVE,
      payload: {direction},
    });
  });

  it('create reset action', () => {
    expect(resetRobotAct()).toEqual({
      type: TYPES.RESET,
    });
  });

  it('create drop action', () => {
    const position = {x: 2, y: 3};
    expect(dropRobotAct(position)).toEqual({
      type: TYPES.DROP,
      payload: {position},
    });
  });
});

describe('robot reducer', () => {
  const initWater = arrayFromInterger(DIMENSION_GRID.X * DIMENSION_GRID.Y).map(
    () => {
      return false;
    },
  );
  const initState = {
    hasPlaced: false,
    position: null,
    water: initWater,
  };

  it('should return the initial state', () => {
    expect(robotReducer(initState, {})).toEqual(initState);
  });

  it('should return the state after place', () => {
    const action = {
      type: TYPES.PLACE,
      payload: {
        position: {x: 2, y: 3},
      },
    };
    expect(robotReducer(initState, action)).toEqual({
      position: {x: 2, y: 3},
      hasPlaced: true,
      water: initWater,
    });
  });

  it('should return the state after move', () => {
    const state = {
      position: {x: 2, y: 3},
      hasPlaced: true,
      water: [],
    };
    const action = {
      type: TYPES.MOVE,
      payload: {
        direction: DIRECTION.EAST,
      },
    };
    expect(robotReducer(state, action)).toEqual({
      position: {x: 3, y: 3},
      hasPlaced: true,
      water: [],
    });
  });

  it('should return the state after drop', () => {
    const state = {
      position: {x: 2, y: 3},
      hasPlaced: true,
      water: initWater,
    };
    const action = {
      type: TYPES.DROP,
      payload: {
        position: {x: 1, y: 1},
      },
    };
    expect(robotReducer(state, action)).toEqual({
      position: {x: 2, y: 3},
      hasPlaced: true,
      water: [
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
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
      ],
    });
  });

  it('should reset the state', () => {
    const state = {
      hasPlaced: true,
      position: {x: 2, y: 3},
      water: [],
    };
    const action = {
      type: TYPES.RESET,
    };
    expect(robotReducer(state, action)).toEqual({
      hasPlaced: false,
      position: null,
      water: initWater,
    });
  });
});
