import React, { Component } from 'react';
import Button from '../components/Button';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

class PicturesPage extends Component {
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
        <Text>This is the photos page</Text>
        <Button text="New Entry" onPress={this.handlePress} type="main"/>
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

export default PicturesPage;
