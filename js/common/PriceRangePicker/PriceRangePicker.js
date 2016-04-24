import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import s from './PriceRangePicker.style';

import VerticalPicker from '../VerticalPicker';

class PriceRangePicker extends Component {

  static propTypes = {};

  handleChange = side => input => {
    const [min, max] = this.props.value;
    this.props.onChange(side === 'min' ? [input, max] : [min, input]);
  };

  render() {
    return (
      <View style={s.root}>
        <Text style={s.label}>{this.props.label}</Text>
        <View style={s.well}>
          <VerticalPicker
            label="Lowest Price"
            range={this.props.range}
            hasJokerAtStart
            suffix={this.props.suffix}
            onChange={this.handleChange('min')}
            value={this.props.value[0]}
          />
          <VerticalPicker
            label="Highest Price"
            range={this.props.range}
            hasJokerAtEnd
            suffix={this.props.suffix}
            onChange={this.handleChange('max')}
            value={this.props.value[1]}
          />
        </View>
      </View>
    );
  }
}

export default PriceRangePicker;
