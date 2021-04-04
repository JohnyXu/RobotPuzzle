const initState = {
  error: '',
};

const TYPES = {
  ERROR: 'ERROR',
};

export const errorSettingAct = error => {
  return {
    type: TYPES.ERROR,
    payload: {
      error,
    },
  };
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case TYPES.ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
