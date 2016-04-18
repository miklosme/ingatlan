import React, {
  Component,
  View,
  PickerIOS,
  Text,
} from 'react-native';

import s from './PricePicker.style';

class PricePicker extends Component {

  static propTypes = {};

  static defaultProps = {
    value: 100,
    label: '',
  };

  handleChange = value => {
    this.props.onChange(value);
  };

  render() {
    const amounts = [];

    for (let i = 30; i <= 250; i += 10) {
      amounts.push({ label: i + 'e', value: i });
    }

    amounts.push({ label: 'Any', value: '' });

    const items = amounts.map(amount => (
      <PickerIOS.Item
        key={'amount-' + amount.value}
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

export default PricePicker;
