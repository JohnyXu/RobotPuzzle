import {DIRECTION} from '../../config/constant';
import {convertGridIndex} from '../../pages/Simulator/components/Grid/util';
import {DIMENSION_GRID} from '../../pages/Simulator/config';
import {arrayFromInterger} from '../../utils';

const initWater = arrayFromInterger(DIMENSION_GRID.X * DIMENSION_GRID.Y).map(
  () => {
    return false;
  },
);

const initState = {
  position: null,
  hasPlaced: false,
  water: initWater,
};

// types
export const TYPES = {
  PLACE: 'PLACE',
  MOVE: 'MOVE',
  RESET: 'RESET',
  DROP: 'DROP',
  REPORT: 'REPORT',
};

// actions
export const placeRobotAct = position => {
  return {
    type: TYPES.PLACE,
    payload: {position},
  };
};

export const moveRobotAct = direction => {
  return {
    type: TYPES.MOVE,
    payload: {direction},
  };
};

export const resetRobotAct = () => {
  return {
    type: TYPES.RESET,
  };
};

export const dropRobotAct = position => {
  return {
    type: TYPES.DROP,
    payload: {position},
  };
};

// reducer
const moveRobotReducer = (position, direction) => {
  if (direction === DIRECTION.EAST || direction === DIRECTION.E) {
    return {
      ...position,
      x: position.x + 1,
    };
  }
  if (direction === DIRECTION.WEST || direction === DIRECTION.W) {
    return {
      ...position,
      x: position.x - 1,
    };
  }
  if (direction === DIRECTION.SOUTH || direction === DIRECTION.S) {
    return {
      ...position,
      y: position.y - 1,
    };
  }
  if (direction === DIRECTION.NORTH || direction === DIRECTION.N) {
    return {
      ...position,
      y: position.y + 1,
    };
  }
  return position;
};

const dropRobotReducer = (water, position) => {
  const belowY = position.y - 1;
  if (belowY < 0) {
    return water;
  }
  const dropIndex = convertGridIndex(DIMENSION_GRID.Y - 1 - belowY, position.x);
  return water.map((enable, index) => {
    if (index === dropIndex) {
      return true;
    }
    return enable;
  });
};

export default function reducer(state = initState, action) {
  console.log('action:', action, state);
  switch (action.type) {
    case TYPES.PLACE:
      return {
        ...state,
        hasPlaced: true,
        position: action.payload.position,
      };
    case TYPES.MOVE:
      return {
        ...state,
        position: moveRobotReducer(state.position, action.payload.direction),
      };
    case TYPES.DROP:
      return {
        ...state,
        water: dropRobotReducer(state.water, action.payload.position),
      };
    case TYPES.RESET:
      return {
        hasPlaced: false,
        position: null,
        water: initWater,
      };
    default:
      return state;
  }
}
