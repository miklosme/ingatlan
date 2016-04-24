import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import moment from 'moment';
import s from './ResultItem.style';

import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_GREEN } from '../../constants';

const ResultItem = ({ address, price, rooms, date }) => {
  const hoursSince = moment().diff(date, 'hours');
  const isNew = hoursSince <= 24;
  return (
    <View>
      <View style={s.root}>
        <View style={s.left}>
          <Text style={s.title}>{address}</Text>
          <View style={s.date}>
            {isNew ? <Icon
              style={s.iconNew}
              name="exclamation-circle"
              size={12}
              color={COLOR_GREEN}
            /> : null}
            <Text
              style={[s.dateText, isNew ? { fontWeight: 'bold' } : null]}
            >
              {moment(date).fromNow()}
            </Text>
          </View>
        </View>
        <View style={s.right}>
          <Text style={s.price}>{price}k HUF</Text>
          <Text style={s.rooms}>{rooms}</Text>
        </View>
      </View>
      <View style={s.separator}></View>
    </View>
  );
};

ResultItem.propTypes = {};

export default ResultItem;
