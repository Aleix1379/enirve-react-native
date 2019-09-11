import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './Navigator';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import store from './store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3F51B5',
    accentColor: '#FFDE0F',
    colorPrimaryLight: '#7986CB',
    colorPrimaryDark: '#303F9F',
    colorSecondaryLight: '#FFDE0F',
    colorSecondaryDark: '#FFAC00',
    colorGreyLight1: '#f7f7f7',
    colorGreyLight2: '#e6e6e6',
    colorGreyDark1: '#999',
    colorGreyDark2: '#777',
    colorGreyDark3: '#333',
    colorWhite: '#fff',
    colorBlack: '#000',
    colorGold: '#FFD700',
    colorSilver: '#C0C0C0',
    colorBronze: '#ccb66f',
    colorGreen: '#4caf50',
    colorRed: '#f44336',
  },
};

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          color="#fff"
          backgroundColor={theme.primary}
          translucent={false}
        />
        <AppNavigator />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
