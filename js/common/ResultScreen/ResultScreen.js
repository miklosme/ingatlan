import React, {
  Component,
  View,
  Text,
  ListView,
  ActivityIndicatorIOS,
  Image,
} from 'react-native';

import ResultItem from '../ResultItem';

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
      hasMore: true,
    };
  }

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

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.result)
    });
  }

  render() {
    return (
      <View style={s.root}>
        <ListView
          ref='listview'
          dataSource={this.state.dataSource}
          renderRow={rowData => <ResultItem title={rowData} />}
          renderFooter={this.renderFooter}
          //onEndReached={this.onEndReached}
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
