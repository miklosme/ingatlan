import React, {
  Component,
  View,
  Text,
} from 'react-native';

import s from './App.style';

class App extends Component {

  static propTypes = {};

  render() {
    return (
      <View style={s.root}>
        <Text>Test</Text>
      </View>
    );
  }
}

export default App;
