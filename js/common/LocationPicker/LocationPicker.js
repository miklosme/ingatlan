import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import MapView from 'react-native-maps';
import Slider from 'react-native-slider';

import {
  COLOR_GREEN,
  COLOR_TEXT,
  COLOR_INACTIVE,
  COLOR_LOCATION,
  COLOR_LOCATION_BORDER,
} from '../../constants';

import Icon from 'react-native-vector-icons/FontAwesome';

import districts from '../../districts.json';

import s from './LocationPicker.style';

class LocationPicker extends Component {

  static propTypes = {};

  state = {
    districtActive: null,
    districtInactive: null,
    activeDistricts: [],
  };

  componentWillMount() {
    const i1 = Icon.getImageSource('dot-circle-o', 23, COLOR_TEXT);
    const i2 = Icon.getImageSource('circle-o', 23, COLOR_TEXT);

    Promise.all([i1, i2])
      .then(([ii1, ii2]) => this.setState({ districtActive: ii1, districtInactive: ii2 }));
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

  toggleDistrict = districtTag => event => {
    const isContains = this.state.activeDistricts.indexOf(districtTag) > -1;
    let newActiveDistricts = null;
    if (isContains) {
      newActiveDistricts = this.state.activeDistricts.filter(elem => elem !== districtTag);
    } else {
      newActiveDistricts = [...this.state.activeDistricts, districtTag];
    }
    this.setState({
      activeDistricts: newActiveDistricts,
    });
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
            {/*<MapView.Circle
              center={this.props.locationCircle.point}
              radius={this.props.locationCircle.radius}
              strokeWidth={2}
              strokeColor={COLOR_LOCATION_BORDER}
              fillColor={COLOR_LOCATION}
            />*/
            /*{this.state.goalIcon ? <MapView.Marker
              draggable
              image={this.state.goalIcon}
              centerOffset={{ x: 0.5, y: -19 }}
              coordinate={this.props.locationCircle.point}
              onDragEnd={e => this.handleCirclePositionChange(e.nativeEvent.coordinate)}
            /> : null}*/}
            {districts.map(district => (
              this.state.activeDistricts.indexOf(district.tag) > -1 ? <MapView.Polygon
                coordinates={LOG(district.coords)}
                strokeColor={COLOR_LOCATION_BORDER}
                fillColor={COLOR_LOCATION}
              /> : null
            ))}
            {districts.map(district => (
              this.state.districtActive ? <MapView.Marker
                image={this.state.activeDistricts.indexOf(district.tag) > -1 ? this.state.districtActive : this.state.districtInactive}
                coordinate={district.center}
                onPress={this.toggleDistrict(district.tag)}
              /> : null
            ))}
          </MapView>
        </View>
      </View>
    );
  }
}

export default LocationPicker;
