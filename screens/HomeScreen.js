import React, {Component} from 'react';
import HomeComponent from '../components/HomeComponent';
import UserService from '../services/userService';
import StorageService from '../services/storageService';
import VerbService from '../services/verbService';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import SectionService from '../services/sectionService';
import {EventsService} from '../services/eventsService';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    console.log('home screen constructor');

    this.userService = new UserService();
    this.storageService = new StorageService();
    this.verbService = new VerbService();
    this.sectionService = new SectionService();

    this.state = {
      loading: false,
      user: null,
      userId: 1,
      verbs: this.verbService.getAll(),
      sections: this.sectionService.getSections(),
    };
  }

  componentDidUpdate() {
    console.log('home screen componentDidUpdate');
  }

  async componentDidMount() {
    console.log('home screen componentDidMount');
    this.init();

    EventsService.subscribe('activityFinished', () => {
      console.log('subscribe activity finished: RANDOM;');
      this.setState({key: Math.random()});
      this.loadProgress(this.props.user.progress.activity);
    });
  }

  async init() {
    try {
      const token = await this.storageService.getAuthToken();
      if (token) {
        this.getUser(token.userCode);
      } else {
        console.log('No hi ha token 🥶🤬🤯');
        this.props.navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  getUser = async userId => {
    this.setState({loading: true});

    try {
      const user = await this.userService.getUserById(userId);
      this.setState({
        user: user,
        loading: false,
      });
      this.props.login(user);
      this.loadProgress(user.progress.activity);
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.error('Error descarregant usuari');
      console.error(error);
      this.loadProgress(this.verbService.getDefaultProgress());
    }
  };

  loadProgress(userProgress) {
    const sections = [...this.state.sections];
    sections.forEach(section => {
      section.current = userProgress
        .find(
          userSectionProgress => userSectionProgress.sectionId === section.id,
        )
        .verbs.filter(verb => verb.completed).length;
    });
    this.setState({sections: sections});
  }

  render() {
    return (
      <HomeComponent
        key={this.state.key}
        sections={this.state.sections}
        navigation={this.props.navigation}
      />
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(HomeScreen);
