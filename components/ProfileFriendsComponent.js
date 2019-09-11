import React, {Component} from 'react';
import {Text, withTheme} from 'react-native-paper';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../actions/user';

class ProfileFriendsComponent extends Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    friendRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
    },
    friendPosition: {
      flex: 0,
      marginLeft: 16,
      marginRight: 16,
      fontSize: 18,
      color: '#3F51B5',
    },
    friendImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 16,
      marginRight: 16,
    },
    friendName: {
      flex: 1,
      fontSize: 18,
    },
    friendPoints: {
      marginRight: 16,
      fontSize: 18,
    },
    userConnected: {
      color: '#FFAC00',
    },
  });

  getUserConnectedStyle = (user, defaultStyle) => {
    return this.props.user.code === user.code
      ? {
          ...defaultStyle,
          ...this.styles.userConnected,
        }
      : defaultStyle;
  };

  render() {
    return (
      <FlatList
        data={this.props.friends}
        keyExtractor={item => item.code.toString()}
        renderItem={({item, index}) => (
          <View style={this.styles.friendRow}>
            <Text
              style={this.getUserConnectedStyle(
                item,
                this.styles.friendPosition,
              )}>
              {index + 1}
            </Text>
            <Image
              style={this.styles.friendImage}
              source={{
                uri: 'https://enirve.com/api/v1/public/images/' + item.picture,
              }}
            />
            <Text
              style={this.getUserConnectedStyle(item, this.styles.friendName)}>
              {item.username}
            </Text>
            <Text
              style={this.getUserConnectedStyle(
                item,
                this.styles.friendPoints,
              )}>
              {item.progress.points} EXP
            </Text>
          </View>
        )}
      />
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(withTheme(ProfileFriendsComponent));
