import React, {Component} from 'react';
import HomeComponent from '../components/HomeComponent';
import UserService from '../services/userService';
import StorageService from '../services/storageService';
import VerbService from '../services/verbService';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import SectionService from '../services/sectionService';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
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

  componentDidUpdate() {}

  async componentDidMount() {
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
      this.loadProgress(HomeComponent.getDefaultProgress());
    }
  };

  getDefaultProgress() {
    return [
      {
        sectionId: 1,
        verbs: [
          {
            id: 1,
            completed: false,
          },
          {
            id: 2,
            completed: false,
          },
          {
            id: 3,
            completed: false,
          },
          {
            id: 4,
            completed: false,
          },
          {
            id: 5,
            completed: false,
          },
          {
            id: 6,
            completed: false,
          },
          {
            id: 7,
            completed: false,
          },
          {
            id: 8,
            completed: false,
          },
          {
            id: 9,
            completed: false,
          },
          {
            id: 10,
            completed: false,
          },
        ],
      },
      {
        sectionId: 2,
        verbs: [
          {
            id: 11,
            completed: false,
          },
          {
            id: 12,
            completed: false,
          },
          {
            id: 13,
            completed: false,
          },
          {
            id: 14,
            completed: false,
          },
          {
            id: 15,
            completed: false,
          },
          {
            id: 16,
            completed: false,
          },
          {
            id: 17,
            completed: false,
          },
          {
            id: 18,
            completed: false,
          },
          {
            id: 19,
            completed: false,
          },
          {
            id: 20,
            completed: false,
          },
        ],
      },
      {
        sectionId: 3,
        verbs: [
          {
            id: 21,
            completed: false,
          },
          {
            id: 22,
            completed: false,
          },
          {
            id: 23,
            completed: false,
          },
          {
            id: 24,
            completed: false,
          },
          {
            id: 25,
            completed: false,
          },
          {
            id: 26,
            completed: false,
          },
          {
            id: 27,
            completed: false,
          },
          {
            id: 28,
            completed: false,
          },
          {
            id: 29,
            completed: false,
          },
          {
            id: 30,
            completed: false,
          },
        ],
      },
      {
        sectionId: 4,
        verbs: [
          {
            id: 31,
            completed: false,
          },
          {
            id: 32,
            completed: false,
          },
          {
            id: 33,
            completed: false,
          },
          {
            id: 34,
            completed: false,
          },
          {
            id: 35,
            completed: false,
          },
          {
            id: 36,
            completed: false,
          },
          {
            id: 37,
            completed: false,
          },
          {
            id: 38,
            completed: false,
          },
          {
            id: 39,
            completed: false,
          },
          {
            id: 40,
            completed: false,
          },
        ],
      },
      {
        sectionId: 5,
        verbs: [
          {
            id: 41,
            completed: false,
          },
          {
            id: 42,
            completed: false,
          },
          {
            id: 43,
            completed: false,
          },
          {
            id: 44,
            completed: false,
          },
          {
            id: 45,
            completed: false,
          },
          {
            id: 46,
            completed: false,
          },
          {
            id: 47,
            completed: false,
          },
          {
            id: 48,
            completed: false,
          },
          {
            id: 49,
            completed: false,
          },
          {
            id: 50,
            completed: false,
          },
        ],
      },
      {
        sectionId: 6,
        verbs: [
          {
            id: 51,
            completed: false,
          },
          {
            id: 52,
            completed: false,
          },
          {
            id: 53,
            completed: false,
          },
          {
            id: 54,
            completed: false,
          },
          {
            id: 55,
            completed: false,
          },
          {
            id: 56,
            completed: false,
          },
          {
            id: 57,
            completed: false,
          },
          {
            id: 58,
            completed: false,
          },
          {
            id: 59,
            completed: false,
          },
          {
            id: 60,
            completed: false,
          },
        ],
      },
      {
        sectionId: 7,
        verbs: [
          {
            id: 61,
            completed: false,
          },
          {
            id: 62,
            completed: false,
          },
          {
            id: 63,
            completed: false,
          },
          {
            id: 64,
            completed: false,
          },
          {
            id: 65,
            completed: false,
          },
          {
            id: 66,
            completed: false,
          },
          {
            id: 67,
            completed: false,
          },
          {
            id: 68,
            completed: false,
          },
          {
            id: 69,
            completed: false,
          },
          {
            id: 70,
            completed: false,
          },
        ],
      },
      {
        sectionId: 8,
        verbs: [
          {
            id: 71,
            completed: false,
          },
          {
            id: 72,
            completed: false,
          },
          {
            id: 73,
            completed: false,
          },
          {
            id: 74,
            completed: false,
          },
          {
            id: 75,
            completed: false,
          },
          {
            id: 76,
            completed: false,
          },
          {
            id: 77,
            completed: false,
          },
          {
            id: 78,
            completed: false,
          },
          {
            id: 79,
            completed: false,
          },
          {
            id: 80,
            completed: false,
          },
        ],
      },
      {
        sectionId: 9,
        verbs: [
          {
            id: 81,
            completed: false,
          },
          {
            id: 82,
            completed: false,
          },
          {
            id: 83,
            completed: false,
          },
          {
            id: 84,
            completed: false,
          },
          {
            id: 85,
            completed: false,
          },
          {
            id: 86,
            completed: false,
          },
          {
            id: 87,
            completed: false,
          },
          {
            id: 88,
            completed: false,
          },
          {
            id: 89,
            completed: false,
          },
          {
            id: 90,
            completed: false,
          },
        ],
      },
      {
        sectionId: 10,
        verbs: [
          {
            id: 91,
            completed: false,
          },
          {
            id: 92,
            completed: false,
          },
          {
            id: 93,
            completed: false,
          },
          {
            id: 94,
            completed: false,
          },
          {
            id: 95,
            completed: false,
          },
          {
            id: 96,
            completed: false,
          },
          {
            id: 97,
            completed: false,
          },
          {
            id: 98,
            completed: false,
          },
          {
            id: 99,
            completed: false,
          },
          {
            id: 100,
            completed: false,
          },
        ],
      },
      {
        sectionId: 11,
        verbs: [
          {
            id: 101,
            completed: false,
          },
          {
            id: 102,
            completed: false,
          },
          {
            id: 103,
            completed: false,
          },
          {
            id: 104,
            completed: false,
          },
          {
            id: 105,
            completed: false,
          },
          {
            id: 106,
            completed: false,
          },
          {
            id: 107,
            completed: false,
          },
          {
            id: 108,
            completed: false,
          },
          {
            id: 109,
            completed: false,
          },
          {
            id: 110,
            completed: false,
          },
        ],
      },
      {
        sectionId: 12,
        verbs: [
          {
            id: 111,
            completed: false,
          },
          {
            id: 112,
            completed: false,
          },
          {
            id: 113,
            completed: false,
          },
          {
            id: 114,
            completed: false,
          },
          {
            id: 115,
            completed: false,
          },
          {
            id: 116,
            completed: false,
          },
          {
            id: 117,
            completed: false,
          },
          {
            id: 118,
            completed: false,
          },
        ],
      },
    ];
  }

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
    return <HomeComponent sections={this.state.sections} />;
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(HomeScreen);
