import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from './Button';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback
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
        <TouchableWithoutFeedback onPress={this.handlePress.bind(this, 'menu')} style={navStyles.menu}>
          <Icon name='menu' size={30} color='#fff'/>
        </TouchableWithoutFeedback>
        <Text style={[navStyles.text, navStyles.title]}>{this.props.title}</Text>
        <View style={navStyles.holder}>{this.props.right}</View>
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
    width: 40,
    alignItems: 'flex-end'
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
