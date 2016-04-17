/* eslint-disable no-console */
import React, {
  Component,
} from 'react-native';

import App from './common/App';

function setup() {
  console.disableYellowBox = true;

  class Root extends Component {
    constructor() {
      super();
      this.state = {
        isLoading: false,
      };
    }

    render() {
      if (this.state.isLoading) {
        return null;
      }
      return (
        <App />
      );
    }
  }

  return Root;
}

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};

export default setup;
