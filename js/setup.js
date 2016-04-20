/* eslint-disable no-console */
import React, { Component } from 'react';

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

    componentDidMount() {
      CLEAR(); // eslint-disable-line no-undef, new-cap
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

global.CLEAR = (lines = 5) => {
  console.log('\n'.repeat(lines));
};

export default setup;
