import React, { Component } from 'react';
import CameraPage from './pages/CameraPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Drawer from 'react-native-drawer';

import {
  Text,
  View,
  Navigator,
  StatusBar
} from 'react-native';



class App extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.handleMenuPress = this.handleMenuPress.bind(this);
  }

  handleMenuPress() {
    this._drawer.open();
  }

  renderScene(route, navigator) {
    var menu = <View><Text>Hi I'm menu</Text></View>;
    var content;

    if (route.name === 'home') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress}/><HomePage navigator={navigator} /></View>;
    }
    else if (route.name === 'camera') {
      content = <CameraPage navigator={navigator}/>;
    }
    else {
      content = <HomePage navigator={navigator}/>;
    }

    return (
      <Drawer
        type="overlay"
        content={menu}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        ref={(ref) => {this._drawer = ref}}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
        {content}
      </Drawer>
    )
  }

  render() {
    return (
      <View style={viewStyles}>
        <Navigator
          initialRoute={{name: 'home', index: 0}}
          renderScene={this.renderScene}
        />
      </View>
    )
  }
}

var drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

var viewStyles = {
  flex: 1,
}

export default App;
