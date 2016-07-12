import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class Button extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.button, styles[this.props.type]]}>
          <Text style={[styles.buttonText, styles[this.props.textStyle]]}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

var styles = StyleSheet.create({
  buttonText: {
    color: '#fff'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    padding: 10
  },
  main: {
    backgroundColor: '#FD704B'
  },
  gray: {
    backgroundColor: '#999'
  },
  mainLarge: {
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#FD704B'
  },
  grayLarge: {
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#999'
  },
  loginLarge: {
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#bf4c2e'
  },
  large: {
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default Button;
