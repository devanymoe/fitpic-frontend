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
          <Text style={styles.buttonText}>{this.props.text}</Text>
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
    backgroundColor: '#308796'
  },
  alert: {
    backgroundColor: 'red'
  }
});

export default Button;
