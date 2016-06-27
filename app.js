import React, { Component } from 'react';
import CameraPage from './pages/CameraPage';
import HomePage from './pages/HomePage';

import {
  Text,
  View
} from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'home'
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.setState({
      currentPage: page
    })
  }

  render() {
    if (this.state.currentPage === 'home') {
      return (
        <HomePage onChangePage={this.changePage}/>
      )
    }

    else if (this.state.currentPage === 'camera') {
      return (
        <CameraPage onChangePage={this.changePage}/>
      )
    }

    else {
      return (
        <View><Text>You shall not pass!</Text></View>
      )
    }
  }
}

export default App;
