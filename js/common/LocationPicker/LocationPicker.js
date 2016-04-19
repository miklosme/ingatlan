import React, {
  Component,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

import MapView from 'react-native-maps';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

const ASPECT_RATIO = WINDOW_WIDTH / 200;
const LATITUDE = 47.497617;
const LONGITUDE = 19.05177;
const LATITUDE_DELTA = 0.0522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const getId = (() => {
  let id = 0;
  return () => id++;
})();

import s from './LocationPicker.style';

class LocationPicker extends Component {

  static propTypes = {};
  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    polygons: [],
    editing: null,
  };

  onPress = event => {
    const { editing } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: getId(),
          coordinates: [event.nativeEvent.coordinate],
        },
      });
    } else {
      this.setState({
        editing: {
          ...editing,
          coordinates: [
            ...editing.coordinates,
            event.nativeEvent.coordinate,
          ],
        },
      });
    }
  };

  finish = () => {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
    });
  };

  render() {
    return (
      <View style={s.container}>
        <MapView
          style={s.map}
          initialRegion={this.state.region}
          onPress={this.onPress}
        >
          {this.state.polygons.map(polygon => (
            <MapView.Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          ))}
          {this.state.editing && (
            <MapView.Polygon
              coordinates={this.state.editing.coordinates}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          )}
        </MapView>
        <View style={s.buttonContainer}>
          {this.state.editing && (
            <TouchableOpacity onPress={this.finish} style={[s.bubble, s.button]}>
              <Text>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default LocationPicker;
