import { StyleSheet, Dimensions } from 'react-native';

import { COLOR_BACKGROUND, CAROUSEL_HEIGHT } from '../../constants';
const {
  width: SCREEN_WIDTH,
} = Dimensions.get('window');

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    marginTop: 64,
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  thumbnailContainer: {
    height: CAROUSEL_HEIGHT,
    width: SCREEN_WIDTH,
  },
  thumbnailImage: {
    height: CAROUSEL_HEIGHT,
    resizeMode: 'cover',
  },
});
