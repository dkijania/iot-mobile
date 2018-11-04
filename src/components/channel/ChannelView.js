import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChannelData } from '../../actions/channel-action';
import { View, Text, FlatList, } from 'react-native';
import { FormLabel } from 'react-native-elements';
import InnerSection from "../common/InnerSection";
import { VictoryBar } from "victory-native";



class ChannelView extends Component {
  componentDidMount() {
    this.props.getChannelData(this.props.navigation.state.params.channel.id);
  }

  getChannel() {
    return this.props.navigation.state.params.channel;
  }


  render() {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <InnerSection>
          <FormLabel>Channel Id:</FormLabel>
          <FormLabel>{this.props.channel.id}</FormLabel>
        </InnerSection>
        <InnerSection>
          <FormLabel>Channel Name:</FormLabel>
          <FormLabel>{this.props.channel.name}</FormLabel>
        </InnerSection>
        <FlatList
          data={this.props.channelData}
          renderItem={({ item }) => <View>
            <Text>{this.convertToDateTime(item.timestamp)}</Text>
            <Text>{item.value}</Text>
          </View>}
        />
      </View>
    );
  }

  convertToDateTime(timestamp) {
    var a = new Date(timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }
}



function mapStateToProps(state) {
  console.log("View", state)
  return {
    channel: state.channel.channels[0],
    channelData: state.channel.channelData
  };
}

export default connect(mapStateToProps, { getChannelData })(ChannelView);