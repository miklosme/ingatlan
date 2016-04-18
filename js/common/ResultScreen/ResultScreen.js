import React, {
  Component,
  View,
  Text,
  ListView,
  ActivityIndicatorIOS,
  Image,
} from 'react-native';

import ResultItem from '../ResultItem';

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

  componentDidMount() {
    this.fetchPage(1);
  }

  fetchPage = pagination => {
    if (this.state.isLoading) return;

    this.setState({
      isLoading: true,
    });

    queryData(this.props.searchConfig, pagination)
      .then(textRes => {
        const { result, hasMore } = parseResponse(textRes);
        this.items = this.items.concat(result);
        this.setState({
          hasMore,
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

  getDataSource = result => {
    return this.state.dataSource.cloneWithRows(result);
  };

  onEndReached = () => {
    LOG('end reached', this.state.hasMore, this.state.isLoading);
    if (this.state.hasMore && !this.state.isLoading) {
      this.fetchPage(this.state.currentPage + 1);
    }
  };

  renderFooter = () => {
    if (!this.state.hasMore) {
      return (
        <View style={s.noMore}>
          <Image
            source={require('../../../images/foxy.png')}
            style={s.noMoreImage}
          />
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
