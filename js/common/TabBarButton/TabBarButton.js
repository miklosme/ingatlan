import React, {
  Component,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_TEXT, COLOR_GREEN } from '../../constants';

import s from './TabBarButton.style';

class TabBarButton extends Component {

  static propTypes = {};

  static defaultProps = {
    icon: 'rocket',
    iconSize: 24,
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onChange}>
        <View style={s.root}>
          {/*<Image style={s.icon} source={icon} />*/}
          <Icon
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.isSelected ? COLOR_GREEN : COLOR_TEXT}
          />
          <Text
            style={[s.text, this.props.isSelected ? s.active : null]}
          >
            {this.props.label}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TabBarButton;
