import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import SignInComponent from '../components/SignInComponent';
import SignUpComponent from '../components/SignUpComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import UserService from '../services/userService';
import StorageService from '../services/storageService';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.userService = new UserService();
    this.storageService = new StorageService();

    this.state = {
      email: '',
      password: '',
      loadingVisible: false,
      error: false,
    };
  }

  setEmail = email => {
    this.setState({
      email,
    });
  };

  setPassword = password => {
    this.setState({
      password,
    });
  };

  login = async () => {
    console.log('auth screen login...');
    this.setState({loadingVisible: true});
    try {
      const token = await this.userService.createToken(
        this.state.email,
        this.state.password,
      );
      await this.storageService.setAuthToken(token);
      this.setState({loadingVisible: false});
      this.setState({error: false});
      this.props.navigation.navigate('Home');
    } catch (error) {
      this.setState({loadingVisible: false});
      this.setState({error: true});
      console.log('error login...');
      console.log(error);
    }
  };

  render() {
    return (
      <ScrollableTabView>
        <SignInComponent
          tabLabel="Sign In"
          email={this.state.email}
          password={this.state.password}
          setEmail={this.setEmail}
          setPassword={this.setPassword}
          login={this.login}
          loading={this.state.loadingVisible}
          error={this.state.error}
        />
        <SignUpComponent tabLabel="Sign Up" />
      </ScrollableTabView>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(AuthScreen);
