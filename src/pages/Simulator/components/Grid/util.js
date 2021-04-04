import {Dimensions} from 'react-native';
import {DIMENSION_GRID} from '../../config';

export const convertGridIndex = (rowIndex, colIndex) => {
  const index = DIMENSION_GRID.X * rowIndex + colIndex;
  return index;
};

export const isInRange = (digit, low, high) => {
  return digit >= low && digit < high;
};

export const hasWaterInPosition = (rowIndex, colIndex, water) => {
  const index = convertGridIndex(rowIndex, colIndex);
  return water[index];
};
