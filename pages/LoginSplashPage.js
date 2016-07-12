import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  Image
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
        <View style={styles.logoContainer}>
          <Image source={require('../img/fitpic.png')} style={styles.logo}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button type="loginLarge" text="Login" textStyle="large" onPress={this.showLogin}></Button>
        </View>
        <View>
          <Image source={require('../img/cam.png')} style={[styles.cam, styles.camOne]}/>
        </View>
        <View>
          <Image source={require('../img/cam.png')} style={[styles.cam, styles.camTwo]}/>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FD704B'
  },
  blankContainer: {
    backgroundColor: '#eee'
  },
  buttonContainer: {
    width: 150
  },
  logoContainer: {
    width: 200
  },
  logo: {
    resizeMode: 'contain',
    width: 200,
    height: 93,
    marginBottom: 60
  },
  cam: {
    width: 256,
    height: 256,
    position: 'absolute',
    resizeMode: 'contain'
  },
  camOne: {
    right: -300,
    top: -500
  },
  camTwo: {
    left: -280,
    bottom: -270,
  }
});

export default LoginSplashPage;
