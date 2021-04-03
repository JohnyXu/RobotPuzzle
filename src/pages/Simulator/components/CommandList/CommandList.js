import React from 'react';
import {View, Text} from 'react-native';

export default function CommandList(props) {
  const {commands} = props;
  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'black',
        opacity: 0.6,
      }}>
      <View
        style={{
          color: 'white',
          flexDirection: 'column',
          marginVertical: 10,
        }}>
        {commands.map((command, index) => {
          return (
            <View
              key={index}
              style={{paddingHorizontal: 10, paddingVertical: 6}}>
              <Text
                style={{
                  color: 'white',
                }}>
                {'>  '}
                {command}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
