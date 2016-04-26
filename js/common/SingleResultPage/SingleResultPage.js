import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicatorIOS,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

const {
  width: SCREEN_WIDTH,
  } = Dimensions.get('window');

import s from './SingleResultPage.style';
import TimeSinceModified from '../TimeSinceModified';
import { querySingleItem } from '../../api';
import { parseSingleItem } from '../../parse';

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
          } = parseSingleItem(text);
        this.setState({
          isLoading: false,
          description,
          thumbnailImages,
        });
      });
  };

  render() {
    const {
      address,
      price,
      rooms,
      date,
      } = this.props.data;

    if (this.state.isLoading) {
      return <ActivityIndicatorIOS style={s.scrollSpinner}/>;
    }

    const images = this.state.thumbnailImages.map((url, index) => {
      return (
        <View
          key={index}
          style={s.thumbnailContainer}
        >
          <Image
            style={s.thumbnailImage}
            source={LOG({ uri: url })}
          />
        </View>
      );
    });

    const description = this.state.description.replace(/<br\s?\/?>/g, '\n');

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
        <Text>{address}</Text>
        <Text>{price}k HUF</Text>
        <Text>Rooms: {rooms}</Text>
        <TimeSinceModified date={date}/>
        <Text>{description}</Text>
      </ScrollView>
    );
  }
}

export default SingleResultPage;
