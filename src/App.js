import React from 'react';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import Simulator from './pages/Simulator';

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <Simulator />
    </Provider>
  );
};

export default App;
