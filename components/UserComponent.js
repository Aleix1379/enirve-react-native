import React, {Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, withTheme} from 'react-native-paper';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import Modal from 'react-native-modal';
import ImageViewerComponent from './ImageViewerComponent';

class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      user: {...props.user, ...{password: ''}},
    };
  }

  styles = StyleSheet.create({
    scrollView: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    container: {
      display: 'flex',
      flex: 1,
    },
    picture: {
      height: 120,
      width: 120,
      borderRadius: 60,
      alignSelf: 'center',
      marginTop: 16,
      marginBottom: 16,
    },
    points: {
      color: this.props.theme.colors.colorSecondaryDark,
      fontSize: 30,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    row: {
      marginTop: 16,
      marginHorizontal: 32,
      display: 'flex',
      flexDirection: 'row',
    },
    label: {
      color: this.props.theme.colors.colorPrimaryDark,
      fontWeight: 'bold',
      marginRight: 'auto',
      fontSize: 20,
    },
    value: {
      fontSize: 20,
    },
    button: {
      marginTop: 32,
      marginBottom: 16,
      marginHorizontal: 16,
    },
  });

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  getPicture = picture => {
    if (picture.startsWith('/')) {
      return `data:image/gif;base64,${picture}`;
    } else {
      return `https://enirve.com/api/v1/public/images/${picture}?random_number=${new Date().getTime()}`;
    }
  };

  render() {
    return (
      <View style={this.styles.scrollView}>
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
                cache: 'reload',
              }}
            />
          </TouchableOpacity>

          <Text style={this.styles.points}>
            {this.props.user.progress.points} EXP
          </Text>

          <View style={this.styles.row}>
            <Text style={this.styles.label}>Name</Text>
            <Text style={this.styles.value}>{this.props.user.username}</Text>
          </View>

          <View style={this.styles.row}>
            <Text style={this.styles.label}>Email</Text>
            <Text style={this.styles.value}>{this.props.user.email}</Text>
          </View>

          <Button
            style={this.styles.button}
            mode="contained"
            onPress={() => this.props.setReadMode(false)}>
            EDIT PROFILE
          </Button>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(withTheme(UserComponent));
