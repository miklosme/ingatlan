import React, { Component } from 'react';
import {
  View,
  PickerIOS,
  Text,
} from 'react-native';

import s from './VerticalPicker.style.js';
import { range } from 'lodash';

class VerticalPicker extends Component {

  static propTypes = {};

  static defaultProps = {
    prefix: '',
    suffix: '',
  };

  handleChange = value => {
    this.props.onChange(value);
  };

  render() {
    const amounts = range(...this.props.range).map(value => {
      return {
        label: `${this.props.prefix}${value}${this.props.suffix}`,
        value,
      };
    });

    if (this.props.hasJokerAtStart) {
      amounts.unshift({ label: 'Any', value: null });
    }

    if (this.props.hasJokerAtEnd) {
      amounts.push({ label: 'Any', value: null });
    }

    const items = amounts.map(amount => (
      <PickerIOS.Item
        key={`amount-${amount.value}`}
        value={amount.value}
        label={amount.label}
      />
    ));

    return (
      <View style={s.root}>
        <Text style={s.label}>{this.props.label}</Text>
        <PickerIOS
          selectedValue={this.props.value}
          onValueChange={this.handleChange}
        >
          {items}
        </PickerIOS>
      </View>
    );
  }
}

export default VerticalPicker;
