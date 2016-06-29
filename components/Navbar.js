import React, { Component } from 'react';
import Button from './Button';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.onOpenMenu();
  }

  render() {
    return (
      <View style={navStyles.nav}>
        <Text onPress={this.handlePress} style={navStyles.text}>Menu</Text>
        <Text style={navStyles.text}>FitPic</Text>
      </View>
    )
  }
}

var navStyles = StyleSheet.create({
  nav: {
    backgroundColor: '#FD704B',
    height: 20,
    padding: 24
  },
  text: {
    color: '#fff',
    backgroundColor: 'blue',
    left: 0
  }
});

export default Navbar;
