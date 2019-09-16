import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import {withTheme} from 'react-native-paper';
import UserFormComponent from './UserFormComponent';
import UserComponent from './UserComponent';

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

  render() {
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
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(withTheme(ProfileUserComponent));
