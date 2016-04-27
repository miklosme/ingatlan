import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicatorIOS,
  ScrollView,
  Dimensions,
  Image,
  Linking,
  TouchableHighlight,
} from 'react-native';

const {
  width: SCREEN_WIDTH,
  } = Dimensions.get('window');

import s from './SingleResultPage.style';
import TimeSinceModified from '../TimeSinceModified';
import { querySingleItem } from '../../api';
import { parseSingleItem } from '../../parse';

import {
  COLOR_GREEN,
  COLOR_BACKGROUND,
  URLS,
  PARAMETER_UNDEFINED,
} from '../../constants';

import Icon from 'react-native-vector-icons/FontAwesome';

class SingleResultPage extends Component {

  static propTypes = {};

  state = {
    isLoading: true,
  };

  componentWillMount() {
    this.fetchPage();
  }

  fetchPage = () => {
    querySingleItem(this.props.data)
      .then(text => {
        const {
          description,
          thumbnailImages,
          images,
          parameters,
          } = parseSingleItem(text);
        this.setState({
          isLoading: false,
          description,
          thumbnailImages,
          images,
          parameters,
        });
      });
  };

  openInBrowser = () => {
    const url = `${URLS.SINGLE}${this.props.data.id}`;
    Linking.openURL(url);
  };

  render() {
    const {
      address,
      price,
      rooms,
      date,
      } = this.props.data;

    if (this.state.isLoading) {
      return (
        <View style={s.root}>
          <ActivityIndicatorIOS style={s.scrollSpinner} />
        </View>
      );
    }

    const images = this.state.images.map((url, index) => {
      return (
        <View
          key={index}
          style={s.thumbnailContainer}
        >
          <Image
            style={s.thumbnailImage}
            source={{ uri: url }}
          />
        </View>
      );
    });

    const description = this.state.description
      .replace(/<br\s?\/?>/g, '\n')
      .trim();

    const parameters = this.state.parameters.map(({ key, value }, index) => (
      <View
        key={index}
        style={s.row}
      >
        <Text style={s.cell}>{key}</Text>
        <Text
          style={[s.cell, value === PARAMETER_UNDEFINED ? s.inactive : null]}
        >
          {value}
        </Text>
      </View>
    ));

    return (
      <ScrollView style={s.root}>
        <ScrollView
          horizontal
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          contentContainerStyle={{ width: SCREEN_WIDTH * images.length }}
        >
          {images}
        </ScrollView>
        <View style={s.row}>
          <Text style={s.address}>{address}</Text>
          <Text style={s.price}>{price}k HUF / month</Text>
        </View>
        <View style={s.row}>
          <TimeSinceModified style={s.date} date={date} />
          <Text style={s.rooms}>Rooms: {rooms}</Text>
        </View>
        <View style={s.separator} />
        <Text style={s.description}>{description}</Text>
        <View style={s.separator} />
        {parameters}
        <TouchableHighlight
          onPress={this.openInBrowser}
        >
          <View style={s.goToWebpage}>
            <Text style={s.goToWebpageText}>Go to ingatlan.com</Text>
            <Icon
              style={s.goToWebpageIcon}
              name="external-link"
              size={22}
              color={COLOR_BACKGROUND}
            />
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

export default SingleResultPage;
