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
  scrollSpinner: {
    marginVertical: 20,
  },
  header: {
    flex: 1,
    marginTop: 5,
    padding: 5,
    flexDirection: 'row',
  },
  allResultCount: {
    flex: 2,
    alignSelf: 'center',
  },
  watchlistButton: {
    flex: 3,
    backgroundColor: 'transparent',
    borderColor: COLOR_GREEN,
    borderWidth: 1,
    borderRadius: 5,
  },
  watchlistButtonText: {
    color: COLOR_GREEN,
  },
  tree: {
    color: COLOR_GREEN,
    fontSize: 24,
    marginVertical: 40,
    marginHorizontal: 5,
  },
  watchlistIcon: {
    marginRight: 5,
    top: 3,
  },
});
