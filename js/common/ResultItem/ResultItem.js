import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import s from './ResultItem.style';

import TimeSinceModified from '../TimeSinceModified';
import { COLOR_SEPARATOR } from '../../constants';

const ResultItem = ({ address, price, rooms, date, onPress }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={COLOR_SEPARATOR}
    >
      <View>
        <View style={s.root}>
          <View style={s.left}>
            <Text style={s.title}>{address}</Text>
            <TimeSinceModified date={date} />
          </View>
          <View style={s.right}>
            <Text style={s.price}>{price}k HUF</Text>
            <Text style={s.rooms}>{rooms}</Text>
          </View>
        </View>
        <View style={s.separator} />
      </View>
    </TouchableHighlight>
  );
};

ResultItem.propTypes = {};

export default ResultItem;
