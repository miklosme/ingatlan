import React, {
  Component,
  View,
  NavigatorIOS,
} from 'react-native';

import { COLOR_GREEN } from '../../values';

import s from './ScreenNavigator.style';

class ScreenNavigator extends Component {

  static propTypes = {};

  static defaultProps = {
    title: '',
    component: null,
  };

  render() {
    return (
      <NavigatorIOS
        style={s.root}
        tintColor={COLOR_GREEN}
        initialRoute={this.props}
      />
    );
  }
}

export default ScreenNavigator;
