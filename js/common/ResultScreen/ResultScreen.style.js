import { StyleSheet } from 'react-native';

import { COLOR_BACKGROUND, COLOR_GREEN } from '../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    paddingTop: 64,
  },
  noMore: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noMoreImage: {
    width: 302 / 5,
    height: 252 / 5,
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  header: {
    flex: 1,
    margin: 5,
    padding: 5,
    backgroundColor: COLOR_GREEN,
    flexDirection: 'row',
  },
  allResultCount: {
    flex: 1,
  },
  watchlistButton: {
    flex: 2,
  },
});
