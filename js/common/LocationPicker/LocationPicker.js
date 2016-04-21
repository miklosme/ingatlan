import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import MapView from 'react-native-maps';
import Slider from 'react-native-slider';

import {
  COLOR_GREEN,
  COLOR_INACTIVE,
  COLOR_LOCATION,
  COLOR_LOCATION_BORDER,
} from '../../constants';

import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_TEXT } from '../../constants';

import s from './LocationPicker.style';

class LocationPicker extends Component {

  static propTypes = {};

  state = {
    goalIcon: null,
  };

  componentWillMount() {
    Icon.getImageSource('map-marker', 44, COLOR_TEXT)
      .then((source) => this.setState({ goalIcon: source }));
  }

  handleCircleChange = data => {
    const newCircle = Object.assign({}, this.props.locationCircle, data);
    this.props.onChangeCircle(newCircle);
  };

  render() {
    return (
      <View style={s.root}>
        <Text style={s.label}>Location</Text>
        <Slider
          trackStyle={s.distanceTrack}
          value={this.props.locationCircle.radius}
          minimumValue={100}
          maximumValue={5000}
          thumbStyle={s.thumbStyle}
          minimumTrackTintColor={COLOR_GREEN}
          maximumTrackTintColor={COLOR_INACTIVE}
          onValueChange={value => this.handleCircleChange({ radius: Math.floor(value) })}
        />
        <View style={s.mapContainer}>
          <MapView
            style={s.map}
            initialRegion={this.props.initialRegion}
            onPress={this.onPress}
          >
            <MapView.Circle
              center={this.props.locationCircle.point}
              radius={this.props.locationCircle.radius}
              strokeWidth={2}
              strokeColor={COLOR_LOCATION_BORDER}
              fillColor={COLOR_LOCATION}
            />
            {this.state.goalIcon ? <MapView.Marker
              draggable
              image={this.state.goalIcon}
              centerOffset={{ x: 0.5, y: -19 }}
              coordinate={this.props.locationCircle.point}
              onDragEnd={e => this.handleCircleChange({ point: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              } })}
            /> : null}
          </MapView>
        </View>
      </View>
    );
  }
}

export default LocationPicker;
