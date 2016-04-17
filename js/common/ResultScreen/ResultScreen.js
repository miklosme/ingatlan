import React, {
  Component,
  View,
  Text,
} from 'react-native';

import s from './ResultScreen.style';

class ResultScreen extends Component {

  static propTypes = {};

  render() {
    return (
      <View style={s.root}>
        <Text style={{color: "black"}}>{this.props.search}</Text>
      </View>
    );
  }
}

export default ResultScreen;
