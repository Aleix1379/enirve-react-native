import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import {withTheme} from 'react-native-paper';
import UserFormComponent from './UserFormComponent';
import UserComponent from './UserComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class ProfileUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readMode: true,
    };
  }

  setReadMode = value => {
    this.setState({readMode: value});
  };

  getForm() {
    return this.state.readMode ? (
      <UserComponent setReadMode={this.setReadMode} />
    ) : (
      <UserFormComponent
        setReadMode={this.setReadMode}
        actionLabel="UPDATE"
        updateUser={true}
      />
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}} scrollEnabled>
        {this.getForm()}
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(withTheme(ProfileUserComponent));
