import React, { Component } from 'react';
import Button from '../components/Button';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(item) {
    if (item === 'pictures') {
      this.props.navigator.push({name: 'pictures'});
    }
    else if (item === 'measure') {
      this.props.navigator.push({name: 'measure'});
    }
    else if (item === 'timeline') {
      this.props.navigator.push({name: 'timeline'});
    }
    else if (item === 'progress') {
      this.props.navigator.push({name: 'progress'});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tileContainer}>
          <View style={styles.boxRow}>
            <TouchableHighlight onPress={this.handlePress.bind(this, 'pictures')}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Pictures</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.handlePress.bind(this, 'measure')}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Measurements</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.boxRow}>
            <TouchableHighlight onPress={this.handlePress.bind(this, 'timeline')} >
              <View style={styles.box}>
                <Text style={styles.boxText}>Timeline</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.handlePress.bind(this, 'progress')}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Progress</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <Text>Put three most recent timeline items here</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  box: {
    margin: 10,
    width: 150,
    height: 150,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  boxText: {
    color: '#000',
  },
  tileContainer: {
    marginBottom: 10,
    paddingBottom: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default HomePage;
