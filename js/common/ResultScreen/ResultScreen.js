import React, {
  Component,
  View,
  Text,
  ListView,
} from 'react-native';

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
    };
  }

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
          renderRow={(rowData) => <Text>{rowData}</Text>}
          //renderFooter={this.renderFooter}
          //renderRow={this.renderRow}
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
