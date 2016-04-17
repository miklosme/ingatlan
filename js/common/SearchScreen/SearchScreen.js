import React, {
  Component,
  View,
  ScrollView,
} from 'react-native';

import s from './SearchScreen.style';

import Button from '../Button';
import NumberPicker from '../NumberPicker';

class SearchScreen extends Component {

  static propTypes = {};

  state = {
    adType: 'RENT',
    priceRange: [100, 150],
    //lotRange: [null, null],
    minRooms: 1,
  };

  onSearch = () => {
    /*this.props.navigator.push({
      component: SearchResults,
      title: 'Search Results',
      passProps: {
        search: this.state
      },
    });*/
  };

  saveQueryOptions = key => value => {
    this.setState({ [key]: value });
    LOG(key);
  };

  render() {
    return (
      <ScrollView style={s.root}>
        <View style={s.page}>
          {/*<PropertyTypePicker
            value={this.state.propertyType}
            onChange={this.saveQueryOptions}
          />
          <PriceRangePicker
            value={this.state.priceRange}
            onChange={this.saveQueryOptions}
          />*/}
          <NumberPicker
            label="Rooms (at least)"
            value={this.state.minRooms}
            onChange={this.saveQueryOptions('minRooms')}
          />
          <Button
            containerStyle={s.searchButton}
            style={s.searchButtonText}
            onPress={this.onSearch}
          >
            Search
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default SearchScreen;
