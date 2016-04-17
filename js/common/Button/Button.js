import React, {
  Component,
  PropTypes,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import s from './Button.style';

const systemButtonOpacity = 0.2;

class Button extends Component {
  static propTypes = {
    ...TouchableHighlight.propTypes,
    containerStyle: View.propTypes.style,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    styleDisabled: Text.propTypes.style,
  };

  _computeActiveOpacity() {
    if (this.props.disabled) {
      return 1;
    }
    return this.props.activeOpacity !== null ?
      this.props.activeOpacity :
      systemButtonOpacity;
  }

  render() {
    const touchableProps = {
      activeOpacity: this._computeActiveOpacity(),
      underlayColor: this.props.underlayColor || '#ddd',
    };

    if (!this.props.disabled) {
      touchableProps.onPress = this.props.onPress;
      touchableProps.onPressIn = this.props.onPressIn;
      touchableProps.onPressOut = this.props.onPressOut;
      touchableProps.onLongPress = this.props.onLongPress;
    }

    return (
      <TouchableHighlight
        {...touchableProps}
        style={[s.root, this.props.containerStyle]}
      >
        <Text style={[s.text, this.props.style]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

export default Button;
