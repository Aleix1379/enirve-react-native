import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import ExercisesComponent from '../components/ExercisesComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class ExercisesScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const mistakes = navigation.getParam('mistakes');
    if (mistakes?.length > 0) {
      console.log('1] MISTAKES:::');
      console.log(mistakes);
    }

    const section = navigation.getParam('section');
    return {
      title: section?.title,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: {
        success: 0,
        errors: 0,
      },
      section: props.navigation.getParam('section'),
      currentVerb: props.navigation.getParam('section').verbs[0],
      index: 0,
      verbChecked: false,
      pastSimple: '',
      pastParticiple: '',
      resumeVerbsChecked: [],
      mistakes: [],
      errors: {
        pastSimple: false,
        pastParticiple: false,
      },
      buttonLabel: 'CHECK',
    };
  }

  updatePastSimple = value => {
    this.setState({pastSimple: value});
  };

  updatePastParticiple = value => {
    this.setState({pastParticiple: value});
  };

  verbCheckPast = (verb, value, tense) => {
    if (verb[tense].includes('/')) {
      const values = verb[tense].split('/').map(item => item.trim());
      console.log(values);
      return (
        values[0].toLowerCase().trim() === value.toLowerCase().trim() ||
        values[1].toLowerCase().trim() === value.toLowerCase().trim()
      );
    }

    return verb[tense].toLowerCase().trim() === value.toLowerCase().trim();
  };

  checkVerb = () => {
    const errors = {
      pastSimple: false,
      pastParticiple: false,
    };

    const resultPastSimple = this.verbCheckPast(
      this.state.currentVerb,
      this.state.pastSimple,
      'simple',
    );

    if (!resultPastSimple) {
      errors.pastSimple = true;
    }

    const resultPastParticiple = this.verbCheckPast(
      this.state.currentVerb,
      this.state.pastParticiple,
      'participle',
    );

    if (!resultPastParticiple) {
      errors.pastParticiple = true;
    }

    this.setState({errors});

    if (resultPastSimple && resultPastParticiple) {
      const progress = this.state.progress;
      progress.success++;
      this.setState({progress});
      this.state.resumeVerbsChecked.push({
        verb: this.state.currentVerb.present,
        success: true,
      });
    } else {
      const progress = this.state.progress;
      progress.errors++;
      this.setState({progress});
      this.state.mistakes.push(this.state.currentVerb.present);
      this.state.resumeVerbsChecked.push({
        verb: this.state.currentVerb.present,
        success: false,
      });
    }

    if (this.state.index === this.state.section.verbs.length - 1) {
      this.setState({buttonLabel: 'FINISH'});
    } else {
      this.setState({buttonLabel: 'NEXT'});
    }
    this.setState({verbChecked: true});
  };

  next = () => {
    this.setState({pastSimple: ''});
    this.setState({pastParticiple: ''});
    this.setState({
      errors: {
        pastSimple: false,
        pastParticiple: false,
      },
    });

    this.setState({buttonLabel: 'CHECK'});
    this.setState({verbChecked: false});

    this.setState({index: this.state.index + 1}, () => {
      this.setState({
        currentVerb: this.state.section.verbs[this.state.index],
      });
    });
  };

  btnPressed = () => {
    if (!this.state.verbChecked) {
      this.checkVerb();
    } else {
      if (this.state.index === this.state.section.verbs.length - 1) {
        console.log('go to resume...');
        this.props.navigation.navigate('Resume', {
          progress: this.state.progress,
          mistakes: this.state.mistakes,
          section: this.state.section,
        });
      } else {
        this.next();
      }
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}} scrollEnabled>
        <ExercisesComponent
          progress={this.state.progress}
          section={this.state.section}
          currentVerb={this.state.currentVerb}
          pastSimple={this.state.pastSimple}
          pastParticiple={this.state.pastParticiple}
          updatePastSimple={this.updatePastSimple}
          updatePastParticiple={this.updatePastParticiple}
          checkVerb={this.checkVerb}
          verbChecked={this.state.verbChecked}
          next={this.next}
          btnPressed={this.btnPressed}
          buttonLabel={this.state.buttonLabel}
          errors={this.state.errors}
          resumeVerbsChecked={this.state.resumeVerbsChecked}
        />
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {
    login: login,
  },
)(ExercisesScreen);
