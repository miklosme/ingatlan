import { StyleSheet, Dimensions } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default StyleSheet.create({
  root: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 49,
  },
});
