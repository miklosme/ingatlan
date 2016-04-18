import { StyleSheet } from 'react-native';

import { COLOR_TEXT, COLOR_GREEN } from '../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: COLOR_TEXT,
    textAlign: 'center',
  },
  value: {
    fontSize: 22,
    color: COLOR_GREEN,
  },
});
