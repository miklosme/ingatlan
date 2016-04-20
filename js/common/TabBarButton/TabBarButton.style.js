import { StyleSheet } from 'react-native';
import { COLOR_TEXT, COLOR_GREEN } from '../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    height: 49,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 10,
    color: COLOR_TEXT,
    textAlign: 'center',
  },
  active: {
    color: COLOR_GREEN,
  },
});
