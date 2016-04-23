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
    icons: null,
  };

  componentWillMount() {
    const i1 = Icon.getImageSource('dot-circle-o', 23, COLOR_TEXT);
    const i2 = Icon.getImageSource('circle-o', 23, COLOR_TEXT);

    Promise.all([i1, i2])
      .then(([ii1, ii2]) => this.setState({ icons: { districtActive: ii1, districtInactive: ii2 } }));
  }

  toggleDistrict = districtTag => () => {
    const settlement = this.props.location.settlement;

    const isContains = settlement.indexOf(districtTag) > -1;
    let newSettlement = null;
    if (isContains) {
      newSettlement = settlement.filter(elem => elem !== districtTag);
    } else {
      newSettlement = [...settlement, districtTag];
    }

    this.props.onChange({
      settlement: newSettlement,
      circle: this.props.location.circle,
    });
  };

  render() {
    const isActive = tag => {
      const settlement = this.props.location.settlement;
      return settlement.indexOf(tag) > -1;
    };
    return (
      <View style={s.root}>
        <Text style={s.label}>Location</Text>
        <View style={s.mapContainer}>
          <MapView
            style={s.map}
            initialRegion={this.props.initialRegion}
            onPress={this.onPress}
          >
            {districts.map(district => (
              isActive(district.tag) ? <MapView.Polygon
                coordinates={district.coords}
                strokeColor={COLOR_LOCATION_BORDER}
                fillColor={COLOR_LOCATION}
              /> : null
            ))}
            {districts.map(district => (
              this.state.icons ? <MapView.Marker
                image={this.state.icons[isActive(district.tag) ? 'districtActive' : 'districtInactive']}
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
