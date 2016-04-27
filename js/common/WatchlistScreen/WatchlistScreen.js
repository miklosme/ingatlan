import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import s from './WatchlistScreen.style';

import Icon from 'react-native-vector-icons/Ionicons';

class WatchlistScreen extends Component {

  static propTypes = {};

  render() {
    return (
      <View style={s.root}>
        <Text>This feature is under development.</Text>
        <Icon name="hammer" size={16} style={{ marginLeft: 4 }} />
        <Icon name="wrench" size={16} style={{ marginLeft: 4 }} />
      </View>
    );
  }
}

export default WatchlistScreen;
