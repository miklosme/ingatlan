import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_TEXT } from '../../constants';
import s from './OrderSelector.style';

class OrderSelector extends Component {

  static propTypes = {};

  render() {
    const getBorderRadiusStyle = (index, maxIndex) => {
      if (index === 0) return s.headElement;
      if (index === maxIndex) return s.tailElement;
      return null;
    };
    const options = this.props.options;
    return (
      <View style={s.root}>
        {options.map(({ label, icon, value }, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={this.props.onChange(value)}
          >
            <View
              style={[
                s.option,
                getBorderRadiusStyle(index, options.length - 1),
                this.props.selected === value ? s.optionSelected : null,
                label ? { flex: 3 } : null,
              ]}
            >
              {label ? <Text style={s.text}>{label}</Text> : null}
              {icon ? <Icon
                name={icon}
                size={16}
                style={s.icon}
                color={COLOR_TEXT}
              /> : null}
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

export default OrderSelector;
