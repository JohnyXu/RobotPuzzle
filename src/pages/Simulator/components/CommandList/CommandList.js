import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function CommandList(props) {
  const {commands} = props;

  return (
    <View style={styles.layout}>
      <View style={styles.commandView}>
        {commands.map((command, index) => {
          return (
            <View key={index} style={styles.textView}>
              <Text style={styles.text}>
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

const styles = StyleSheet.create({
  layout: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    opacity: 0.6,
  },
  commandView: {
    color: 'white',
    flexDirection: 'column',
    marginVertical: 10,
  },
  textView: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    color: 'white',
  },
});
