import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 17,
    alignSelf: 'center',
  },
  disabledText: {
    color: '#dcdcdc',
  },
});
