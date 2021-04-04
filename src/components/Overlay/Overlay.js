import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {ZINDEX} from '../../config/constant';

const {width, height} = Dimensions.get('window');

export default function Overlay(props) {
  const {text} = props;
  const ovWidth = 300;
  const ovHeight = 200;

  return (
    <View
      style={{
        width: ovWidth,
        height: ovHeight,
        zIndex: ZINDEX.OVERLAY,
        left: (width - ovWidth) / 2,
        top: (height - ovHeight) / 4,
        ...styles.layout,
      }}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
