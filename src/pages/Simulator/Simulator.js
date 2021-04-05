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
import {isInRange} from './../../utils';

export default function Simulator() {
  const dispatch = useDispatch();
  const [command, setCommand] = useState('');
  const [commands, updateCommands] = useState([]);
  const robotState = useSelector(state => state.robot);
  const settingState = useSelector(state => state.setting);

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
        const direction = commandOptions[1];
        if (Object.keys(DIRECTION).indexOf(direction) < 0) {
          return dispatch(errorSettingAct(ERROR_MSG.MOVE_FORMAT));
        }
        const isValid = isNextPositionValid(robotState.position, direction);
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
    // place
    if (!commandOptions[1]) {
      return dispatch(errorSettingAct(ERROR_MSG.PLACE_FORMAT));
    }
    const [x, y] = commandOptions[1].split(',');
    if (!(x && y)) {
      return dispatch(errorSettingAct(ERROR_MSG.PLACE_FORMAT));
    }
    const rowIndex = parseInt(y, 10);
    const colIndex = parseInt(x, 10);
    const isValidPosition =
      isInRange(rowIndex, 0, DIMENSION_GRID.Y) &&
      isInRange(colIndex, 0, DIMENSION_GRID.X);
    if (!isValidPosition) {
      return dispatch(errorSettingAct(ERROR_MSG.PLACE_FORMAT));
    }
    updateCommands([...commands, markCommand]);
    dispatch(errorSettingAct(''));
    dispatch(placeRobotAct({x: colIndex, y: rowIndex}));
  };

  const onResetClick = () => {
    dispatch(resetRobotAct());
    dispatch(errorSettingAct(''));
    updateCommands([]);
  };

  return (
    <SafeAreaView style={styles.layout}>
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
          style={styles.input}
        />
        <View style={styles.buttonView}>
          <View style={styles.buttonWrapper}>
            <Button
              full
              warning
              style={styles.buttonStyle}
              onPress={onSubmitEditing}>
              <Text>Run</Text>
            </Button>
          </View>
          <View style={styles.buttonWrapper}>
            <Button full style={styles.buttonStyle} onPress={onResetClick}>
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
  layout: {
    position: 'relative',
    backgroundColor: 'white',
  },
  simulatorTitle: {
    color: 'red',
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 10,
  },
  input: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    height: 50,
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonView: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonStyle: {
    height: 50,
  },
});
