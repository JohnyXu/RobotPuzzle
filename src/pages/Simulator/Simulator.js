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
  dropRobotAct,
  moveRobotAct,
  placeRobotAct,
  resetRobotAct,
} from '../../store/reducers/robotReducer';
import {COMMAND, DIRECTION} from '../../config/constant';
import {getWellBelowStatus, isNextPositionValid} from './util';
import {errorSettingAct} from '../../store/reducers/settingReducer';
import ERROR_MSG from '../../config/error-msg';
import Overlay from '../../components/Overlay';
import {DIMENSION_GRID} from './config';
import {isInRange} from './components/Grid/util';

export default function Simulator() {
  const dispatch = useDispatch();
  const [command, setCommand] = useState('');
  const [commands, updateCommands] = useState([]);
  const robotState = useSelector(state => state.robot);
  const settingState = useSelector(state => state.setting);
  console.log('setting:', settingState);

  const onChangeEvent = text => {
    setCommand(text.toUpperCase());
  };
  const onSubmitEditing = () => {
    const markCommand = command.substr(0);
    setCommand('');
    const commandOptions = command.split(' ');
    if (commandOptions.length <= 0) {
      return;
    }
    const cmd = commandOptions[0];
    if (Object.keys(COMMAND).indexOf(cmd) < 0) {
      return;
    }
    if (cmd !== COMMAND.PLACE) {
      if (!robotState.hasPlaced) {
        dispatch(errorSettingAct(ERROR_MSG.FIRST_VALID));
        return;
      }
      if (cmd === COMMAND.MOVE) {
        const isValid = isNextPositionValid(
          robotState.position,
          commandOptions[1],
        );
        console.log('cmd:', isValid, robotState.position.y);
        if (isValid) {
          updateCommands([...commands, markCommand]);
          dispatch(moveRobotAct(commandOptions[1]));
          dispatch(errorSettingAct(''));
        } else {
          dispatch(errorSettingAct(ERROR_MSG.OVER_SHOOT));
        }
      } else if (cmd === COMMAND.DETECT) {
        const status = getWellBelowStatus(robotState.position);
        updateCommands([...commands, ...[markCommand, `Output: ${status}`]]);
      } else if (cmd === COMMAND.DROP) {
        if (robotState.position.y >= 1) {
          dispatch(dropRobotAct(robotState.position));
        } else {
          dispatch(errorSettingAct(ERROR_MSG.BELOW_FULL));
        }
        updateCommands([...commands, markCommand]);
      } else if (cmd === COMMAND.REPORT) {
        const status = getWellBelowStatus(robotState.position);
        const {x, y} = robotState.position;
        updateCommands([
          ...commands,
          ...[markCommand, `Output: ${x},${y},${status}`],
        ]);
      }
      return;
    }
    if (!commandOptions[1]) {
      return dispatch(errorSettingAct(ERROR_MSG.PLACE_FORMAT));
    }
    // place
    const [x, y] = commandOptions[1].split(',');
    if (!y) {
      return dispatch(errorSettingAct(ERROR_MSG.PLACE_FORMAT));
    }
    const rowIndex = parseInt(y);
    const colIndex = parseInt(x);
    const isValidPosition =
      isInRange(rowIndex, 0, DIMENSION_GRID.Y) &&
      isInRange(colIndex, 0, DIMENSION_GRID.X);
    if (!isValidPosition) {
      return dispatch(errorSettingAct(ERROR_MSG.PLACE_FORMAT));
    }
    updateCommands([...commands, markCommand]);
    dispatch(errorSettingAct(''));
    dispatch(placeRobotAct({x: parseInt(x), y: parseInt(y)}));
  };

  return (
    <SafeAreaView
      style={{
        position: 'relative',
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <Text style={styles.simulatorTitle}>Let's play with the robot</Text>
        <Grid />
        {settingState && settingState.error.length > 0 && (
          <Overlay text={settingState.error} />
        )}

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
                onSubmitEditing();
              }}>
              <Text>Run</Text>
            </Button>
          </View>
          <View style={{flex: 1, marginHorizontal: 5}}>
            <Button
              full
              style={{height: 50}}
              onPress={() => {
                dispatch(resetRobotAct());
                dispatch(errorSettingAct(''));
                updateCommands([]);
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
