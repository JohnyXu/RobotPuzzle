import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {Button, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import CommandList from './components/CommandList';
import Grid from './components/Grid';
import {
  moveRobotAct,
  placeRobotAct,
  resetRobotAct,
} from '../../store/reducers/robotReducer';
import {COMMAND, DIRECTION} from '../../config/constant';
import {isNextPositionValid} from './util';
import {errorSettingAct} from '../../store/reducers/settingReducer';
import ERROR_MSG from '../../config/error-msg';

export default function Simulator() {
  const dispatch = useDispatch();
  const [command, setCommand] = useState('');
  const [commands, updateCommands] = useState([]);
  const robotState = useSelector(state => state.robot);

  const onChangeEvent = text => {
    setCommand(text.toUpperCase());
  };
  const onSubmitEditing = ({nativeEvent: {key: keyValue}}) => {
    const markCommand = command;
    setCommand('');
    const commandOptions = command.split(' ');
    if (commandOptions.length <= 0) {
      return;
    }
    const cmd = commandOptions[0];
    console.log(cmd);
    if (Object.keys(COMMAND).indexOf(cmd) < 0) {
      return;
    }
    if (cmd !== COMMAND.PLACE) {
      if (robotState.hasPlaced) {
        if (cmd === COMMAND.MOVE) {
          const isValid = isNextPositionValid(
            robotState.position,
            commandOptions[1],
          );
          if (isValid) {
            updateCommands([...commands, markCommand]);
            dispatch(moveRobotAct(commandOptions[1]));
          } else {
            dispatch(errorSettingAct(ERROR_MSG.OVER_SHOOT));
          }
        }
      }
      return;
    }
    const [x, y] = commandOptions[1].split(',');
    updateCommands([...commands, markCommand]);
    dispatch(placeRobotAct({x, y}));
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <Text style={styles.simulatorTitle}>Let's play with the robot</Text>
        <Grid />
        <TextInput
          placeholder={'Tell the robot what to do ...'}
          value={command}
          returnKeyType={'done'}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeEvent}
          style={{
            paddingHorizontal: 10,
            marginHorizontal: 10,
            marginVertical: 6,
            height: 50,
            borderColor: 'grey',
            borderRadius: 5,
            borderWidth: 1,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            marginVertical: 10,
          }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 5,
            }}>
            <Button
              full
              warning
              style={{
                height: 50,
              }}
              onPress={() => {
                dispatch(
                  placeRobotAct({
                    x: 1,
                    y: 2,
                  }),
                );
              }}>
              <Text>Run</Text>
            </Button>
          </View>
          <View style={{flex: 1, marginHorizontal: 5}}>
            <Button
              full
              style={{
                height: 50,
              }}
              onPress={() => {
                dispatch(resetRobotAct());
              }}>
              <Text>Reset</Text>
            </Button>
          </View>
        </View>
        {commands.length > 0 && <CommandList commands={commands} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  simulatorTitle: {
    color: 'red',
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 10,
  },
});
