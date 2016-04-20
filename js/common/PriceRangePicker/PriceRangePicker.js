import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import s from './PriceRangePicker.style';

import PricePicker from '../PricePicker';

class PriceRangePicker extends Component {

  static propTypes = {};

  handleChange = rangeSide => input => {
    const min = this.props.value[0];
    const max = this.props.value[1];
    let value = input; // TODO: input can be ''
    if (rangeSide === 'min') { // TODO: refact this shit
      value = Math.min(value, max);
      this.props.onChange([value, max]);
    } else if (rangeSide === 'max') {
      value = Math.max(value, min);
      this.props.onChange([min, value]);
    }
  };

  render() {
    return (
      <View style={s.root}>
        <Text style={s.label}>{this.props.label}</Text>
        <View style={s.well}>
          <PricePicker
            label="Lowest Price"
            onChange={this.handleChange('min')}
            value={this.props.value[0]}
          />
          <PricePicker
            label="Highest Price"
            onChange={this.handleChange('max')}
            value={this.props.value[1]}
          />
        </View>
      </View>
    );
  }
}

export default PriceRangePicker;
