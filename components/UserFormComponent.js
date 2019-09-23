import React, {Component} from 'react';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  withTheme,
} from 'react-native-paper';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LoadingComponent from './LoadingComponent';
import Modal from 'react-native-modal';
import ImageViewerComponent from './ImageViewerComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UserService from '../services/userService';
import {connect} from 'react-redux';
import {login} from '../actions/user';

class UserFormComponent extends Component {
  constructor(props) {
    super(props);
    this.userService = new UserService();

    this.state = {
      isModalVisible: false,
      loadingVisible: false,
      user: {...props.user, ...{password: ''}},
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
        password: {
          validated: true,
          errorMessage: '',
        },
        passwordRepeat: {
          validated: true,
          errorMessage: '',
        },
      },
    };

    console.log('user:');
    console.log(this.state.user);

    if (!this.state.user.picture) {
      console.log('updating image...');
      this.state.user = {
        username: '',
        email: '',
        password: '',
        picture: 'user-default.png',
      };
    }
  }

  inputValidation = {
    OK: 0,
    REQUIRED: 1,
    REPEAT: 2,
  };

  passsordValidation = {
    OK: 0,
    MIN_LENGTH: 1,
    DIFFERENT_PASSWORD: 2,
  };

  styles = StyleSheet.create({
    container: {
      display: 'flex',
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    picture: {
      height: 120,
      width: 120,
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
    cancel: {
      marginTop: 16,
      backgroundColor: this.props.theme.colors.colorGreyDark2,
    },
    error: {
      color: this.props.theme.colors.colorRed,
      position: 'absolute',
      bottom: 8,
      left: 0,
      zIndex: 100000,
    },
  });

  setInput = async (value, property) => {
    if (property !== 'passwordRepeat') {
      const user = {...this.state.user};
      user[property] = value;
      this.setState({user}, () => {
        if (property === 'password' || property === 'passwordRepeat') {
          this.validatePassword(property);
        } else {
          this.validateProperty(property);
        }
      });
    } else {
      this.setState({passwordRepeat: value}, () => {
        this.validatePassword(property);
      });
    }
  };

  checkAvailability(property) {
    return new Promise(resolve => {
      if (
        !this.props.user ||
        this.state.user[property] !== this.props.user[property]
      ) {
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
      return this.inputValidation.REQUIRED;
    }
    const isAvailable = await this.checkAvailability(property);
    if (isAvailable) {
      errors[property].validated = true;
      errors[property].errorMessage = '';
      this.setState({errors});
      return this.inputValidation.OK;
    } else {
      errors[property].validated = false;
      errors[property].errorMessage = `This ${property} already exists`;
      this.setState({errors});
      return this.inputValidation.REPEAT;
    }
  };

  validatePassword = property => {
    const passwordContraints = {
      MIN: 8,
      MAX: 32,
    };
    const errors = {...this.state.errors};
    const item =
      property === 'password'
        ? this.state.user[property]
        : this.state.passwordRepeat;

    if (
      item.length === 0 ||
      (item.length >= passwordContraints.MIN &&
        item.length <= passwordContraints.MAX &&
        property === 'password')
    ) {
      errors[property].validated = true;
      errors[property].errorMessage = '';

      if (this.state.user.password !== this.state.passwordRepeat) {
        errors.passwordRepeat.validated = false;
        errors.passwordRepeat.errorMessage = 'The password do not match';
      } else {
        errors.passwordRepeat.validated = true;
        errors.passwordRepeat.errorMessage = '';
      }

      this.setState({errors});
      return this.passsordValidation.OK;
    }

    if (
      item.length === 0 ||
      (item.length >= passwordContraints.MIN &&
        item.length <= passwordContraints.MAX &&
        property === 'passwordRepeat' &&
        this.state.user.password === this.state.passwordRepeat)
    ) {
      errors[property].validated = true;
      errors[property].errorMessage = '';
      this.setState({errors});
      return this.passsordValidation.OK;
    }

    if (item.length < passwordContraints.MIN) {
      errors[property].validated = false;
      errors[property].errorMessage = `Password must be at least ${
        passwordContraints.MIN
      } characters`;
      this.setState({errors});
      return this.passsordValidation.MIN_LENGTH;
    }

    if (this.state.user.password !== this.state.passwordRepeat) {
      errors.passwordRepeat.validated = false;
      errors.passwordRepeat.errorMessage = 'The password do not match';
      this.setState({errors});
      return this.passsordValidation.MIN_LENGTH;
    }
  };

  validateForm = async () => {
    const usernameResult = await this.validateProperty('username');
    const emailResult = await this.validateProperty('email');
    const passwordResult = await this.validatePassword('password');
    const passwordRepeatResult = await this.validatePassword('passwordRepeat');

    return (
      usernameResult === this.inputValidation.OK &&
      emailResult === this.inputValidation.OK &&
      passwordResult === this.passsordValidation.OK &&
      passwordRepeatResult === this.passsordValidation.OK
    );
  };

  saveProfile = async () => {
    console.log('user data');
    console.log(this.state.user);
    const formValid = await this.validateForm();
    console.log(`validation result: ${formValid}`);
    if (formValid) {
      try {
        this.setState({loadingVisible: true});
        let updateResult = null;

        if (this.props.updateUser) {
          updateResult = await this.userService.updateUser(
            this.state.user.code,
            this.state.user,
          );
        } else {
          console.log('create user...');
          return null;
        }
        this.setState({loadingVisible: false});
        console.log('update result:');
        console.log(updateResult);
        this.setState({user: updateResult});
        this.props.login(updateResult);
        // await this.props.downloadFriends(true);
        this.props.setReadMode(true);
      } catch (error) {
        this.setState({loadingVisible: false});
        console.log('error updating profile...');
        console.log(error);
      }
    } else {
      this.setState({loadingVisible: false});
      console.log('error on the user form....');
    }
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  choosePicture = () => {
    const options = {
      title: 'Choose a picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const user = {...this.state.user};
        user.picture = response.data;
        console.log('user picture:');
        console.log(user.picture);
        this.setState({user});
      }
    });
  };

  getPicture = picture => {
    if (picture.startsWith('/')) {
      return `data:image/gif;base64,${picture}`;
    } else {
      return `https://enirve.com/api/v1/public/images/${picture}?random_number= ${new Date().getTime()}`;
    }
  };

  render() {
    return (
      <ScrollView>
        <LoadingComponent
          visible={this.state.loadingVisible}
          theme={this.props.theme}
        />
        <Modal isVisible={this.state.isModalVisible} swipeDirection="up">
          <ImageViewerComponent
            imageName={this.getPicture(this.state.user.picture)}
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
                uri: this.getPicture(this.state.user.picture),
              }}
            />
          </TouchableOpacity>
          <Button mode="text" onPress={() => this.choosePicture()}>
            Choose a picture
          </Button>
          {this.state.user.progress ? (
            <Text style={this.styles.points}>
              {this.state.user.progress.points} EXP
            </Text>
          ) : null}
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
              <View>
                <TextInput
                  style={this.styles.input}
                  mode="outlined"
                  label="Password"
                  textContentType="password"
                  secureTextEntry={true}
                  value={this.state.user.password}
                  placeholder="********"
                  error={!this.state.errors.password.validated}
                  onChangeText={text => this.setInput(text, 'password')}
                />
                <HelperText
                  style={this.styles.error}
                  error={!this.state.errors.password.validated}>
                  {this.state.errors.password.errorMessage}
                </HelperText>
              </View>
              <View>
                <TextInput
                  style={this.styles.input}
                  mode="outlined"
                  label="Repeat the password"
                  textContentType="password"
                  secureTextEntry={true}
                  value={this.state.passwordRepeat}
                  placeholder="********"
                  error={!this.state.errors.passwordRepeat.validated}
                  onChangeText={text => this.setInput(text, 'passwordRepeat')}
                />
                <HelperText
                  style={this.styles.error}
                  error={!this.state.errors.passwordRepeat.validated}>
                  {this.state.errors.passwordRepeat.errorMessage}
                </HelperText>
              </View>
              <Button
                style={this.styles.cancel}
                mode="contained"
                onPress={() => this.props.setReadMode(true)}>
                CANCEL
              </Button>
              <Button
                style={this.styles.button}
                mode="contained"
                onPress={() => this.saveProfile()}>
                {this.props.actionLabel}
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
)(withTheme(UserFormComponent));
