import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import ProfileFriendsComponent from '../components/ProfileFriendsComponent';
import UserService from '../services/userService';

class FriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.userService = new UserService();

    this.state = {
      friends: [],
    };
  }

  async componentDidMount() {
    if (this.props.user) {
      this.downloadFriends();
    } else {
      console.log('without user... cannot download friends...');
    }
  }

  downloadFriends = async (updateUser = false) => {
    try {
      let friends = await this.userService.getFriends(this.props.user.code);
      if (updateUser) {
        friends = friends.filter(
          friend => friend.code !== this.props.user.code,
        );
      }
      friends.unshift(this.props.user);

      friends.sort((a, b) =>
        a.progress.points < b.progress.points
          ? 1
          : a.progress.points > b.progress.points
          ? -1
          : 0,
      );

      this.setState({friends});
    } catch (error) {
      console.log('error downloading friends');
      console.log('user connected:');
      console.log(this.props.user);
      console.log(error);
    }
  };

  render() {
    return (
      <ProfileFriendsComponent
        tabLabel="Friends"
        friends={this.state.friends}
      />
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(FriendsScreen);
