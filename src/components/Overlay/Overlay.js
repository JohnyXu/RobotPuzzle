import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {ZINDEX} from '../../config/constant';

export default function Overlay(props) {
  const {text} = props;
  console.log('text:', text);
  const {width, height} = Dimensions.get('window');
  const ovWidth = 300;
  const ovHeight = 200;

  return (
    <View
      style={{
        zIndex: ZINDEX.OVERLAY,
        top: (height - ovHeight) / 4,
        left: (width - ovWidth) / 2,
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        width: ovWidth,
        height: ovHeight,
      }}>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </View>
  );
}
