import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SIZE_GRID} from '../../../../config';

const WIDTH = SIZE_GRID.WIDTH;
const HEIGHT = SIZE_GRID.HEIGHT;

export default function Water() {
  return (
    <View style={styles.iconView}>
      <Icon name="water" size={30} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  iconView: {
    zIndex: 2,
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
