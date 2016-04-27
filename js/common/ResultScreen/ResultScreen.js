import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  ActivityIndicatorIOS,
} from 'react-native';

import ResultItem from '../ResultItem';
import Button from '../Button';
import OrderSelector from '../OrderSelector';

import Icon from 'react-native-vector-icons/FontAwesome';
import { throttle } from 'lodash';
const lazy = fn => throttle(fn, 1000, null, true, true);

import { queryListData, queryMapData } from '../../api';
import { parseListResponse, parseMapResponse } from '../../parse';
import { QUERY_TYPES, RESULT_ORDER, COLOR_GREEN } from '../../constants';
import s from './ResultScreen.style';

import moment from 'moment';

function orderByDate(array) {
  return array.sort(({ date: a }, { date: b }) => {
    return -moment(a).diff(b, 'seconds');
  });
}

class ResultScreen extends Component {

  static propTypes = {};

  constructor() {
    super();

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource,
      isLoading: false,
      hasMore: true,
      currentPage: 0,
      order: RESULT_ORDER.NOTHING,
      hasOneFetchLoaded: false,
      allResultCount: 0,
    };

    this.items = [];

    this.orderOptions = [
      { icon: 'random', value: RESULT_ORDER.NOTHING },
      { label: 'Price Up', value: RESULT_ORDER.PRICE_UP },
      { label: 'Price Down', value: RESULT_ORDER.PRICE_DOWN },
      { label: 'Date', value: RESULT_ORDER.DATE },
    ];
  }

  componentWillMount() {
    this.fetchPage(1);
  }

  onEndReached = () => {
    if (this.state.hasMore && !this.state.isLoading) {
      this.fetchPage(this.state.currentPage + 1);
    }
  };

  getDataSource = result => this.state.dataSource.cloneWithRows(result);

  handleOrderChange = order => () => {
    this.items = [];
    this.setState({
      hasMore: true,
      isLoading: false,
      dataSource: this.getDataSource(this.items),
      currentPage: 0,
      order,
    });
  };

  fetchPage = lazy(pagination => {
    if (this.state.isLoading) return;

    this.setState({
      isLoading: true,
    });

    queryListData(this.props.searchConfig, { pagination, order: this.state.order })
    //queryMapData(this.props.searchConfig, pagination)
      .then(({ queryType, data }) => {
        let parseFunction = null;
        if (queryType === QUERY_TYPES.LIST) {
          parseFunction = parseListResponse;
        } else if (queryType === QUERY_TYPES.MAP) {
          parseFunction = parseMapResponse;
        } else {
          throw new Error('unimplemented QUERY_TYPE');
        }

        const {
          result,
          hasMore,
          allResultCount,
          } = parseFunction(data);
        const orderedResult = this.state.order === RESULT_ORDER.DATE ? orderByDate(result) : result;
        this.items = this.items.concat(orderedResult);
        this.setState({
          hasMore,
          allResultCount: Math.max(this.state.allResultCount, allResultCount),
          isLoading: false,
          dataSource: this.getDataSource(this.items),
          currentPage: pagination,
          hasOneFetchLoaded: true,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: LOG(`There was an error: ${err}`), // eslint-disable-line no-undef, new-cap
        });
      });
  });

  renderHeader = () => {
    if (!this.state.hasOneFetchLoaded) return null;
    return (
      <View>
        <View style={s.header}>
          <Text style={s.allResultCount}>Results: {this.state.allResultCount}</Text>
          <Button
            containerStyle={s.watchlistButton}
            style={s.watchlistButtonText}
            onPress={() => this.props.addToWatchlist(this.props.searchConfig)}
          >
            {/*<Icon name="eye" size={24} color={COLOR_GREEN} style={s.watchlistIcon} />*/}
            <Text>Add to watchlist</Text>
          </Button>
        </View>
        <OrderSelector
          options={this.orderOptions}
          selected={this.state.order}
          onChange={this.handleOrderChange}
        />
      </View>
    );
  };

  renderFooter = () => {
    if (!this.state.hasMore) {
      return (
        <View style={s.noMore}>
          <Icon name="tree" style={s.tree} />
          <Icon name="tree" style={s.tree} />
          <Icon name="tree" style={s.tree} />
        </View>
      );
    }

    return this.state.isLoading ?
      <ActivityIndicatorIOS style={s.scrollSpinner} /> : null;
  };

  render() {
    return (
      <View style={s.root}>
        <ListView
          ref="listview"
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <ResultItem
              {...rowData}
              onPress={this.props.viewSingleResult(rowData)}
            />
          )}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={150}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default ResultScreen;
