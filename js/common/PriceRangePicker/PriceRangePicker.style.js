import { StyleSheet } from 'react-native';

import { COLOR_TEXT } from '../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: COLOR_TEXT,
    paddingBottom: 5,
  },
  well: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  divider: {
    height: 20,
    width: 1,
    backgroundColor: '#ccc',
  },
});
