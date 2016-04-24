import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import s from './TimeSinceModified.style';
import { COLOR_GREEN } from '../../constants';

const TimeSinceModified = ({ date }) => {
  const hoursSince = moment().diff(date, 'hours');
  const isNew = hoursSince <= 24;
  return (
    <View style={s.root}>
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
  );
};

TimeSinceModified.propTypes = {};

export default TimeSinceModified;
