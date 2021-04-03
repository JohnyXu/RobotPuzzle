import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ROBOT_WIDTH = 60;
const ROBOT_HEIGHT = 60;

export default function Robot(props) {
  const {row, col} = props;
  return (
    <View
      style={{
        top: row * ROBOT_HEIGHT,
        left: col * ROBOT_WIDTH,
        ...styles.robotView,
      }}>
      <Icon name="robot" size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  robotView: {
    flex: 1,
    width: ROBOT_WIDTH,
    height: ROBOT_HEIGHT,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
