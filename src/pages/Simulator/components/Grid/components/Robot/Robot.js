import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SIZE_GRID} from '../../../../config';

const WIDTH = SIZE_GRID.WIDTH;
const HEIGHT = SIZE_GRID.HEIGHT;

export default function Robot(props) {
  const {row, col} = props;
  return (
    <View
      style={{
        left: col * WIDTH,
        top: row * HEIGHT,
        ...styles.robotView,
      }}>
      <Icon name="robot" size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  robotView: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
