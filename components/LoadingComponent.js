import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const LoadingComponent = props => {
  const styles = StyleSheet.create({
    loading: {
      backgroundColor: 'rgba(180,180,180,0.34)',
      height: '100%',
      width: '100%',
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 100000,
    },
  });

  return props.visible ? (
    <View style={styles.loading}>
      <ActivityIndicator
        size="large"
        animating={true}
        color={props.theme.colors.primary}
      />
    </View>
  ) : null;
};

export default LoadingComponent;
