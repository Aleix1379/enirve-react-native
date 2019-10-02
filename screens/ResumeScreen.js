import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import ResumeComponent from '../components/ResumeComponent';
import HeaderSection from '../components/HeaderSection';
import {View} from 'react-native';
import UserService from '../services/userService';
import {EventsService} from '../services/eventsService';

class ResumeScreen extends Component {
  constructor(props) {
    super(props);
    this.userService = new UserService();

    const progress = this.props.navigation.getParam('progress');
    const mistakes = this.props.navigation.getParam('mistakes');
    const section = this.props.navigation.getParam('section');

    const correctVerbs = section.verbs
      .filter(
        verb => mistakes.findIndex(mistake => mistake === verb.present) < 0,
      )
      .map(verb => verb.id);

    if (progress.success > 0) {
      const data = {
        points: progress.success * 10,
        activity: {
          sectionId: section.id,
          verbs: correctVerbs,
        },
      };

      this.userService
        .updateProgress(this.props.user.code, data)
        .then(result => {
          console.log('progress updated succefully');
          console.log(result);
          this.props.login(result);
          EventsService.publish('activityFinished');
        })
        .catch(error => {
          console.log('Error updating user progress');
          console.log(error);
        });
    }
  }

  repeatWrongVerbs = () => {
    const mistakes = this.props.navigation.getParam('mistakes');
    const section = this.props.navigation.getParam('section');
    section.verbs = section.verbs.filter(
      verb => mistakes.findIndex(mistake => mistake === verb.present) >= 0,
    );

    this.props.navigation.replace('Exercises', {
      mistakes: mistakes,
      section: section,
      verbs: this.props.navigation.getParam('verbs'),
    });
  };

  finish = () => {
    this.props.navigation.navigate('Tabs');
  };

  render() {
    return (
      <View>
        <HeaderSection
          title={this.props.navigation.getParam('section').title}
          current={this.props.navigation.getParam('progress').success}
          max={this.props.navigation.getParam('section').verbs.length}
        />
        <ResumeComponent
          progress={this.props.navigation.getParam('progress')}
          mistakes={this.props.navigation.getParam('mistakes')}
          finish={this.finish}
          repeatWrongVerbs={this.repeatWrongVerbs}
        />
      </View>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(ResumeScreen);
