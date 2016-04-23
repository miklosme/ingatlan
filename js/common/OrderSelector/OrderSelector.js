import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

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
        {options.map(({ label, value }, index) => (
          <TouchableWithoutFeedback
            onPress={this.props.onChange(value)}
          >
            <View
              key={index}
              style={[
                s.option,
                getBorderRadiusStyle(index, options.length - 1),
                this.props.selected === LOG(value) ? s.optionSelected : null,
              ]}
            >
              <Text style={s.text}>{label}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

export default OrderSelector;
