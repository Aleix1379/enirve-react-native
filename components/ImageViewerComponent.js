import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {IconButton, withTheme} from 'react-native-paper';

const ImageViewerComponent = props => {
  const {width} = Dimensions.get('window');
  const imageSize = width - 32;
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    picture: {
      width: imageSize,
      height: imageSize,
      borderRadius: imageSize / 2,
    },
    close: {
      position: 'absolute',
      top: -8,
      left: -8,
      zIndex: 1000000,
    },
  });

  return (
    <View style={styles.container}>
      <IconButton
        style={styles.close}
        color="#fff"
        icon="close"
        size={30}
        onPress={() => props.closeModal()}
      />
      <Image
        style={styles.picture}
        resizeMode="cover"
        source={{
          uri: 'https://enirve.com/api/v1/public/images/' + props.imageName,
        }}
      />
    </View>
  );
};

export default withTheme(ImageViewerComponent);
