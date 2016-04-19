import React, {
  Component,
  View,
  Text,
  ListView,
  ActivityIndicatorIOS,
  Image,
} from 'react-native';

import ResultItem from '../ResultItem';
import Button from '../Button';

import Icon from 'react-native-vector-icons/FontAwesome';

import { queryData } from '../../api';
import { parseResponse } from '../../parse';

import s from './ResultScreen.style';

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
    };

    this.items = [];
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

  fetchPage = pagination => {
    if (this.state.isLoading) return;

    this.setState({
      isLoading: true,
    });

    queryData(this.props.searchConfig, pagination)
      .then(textRes => {
        const { result, hasMore, allResultCount } = parseResponse(textRes);
        this.items = this.items.concat(result);
        this.setState({
          hasMore,
          allResultCount,
          isLoading: false,
          dataSource: this.getDataSource(this.items),
          currentPage: pagination,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: LOG(`There was an error: ${err}`),
        });
      });
  };

  renderHeader = () => {
    if (this.state.currentPage === 0) return null;
    return (
      <View style={s.header}>
        <Text style={s.allResultCount}>Results: {this.state.allResultCount}</Text>
        <Button containerStyle={s.watchlistButton}>Add to watchlist</Button>
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
          renderRow={rowData => <ResultItem title={rowData} />}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={60}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={false}
          showsVerticalScrollIndicator
        />
      </View>
    );
  }
}

export default ResultScreen;
