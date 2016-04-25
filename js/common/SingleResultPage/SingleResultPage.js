import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicatorIOS,
} from 'react-native';

import s from './SingleResultPage.style';
import TimeSinceModified from '../TimeSinceModified';
import { querySingleItem } from '../../api';
import { parseSingleItem } from '../../parse';

class SingleResultPage extends Component {

  static propTypes = {};

  state = {
    isLoading: true,
  };

  componentWillMount() {
    this.fetchPage();
  }

  fetchPage = () => {
    querySingleItem(this.props.data)
      .then(text => {
        const {
          description,
        } = parseSingleItem(text);
        this.setState({
          isLoading: false,
          description,
        });
      });
  };

  render() {
    const {
      address,
      price,
      rooms,
      date,
    } = this.props.data;

    if (this.state.isLoading) {
      return <ActivityIndicatorIOS style={s.scrollSpinner}/>;
    }

    return (
      <View style={s.root}>
        <Text>{address}</Text>
        <Text>{price}k HUF</Text>
        <Text>Rooms: {rooms}</Text>
        <TimeSinceModified date={date} />
        <Text>{this.state.description}</Text>
      </View>
    );
  }
}

export default SingleResultPage;
