import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {arrayFromInterger} from '../../../../utils';
import {DIMENSION_GRID, SIZE_GRID} from '../../config';
import Robot from './components/Robot';
import Water from './components/Water';
import {hasWaterInPosition} from './util';

export default function Grid() {
  const rows = arrayFromInterger(DIMENSION_GRID.Y);
  const columns = arrayFromInterger(DIMENSION_GRID.X);

  const robotState = useSelector(state => state.robot);
  console.log(robotState);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
      }}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginHorizontal: 8,
        }}>
        {rows.map(index => {
          return (
            <Text
              key={index}
              style={{
                fontSize: 21,
                paddingVertical: 16,
                paddingHorizontal: 10,
              }}>
              {DIMENSION_GRID.Y - 1 - index}
            </Text>
          );
        })}
        <Icon name="compass-alt" size={45} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        {robotState.water && (
          <View
            style={{
              position: 'relative',
              flexDirection: 'column',
            }}>
            {rows.map(rowIndex => {
              return (
                <View
                  key={rowIndex}
                  style={{
                    flexDirection: 'row',
                  }}>
                  {columns.map(colIndex => {
                    const hasWater = hasWaterInPosition(
                      rowIndex,
                      colIndex,
                      robotState.water,
                    );
                    return (
                      <View
                        key={colIndex}
                        style={{
                          width: SIZE_GRID.WIDTH,
                          height: SIZE_GRID.HEIGHT,
                          opacity: 0.5,
                          backgroundColor:
                            (rowIndex + colIndex) % 2 === 0 ? 'red' : 'blue',
                        }}>
                        {hasWater && <Water />}
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
          }}>
          {columns.map(index => {
            return (
              <Text
                key={index}
                style={{
                  fontSize: 21,
                  paddingHorizontal: 23,
                  paddingVertical: 8,
                }}>
                {index}
              </Text>
            );
          })}
        </View>
        {robotState && robotState.hasPlaced && robotState.position && (
          <Robot
            row={DIMENSION_GRID.Y - 1 - robotState.position.y}
            col={robotState.position.x}
          />
        )}
      </View>
    </View>
  );
}
