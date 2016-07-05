import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class PhotoDraftPage extends Component {
  constructor(props) {
    super(props);
    this.retake = this.retake.bind(this);
    this.usePicture = this.usePicture.bind(this);
    this.state = {}
  }

  retake() {
    this.props.navigator.pop();
  }

  usePicture() {
    this.props.navigator.push({name: 'newPictures', path: this.props.path, date: this.props.date, type: this.props.type});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.picContainer}>
          <Image style={styles.cover} source={{uri: this.props.path}}></Image>
        </View>
        <Button text="retake" onPress={this.retake} type="gray"/>
        <Button text="use" onPress={this.usePicture} type="main"/>
      </View>
    );
  }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  picContainer: {
    transform: [{rotate: '90deg'}],
    height: width,
    width: height
  },
  cover: {
    height: width,
    width: height,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'contain'
  }
});

export default PhotoDraftPage;
