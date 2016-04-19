import React, {
  Component,
  View,
} from 'react-native';

import s from './App.style';

import ScreenNavigator from '../ScreenNavigator';
import TabBarButton from '../TabBarButton';

import SearchScreen from '../SearchScreen';
import SavedScreen from '../SavedScreen';

class App extends Component {

  static propTypes = {};

  state = {
    tab: 'search',
  };

  handleSelect = tab => () => this.setState({ tab });

  render() {
    let screenElement;

    if (this.state.tab === 'saved') {
      screenElement = (
        <ScreenNavigator
          title="Saved"
          component={SavedScreen}
          key="saved"
        />
      );
    } else {
      screenElement = (
        <ScreenNavigator
          title="Search"
          component={SearchScreen}
          key="search"
        />
      );
    }

    return (
      <View style={s.root}>
        {screenElement}
        <View style={s.tabBar}>
          <TabBarButton
            icon="home"
            label="Homes"
            isSelected={this.state.tab === 'search'}
            onChange={this.handleSelect('search')}
          />
          <TabBarButton
            icon="heart"
            label="Saved"
            isSelected={this.state.tab === 'saved'}
            onChange={this.handleSelect('saved')}
          />
        </View>
      </View>
    );
  }
}

export default App;
