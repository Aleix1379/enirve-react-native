import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, withTheme} from 'react-native-paper';

/*
PROPS:
  progress
  mistakes
  section
*/

const ResumeComponent = props => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      paddingHorizontal: 16,
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
    titleMistakes: {
      color: props.theme.colors.colorGreyDark2,
      fontSize: 25,
      marginTop: 32,
      fontWeight: 'bold',
    },
    mistakesContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    mistake: {
      color: props.theme.colors.colorGreyDark2,
      fontSize: 20,
    },
    button: {
      marginTop: 32,
    },
  });

  const getMistakes = () => {
    if (props.mistakes.length > 0) {
      return (
        <View>
          <Text style={styles.titleMistakes}>You've mistaken with:</Text>
          <View style={styles.mistakesContainer}>
            {props.mistakes.map((mistake, index) => (
              <Text style={styles.mistake} key={mistake}>
                {mistake}
                {index !== props.mistakes.length - 1 ? ', ' : null}
              </Text>
            ))}
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Text style={styles.success}>Success: {props.progress.success}</Text>
        <Text style={styles.errors}>Errors: {props.progress.errors}</Text>
      </View>

      {getMistakes()}

      {props.mistakes.length > 0 ? (
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => props.repeatWrongVerbs()}>
          REPEAT THE WRONG VERBS
        </Button>
      ) : null}

      <Button
        style={styles.button}
        mode="contained"
        onPress={() => props.finish()}>
        FINISH
      </Button>
    </View>
  );
};

export default withTheme(ResumeComponent);
