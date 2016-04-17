import React, {
  Component,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import s from './TabBarButton.style';

class TabBarButton extends Component {

  static propTypes = {};

  static defaultProps = {
    tab: 'search',
    selected: 'search',
    onChange() {
    }
  };

  handlePress = () => {
    //console.log('handlePress', this.props.tab);
    this.props.onChange(this.props.tab);
  };

  render() {
    let icon;
    const isSelected = (this.props.tab === this.props.selected);

    if (this.props.tab === 'search') {
      icon = (isSelected) ?
        require('../../../images/TabBar-House-Icon-Active.png') : require('../../../images/TabBar-House-Icon.png');
    }

    if (this.props.tab === 'saved') {
      icon = (isSelected) ?
        require('../../../images/TabBar-Favorite-Icon-Active.png') : require('../../../images/TabBar-Favorite-Icon.png');
    }

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={s.root}>
          <Image style={s.icon} source={icon} />
          <Text style={[s.text, isSelected && s.textActive]}>
            {this.props.label}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TabBarButton;
