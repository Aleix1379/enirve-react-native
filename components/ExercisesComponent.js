import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  Title,
  withTheme,
} from 'react-native-paper';
import HorizontalProgressBar from 'react-native-horizontal-progress-bar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const ExercisesComponent = props => {
  const getCurrentProgress = () => {
    return props.progress.success + props.progress.errors;
  };

  const getProgressPercentage = () => {
    return getCurrentProgress() / props.section.verbs.length;
  };

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      paddingHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 16,
      color: props.theme.colors.colorGreyDark2,
    },
    progressbar: {
      backgroundColor: props.theme.colors.colorGreyDark2,
      height: 30,
      borderRadius: 15,
      overflow: 'hidden',
    },
    counter: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 32,
    },
    success: {
      color: props.theme.colors.colorGreen,
      flex: 1,
      fontSize: 20,
    },
    errors: {
      color: props.theme.colors.colorRed,
      flex: 1,
      textAlign: 'right',
      fontSize: 20,
    },
    verb: {
      fontSize: 25,
      fontWeight: 'bold',
      color: props.theme.colors.colorGreyDark2,
    },
    form: {
      marginVertical: 32,
    },
    input: {
      backgroundColor: '#fff',
      marginTop: 32,
      paddingRight: 30,
    },
    error: {
      color: props.theme.colors.colorRed,
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 100000,
    },
    button: {
      marginVertical: 32,
    },
    verbList: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 16,
      flexWrap: 'wrap',
    },
    verbItem: {
      fontSize: 18,
    },
    verbCheck: {
      color: props.theme.colors.colorGreen,
      position: 'absolute',
      right: 10,
      bottom: 15,
    },
    verbError: {
      color: props.theme.colors.colorRed,
      position: 'absolute',
      right: 10,
      bottom: 15,
    },
  });

  const getVerbItemStyle = success => {
    const style = {...styles.verbItem};
    if (success) {
      style.color = props.theme.colors.colorGreen;
    } else {
      style.color = props.theme.colors.colorRed;
    }
    return style;
  };

  const getIconVerbCompleted = tense => {
    if (props.verbChecked && !props.errors[tense]) {
      return (
        <FontAwesomeIcon
          size={25}
          style={styles.verbCheck}
          icon={faCheckCircle}
        />
      );
    } else if (props.verbChecked && props.errors[tense]) {
      return (
        <FontAwesomeIcon
          size={25}
          style={styles.verbError}
          icon={faExclamationCircle}
        />
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
        Completed {getCurrentProgress()} of {props.section.verbs.length}
      </Title>

      <HorizontalProgressBar
        style={styles.progressbar}
        color={props.theme.colors.accentColor}
        progress={getProgressPercentage()}
      />

      <View style={styles.counter}>
        <Text style={styles.success}>Success: {props.progress.success}</Text>
        <Text style={styles.errors}>Errors: {props.progress.errors}</Text>
      </View>

      <View style={styles.verbList}>
        {props.resumeVerbsChecked.map((item, index) => (
          <Text key={item.verb} style={getVerbItemStyle(item.success)}>
            {item.verb}
            {index !== props.resumeVerbsChecked.length - 1 ? ', ' : ''}
          </Text>
        ))}
      </View>

      <View style={styles.form}>
        <Text style={styles.verb}>Verb: {props.currentVerb.present}</Text>
        <View>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Enter the past simple"
            value={props.pastSimple}
            error={props.errors.pastSimple}
            onChangeText={text => props.updatePastSimple(text)}
          />
          {getIconVerbCompleted('pastSimple')}
          <HelperText style={styles.error} visible={props.errors.pastSimple}>
            {props.currentVerb.simple}
          </HelperText>
        </View>

        <View>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Enter the past participle"
            value={props.pastParticiple}
            error={props.errors.pastParticiple}
            onChangeText={text => props.updatePastParticiple(text)}
          />
          {getIconVerbCompleted('pastParticiple')}
          <HelperText
            style={styles.error}
            visible={props.errors.pastParticiple}>
            {props.currentVerb.participle}
          </HelperText>
        </View>

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => props.btnPressed()}>
          {props.buttonLabel}
        </Button>
      </View>
    </View>
  );
};

export default withTheme(ExercisesComponent);
