import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {withTheme, Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCrown} from '@fortawesome/free-solid-svg-icons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

class HeaderSection extends Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    headerSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    },
    title: {
      position: 'absolute',
      top: '50%',
      left: 24,
      marginTop: 32,
      color: this.props.theme.colors.colorGreyDark2,
      fontSize: 12,
    },
    circularProgress: {
      zIndex: 1000,
      backgroundColor: '#fff',
      paddingLeft: 10,
      paddingRight: 10,
    },
    circularProgressTitle: {
      fontSize: 20,
      color: this.props.theme.colors.colorGreyDark2,
      fontWeight: 'bold',
      textAlign: 'center',
      position: 'relative',
      left: 10,
    },
    line: {
      backgroundColor: this.props.theme.colors.colorGreyDark2,
      height: 2,
      position: 'absolute',
      top: '50%',
      width: '50%',
      marginTop: 52,
    },
    lineLeft: {
      left: 24,
    },
    lineRight: {
      right: 24,
    },
  });

  getProgressPercentage() {
    return (this.props.current * 100) / this.props.max;
  }

  getProgressStyle() {
    return {
      color: this.getProgressColor(),
      fontSize: 80,
      marginBottom: 5,
    };
  }

  getProgressColor() {
    const percentage = this.getProgressPercentage();

    if (percentage >= 75) {
      return this.props.theme.colors.colorGold;
    }
    if (percentage >= 50 && percentage < 75) {
      return this.props.theme.colors.colorSilver;
    }
    if (percentage >= 25 && percentage < 50) {
      return this.props.theme.colors.colorBronze;
    }

    return this.props.theme.colors.colorGreyLight2;
  }

  render() {
    return (
      <View style={this.styles.headerSection}>
        <FontAwesomeIcon
          style={this.getProgressStyle()}
          size={80}
          icon={faCrown}
        />

        <AnimatedCircularProgress
          style={this.styles.circularProgress}
          size={100}
          width={5}
          rotation={-360}
          duration={2000}
          fill={this.getProgressPercentage()}
          tintColor={this.getProgressColor()}
          backgroundColor="#eee">
          {() => (
            <Text style={this.styles.circularProgressTitle}>
              {this.props.current} / {this.props.max}
            </Text>
          )}
        </AnimatedCircularProgress>

        <View style={[this.styles.line, this.styles.lineLeft]} />
        <Text style={this.styles.title}>{this.props.title}</Text>
        <View style={[this.styles.line, this.styles.lineRight]} />
      </View>
    );
  }
}

export default withTheme(HeaderSection);
