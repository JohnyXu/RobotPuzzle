import settingReducer, {TYPES, errorSettingAct} from './settingReducer';

describe('setting action', () => {
  it('create error action', () => {
    const error = 'has error';
    expect(errorSettingAct(error)).toEqual({
      type: TYPES.ERROR,
      payload: {error},
    });
  });
});

describe('setting reducer', () => {
  const initState = {
    error: '',
  };

  it('init state', () => {
    expect(settingReducer(undefined, {})).toEqual(initState);
  });

  it('error setting reducer', () => {
    const action = {
      type: TYPES.ERROR,
      payload: {error: 'error'},
    };
    expect(settingReducer(initState, action)).toEqual({
      error: 'error',
    });
  });
});
