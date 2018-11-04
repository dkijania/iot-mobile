import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getChannels } from '../../actions';
import { ListItem } from 'react-native-elements';
import _ from 'lodash';
import { NotificationToaster } from '../common/NotificationToaster';
import { LowerNavigation } from '../common/LowerNavigation';

class ChannelList extends Component {
  componentDidMount() {
    console.log(this.props)
    this.props.getChannels(this.props.navigation.state.params.username);
  }

  renderList() {
    return this.props.channels.map((channel) => (
      <ListItem
        key={channel.id}
        title={channel.name}
        onPress={() => this.props.navigation.navigate('Channel', { channel })}
        leftIcon={{ name: 'assessment' }}
      />
    ));
  }

  render() {
    if (this.props.isLoading) {
      return (
        <Text> Loading ... </Text>
      );
    }
    return (<View style={{ flex: 1}}>
      <View>
        <ScrollView>{this.renderList()}</ScrollView>
      </View>
      <View>
        <NotificationToaster />
      </View>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <LowerNavigation />
      </View>
    </View>);
  }
}

function mapStateToProps(state) {
  console.log("ChannelViewState");
  console.log(state);

  const channels = _.map(state.channel.channels, (val, id) => {
    val['channel_index'] = id;
    return val;
  });

  return { channels };
}

export default connect(mapStateToProps, { getChannels })(ChannelList);