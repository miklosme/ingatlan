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

  handleCirclePositionChange = ({ latitude, longitude }) => {
    const newCircle = Object.assign(
      {}, this.props.locationCircle, { point: { latitude, longitude } }
    );
    this.props.onChangeCircle(newCircle);
  };

  handleCircleRadiusChange = radius => {
    const newCircle = Object.assign({}, this.props.locationCircle, { radius: Math.floor(radius) });
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
          onValueChange={this.handleCircleRadiusChange}
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
              onDragEnd={e => this.handleCirclePositionChange(e.nativeEvent.coordinate)}
            /> : null}
          </MapView>
        </View>
      </View>
    );
  }
}

export default LocationPicker;
