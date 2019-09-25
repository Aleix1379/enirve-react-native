import React from 'react';
import {withTheme} from 'react-native-paper';
import UserFormComponent from './UserFormComponent';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignUpComponent = props => {
  return (
    <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}} scrollEnabled>
      <UserFormComponent
        setReadMode={this.setReadMode}
        actionLabel="REGISTER"
        updateUser={false}
        goToLoginPage={props.goToLoginPage}
      />
    </KeyboardAwareScrollView>
  );
};

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(withTheme(SignUpComponent));
