import { StyleSheet } from 'react-native';

import { COLOR_GREEN, COLOR_TEXT } from '../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  mapContainer: {
    height: 200,
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  distanceTrack: {
    height: 2,
  },
  thumbStyle: {
    backgroundColor: COLOR_GREEN,
  },
  label: {
    fontSize: 12,
    color: COLOR_TEXT,
  },
});
