import React from 'react';
import {Button, withTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const ProfileConfigurationComponent = props => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: props.theme.colors.colorRed,
      color: '#fff',
      marginLeft: 30,
      marginTop: 30,
      marginRight: 30,
    },
  });

  return (
    <View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => props.logout()}>
        LOGOUT
      </Button>
    </View>
  );
};

export default withTheme(ProfileConfigurationComponent);
