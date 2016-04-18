import { StyleSheet } from 'react-native';

import { COLOR_BACKGROUND } from '../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    paddingTop: 64,
  },
  noMore: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  noMoreImage: {
    width: 302 / 5,
    height: 252 / 5,
  },
  scrollSpinner: {
    marginVertical: 20,
  },
});
