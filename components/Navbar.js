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
        <Button type="main" text="hamburg" onPress={this.handlePress}></Button>
        <Text>FitPic</Text>
      </View>
    )
  }
}

var navStyles = StyleSheet.create({
  nav: {
    backgroundColor: '#aaa',
    height: 20,
    padding: 24
  }
});

export default Navbar;
