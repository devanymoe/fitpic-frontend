import React, { Component } from 'react';
import Button from '../components/Button';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.navigator.push({name: 'camera'});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the homepage</Text>
        <Button text="clik meh" onPress={this.handlePress} type="alert"/>
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
  }
});

export default HomePage;
