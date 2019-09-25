import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {withTheme, Text, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {login} from '../actions/user';
import HeaderSection from './HeaderSection';

class HomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    sectionList: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: '#ececec',
    },
    sectionRow: {
      marginBottom: 20,
      backgroundColor: '#fff',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      borderRadius: 5,
      borderColor: '#fff',
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    verbList: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 16,
      flexWrap: 'wrap',
    },
    verb: {
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 8,
    },
    verbCheck: {
      color: this.props.theme.colors.colorGreen,
      position: 'absolute',
      right: -2,
      top: 2,
    },
    button: {
      marginTop: 16,
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
    },
  });

  isVerbCompleted(sectionId, verbId) {
    if (!this.props.user) {
      return false;
    }
    const section = this.props.user.progress.activity.find(
      activity => activity.sectionId === sectionId,
    );

    if (section) {
      const currentVerb = section.verbs.find(verb => verb.id === verbId);
      if (currentVerb && currentVerb.completed) {
        return true;
      }
    }
    return false;
  }

  getIconVerbCompleted(sectionId, verbId) {
    if (!this.props.user) {
      return null;
    }

    if (this.isVerbCompleted(sectionId, verbId)) {
      return (
        <FontAwesomeIcon style={this.styles.verbCheck} icon={faCheckCircle} />
      );
    }

    return null;
  }

  start(section) {
    this.props.navigation.navigate('Exercises', {section});
  }

  getVerbCompleted = (sectionId, verbId) => {
    const styles = {...this.styles.verb};

    if (this.isVerbCompleted(sectionId, verbId)) {
      styles.color = this.props.theme.colors.colorGreen;
    }

    return styles;
  };

  render() {
    return (
      <View>
        <FlatList
          style={this.styles.sectionList}
          data={this.props.sections}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={this.styles.sectionRow}>
              <HeaderSection
                title={item.title}
                current={item.current}
                max={item.max}
              />
              <View style={this.styles.verbList}>
                {item.verbs.map(verb => (
                  <View key={verb.id}>
                    {this.getIconVerbCompleted(item.id, verb.id)}
                    <Text style={this.getVerbCompleted(item.id, verb.id)}>
                      {' '}
                      {verb.present}
                    </Text>
                  </View>
                ))}
              </View>
              <Button
                style={this.styles.button}
                mode="contained"
                onPress={() => this.start(item)}>
                START
              </Button>
            </View>
          )}
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
)(withTheme(HomeComponent));
