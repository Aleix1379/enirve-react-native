import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, TextInput, Title, Text, withTheme} from 'react-native-paper';
import LoadingComponent from './LoadingComponent';

let SignInComponent = props => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 15,
    },
    form: {
      marginLeft: 24,
      marginRight: 24,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 10,
    },
    input: {
      marginTop: 15,
      marginBottom: 15,
      backgroundColor: '#fff',
    },
    button: {
      marginTop: 30,
    },
    errorMessage: {
      color: props.theme.colors.colorRed,
      fontSize: 18,
    },
  });

  return (
    <View style={styles.container}>
      <LoadingComponent visible={props.loading} theme={props.theme} />
      <View style={styles.form}>
        <KeyboardAwareScrollView>
          <Title style={styles.title}>Welcome to Enirve</Title>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={props.email}
            error={props.error}
            onChangeText={email => props.setEmail(email)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Password"
            textContentType="password"
            secureTextEntry={true}
            value={props.password}
            error={props.error}
            onChangeText={password => props.setPassword(password)}
          />
          {props.error ? (
            <Text style={styles.errorMessage}>Incorrect email or password</Text>
          ) : null}
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => props.login()}>
            Sign In
          </Button>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default withTheme(SignInComponent);
