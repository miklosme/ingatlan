import { StyleSheet, Dimensions } from 'react-native';

import {
  COLOR_GREEN,
  COLOR_BACKGROUND,
  CAROUSEL_HEIGHT,
  COLOR_INACTIVE,
} from '../../constants';
const {
  width: SCREEN_WIDTH,
  } = Dimensions.get('window');

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    marginTop: 64,
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  thumbnailContainer: {
    height: CAROUSEL_HEIGHT,
    width: SCREEN_WIDTH,
  },
  thumbnailImage: {
    height: CAROUSEL_HEIGHT,
    resizeMode: 'cover',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  address: {
    flex: 1,
    fontSize: 18,
  },
  price: {
    flex: 1,
    fontSize: 18,
  },
  date: {
    flex: 1,
  },
  rooms: {
    flex: 1,
  },
  cell: {
    flex: 1,
  },
  description: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  goToWebpage: {
    backgroundColor: COLOR_GREEN,
    marginVertical: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  goToWebpageText: {
    color: COLOR_BACKGROUND,
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  goToWebpageIcon: {
    marginLeft: 5,
    top: 1,
  },
  separator: {
    backgroundColor: COLOR_INACTIVE,
    height: 1,
    flex: 1,
    marginTop: 15,
    marginBottom: 10,
  },
  inactive: {
    color: COLOR_INACTIVE,
    fontStyle: 'italic',
  },
});
