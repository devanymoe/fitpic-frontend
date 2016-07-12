import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  TouchableWithoutFeedback
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
        <Image style={styles.cover} source={{uri: this.props.path}}></Image>
        <View style={styles.camControls}>
          <TouchableWithoutFeedback onPress={this.retake}>
            <Icon name='close' size={40} style={styles.icon}/>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.usePicture}>
            <Icon name='done' size={40} style={styles.icon}/>
          </TouchableWithoutFeedback>
        </View>
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
    backgroundColor: '#000'
  },
  cover: {
    height: width * 1.33,
    width: width,
    top: 0
  },
  camControls: {
    flexDirection: 'row',
    height: height - (width * 1.33),
    width: width,
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    color: '#fff'
  }
});

export default PhotoDraftPage;
