import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import {
  Button,
  Text,
  TextInput,
  HelperText,
  withTheme,
} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import ImageViewerComponent from './ImageViewerComponent';
import UserService from '../services/userService';

class ProfileUserComponent extends Component {
  constructor(props) {
    super(props);
    this.userService = new UserService();

    this.state = {
      isModalVisible: false,
      user: {...props.user},
      passwordRepeat: '',
      errors: {
        username: {
          validated: true,
          errorMessage: '',
        },
        email: {
          validated: true,
          errorMessage: '',
        },
      },
    };
  }

  usernameValidation = {
    OK: 0,
    REQUIRED: 1,
    REPEAT: 2,
  };

  styles = StyleSheet.create({
    container: {
      display: 'flex',
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    picture: {
      height: 60,
      width: 60,
      borderRadius: 60,
      alignSelf: 'center',
    },
    points: {
      color: this.props.theme.colors.colorSecondaryDark,
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    form: {},
    input: {
      marginVertical: 10,
    },
    button: {
      marginTop: 16,
    },
    error: {
      color: this.props.theme.colors.colorRed,
      position: 'absolute',
      bottom: 8,
      left: 0,
    },
  });

  setInput = async (value, property) => {
    const user = {...this.state.user};
    user[property] = value;
    this.setState({user}, () => this.validateProperty(property));
  };

  checkAvailability(property) {
    return new Promise(resolve => {
      if (this.state.user[property] !== this.props.user[property]) {
        this.userService
          .find(this.state.user[property], property)
          .then(() => resolve(false))
          .catch(() => resolve(true));
      } else {
        resolve(true);
      }
    });
  }

  validateProperty = async property => {
    const errors = {...this.state.errors};

    const item = this.state.user[property];
    if (item.length === 0) {
      errors[property].validated = false;
      errors[property].errorMessage = `${property} is required`;
      this.setState({errors});
      return this.usernameValidation.REQUIRED;
    }
    const isAvailable = await this.checkAvailability(property);
    if (isAvailable) {
      errors[property].validated = true;
      errors[property].errorMessage = '';
      this.setState({errors});
      return this.usernameValidation.OK;
    } else {
      errors[property].validated = false;
      errors[property].errorMessage = `This ${property} already exists`;
      this.setState({errors});
      return this.usernameValidation.REPEAT;
    }
  };

  validateForm = async () => {
    const usernameValidationResult = await this.validateProperty('username');

    // if (usernameValidationResult === this.usernameValidation.OK) {
    // } else if (usernameValidationResult === this.usernameValidation.REQUIRED) {
    // } else if (usernameValidationResult === this.usernameValidation.REPEAT) {
    // } else {
    //   console.log('unknown errror:');
    //   console.log(usernameValidationResult);
  };

  updateProfile = () => {
    console.log('update profile...');
    console.log(this.state.user);
    console.log('validate form...');
    console.log(this.validateForm());
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  /*  getStatusByProperty = property => {
      const result = this.validateProperty();
      if (result === this.usernameValidation.OK) {
        return {
          message: 'ok',
          ok: true,
        };
      } else if (result === this.usernameValidation.REQUIRED) {
        return {
          message: `${property} is required`,
          ok: false,
        };
      } else if (result === this.usernameValidation.REPEAT) {
        return {
          message: `${property} "${this.state.user[property]}" exists already`,
          ok: false,
        };
      } else {
        console.log('unknown errror:');
        console.log(result);
        return {
          message: '',
          ok: true,
        };
      }
    };*/

  render() {
    return (
      <ScrollView>
        <Modal isVisible={this.state.isModalVisible} swipeDirection="up">
          <ImageViewerComponent
            imageName={this.state.user.picture}
            closeModal={this.toggleModal}
          />
        </Modal>
        <View style={this.styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.toggleModal()}>
            <Image
              style={this.styles.picture}
              source={{
                uri:
                  'https://enirve.com/api/v1/public/images/' +
                  this.state.user.picture,
              }}
            />
          </TouchableOpacity>
          <Button mode="text" onPress={() => console.log('Pressed')}>
            Choose a picture
          </Button>
          <Text style={this.styles.points}>
            {this.state.user.progress.points} EXP
          </Text>
          <View stlye={this.styles.form}>
            <KeyboardAwareScrollView>
              <View>
                <TextInput
                  style={this.styles.input}
                  mode="outlined"
                  label="Username"
                  value={this.state.user.username}
                  error={!this.state.errors.username.validated}
                  onChangeText={text => this.setInput(text, 'username')}
                />
                <HelperText
                  style={this.styles.error}
                  error={!this.state.errors.username.validated}>
                  {this.state.errors.username.errorMessage}
                </HelperText>
              </View>
              <View>
                <TextInput
                  style={this.styles.input}
                  mode="outlined"
                  label="Email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  value={this.state.user.email}
                  error={!this.state.errors.email.validated}
                  onChangeText={text => this.setInput(text, 'email')}
                />
                <HelperText
                  style={this.styles.error}
                  error={!this.state.errors.email.validated}>
                  {this.state.errors.email.errorMessage}
                </HelperText>
              </View>
              <TextInput
                style={this.styles.input}
                mode="outlined"
                label="Password"
                textContentType="password"
                secureTextEntry={true}
                value={this.state.user.password}
                placeholder="********"
                onChangeText={text => this.setInput(text, 'password')}
              />
              <TextInput
                style={this.styles.input}
                mode="outlined"
                label="Repeat the password"
                textContentType="password"
                secureTextEntry={true}
                value={this.state.passwordRepeat}
                placeholder="********"
                onChangeText={text => this.setInput(text, 'passwordRepeat')}
              />
              <Button
                style={this.styles.button}
                mode="contained"
                onPress={() => this.updateProfile()}>
                UPDATE
              </Button>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(withTheme(ProfileUserComponent));
