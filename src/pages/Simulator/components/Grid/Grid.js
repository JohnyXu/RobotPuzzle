import React from 'react';
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

  const getCellView = (rowIndex, colIndex) => {
    return {
      width: SIZE_GRID.WIDTH,
      height: SIZE_GRID.HEIGHT,
      opacity: 0.5,
      backgroundColor: (rowIndex + colIndex) % 2 === 0 ? 'red' : 'blue',
    };
  };

  return (
    <View style={styles.layout}>
      <View style={styles.leftView}>
        {rows.map(index => {
          return (
            <Text key={index} style={styles.xText}>
              {DIMENSION_GRID.Y - 1 - index}
            </Text>
          );
        })}
        <Icon name="compass-alt" size={45} />
      </View>
      <View style={styles.rightView}>
        {robotState.water && (
          <View style={styles.gridView}>
            {rows.map(rowIndex => {
              return (
                <View key={rowIndex} style={styles.rowView}>
                  {columns.map(colIndex => {
                    const hasWater = hasWaterInPosition(
                      rowIndex,
                      colIndex,
                      robotState.water,
                    );
                    return (
                      <View
                        key={colIndex}
                        style={getCellView(rowIndex, colIndex)}>
                        {hasWater && <Water />}
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        )}
        <View style={styles.yAxisView}>
          {columns.map(index => {
            return (
              <Text key={index} style={styles.yText}>
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

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  leftView: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  rightView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  xText: {
    fontSize: 21,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  gridView: {
    position: 'relative',
    flexDirection: 'column',
  },
  rowView: {
    flexDirection: 'row',
  },
  yAxisView: {
    flexDirection: 'row',
  },
  yText: {
    fontSize: 21,
    paddingHorizontal: 23,
    paddingVertical: 8,
  },
});
