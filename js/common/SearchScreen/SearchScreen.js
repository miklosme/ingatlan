import React, {
  Component,
  View,
  ScrollView,
} from 'react-native';

import s from './SearchScreen.style';

import { DEAL_TYPES } from '../../constants';

import { queryData } from '../../api';
import { parseResponse } from '../../parse';

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

  onSearch = () => {
    if (this.state.isLoading) return;

    this.setState({
      isLoading: true,
    });
    queryData(this.state)
      .then((textRes) => {
        this.handleResponse(textRes);
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: `There was an error: ${err}`
        });
      });
  };

  handleResponse = (text) => {
    const result = parseResponse(text);
    this.goToResultPage(result);
  };

  goToResultPage = result => {
    this.props.navigator.push({
      component: ResultScreen,
      title: 'Search Results',
      passProps: {
        result,
      },
    });
    this.setState({
      isLoading: false,
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
            label='Rooms (at least)'
            value={this.state.minRooms}
            onChange={this.saveQueryOptions('minRooms')}
          />
          <Button
            containerStyle={s.searchButton}
            style={s.searchButtonText}
            onPress={this.onSearch}
          >
            {this.state.isLoading ? 'Loading...' : 'Search'}
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default SearchScreen;
