import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import s from './App.style';

import ScreenNavigator from '../ScreenNavigator';
import TabBarButton from '../TabBarButton';

import SearchScreen from '../SearchScreen';
import WatchlistScreen from '../WatchlistScreen';
import SavedScreen from '../SavedScreen';

class App extends Component {

  static propTypes = {};

  state = {
    tab: 'homes',
  };

  handleSelect = tab => () => this.setState({ tab });

  render() {
    const screenElement = () => {
      switch (this.state.tab) {
        case 'homes':
          return (
            <ScreenNavigator
              title="Search"
              component={SearchScreen}
              key="search"
            />
          );
        case 'watchlist':
          return (
            <ScreenNavigator
              title="Watchlist"
              component={WatchlistScreen}
              key="watchlist"
            />
          );
        case 'saved':
          return (
            <ScreenNavigator
              title="Saved"
              component={SavedScreen}
              key="saved"
            />
          );
        default:
          return null;
      }
    };

    return (
      <View style={s.root}>
        {screenElement()}
        <View style={s.tabBar}>
          <TabBarButton
            icon="home"
            label="Homes"
            isSelected={this.state.tab === 'homes'}
            onChange={this.handleSelect('homes')}
          />
          <TabBarButton
            icon="eye"
            label="Watchlist"
            isSelected={this.state.tab === 'watchlist'}
            onChange={this.handleSelect('watchlist')}
          />
          {/*<TabBarButton
            icon="heart"
            iconSize={20}
            label="Saved"
            isSelected={this.state.tab === 'saved'}
            onChange={this.handleSelect('saved')}
          />*/}
        </View>
      </View>
    );
  }
}

export default App;
