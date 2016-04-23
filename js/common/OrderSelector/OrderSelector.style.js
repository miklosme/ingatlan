import { StyleSheet } from 'react-native';

import { COLOR_TEXT, COLOR_GREEN } from '../../constants';

const BORDER_RADIUS = 5;

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    marginVertical: 5,
    borderColor: COLOR_TEXT,
    borderWidth: 1,
    paddingVertical: 5,
    justifyContent: 'center',
    borderRightWidth: 0,
    flexDirection: 'row',
  },
  icon: {
    marginTop: 2,
  },
  optionSelected: {
    backgroundColor: COLOR_GREEN,
  },
  headElement: {
    borderBottomLeftRadius: BORDER_RADIUS,
    borderTopLeftRadius: BORDER_RADIUS,
    marginLeft: 5,
  },
  tailElement: {
    borderBottomRightRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    marginRight: 5,
    borderRightWidth: 1,
  },
  text: {
    color: COLOR_TEXT,
    marginRight: 4,
  },
});
