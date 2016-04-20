import React, {
  Component,
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

import s from './LocationPicker.style';

class LocationPicker extends Component {

  static propTypes = {};

  render() {
    return (
      <View style={s.root}>
        <Text style={s.label}>Location</Text>
        <Slider
          trackStyle={s.distanceTrack}
          value={this.props.location.distance}
          minimumValue={100}
          maximumValue={5000}
          step={1}
          thumbStyle={s.thumbStyle}
          minimumTrackTintColor={COLOR_GREEN}
          maximumTrackTintColor={COLOR_INACTIVE}
          onValueChange={value => this.props.onDistanceChange(value)}
        />
        <View style={s.mapContainer}>
          <MapView
            style={s.map}
            initialRegion={this.props.initialRegion}
            onPress={this.onPress}
          >
            <MapView.Circle
              center={this.props.location.goal}
              radius={this.props.location.distance}
              strokeWidth={2}
              strokeColor={COLOR_LOCATION_BORDER}
              fillColor={COLOR_LOCATION}
            />
            <MapView.Marker
              draggable
              coordinate={this.props.location.goal}
              onDragEnd={e => this.props.onGoalChange(e.nativeEvent.coordinate)}
            />
          </MapView>
        </View>
      </View>
    );
  }
}

export default LocationPicker;
