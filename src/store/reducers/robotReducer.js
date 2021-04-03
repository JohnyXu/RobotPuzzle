import {DIRECTION} from '../../config/constant';

const initState = {
  position: null,
  hasPlaced: false,
};

export const TYPES = {
  PLACE: 'PLACE',
  MOVE: 'MOVE',
  RESET: 'RESET',
};

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

const moveNextPosition = (position, direction) => {
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

export default function reducer(state = initState, action) {
  console.log('action:', action);
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
        position: moveNextPosition(state.position, action.payload.direction),
      };
    case TYPES.RESET:
      return {
        hasPlaced: false,
        position: null,
      };
    default:
      return state;
  }
}
