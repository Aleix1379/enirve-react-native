import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import StorageService from '../services/storageService';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ProfileUserComponent from '../components/ProfileUserComponent';
import ProfileFriendsComponent from '../components/ProfileFriendsComponent';
import ProfileConfigurationComponent from '../components/ProfileConfigurationComponent';
import UserService from '../services/userService';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.storageService = new StorageService();
    this.userService = new UserService();

    this.state = {
      friends: [],
    };
  }

  async componentDidMount() {
    if (this.props.user) {
      this.downloadFriends();
    } else {
      console.log('without user... cannot download friends...');
    }
  }

  downloadFriends = async () => {
    try {
      let friends = await this.userService.getFriends(this.props.user.code);
      friends.unshift(this.props.user);

      friends.sort((a, b) =>
        a.progress.points < b.progress.points
          ? 1
          : a.progress.points > b.progress.points
          ? -1
          : 0,
      );

      this.setState({friends});
    } catch (error) {
      console.log('error downloading friends');
      console.log('user connected:');
      console.log(this.props.user);
      console.log(error);
    }
  };

  logout = async () => {
    await this.storageService.removeAuthToken();
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <ScrollableTabView>
        <ProfileUserComponent tabLabel="User" />
        <ProfileFriendsComponent
          tabLabel="Friends"
          friends={this.state.friends}
        />
        <ProfileConfigurationComponent
          tabLabel="Configuration"
          logout={this.logout}
        />
      </ScrollableTabView>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(ProfileScreen);
