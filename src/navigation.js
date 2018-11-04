import { createStackNavigator, createSwitchNavigator, navigation } from 'react-navigation';
import Login from './components/login/Login';
import ChannelList from './components/channel/ChannelList';
import ChannelView from './components/channel/ChannelView';

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  }
});

const AppStack = createStackNavigator({
  ChannelList: {
    screen: ChannelList,
    navigationOptions: {
      headerTitle: 'Channels'
    }
  },
  Channel: {
    screen: ChannelView,
    navigationOptions: {
      headerTitle: 'Channel'
    }
  }
});

export default createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Auth',
  }
);