import {DIRECTION} from '../config/constant';

export const arrayFromInterger = range => {
  return Array.from(Array(range).keys(), i => i);
};

export const isEastDirection = direction => {
  return direction === DIRECTION.E || direction === DIRECTION.EAST;
};

export const isWestDirection = direction => {
  return direction === DIRECTION.W || direction === DIRECTION.WEST;
};

export const isSouthDirection = direction => {
  return direction === DIRECTION.S || direction === DIRECTION.SOUTH;
};

export const isNorthDirection = direction => {
  return direction === DIRECTION.N || direction === DIRECTION.NORTH;
};
