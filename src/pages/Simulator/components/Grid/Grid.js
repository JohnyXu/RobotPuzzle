import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {arrayFromInterger} from '../../../../utils';
import {DIMENSION_GRID} from '../../config';
import Robot from './components/Robot';

export default function Grid() {
  const rows = arrayFromInterger(DIMENSION_GRID.Y);
  const columns = arrayFromInterger(DIMENSION_GRID.X);

  const robotState = useSelector(state => state.robot);

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
                fontSize: 20,
                paddingVertical: 20,
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
                  return (
                    <View
                      key={colIndex}
                      style={{
                        width: 60,
                        height: 60,
                        opacity: 0.5,
                        backgroundColor:
                          (rowIndex + colIndex) % 2 === 0 ? 'red' : 'blue',
                      }}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {columns.map(index => {
            return (
              <Text
                key={index}
                style={{
                  fontSize: 20,
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
