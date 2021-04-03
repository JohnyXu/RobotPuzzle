import {combineReducers} from 'redux';
import robot from './robotReducer';
import setting from './settingReducer';

const rootReducer = combineReducers({
  robot,
  setting,
});

export default rootReducer;
