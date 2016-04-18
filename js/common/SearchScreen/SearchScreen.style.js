import { StyleSheet } from 'react-native';

import { COLOR_GREEN, COLOR_BACKGROUND } from '../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
    backgroundColor: COLOR_BACKGROUND,
  },
  page: {
    paddingBottom: 50,
  },
  searchButton: {
    //padding: 14,
    backgroundColor: COLOR_GREEN,
  },
  searchButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
