import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import s from './ResultItem.style';

const ResultItem = ({ address, price, rooms }) => {
  return (
    <View style={s.root}>
      <Text style={s.title}>{address}</Text>
      <Text style={s.price}>{price}k HUF</Text>
      <Text style={s.rooms}>{rooms}</Text>
    </View>
  );
};

ResultItem.propTypes = {};

export default ResultItem;
