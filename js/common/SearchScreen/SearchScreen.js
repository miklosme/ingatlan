import React, {
  Component,
  View,
  ScrollView,
} from 'react-native';

import s from './SearchScreen.style';

import { DEAL_TYPES } from '../../constants';

import Button from '../Button';
import NumberPicker from '../NumberPicker';
import PriceRangePicker from '../PriceRangePicker';
import ResultScreen from '../ResultScreen';

class SearchScreen extends Component {

  static propTypes = {};

  state = {
    dealType: DEAL_TYPES.RENT,
    priceRange: [100, 150],
    location: ['v-ker'],
    //minLot: 1,
    minRooms: 1,
    isLoading: false,
  };

  goToResultPage = () => {
    this.props.navigator.push({
      component: ResultScreen,
      title: 'Results',
      passProps: {
        searchConfig: this.state,
      },
    });
  };

  saveQueryOptions = key => value => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <ScrollView style={s.root}>
        <View style={s.page}>
          {/*<PropertyTypePicker
            value={this.state.propertyType}
            onChange={this.saveQueryOptions}
          />*/}
          <PriceRangePicker
            label={'Price Between (HUF)'}
            value={this.state.priceRange}
            onChange={this.saveQueryOptions('priceRange')}
          />
          <NumberPicker
            label="Rooms (at least)"
            value={this.state.minRooms}
            onChange={this.saveQueryOptions('minRooms')}
          />
          <Button
            containerStyle={s.searchButton}
            style={s.searchButtonText}
            onPress={this.goToResultPage}
          >
            Search
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default SearchScreen;
