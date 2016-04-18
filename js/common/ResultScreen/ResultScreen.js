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
      pagination: 1,
    };
  }

  componentDidMount() {
    this.fetchNextPage();
  }

  fetchNextPage = () => {
    if (this.state.isLoading) return;

    this.setState({
      isLoading: true,
    });

    queryData(this.props.searchConfig, this.state.pagination)
      .then(textRes => {
        const { result, hasMore } = parseResponse(textRes);
        this.setState({
          hasMore,
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(result),
          pagination: this.state.pagination + 1,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: `There was an error: ${err}`
        });
      });
  };

  onEndReached = () => {
    if (this.state.hasMore && !this.state.isLoading) {
      this.fetchNextPage();
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

    return <ActivityIndicatorIOS style={s.scrollSpinner} />;
  };

  render() {
    return (
      <View style={s.root}>
        <ListView
          ref='listview'
          dataSource={this.state.dataSource}
          renderRow={rowData => <ResultItem title={rowData} />}
          renderFooter={this.renderFooter}
          onEndReached={this.onEndReached}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps={false}
          showsVerticalScrollIndicator={true}
        />
      </View>
    );
  }
}

export default ResultScreen;
