import { StyleSheet, Dimensions } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

import { COLOR_BACKGROUND_APP } from '../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_APP,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  tabBar: {
    width: SCREEN_WIDTH,
    height: 49,
    shadowColor: 'black',
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
