import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

class LoginSplashPage extends Component {
  constructor(props) {
    super(props);
    this.showLogin = this.showLogin.bind(this);
    this.state = {
      showLogin: true
    }
  }

  showLogin() {
    this.setState({showLogin: false});
    Service.showLogin(this.props.onLoggedIn);
  }

  render() {
    if (!this.state.showLogin) {
      return (
        <View style={[styles.container, styles.blankContainer]}></View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>This is the Login Splash Page</Text>
        <Button type="main" text="Login" onPress={this.showLogin}></Button>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  blankContainer: {
    backgroundColor: '#eee'
  }
});

export default LoginSplashPage;
