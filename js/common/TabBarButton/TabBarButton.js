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
  };

  handlePress = () => {
    //console.log('handlePress', this.props.tab);
    this.props.onChange(this.props.tab);
  };

  render() {
    let icon;
    const isSelected = (this.props.tab === this.props.selected);

    const icons = {
      houseActive: require('../../../images/TabBar-House-Icon-Active.png'),
      house: require('../../../images/TabBar-House-Icon.png'),
      favoriteActive: require('../../../images/TabBar-Favorite-Icon-Active.png'),
      favorite: require('../../../images/TabBar-Favorite-Icon.png'),
    };

    if (this.props.tab === 'search') {
      icon = isSelected ? icons.houseActive : icons.house;
    }

    if (this.props.tab === 'saved') {
      icon = isSelected ? icons.favoriteActive : icons.favorite;
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
