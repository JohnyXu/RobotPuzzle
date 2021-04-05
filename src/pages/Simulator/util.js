import {
  isEastDirection,
  isNorthDirection,
  isSouthDirection,
  isWestDirection,
} from '../../utils';
import {DIMENSION_GRID} from './config';

export const isNextPositionValid = (position, direction) => {
  if (isEastDirection(direction)) {
    return position.x + 1 < DIMENSION_GRID.X;
  }
  if (isWestDirection(direction)) {
    return position.x - 1 >= 0;
  }
  if (isSouthDirection(direction)) {
    return position.y - 1 >= 0;
  }
  if (isNorthDirection(direction)) {
    return position.y + 1 < DIMENSION_GRID.Y;
  }
  return true;
};

export const getWellBelowStatus = position => {
  const {y} = position;
  const belowY = y - 1;
  if (belowY < 0) {
    return 'FULL';
  }
  return 'EMPTY';
};

export const convertGridIndex = (rowIndex, colIndex) => {
  const index = DIMENSION_GRID.X * rowIndex + colIndex;
  return index;
};

export const hasWaterInPosition = (rowIndex, colIndex, water) => {
  const index = convertGridIndex(rowIndex, colIndex);
  return water[index];
};
