import { StyleSheet } from 'react-native';

import { COLOR_GREEN, COLOR_TEXT } from '../../values';

export default StyleSheet.create({
  root: {
    flex: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: COLOR_TEXT,
    paddingBottom: 5
  },
  row: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  number: {
    // padding: 20,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  numberText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '200',
    color: COLOR_TEXT,
    textAlign: 'center',
  },
  numberSelected: {
    borderColor: COLOR_GREEN,
  },
  numberSelectedText: {
    color: COLOR_GREEN,
    fontSize: 24,
  },
});
