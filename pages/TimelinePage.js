import React, { Component } from 'react';
import Button from '../components/Button';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class TimelinePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the timeline page</Text>
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

export default TimelinePage;
