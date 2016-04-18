import React, {
  Component,
  View,
  Text,
} from 'react-native';

import s from './ResultItem.style';

class ResultItem extends Component {

  static propTypes = {};

  render() {
    return (
      <View style={s.root}>
        <Text style={s.title}>{this.props.title}</Text>
      </View>
    );
  }
}

export default ResultItem;
