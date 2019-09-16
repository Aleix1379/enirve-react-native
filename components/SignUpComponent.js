import React from 'react';
import {withTheme} from 'react-native-paper';
import UserFormComponent from './UserFormComponent';
import {connect} from 'react-redux';
import {login} from '../actions/user';

const SignUpComponent = () => {
  return (
    <UserFormComponent
      setReadMode={this.setReadMode}
      actionLabel="REGISTER"
      updateUser={false}
    />
  );
};

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(withTheme(SignUpComponent));
