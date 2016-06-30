import React, { Component } from 'react';
import Button from './Button';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
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
        <TouchableHighlight onPress={this.handlePress} style={navStyles.menu}>
          <Image style={navStyles.menuIcon} source={require('../img/menu.png')}></Image>
        </TouchableHighlight>
        <Text style={[navStyles.text, navStyles.title]}>{this.props.title}</Text>
        <Text style={navStyles.holder}></Text>
      </View>
    )
  }
}

var navStyles = StyleSheet.create({
  nav: {
    backgroundColor: '#FD704B',
    padding: 14,
    paddingTop: 38,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: '#fff'
  },
  menu: {
    width: 40
  },
  holder: {
    width: 40
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  menuIcon: {
    width: 20,
    height: 17
  }
});

export default Navbar;
