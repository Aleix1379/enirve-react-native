import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import {logout} from '../actions/user';
import StorageService from '../services/storageService';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ProfileUserComponent from '../components/ProfileUserComponent';
import ProfileConfigurationComponent from '../components/ProfileConfigurationComponent';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.storageService = new StorageService();
  }

  logout = async () => {
    await this.storageService.removeAuthToken();
    this.props.logout();
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <ScrollableTabView>
        <ProfileUserComponent tabLabel="User" />
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
    logout: logout,
  },
)(ProfileScreen);
