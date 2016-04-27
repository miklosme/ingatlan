import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import MapView from 'react-native-maps';

import {
  COLOR_GREEN,
  COLOR_TEXT,
  COLOR_INACTIVE,
  COLOR_LOCATION,
  COLOR_LOCATION_BORDER,
} from '../../constants';

import Icon from 'react-native-vector-icons/FontAwesome';

import { getCenterOfBounds } from 'geolib';

import districtsJson from '../../districts.json';

import s from './LocationPicker.style';

class LocationPicker extends Component {

  static propTypes = {};

  state = {
    icons: null,
  };

  componentWillMount() {
    this.districts = districtsJson.map(district => {
      return Object.assign({}, district, { center: getCenterOfBounds(district.coords) });
    });

    const getDotCircle = Icon.getImageSource('dot-circle-o', 23, COLOR_TEXT);
    const getCircle = Icon.getImageSource('circle-o', 23, COLOR_TEXT);

    Promise.all([getCircle, getDotCircle])
      .then(([districtInactive, districtActive]) => {
        this.setState({ icons: { districtInactive, districtActive } });
      });
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
        <Text style={s.label}>{this.props.label}</Text>
        <View style={s.mapContainer}>
          <MapView
            style={s.map}
            initialRegion={this.props.initialRegion}
            onPress={this.onPress}
          >
            {this.districts.map((district, index) => (
              isActive(district.tag) ? <MapView.Polygon
                key={index}
                coordinates={district.coords}
                strokeColor={COLOR_LOCATION_BORDER}
                fillColor={COLOR_LOCATION}
              /> : null
            ))}
            {this.districts.map((district, index) => (
              this.state.icons ? <MapView.Marker
                key={index}
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
